'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function markContactRead(id: number) {
  await prisma.contact.update({ where: { id }, data: { isRead: true } });
  revalidatePath('/admin/contacts');
}
export async function deleteContact(id: number) {
  await prisma.contact.delete({ where: { id } });
  revalidatePath('/admin/contacts');
}
export async function markQuoteRead(id: number) {
  await prisma.quote.update({ where: { id }, data: { isRead: true } });
  revalidatePath('/admin/quotes');
}
export async function deleteQuote(id: number) {
  await prisma.quote.delete({ where: { id } });
  revalidatePath('/admin/quotes');
}
export async function deleteUser(id: number) {
  await prisma.register.delete({ where: { id } });
  revalidatePath('/admin/users');
}
