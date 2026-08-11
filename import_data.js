const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const csvDir = path.join(__dirname, 'csv_exports');

// Simple CSV parser
function parseCSV(content) {
  const lines = content.trim().split('\n');
  if (lines.length <= 1) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Split by comma, but respect quotes
    const cells = [];
    let currentCell = '';
    let insideQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim());
    
    // Construct row object
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = cells[idx] || '';
    });
    rows.push(row);
  }
  return rows;
}

async function main() {
  console.log('Starting data import from CSV to Neon database...');
  
  // 1. Import Contacts
  const contactPath = path.join(csvDir, 'contact.csv');
  if (fs.existsSync(contactPath)) {
    const contacts = parseCSV(fs.readFileSync(contactPath, 'utf8'));
    console.log(`Found ${contacts.length} contact records...`);
    for (const c of contacts) {
      await prisma.contact.upsert({
        where: { id: parseInt(c.id) },
        update: {},
        create: {
          id: parseInt(c.id),
          name: c.name,
          email: c.email,
          mobile: c.mobile,
          subject: c.subject,
          message: c.message
        }
      });
    }
  }

  // 2. Import Quotes
  const quotePath = path.join(csvDir, 'quote.csv');
  if (fs.existsSync(quotePath)) {
    const quotes = parseCSV(fs.readFileSync(quotePath, 'utf8'));
    console.log(`Found ${quotes.length} quote records...`);
    for (const q of quotes) {
      await prisma.quote.upsert({
        where: { id: parseInt(q.id) },
        update: {},
        create: {
          id: parseInt(q.id),
          name: q.name,
          email: q.email,
          service: q.service,
          message: q.message
        }
      });
    }
  }

  // 3. Import Registers
  const registerPath = path.join(csvDir, 'register.csv');
  if (fs.existsSync(registerPath)) {
    const registers = parseCSV(fs.readFileSync(registerPath, 'utf8'));
    console.log(`Found ${registers.length} user records...`);
    for (const r of registers) {
      await prisma.register.upsert({
        where: { id: parseInt(r.id) },
        update: {},
        create: {
          id: parseInt(r.id),
          firstName: r.firstName,
          lastName: r.lastName,
          email: r.email,
          password: r.password
        }
      });
    }
  }

  console.log('Import completed successfully!');
}

main()
  .catch(e => {
    console.error('Error during import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
