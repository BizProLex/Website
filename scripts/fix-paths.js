const fs = require('fs');
const path = require('path');

// Function to fix paths in HTML content
function fixPaths(content, filePath) {
  // Fix Next.js static assets paths (always relative)
  content = content.replace(/"\/_next\/static\//g, '"./_next/static/');
  content = content.replace(/'\/_next\/static\//g, "'./_next/static/");

  // Handle different page types
  const isTeamMemberPage = filePath.includes('/team/') && (filePath.includes('/kerem/') || filePath.includes('/sujata/'));
  const isTeamIndexPage = filePath.includes('/team/') && !isTeamMemberPage;

  if (isTeamMemberPage) {
    // Team member pages: /team/kerem/ or /team/sujata/
    // Fix ABSOLUTE asset paths to relative
    content = content.replace(/"\/LOGO\.png"/g, '"../../LOGO.png"');
    content = content.replace(/'\/LOGO\.png'/g, "'../../LOGO.png'");
    content = content.replace(/"\/LANDING-PAGE-BG\.jpg"/g, '"../../LANDING-PAGE-BG.jpg"');
    content = content.replace(/'\/LANDING-PAGE-BG\.jpg'/g, "'../../LANDING-PAGE-BG.jpg'");
    content = content.replace(/"\/dubai-bg\.jpg"/g, '"../../dubai-bg.jpg"');
    content = content.replace(/'\/dubai-bg\.jpg'/g, "'../../dubai-bg.jpg'");

    // Fix ABSOLUTE navigation links to relative - use very specific context
    // Fix team page links (Our Team from team member pages)
    content = content.replace(/<a[^>]*href="\/team\/"[^>]*>.*?Our Team.*?<\/a>/g, (match) => {
      return match.replace(/href="\/team\/"/g, 'href="../team/"');
    });
    content = content.replace(/<a[^>]*href='\/team\/'[^>]*>.*?Our Team.*?<\/a>/g, (match) => {
      return match.replace(/href='\/team\/'/g, "href='../team/'");
    });

    // Fix other specific links
    content = content.replace(/href="\/about\/"/g, 'href="../../about/"');
    content = content.replace(/href="\/services\/"/g, 'href="../../services/"');
    content = content.replace(/href="\/contact\/"/g, 'href="../../contact/"');
    content = content.replace(/href='\/about\/'/g, "href='../../about/'");
    content = content.replace(/href='\/services\/'/g, "href='../../services/'");
    content = content.replace(/href='\/contact\/'/g, "href='../../contact/'");

    // Fix Our Team link - specifically target the Our Team text
    content = content.replace(/<a[^>]*>.*?Our Team.*?<\/a>/g, (match) => {
      if (match.includes('href="../team/"')) {
        return match; // Already correct
      }
      if (match.includes('href="../../"')) {
        return match.replace(/href="../../"/g, 'href="../team/"');
      }
      if (match.includes('href="\/"')) {
        return match.replace(/href="\/"/g, 'href="../team/"');
      }
      if (match.includes("href='../../'")) {
        return match.replace(/href='../../'/g, "href='../team/'");
      }
      if (match.includes("href='/'")) {
        return match.replace(/href='\/'/g, "href='../team/'");
      }
      return match;
    });

    // Fix Home link - specifically target the Home text
    content = content.replace(/<a[^>]*>.*?Home.*?<\/a>/g, (match) => {
      if (match.includes('href="../../"')) {
        return match; // Already correct
      }
      if (match.includes('href="../team/"')) {
        return match.replace(/href="\/team\/"/g, 'href="../../"');
      }
      if (match.includes('href="\/"')) {
        return match.replace(/href="\/"/g, 'href="../../"');
      }
      if (match.includes("href='../../'")) {
        return match; // Already correct
      }
      if (match.includes("href='\/team\/'")) {
        return match.replace(/href='\/team\/'/g, "href='../../'");
      }
      if (match.includes("href='\/'")) {
        return match.replace(/href='\/'/g, "href='../../'");
      }
      return match;
    });

  } else if (isTeamIndexPage) {
    // Team index page: /team/
    // Fix ABSOLUTE asset paths to relative
    content = content.replace(/"\/LOGO\.png"/g, '"../LOGO.png"');
    content = content.replace(/'\/LOGO\.png'/g, "'../LOGO.png'");
    content = content.replace(/"\/LANDING-PAGE-BG\.jpg"/g, '"../LANDING-PAGE-BG.jpg"');
    content = content.replace(/'\/LANDING-PAGE-BG\.jpg'/g, "'../LANDING-PAGE-BG.jpg'");
    content = content.replace(/"\/dubai-bg\.jpg"/g, '"../dubai-bg.jpg"');
    content = content.replace(/'\/dubai-bg\.jpg'/g, "'../dubai-bg.jpg'");

    // Fix ABSOLUTE navigation links to relative
    content = content.replace(/href="\/about\/"/g, 'href="../about/"');
    content = content.replace(/href="\/services\/"/g, 'href="../services/"');
    content = content.replace(/href="\/team\/"/g, 'href="./team/"');
    content = content.replace(/href="\/contact\/"/g, 'href="../contact/"');
    content = content.replace(/href="\/"/g, 'href="../"');
    content = content.replace(/href='\/about\/'/g, "href='../about/'");
    content = content.replace(/href='\/services\/'/g, "href='../services/'");
    content = content.replace(/href='\/team\/'/g, "href='./team/'");
    content = content.replace(/href='\/contact\/'/g, "href='../contact/'");
    content = content.replace(/href='\/'/g, "href='../'");

  } else {
    // Root pages: /, /about, /services, /contact, etc.
    // Fix ABSOLUTE asset paths to relative
    content = content.replace(/"\/LOGO\.png"/g, '"./LOGO.png"');
    content = content.replace(/'\/LOGO\.png'/g, "'./LOGO.png'");
    content = content.replace(/"\/LANDING-PAGE-BG\.jpg"/g, '"./LANDING-PAGE-BG.jpg"');
    content = content.replace(/'\/LANDING-PAGE-BG\.jpg'/g, "'./LANDING-PAGE-BG.jpg'");
    content = content.replace(/"\/dubai-bg\.jpg"/g, '"./dubai-bg.jpg"');
    content = content.replace(/'\/dubai-bg\.jpg'/g, "'./dubai-bg.jpg'");

    // Fix ABSOLUTE navigation links to relative
    content = content.replace(/href="\/about\/"/g, 'href="./about/"');
    content = content.replace(/href="\/services\/"/g, 'href="./services/"');
    content = content.replace(/href="\/team\/"/g, 'href="./team/"');
    content = content.replace(/href="\/contact\/"/g, 'href="./contact/"');
    content = content.replace(/href="\/"/g, 'href="./"');
    content = content.replace(/href='\/about\/'/g, "href='./about/'");
    content = content.replace(/href='\/services\/'/g, "href='./services/'");
    content = content.replace(/href='\/team\/'/g, "href='./team/'");
    content = content.replace(/href='\/contact\/'/g, "href='./contact/'");
    content = content.replace(/href='\/'/g, "href='./'");
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
    } else if (item.endsWith('.html') || item.endsWith('.htm')) {
      console.log(`Fixing paths in: ${path.relative(__dirname, itemPath)}`);

      let content = fs.readFileSync(itemPath, 'utf8');
      content = fixPaths(content, itemPath);
      fs.writeFileSync(itemPath, content);
    }
  }
}

// Main execution
console.log('Fixing absolute paths to relative paths in generated HTML...');
const outDir = path.join(__dirname, '..', 'docs');
processDirectory(outDir);
console.log('✅ Path fixing complete!');
