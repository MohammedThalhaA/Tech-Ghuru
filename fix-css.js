const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'public', 'css');
const globalsCss = path.join(__dirname, 'app', 'globals.css');

const replacements = [
  // Primary Cyan
  { regex: /#06a3da/gi, replace: 'var(--primary)' },
  { regex: /#06A3DA/gi, replace: 'var(--primary)' },
  
  // Secondary/Lighter Cyan in gradients
  { regex: /#00f0ff/gi, replace: '#FDBA74' }, // light orange
  { regex: /#0ccef0/gi, replace: '#FDBA74' }, 
  { regex: /#0677b8/gi, replace: '#C2410C' }, // dark orange
  { regex: /#0079b8/gi, replace: '#C2410C' },
  { regex: /#4fc3f7/gi, replace: '#FB923C' },
  { regex: /#e1f5fe/gi, replace: '#FFF7ED' }
];

function processCSSFile(fullPath) {
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    
    for (const r of replacements) {
      content = content.replace(r.regex, r.replace);
    }
    
    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated colors in ${fullPath}`);
    }
  }
}

// Process all files in public/css
if (fs.existsSync(cssDir)) {
  const files = fs.readdirSync(cssDir);
  for (const file of files) {
    if (file.endsWith('.css')) {
      processCSSFile(path.join(cssDir, file));
    }
  }
}

// Fix Cursor in globals.css
if (fs.existsSync(globalsCss)) {
  let content = fs.readFileSync(globalsCss, 'utf8');
  if (content.includes('background-color: black;')) {
    content = content.replace('background-color: black;', 'background-color: #F97316; /* Orange Cursor */');
    fs.writeFileSync(globalsCss, content, 'utf8');
    console.log(`Updated cursor color in ${globalsCss}`);
  }
}

console.log("CSS fixes complete.");
