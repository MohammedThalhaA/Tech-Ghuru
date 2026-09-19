const fs = require('fs');
const path = require('path');

const mainJsPath = path.join(__dirname, 'public', 'js', 'main.js');

if (fs.existsSync(mainJsPath)) {
  let content = fs.readFileSync(mainJsPath, 'utf8');
  
  // Replace all the blue cursor colors with Orange/Brown colors
  const oldColors = `           "#0081C5", "#0081C5", // Deep sky blue
    "#0087CB", "#0087CB", // Cerulean
    "#0082C6", "#0082C6", // Bright azure
    "#66C2FF", "#66C2FF", // Soft accent blue
    "#A9DFFF", "#A9DFFF", // Light sky blue
    "#E0F7FF", "#E0F7FF", // Pale blue (not white)
    "#004A75", "#004A75", // Deep navy blue
    "#3399FF", "#3399FF", // Vivid blue
    "#007ACC", "#007ACC", // Medium-dark blue
    "#99CCFF", "#99CCFF", // Light azure
    "#66B2FF", "#66B2FF", // Gentle bright blue
    "#5FA8D3", "#5FA8D3", // Ocean blue
    "#4F9EDC", "#4F9EDC", // Cool tone blue`;

  const newColors = `           "#F97316", "#F97316", // Vibrant Orange
    "#EA580C", "#EA580C", // Dark Orange
    "#C2410C", "#C2410C", // Deep Orange
    "#FB923C", "#FB923C", // Light Orange
    "#FDBA74", "#FDBA74", // Pale Orange
    "#FFEDD5", "#FFEDD5", // Very Pale Orange
    "#49200B", "#49200B", // Deep Chocolate Brown
    "#7C2D12", "#7C2D12", // Rich Brown
    "#9A3412", "#9A3412", // Medium Brown
    "#F97316", "#F97316", // Vibrant Orange
    "#EA580C", "#EA580C", // Dark Orange
    "#C2410C", "#C2410C", // Deep Orange
    "#FB923C", "#FB923C", // Light Orange`;

  if (content.includes(oldColors)) {
    content = content.replace(oldColors, newColors);
    fs.writeFileSync(mainJsPath, content, 'utf8');
    console.log('Cursor colors updated to Orange/Brown!');
  } else {
    console.log('Could not find the exact old colors block.');
  }
} else {
  console.log('main.js not found.');
}
