export const dynamic = 'force-dynamic';
import prisma from '@/lib/db';
export default async function Contacts() {
  const contacts = await prisma.contact.findMany();
  return <div><h2>Contacts</h2><ul>{contacts.map((c: any) => <li key={c.id}>{c.name} - {c.message}</li>)}</ul></div>;
}