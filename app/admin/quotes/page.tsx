export const dynamic = 'force-dynamic';
import prisma from '@/lib/db';
export default async function Quotes() {
  const quotes = await prisma.quote.findMany();
  return <div><h2>Quotes</h2><ul>{quotes.map((c: any) => <li key={c.id}>{c.name} - {c.service}</li>)}</ul></div>;
}