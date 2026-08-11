export const dynamic = 'force-dynamic';
import prisma from '@/lib/db';
export default async function Dashboard() {
  const contacts = await prisma.contact.count();
  const quotes = await prisma.quote.count();
  const users = await prisma.register.count();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Contacts: {contacts}</p>
      <p>Quotes: {quotes}</p>
      <p>Users: {users}</p>
    </div>
  );
}