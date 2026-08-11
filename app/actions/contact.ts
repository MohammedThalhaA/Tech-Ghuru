'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { sendContactNotification } from '@/lib/mail';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Phone number must be at least 10 digits'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function submitContact(formData: FormData) {
  try {
    const data = contactSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    });

    // 1. Store in the database
    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        subject: data.subject,
        message: data.message,
        status: 'New',
      },
    });

    // 2. Dispatch email notification
    try {
      await sendContactNotification(data);
    } catch (mailError) {
      console.error('Mail notification failure:', mailError);
    }

    return { success: true, message: 'Thank you! Your message has been received. Our team will get back to you soon.' };
  } catch (error: any) {
    console.error('Contact Form Submission Error:', error);
    if (error?.name === 'ZodError') {
      const messages = error.errors.map((e: any) => e.message).join(', ');
      return { success: false, message: messages || 'Please validate all fields.' };
    }
    return { success: false, message: 'Something went wrong. Please try again later.' };
  }
}
