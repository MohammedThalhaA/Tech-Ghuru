const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'public/css/style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Replace the CSS variables
const newVars = `:root {
  --primary: #2563EB; /* Modern Blue */
  --secondary: #10B981; /* Emerald Green */
  --light: #F8FAFC; /* Slate 50 */
  --dark: #0F172A; /* Slate 900 */
  --surface: #FFFFFF;
  --border: #E2E8F0;
  --orbit-radius: 150px;
  --orbit-duration: 20s;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}

body {
  font-family: 'Inter', sans-serif;
  color: #334155;
  background-color: var(--light);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6, .display-1, .display-2, .display-3, .display-4, .display-5, .display-6 {
  font-family: 'Outfit', sans-serif !important;
  color: var(--dark);
  font-weight: 700;
  letter-spacing: -0.025em;
}
`;

// Replace everything from :root { up to but not including body { ... }
// Since the original has body { overflow-x: hidden; } right after :root, we can just replace that whole block.
const rootRegex = /:root\s*\{[^}]*\}\s*body\s*\{\s*overflow-x:\s*hidden;\s*\}/m;
if (rootRegex.test(cssContent)) {
  cssContent = cssContent.replace(rootRegex, newVars);
}

// 2. Add modern utilities for glassmorphism and cards at the end of the file
const modernCSS = `
/* ==========================================================================
   Modern UI Redesign Additions (Clean Light Mode)
   ========================================================================== */

/* Glassmorphism */
.glass-effect {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

/* Modern Cards */
.modern-card {
  background-color: var(--surface);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.modern-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

/* Floating Navbar */
.sticky-top.navbar-dark {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid var(--border) !important;
  box-shadow: var(--shadow-sm) !important;
}
.sticky-top.navbar-dark .navbar-nav .nav-link {
  color: var(--dark) !important;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}
.sticky-top.navbar-dark .navbar-nav .nav-link:hover {
  color: var(--primary) !important;
}
.sticky-top.navbar-dark .navbar-brand h1 {
  color: var(--primary) !important;
  font-family: 'Outfit', sans-serif !important;
}

/* Updated Buttons */
.btn-primary {
  background: linear-gradient(135deg, var(--primary), #3B82F6) !important;
  border: none !important;
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
  border-radius: 8px;
}
.btn-primary:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px 0 rgba(37, 99, 235, 0.39) !important;
}

/* Updated Service Items */
.service-item {
  background-color: var(--surface) !important;
  border-radius: 20px !important;
  border: 1px solid var(--border) !important;
  box-shadow: var(--shadow-sm) !important;
  padding: 40px 30px !important;
}
.service-item:hover {
  box-shadow: var(--shadow-lg) !important;
}
.service-item .service-icon {
  background: linear-gradient(135deg, var(--primary), #3B82F6) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39) !important;
}

/* Carousel Adjustments */
.carousel-caption {
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.7)) !important;
  backdrop-filter: blur(2px);
}

/* Facts Section */
.facts .bg-primary {
  background: linear-gradient(135deg, var(--primary), #3B82F6) !important;
  border-radius: 20px !important;
}
.facts .bg-light {
  background: var(--surface) !important;
  border-radius: 20px !important;
  border: 1px solid var(--border);
}
.facts .bg-primary .bg-white, .facts .bg-light .bg-primary {
  border-radius: 12px !important;
}

/* Footer Adjustments */
.footercolor {
  background-color: var(--dark) !important;
}

/* Fix generic body fonts across the site */
p {
  font-family: 'Inter', sans-serif !important;
  font-weight: 400;
  line-height: 1.6;
}
`;

if (!cssContent.includes("Modern UI Redesign Additions")) {
  cssContent += modernCSS;
}

// 3. Fix instances of old fonts in CSS
cssContent = cssContent.replace(/Nunito/g, 'Outfit');
cssContent = cssContent.replace(/Raleway/g, 'Inter');

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('CSS successfully updated for Clean Light Mode.');
