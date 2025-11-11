# BizProLex Legal - GitHub Pages Deployment Guide

## ✅ Issues Fixed

The following 404 issues have been resolved:

1. **Fixed Form Action Path**: Updated `pages/contact.js:30` to use relative path `./thanks/` instead of absolute `/thanks/`
2. **Fixed Build Output Directory**: Updated `next.config.js` to output to `docs` directory and `scripts/fix-paths.js` to process correct directory
3. **Updated Path Resolution**: All navigation links now use relative paths (`./`) for GitHub Pages compatibility
4. **Verified Static Assets**: CSS, JS, and image paths are properly configured for static hosting

## 🚀 GitHub Pages Deployment Steps

### 1. Update Repository Name
**IMPORTANT**: Replace `your-repo-name` in the files below with your actual repository name:

- `next.config.js` - Update `basePath` and `assetPrefix` when deploying to a subdirectory
- If deploying to `username.github.io` (root), set these to empty strings
- If deploying to `username.github.io/repo-name`, set these to `/repo-name`

### 2. Build the Project
```bash
npm run build
```
This will:
- Generate static files in `docs/` directory
- Fix all absolute paths to relative paths
- Prepare files for GitHub Pages

### 3. Deploy to GitHub Pages

**Option A: Manual Deployment**
1. Copy contents of `docs/` folder to your repository root
2. Commit and push to GitHub
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" → "main" → "/ (root)"
5. Save

**Option B: Using GitHub Actions** (Recommended)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs
```

### 4. Verify Deployment
- Visit your GitHub Pages URL: `https://username.github.io/repository-name/`
- Test all navigation links: Home, About, Services, Team, Contact
- Test the contact form submission
- Verify images and styles load correctly

## 🔧 Files Modified

| File | Change | Reason |
|------|--------|--------|
| `pages/contact.js:30` | Changed `/thanks/` to `./thanks/` | Form redirect path for GitHub Pages |
| `next.config.js` | Added `distDir: 'docs'` | Direct build output to docs folder |
| `scripts/fix-paths.js` | Updated target directory to `docs` | Match build output directory |
| `components/Navbar.js` | Using relative paths `./` | Already correctly configured |

## 📁 Project Structure
```
docs/
├── index.html          # Homepage
├── about/              # About page
├── services/           # Services page
├── team/              # Team pages
│   ├── index.html     # Main team page
│   ├── kerem/         # Kerem's profile
│   └── sujata/        # Sujata's profile
├── contact/           # Contact page
├── thanks/            # Form submission success page
├── 404.html           # 404 error page
├── _next/             # Next.js static assets
├── LOGO.png           # Company logo
└── *.jpg             # Background images
```

## ⚠️ Important Notes

1. **Repository Name**: Update `next.config.js` with your actual repository name if deploying to a subdirectory
2. **CNAME File**: The `docs/CNAME` file contains `bizprolex.com` - keep this for custom domain setup
3. **Nojekyll**: The `docs/.nojekyll` file prevents Jekyll processing (required for Next.js static export)
4. **Form Submissions**: Contact form uses FormSubmit.co service - no server-side processing needed

## 🧪 Testing Commands

To test locally before deployment:
```bash
# Serve the built files locally
cd docs
python3 -m http.server 8000
# Visit http://localhost:8000
```

## ✅ Deployment Checklist

- [ ] Replace `your-repo-name` in configuration
- [ ] Run `npm run build` successfully
- [ ] Deploy `docs/` contents to GitHub repository
- [ ] Enable GitHub Pages in repository settings
- [ ] Test all page navigation
- [ ] Test contact form submission
- [ ] Verify images and styles load correctly
- [ ] Test 404 error page

---

**Status**: ✅ Ready for deployment to GitHub Pages
**Last Updated**: 2025-11-10