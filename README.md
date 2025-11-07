# BizProLex Legal — Website (Next.js)

Premium, elegant, and minimal website for BizProLex Legal (UAE), built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- Next.js (Pages Router)
- Tailwind CSS
- Framer Motion

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run the dev server (port 8000):

```bash
npm run dev:8000
```

Open http://localhost:8000.

## Deploy

- Vercel: Import this repo into Vercel and deploy. API route (`/api/contact`) works out of the box.
- GitHub Pages (static export):
  - CNAME: Provided in the repo (`CNAME`) with `bizprolex.com` and `www.bizprolex.com`.
  - Important: API routes are not supported with `next export`.
  - Build static export:
    ```bash
    npm run build && npm run export
    ```
  - Rename `out/` to `docs/` and push to `main`:
    ```bash
    rm -rf docs && mv out docs && git add docs && git commit -m "Export site to docs" && git push
    ```
  - In GitHub repo settings → Pages: set Source = `Deploy from a branch`, Branch = `main`, Folder = `/docs`.
  - DNS: Point `bizprolex.com` and `www.bizprolex.com` to GitHub Pages and enforce HTTPS.
  - Contact form options:
    - Use a `mailto:` link on the button; or
    - Plug in an external form service (Formspree/Resend/SendGrid API) and post directly to it.

## Content Placeholders

- About: Replace the placeholder paragraph in `pages/about.js` with your full About Us content.
- Team: The Team section now lives under About — replace the "TODO" bios in `pages/about.js` for Sujata Duge (with LL.M. details) and Of Counsel: Kerem Selahattin Ergün.

## Styling

- Colors: Navy `#0C1B2A`, Gold `#C6A664`, Off-white `#F9F9F9`
- Fonts: Playfair Display (headings), Inter (body)
