const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const backupFile = path.join(__dirname, 'backups', 'backup-latest.json');
  if (!fs.existsSync(backupFile)) {
    console.error('Backup file backups/backup-latest.json not found!');
    process.exit(1);
  }

  console.log('Reading backup data...');
  const data = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

  // 1. Restore Register
  if (data.registers && data.registers.length > 0) {
    console.log(`Restoring ${data.registers.length} Register records...`);
    for (const r of data.registers) {
      const record = {
        ...r,
        createdAt: r.createdAt ? new Date(r.createdAt) : undefined
      };
      await prisma.register.upsert({
        where: { id: record.id },
        update: record,
        create: record
      });
    }
    // Reset sequence
    try {
      await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Register"', 'id'), coalesce(max(id), 0) + 1, false) FROM "Register";`);
    } catch (err) {
      console.log('Could not reset sequence for Register:', err.message);
    }
  }

  // 2. Restore Contact
  if (data.contacts && data.contacts.length > 0) {
    console.log(`Restoring ${data.contacts.length} Contact records...`);
    for (const c of data.contacts) {
      const record = {
        ...c,
        createdAt: c.createdAt ? new Date(c.createdAt) : undefined,
        updatedAt: c.updatedAt ? new Date(c.updatedAt) : undefined
      };
      await prisma.contact.upsert({
        where: { id: record.id },
        update: record,
        create: record
      });
    }
    try {
      await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Contact"', 'id'), coalesce(max(id), 0) + 1, false) FROM "Contact";`);
    } catch (err) {
      console.log('Could not reset sequence for Contact:', err.message);
    }
  }

  // 3. Restore Quote
  if (data.quotes && data.quotes.length > 0) {
    console.log(`Restoring ${data.quotes.length} Quote records...`);
    for (const q of data.quotes) {
      const record = {
        ...q,
        createdAt: q.createdAt ? new Date(q.createdAt) : undefined,
        updatedAt: q.updatedAt ? new Date(q.updatedAt) : undefined
      };
      await prisma.quote.upsert({
        where: { id: record.id },
        update: record,
        create: record
      });
    }
    try {
      await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Quote"', 'id'), coalesce(max(id), 0) + 1, false) FROM "Quote";`);
    } catch (err) {
      console.log('Could not reset sequence for Quote:', err.message);
    }
  }

  // 4. Restore CareerApplication
  if (data.careerApplications && data.careerApplications.length > 0) {
    console.log(`Restoring ${data.careerApplications.length} CareerApplication records...`);
    for (const ca of data.careerApplications) {
      const record = {
        ...ca,
        createdAt: ca.createdAt ? new Date(ca.createdAt) : undefined,
        updatedAt: ca.updatedAt ? new Date(ca.updatedAt) : undefined
      };
      await prisma.careerApplication.upsert({
        where: { id: record.id },
        update: record,
        create: record
      });
    }
    try {
      await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"CareerApplication"', 'id'), coalesce(max(id), 0) + 1, false) FROM "CareerApplication";`);
    } catch (err) {
      console.log('Could not reset sequence for CareerApplication:', err.message);
    }
  }

  console.log('Restore completed successfully!');
}

main()
  .catch(e => {
    console.error('Restore failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
