# Raja Gems Testing Lab — Landing Page

Modern glassy / glossy refresh. Next.js 14 + React 18 (TypeScript).

## Run
    npm install
    npm run dev                  # http://localhost:3000
    npm run build && npm start   # production

## Logo
The big glassy hero crest uses /public/rgtl-logo.jpg (already included).
Swap that one file to change the logo everywhere (nav, hero, about, footer).

## Gem photos (optional)
The "Gems We Certify" tiles show generated SVG gem art by default.
To use real photos instead, drop square images into /public/gems/ named:

    sapphire.jpg, ruby.jpg, emerald.jpg, diamond.jpg

They automatically cover the SVG when present — no code change needed.
Edit the SHOWCASE array at the top of src/components/LandingPage.tsx
to add, rename, or recolor stones.

## Verify flow (unchanged)
The Verify box sends users to:

    https://cert.rajagemstones.com/verify/{CERT_NO}

Change CERT_PORTAL at the top of src/components/LandingPage.tsx if the
portal URL ever changes.

## Notes
- Fonts: Playfair Display (display), Inter (body), Cormorant Garamond (accent).
- Fully responsive; respects prefers-reduced-motion.
- node_modules and .next are NOT included — run npm install first.
