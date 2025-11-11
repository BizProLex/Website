const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Define path configurations for different page types
const PATH_CONFIGS = {
  root: {
    basePrefix: '.',
    assets: {
      logo: './LOGO.png',
      landingBg: './LANDING-PAGE-BG.jpg',
      dubaiBg: './dubai-bg.jpg'
    },
    links: {
      home: './',
      about: './about/',
      services: './services/',
      team: './team/',
      contact: './contact/'
    }
  },
  teamIndex: {
    basePrefix: '..',
    assets: {
      logo: '../LOGO.png',
      landingBg: '../LANDING-PAGE-BG.jpg',
      dubaiBg: '../dubai-bg.jpg'
    },
    links: {
      home: '../',
      about: '../about/',
      services: '../services/',
      team: './team/',
      contact: '../contact/'
    }
  },
  teamMember: {
    basePrefix: '../..',
    assets: {
      logo: '../../LOGO.png',
      landingBg: '../../LANDING-PAGE-BG.jpg',
      dubaiBg: '../../dubai-bg.jpg'
    },
    links: {
      home: '../../',
      about: '../../about/',
      services: '../../services/',
      team: '../team/',
      contact: '../../contact/'
    }
  }
};

// Detect page type based on file path
function detectPageType(filePath) {
  if (filePath.includes('/team/') && (filePath.includes('/kerem/') || filePath.includes('/sujata/'))) {
    return 'teamMember';
  }
  if (filePath.includes('/team/') && !filePath.includes('/kerem/') && !filePath.includes('/sujata/')) {
    return 'teamIndex';
  }
  return 'root';
}

// Fix HTML content using DOM parsing
function fixPaths(content, filePath) {
  try {
    // Parse HTML with JSDOM
    const dom = new JSDOM(content);
    const document = dom.window.document;
    
    const pageType = detectPageType(filePath);
    const config = PATH_CONFIGS[pageType];
    
    // Fix asset paths in images and other elements
    const assetElements = document.querySelectorAll('img, source');
    assetElements.forEach(element => {
      // Fix logo paths
      if (element.src.includes('/LOGO.png') || element.srcset?.includes('/LOGO.png')) {
        const newSrc = config.assets.logo;
        if (element.src.includes('/LOGO.png')) {
          element.src = newSrc;
        }
        if (element.srcset?.includes('/LOGO.png')) {
          element.srcset = element.srcset.replace(/\/LOGO\.png/g, newSrc);
        }
      }
      
      // Fix background image paths in style attributes
      if (element.style && element.style.backgroundImage) {
        let bgImage = element.style.backgroundImage;
        if (bgImage.includes('/LANDING-PAGE-BG.jpg')) {
          bgImage = bgImage.replace(/\/LANDING-PAGE-BG\.jpg/g, config.assets.landingBg);
          element.style.backgroundImage = bgImage;
        }
        if (bgImage.includes('/dubai-bg.jpg')) {
          bgImage = bgImage.replace(/\/dubai-bg\.jpg/g, config.assets.dubaiBg);
          element.style.backgroundImage = bgImage;
        }
      }
    });
    
    // Fix navigation links
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Fix absolute paths
      if (href === '/') link.setAttribute('href', config.links.home);
      else if (href === '/about/') link.setAttribute('href', config.links.about);
      else if (href === '/services/') link.setAttribute('href', config.links.services);
      else if (href === '/team/') link.setAttribute('href', config.links.team);
      else if (href === '/contact/') link.setAttribute('href', config.links.contact);
    });
    
    // Fix inline styles and background images in any element
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (element.style && element.style.backgroundImage) {
        let bgImage = element.style.backgroundImage;
        
        if (bgImage.includes('/LANDING-PAGE-BG.jpg')) {
          bgImage = bgImage.replace(/\/LANDING-PAGE-BG\.jpg/g, config.assets.landingBg);
          element.style.backgroundImage = bgImage;
        }
        if (bgImage.includes('/dubai-bg.jpg')) {
          bgImage = bgImage.replace(/\/dubai-bg\.jpg/g, config.assets.dubaiBg);
          element.style.backgroundImage = bgImage;
        }
      }
    });
    
    return dom.serialize();
  } catch (error) {
    console.warn(`⚠️  Failed to parse HTML for ${filePath}, falling back to string replacement:`, error.message);
    return fallbackStringReplacement(content, filePath);
  }
}

// Fallback string replacement for malformed HTML
function fallbackStringReplacement(content, filePath) {
  const pageType = detectPageType(filePath);
  const config = PATH_CONFIGS[pageType];
  
  // Basic string replacements as fallback
  content = content.replace(/"\/_next\/static\//g, '"./_next/static/');
  content = content.replace(/'\/_next\/static\//g, "'./_next/static/");
  
  // Asset replacements
  content = content.replace(/"\/LOGO\.png"/g, `"${config.assets.logo}"`);
  content = content.replace(/'\/LOGO\.png'/g, `'${config.assets.logo}'`);
  content = content.replace(/"\/LANDING-PAGE-BG\.jpg"/g, `"${config.assets.landingBg}"`);
  content = content.replace(/'\/LANDING-PAGE-BG\.jpg'/g, `'${config.assets.landingBg}'`);
  content = content.replace(/"\/dubai-bg\.jpg"/g, `"${config.assets.dubaiBg}"`);
  content = content.replace(/'\/dubai-bg\.jpg'/g, `'${config.assets.dubaiBg}'`);
  
  // Link replacements
  Object.entries(config.links).forEach(([key, value]) => {
    content = content.replace(new RegExp(`href="${key === 'home' ? '/' : `/${key}/`}"`, 'g'), `href="${value}"`);
    content = content.replace(new RegExp(`href='${key === 'home' ? '/' : `/${key}/`}'`, 'g'), `href='${value}'`);
  });
  
  return content;
}

// Process all HTML files recursively
function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  let processed = 0;
  let errors = 0;

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const result = processDirectory(itemPath);
      processed += result.processed;
      errors += result.errors;
    } else if (item.endsWith('.html') || item.endsWith('.htm')) {
      try {
        console.log(`📝 Processing: ${path.relative(__dirname, itemPath)}`);
        
        let content = fs.readFileSync(itemPath, 'utf8');
        content = fixPaths(content, itemPath);
        fs.writeFileSync(itemPath, content);
        processed++;
      } catch (error) {
        console.error(`❌ Error processing ${itemPath}:`, error.message);
        errors++;
      }
    }
  }

  return { processed, errors };
}

// Main execution
async function main() {
  console.log('🔧 Starting HTML path fixing with DOM parsing...');
  
  const outDir = path.join(__dirname, '..', 'docs');
  
  if (!fs.existsSync(outDir)) {
    console.error(`❌ Directory not found: ${outDir}`);
    process.exit(1);
  }

  try {
    const { processed, errors } = processDirectory(outDir);
    
    console.log('\n✅ Path fixing complete!');
    console.log(`📊 Processed: ${processed} files`);
    console.log(`❌ Errors: ${errors} files`);
    
    if (errors > 0) {
      console.log('\n⚠️  Some files had errors. Check the output above for details.');
    }
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();