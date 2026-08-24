# Lyeanne Gadiano — Editable React Portfolio

A responsive React/Vite portfolio inspired by the supplied editorial web-design reference. The layout is intentionally original while borrowing the reference's high-level visual direction: oversized typography, warm neutral paper background, olive accent, editorial serif text, project cards, services, process, and a strong contact banner.

## Run locally

1. Install Node.js (18+ recommended).
2. Open this folder in VS Code / Cursor.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL Vite gives you.

## Edit your details

Almost all personal content is in:

`src/data.js`

Change your name, intro, location, email, stats, services, projects, experience, education, and skills there.

## Add your images

Put your files in:

`public/images/`

Then update the image filename in `src/data.js`.

Example:

`image: '/images/my-project.jpg'`

For the profile area, replace the placeholder in `src/main.jsx` with an `<img src="/images/profile.jpg" ... />` when you are ready to use a portrait.

### Recommended image sizes
- Profile: 1000 × 1200px or larger
- Project images: 1000 × 1200px or 4:5
- Keep files compressed (WebP/JPG) for faster loading

## Important

The supplied reference image is design inspiration only and is not bundled as a website asset. Replace all placeholder project/profile images with your own work.
