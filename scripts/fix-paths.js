const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Function to fix paths in HTML content
function fixPaths(content, filePath) {
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
  
  // Fix navigation links in HTML
  content = content.replace(/href="\/"/g, 'href="./"');
  content = content.replace(/href="\/about\/"/g, 'href="./about/"');
  content = content.replace(/href="\/services\/"/g, 'href="./services/"');
  content = content.replace(/href="\/team\/"/g, 'href="./team/"');
  content = content.replace(/href="\/contact\/"/g, 'href="./contact/"');
  
  // Fix single quotes too
  content = content.replace(/href='\/'/g, "href='./'");
  content = content.replace(/href='\/about\/'/g, "href='./about/'");
  content = content.replace(/href='\/services\/'/g, "href='./services/'");
  content = content.replace(/href='\/team\/'/g, "href='./team/'");
  content = content.replace(/href='\/contact\/'/g, "href='./contact/'");
  
  // Fix team member page navigation (they need ../ for subdirectories)
  if (filePath.includes('/team/') && (filePath.includes('/kerem/') || filePath.includes('/sujata/'))) {
    content = content.replace(/href="\/about\/"/g, 'href="../../about/"');
    content = content.replace(/href="\/services\/"/g, 'href="../../services/"');
    content = content.replace(/href="\/team\/"/g, 'href="../../team/"');
    content = content.replace(/href="\/contact\/"/g, 'href="../../contact/"');
    content = content.replace(/href='\/about\/'/g, "href='../../about/'");
    content = content.replace(/href='\/services\/'/g, "href='../../services/'");
    content = content.replace(/href='\/team\/'/g, "href='../../team/'");
    content = content.replace(/href='\/contact\/'/g, "href='../../contact/'");
    content = content.replace(/href="\/"/g, 'href="../../"');
    content = content.replace(/href='\/'/g, "href='../../'");
    
    // Fix logo and other assets in team member pages
    content = content.replace(/"\/LOGO\.png"/g, '"../../LOGO.png"');
    content = content.replace(/'\/LOGO\.png'/g, "'../../LOGO.png'");
    content = content.replace(/"\/LANDING-PAGE-BG\.jpg"/g, '"../../LANDING-PAGE-BG.jpg"');
    content = content.replace(/'\/LANDING-PAGE-BG\.jpg'/g, "'../../LANDING-PAGE-BG.jpg'");
    content = content.replace(/"\/dubai-bg\.jpg"/g, '"../../dubai-bg.jpg"');
    content = content.replace(/'\/dubai-bg\.jpg'/g, "'../../dubai-bg.jpg'");
  }
  
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
      content = fixPaths(content, itemPath);
      fs.writeFileSync(itemPath, content);
    }
  }
}

console.log('Fixing absolute paths to relative paths in generated HTML...');
processDirectory(outDir);
console.log('✅ Path fixing complete!');