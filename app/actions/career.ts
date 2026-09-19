'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { sendCareerApplicationNotification } from '@/lib/mail';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const applicationSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  position: z.string().min(1, 'Position is required'),
  experience: z.string().min(1, 'Years of experience is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').or(z.literal('')).optional(),
  portfolio: z.string().url('Invalid Portfolio URL').or(z.literal('')).optional(),
  coverLetter: z.string().min(10, 'Cover letter must be at least 10 characters'),
});

export async function submitJobApplication(formData: FormData) {
  try {
    // 1. Zod Fields Validation
    const data = applicationSchema.parse({
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      position: formData.get('position'),
      experience: formData.get('experience'),
      linkedin: formData.get('linkedin') || undefined,
      portfolio: formData.get('portfolio') || undefined,
      coverLetter: formData.get('coverLetter'),
    });

    // 2. File Validation
    const file = formData.get('resume') as File | null;
    if (!file || file.size === 0) {
      return { success: false, message: 'Please upload your resume.' };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, message: 'Resume file size exceeds the 5MB limit.' };
    }

    const fileExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return { success: false, message: 'Allowed resume formats: PDF, DOC, DOCX.' };
    }

    // 3. Upload file securely to a private uploads directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique safe filename
    const fileHash = crypto.randomBytes(8).toString('hex');
    const safeBaseName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${fileHash}-${safeBaseName}`;
    const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write file
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // 4. Store CareerApplication in Database
    const app = await prisma.careerApplication.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        experience: data.experience,
        linkedin: data.linkedin || null,
        portfolio: data.portfolio || null,
        coverLetter: data.coverLetter,
        resumePath: filename,
        status: 'New',
      },
    });

    // 5. Generate secure, signature-validated download link
    const secret = process.env.NEXTAUTH_SECRET || 'techghuru_secret_fallback';
    const signature = crypto.createHmac('sha256', secret).update(filename).digest('hex');
    const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resumeDownloadUrl = `${appUrl}/api/resumes/download?filename=${encodeURIComponent(filename)}&sig=${signature}`;

    // 6. Send notification email to admin/HR
    try {
      await sendCareerApplicationNotification({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        experience: data.experience,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
        coverLetter: data.coverLetter,
        resumeDownloadUrl,
      });
    } catch (mailError) {
      console.error('Career application mail notification failure:', mailError);
    }

    return {
      success: true,
      message: 'Thank you! Your application has been submitted successfully. Our team will review your profile and contact you if your experience matches our requirements.',
    };
  } catch (error: any) {
    console.error('Job Application Submission Error:', error);
    if (error?.name === 'ZodError') {
      const messages = error.errors.map((e: any) => e.message).join(', ');
      return { success: false, message: messages || 'Please validate all fields.' };
    }
    return { success: false, message: 'Something went wrong. Please try again later.' };
  }
}
