const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Function to fix paths in HTML content
function fixPaths(content) {
  // Fix Next.js static assets paths
  content = content.replace(/"\/_next\/static\//g, '"./_next/static/');
  content = content.replace(/'\/_next\/static\//g, "'./_next/static/");
  
  // Fix image paths
  content = content.replace(/"\/LOGO\.png"/g, '"./LOGO.png"');
  content = content.replace(/'\/LOGO\.png'/g, "'./LOGO.png'");
  content = content.replace(/"\/LANDING-PAGE-BG\.jpg"/g, '"./LANDING-PAGE-BG.jpg"');
  content = content.replace(/'\/LANDING-PAGE-BG\.jpg'/g, "'./LANDING-PAGE-BG.jpg'");
  content = content.replace(/"\/dubai-bg\.jpg"/g, '"./dubai-bg.jpg"');
  content = content.replace(/'\/dubai-bg\.jpg'/g, "'./dubai-bg.jpg'");
  
  return content;
}

// Recursive function to process all HTML files
function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      processDirectory(itemPath);
    } else if (item.endsWith('.html')) {
      console.log(`Fixing paths in: ${path.relative(__dirname, itemPath)}`);
      
      let content = fs.readFileSync(itemPath, 'utf8');
      content = fixPaths(content);
      fs.writeFileSync(itemPath, content);
    }
  }
}

console.log('Fixing absolute paths to relative paths in generated HTML...');
processDirectory(outDir);
console.log('✅ Path fixing complete!');