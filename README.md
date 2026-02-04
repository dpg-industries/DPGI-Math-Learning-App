# Curious Chimp — Explore Prototype

A calm, static front-end prototype for the Curious Chimp Explore home screen. Built with pure HTML/CSS/JS and ready for static hosting or WordPress embedding.

## Run locally

1. Open `index.html` directly in your browser.
2. Or serve the folder with any static host (example):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Embed in WordPress

### Option 1: Iframe embed

1. Upload the project folder to your WordPress server (e.g., `/wp-content/uploads/curious-chimp/`).
2. Create a page and add a Custom HTML block with:

```html
<iframe
  src="/wp-content/uploads/curious-chimp/index.html"
  title="Curious Chimp Explore"
  style="width: 100%; height: 900px; border: 0;"
></iframe>
```

### Option 2: Custom page template

1. Create a custom page template in your theme.
2. Copy the contents of `index.html` into the template body.
3. Enqueue `styles.css` and `app.js` from the template via `wp_enqueue_style` and `wp_enqueue_script`.
4. Upload the `assets/` folder to your theme or a public uploads directory and update the relative paths if needed.

---

Mascot images are referenced by filename; if they are missing, the UI will show soft color blocks as placeholders.
Binary mascot PNGs are intentionally omitted from this repo so you can drop in real artwork later.

Feel free to extend the card data or hook up real lesson content.
