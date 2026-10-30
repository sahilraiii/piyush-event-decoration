# Piyush Event & Decoration website

A responsive React + Vite landing page for Piyush Event & Decoration.

## Run locally

1. Install Node.js (LTS).
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL shown by Vite.
4. Run `npm run build` to create the production site in `dist/`.

## Deploy

This project can be deployed to Netlify or Vercel. For Netlify, use build command `npm run build` and publish directory `dist`.

## Before publishing

- Replace the sample Unsplash images in `src/App.jsx` with the business's own event photographs. They are visual placeholders, not verified photos of Piyush Event & Decoration's work.
- Add the business's service area and any verified business details you want displayed.
- Replace customer review placeholders only with genuine customer feedback and permission to publish it.
- The enquiry form validates the required fields and opens WhatsApp with a pre-filled message to +91 84238 48321. It does not store form submissions in a database.

## Main files

- `src/App.jsx` — page sections, gallery filters/lightbox, and WhatsApp enquiry form.
- `src/styles.css` — responsive visual system and styling.
- `index.html` — page metadata and font loading.
