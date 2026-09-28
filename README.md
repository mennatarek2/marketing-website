# HyMotion — Marketing Website (production)

The public marketing website for HyMotion: https://hymotionme.live

Static HTML/CSS/JS. No build step, no dependencies, fully isolated from the
operational app (`apps/web`) — this folder shares nothing with it except the
Cairo font files and the HyMotion design tokens.

## Pages (clean URLs)

| URL          | Source file       | Purpose                          |
|--------------|-------------------|----------------------------------|
| `/`          | `index.html`      | Home — full product narrative    |
| `/product/`  | `product/`        | Product areas + full module map  |
| `/local/`    | `local/`          | Local Edition positioning        |
| `/demo/`     | `demo/`           | Guided demo environment          |
| `/about/`    | `about/`          | Company / product story          |
| `/contact/`  | `contact/`        | Verified contact channels        |

Directory indexes give clean URLs on any static host (Cloudflare Pages,
Netlify, nginx, Apache, `python -m http.server`).

## Serve locally

```
cd apps/marketing-website
python -m http.server 8080
# → http://127.0.0.1:8080/
```

## Notes

- **Language**: every page ships EN + AR copy (`data-en` / `data-ar`); the
  toggle in the navbar flips `dir`/`lang` site-wide and persists in
  `localStorage`. Direct link: any page + `?lang=ar`. Product mockups inside
  frames stay LTR by design, matching the real staff console.
- **Floating WhatsApp** (`.WhatsAppFloat`, all pages): green pill,
  bottom corner, mirrors in RTL. The `wa.me` link carries a prefilled
  message that follows the site language (set in `js/site.js`
  `updateWaFloat`).
- **Fonts**: Cairo is self-hosted (`fonts/`) as a variable font
  (wght 200–1000) — no Google Fonts request at runtime.
- **SEO**: per-page titles/descriptions, canonical URLs on
  `https://hymotionme.live`, Open Graph + Twitter cards with `/og-image.png`,
  `robots.txt`, `sitemap.xml`.
- **Deploy**: upload this folder to the web root of hymotionme.live.
  No server-side code, no redirects required.
- The historical design preview lives in `previews/hymotion-marketing-website/`
  and is kept for reference only — this folder is the maintained site.
