# Personal Academic Website Template

This is a polished static website for a PhD student. You only need to replace the portrait and edit the text/links in `content.js`.

## Quick Start

1. Open `content.js`.
2. Replace the placeholder values with your own:
   - name
   - title
   - affiliation
   - bio
   - research themes
   - publications
   - teaching, projects, service
   - contact links
3. Replace `assets/profile-placeholder.svg` with your own portrait, or update the `profileImage` path in `content.js`.
4. Open `index.html` in a browser.

## Files

- `index.html`: page structure
- `styles.css`: visual design and responsive layout
- `content.js`: all editable content in one place
- `script.js`: rendering and small interactions
- `assets/profile-placeholder.svg`: temporary portrait placeholder
- `assets/favicon.svg`: site icon

## Customization Notes

- The main hero buttons are controlled by `primaryCtaLabel`, `primaryCtaUrl`, `secondaryCtaLabel`, and `secondaryCtaUrl`.
- Publications, teaching, projects, service, timeline, and news are each generated from arrays in `content.js`.
- If you have a PDF CV, add the file to the project and update the `CV` link in `contactLinks`.
- For best portrait results, use a vertical image with generous headroom.

## Optional Local Server

If you want live reload behavior from a simple local server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.
