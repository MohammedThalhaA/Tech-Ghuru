const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];
const fileExtensions = ['.tsx', '.ts', '.css'];

const replacements = [
  // Logo replacements
  { regex: /\/img\/logo\.png/g, replace: '/Tech Ghuru logo.png' },
  { regex: /\/img\/techghuru white logo\.png/g, replace: '/Tech Ghuru logo.png' },
  
  // Color replacements (Blue -> Orange)
  { regex: /blue-50(?!\d)/g, replace: 'orange-50' },
  { regex: /blue-100/g, replace: 'orange-100' },
  { regex: /blue-200/g, replace: 'orange-200' },
  { regex: /blue-400/g, replace: 'orange-400' },
  { regex: /blue-500/g, replace: 'orange-500' },
  { regex: /blue-600/g, replace: 'orange-600' },
  { regex: /blue-700/g, replace: 'orange-700' },
  
  // Color replacements (Slate -> Stone/Chocolate)
  { regex: /slate-800/g, replace: 'stone-800' },
  { regex: /slate-900/g, replace: 'stone-900' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fileExtensions.includes(path.extname(fullPath))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const r of replacements) {
        content = content.replace(r.regex, r.replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated theme in: ${fullPath}`);
      }
    }
  }
}

for (const dir of directories) {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
}

console.log("Theme update complete.");
