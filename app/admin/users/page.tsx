export const dynamic = 'force-dynamic';
import prisma from '@/lib/db';
export default async function Users() {
  const users = await prisma.register.findMany();
  return <div><h2>Users</h2><ul>{users.map((c: any) => <li key={c.id}>{c.email}</li>)}</ul></div>;
}