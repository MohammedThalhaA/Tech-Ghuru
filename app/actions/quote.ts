'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { sendGeneralEnquiryNotification } from '@/lib/mail';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  companyName: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitQuote(formData: FormData) {
  try {
    const raw = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      companyName: formData.get('companyName') || undefined,
      service: formData.get('service'),
      message: formData.get('message'),
    };

    const data = schema.parse(raw);

    // 1. Store in the database
    await prisma.quote.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        service: data.service,
        message: data.message,
        status: 'New',
      },
    });

    // 2. Dispatch email notification
    try {
      await sendGeneralEnquiryNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName || '',
        service: data.service,
        message: data.message,
      });
    } catch (mailError) {
      console.error('General enquiry mail notification failure:', mailError);
    }

    return { success: true, message: 'Thank you! Your enquiry has been submitted successfully.' };
  } catch (error: any) {
    console.error('Quote Submission Error:', error);
    if (error?.name === 'ZodError') {
      const messages = error.errors.map((e: any) => e.message).join(', ');
      return { success: false, message: messages || 'Please validate all fields.' };
    }
    return { success: false, message: 'Something went wrong. Please try again later.' };
  }
}
