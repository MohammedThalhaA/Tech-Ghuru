'use server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const user = await prisma.register.findUnique({ where: { email } });
    if (!user) return { success: false, message: 'Invalid credentials' };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { success: false, message: 'Invalid credentials' };

    return { success: true, message: 'Login successful' };
  } catch (error) {
    return { success: false, message: 'Login failed' };
  }
}
