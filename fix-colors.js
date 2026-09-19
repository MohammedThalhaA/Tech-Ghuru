const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const r of replacements) {
      content = content.replace(r.regex, r.replace);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
}

// 1. Fix style.css gradients
const styleCssPath = path.join(__dirname, 'public', 'css', 'style.css');
replaceInFile(styleCssPath, [
  { regex: /#3B82F6/gi, replace: 'var(--secondary)' },
  { regex: /#007bff/gi, replace: 'var(--secondary)' },
  { regex: /#34ad54/gi, replace: 'var(--secondary)' },
  { regex: /#00aeff/gi, replace: 'var(--secondary)' }
]);

// 2. Fix hardcoded #06a3da in TS/JS files
const tsxFiles = [
  'components/Navbar.tsx',
  'app/portfolio/page.tsx',
  'app/careers/[id]/page.jsx',
  'app/careers/page.jsx',
  'lib/jobs.js',
  'lib/mail.ts'
];

tsxFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  replaceInFile(filePath, [
    { regex: /#06a3da/gi, replace: '#F97316' },
    { regex: /#0072ce/gi, replace: '#49200B' }, // mail gradient blue
    { regex: /#00E5FF/gi, replace: '#49200B' },
    { regex: /rgba\(6, 163, 218,/gi, replace: 'rgba(249, 115, 22,' } // rgba equivalent for shadow
  ]);
});

console.log("Color fixes complete.");
