const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/(main)/about/page.tsx',
  'app/(main)/blog/product-design/page.tsx',
  'app/(main)/blog/web-developing/page.tsx',
  'app/(main)/contact/page.tsx',
  'app/(main)/features/page.tsx',
  'app/(main)/page.tsx',
  'app/actions/career.ts',
  'app/api/resumes/download/route.ts',
  'app/careers/[id]/page.jsx',
  'app/careers/page.jsx',
  'app/layout.tsx',
  'app/portfolio/page.tsx',
  'components/Footer.tsx',
  'components/Navbar.tsx',
  'components/ServiceLandingPage.tsx',
  'components/Topbar.tsx',
  'lib/jobs.js',
  'lib/mail.ts',
  'lib/servicesData.ts',
  'package.json',
  'package-lock.json',
  'scratch_content_utf8.tsx',
  'scratch_web_utf8.tsx'
];

const basePath = path.join(__dirname);

filesToUpdate.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace social links
  content = content.replace(/https:\/\/x\.com\/atriowings/g, '#');
  content = content.replace(/https:\/\/www\.facebook\.com\/people\/AtrioWings-Technologies\/100082503773842\//g, '#');
  content = content.replace(/https:\/\/www\.linkedin\.com\/posts\/atriowings_atriowings-atriowingstechnologies-business-activity-6910483218567741440-4G05\//g, '#');
  content = content.replace(/https:\/\/www\.instagram\.com\/atriowingstechnologies\//g, '#');
  
  // Replace email
  content = content.replace(/info@atriowings\.in/g, 'info@techghuru.in');

  // Replace domain
  content = content.replace(/atriowings\.in/gi, 'techghuru.in');

  // Replace logo filename
  content = content.replace(/atriowings white logo\.png/g, 'techghuru white logo.png');

  // Replace specific phrases
  content = content.replace(/Atriowings Technologies India Private Limited/g, 'Tech Ghuru');
  content = content.replace(/Atriowings Technologies/gi, 'Tech Ghuru');
  content = content.replace(/AtrioWings Technologies/g, 'Tech Ghuru');

  // General replacements
  content = content.replace(/Atriowings/g, 'Tech Ghuru');
  content = content.replace(/AtrioWings/g, 'Tech Ghuru');
  
  // Replace remaining lowercase mentions (like in package.json name)
  content = content.replace(/atriowings/g, 'techghuru');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${file}`);
});
