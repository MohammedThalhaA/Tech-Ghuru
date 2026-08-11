'use server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({ firstName: z.string().min(1), lastName: z.string().min(1), email: z.string().email(), password: z.string().min(6) });

export async function registerUser(formData: FormData) {
  try {
    const data = schema.parse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
    
    const exists = await prisma.register.findUnique({ where: { email: data.email } });
    if (exists) return { success: false, message: 'Email already in use' };

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.register.create({ data: { ...data, password: hashedPassword } });

    return { success: true, message: 'Registration successful' };
  } catch (error) {
    return { success: false, message: 'Registration failed' };
  }
}
