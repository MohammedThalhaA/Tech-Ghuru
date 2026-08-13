const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database backup...');

  const data = {};

  try {
    data.registers = await prisma.register.findMany();
    console.log(`Backed up ${data.registers.length} Register records.`);
  } catch (err) {
    console.error('Error backing up Register:', err.message);
  }

  try {
    data.contacts = await prisma.contact.findMany();
    console.log(`Backed up ${data.contacts.length} Contact records.`);
  } catch (err) {
    console.error('Error backing up Contact:', err.message);
  }

  try {
    data.quotes = await prisma.quote.findMany();
    console.log(`Backed up ${data.quotes.length} Quote records.`);
  } catch (err) {
    console.error('Error backing up Quote:', err.message);
  }

  try {
    data.careerApplications = await prisma.careerApplication.findMany();
    console.log(`Backed up ${data.careerApplications.length} CareerApplication records.`);
  } catch (err) {
    console.error('Error backing up CareerApplication:', err.message);
  }

  const backupDir = path.join(__dirname, 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `backup-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2), 'utf8');

  // Save as backup-latest.json too for easy referencing in restore
  const latestFile = path.join(backupDir, 'backup-latest.json');
  fs.writeFileSync(latestFile, JSON.stringify(data, null, 2), 'utf8');

  console.log(`Backup completed successfully! Saved to:\n  - ${backupFile}\n  - ${latestFile}`);
}

main()
  .catch(e => {
    console.error('Backup failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
