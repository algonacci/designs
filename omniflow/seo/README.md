# Omniflow OG Banner Generator

Generate branded Open Graph (og:image) banners for every page on omniflow.id.
96 banners (32 routes × 3 languages), each 1200×630, ~22 KB WebP.

```
designs/omniflow/seo/
├── data.toml          ← single source of truth, edit this to add/change banners
├── generate.ts        ← reads data.toml → writes HTML files into this dir
├── render.ts          ← opens 1 Playwright browser → screenshots all HTMLs → PNG
├── convert.ts         ← converts each PNG to WebP in Omniflow-id/public/og/
├── banner_*.html      ← generated, do not commit (gitignored)
└── README.md          ← this file
```

## Quick start

```bash
# 1. Add/edit entries in data.toml

# 2. Generate HTMLs from data
bun run designs/omniflow/seo/generate.ts

# 3. Render all HTMLs to PNG (1200x630, Playwright)
bun run designs/omniflow/seo/render.ts

# 4. Convert PNGs to WebP in Omniflow-id/public/og/
cd Omniflow-id
for f in ../designs/output/omniflow/seo/banner_*.png; do
  name=$(basename "$f" .png)
  npx sharp-cli -i "$f" -o "public/og/${name}.webp"
done
```

Or all at once:
```bash
cd designs
bun run omniflow/seo/generate.ts && \
bun run omniflow/seo/render.ts && \
cd ../Omniflow-id && \
for f in ../designs/output/omniflow/seo/banner_*.png; do
  name=$(basename "$f" .png)
  npx sharp-cli -i "$f" -o "public/og/${name}.webp"
done
```

## data.toml format

Each banner needs one `[banners.XXX]` section:

```toml
[banners.module-hris]
key       = "module-hris"       # unique id, also used as filename: banner_module-hris.html
page      = "HRIS"              # display name (page title in <title> tag)
headline  = "Smart Human Resource Information System"   # main headline (50px bold)
subtitle  = "Payroll, attendance, leave management..."  # smaller grey text below
accent    = "#3B82F6"           # hex color → accent gradient, badge border, radial glow
tag       = "Core ERP / HR"     # small pill badge between wordmark and headline
lang      = "en"                # optional, defaults to "en" — affects <html lang> only
url_path  = "en/modules/hris"   # shown as "omniflow.id/{url_path}" at bottom
```

### Naming convention

| Pattern                     | Example key          | Filename                             |
|-----------------------------|----------------------|--------------------------------------|
| Home page                   | `home-en`            | `banner_home-en.html`                |
| Static page (modules, blog) | `modules`            | `banner_modules.html`                |
| Module detail               | `module-hris`        | `banner_module-hris.html`            |
| Language variant            | `module-hris-id`     | `banner_module-hris-id.html`         |

## How SEOHead.tsx resolves banners at runtime

The mapping lives in `Omniflow-id/src/components/SEOHead.tsx` (`resolveOGImage` function):

```
/en                           → /og/banner_home-en.webp
/id                           → /og/banner_home-id.webp
/en/modules                   → /og/banner_modules-en.webp
/en/modules/hris              → /og/banner_module-hris-en.webp
/id/modules/accounting        → /og/banner_module-accounting-id.webp
/en/industries                → /og/banner_industries-en.webp
/en/blog                      → /og/banner_blog-en.webp
/en/contact                   → /og/banner_contact-en.webp
/en/affiliate                 → /og/banner_affiliate-en.webp
/en/blog/some-post            → /og/banner_blog-en.webp   (fallback, blog posts use explicit image)
```

If a route doesn't match any known static/module path, it falls back to `banner_home-{lang}.webp`.

## Adding a new route

Example: adding a "Careers" page:

1. **data.toml** — add three entries (en, id, zh):
   ```toml
   [banners.careers-en]
   key       = "careers-en"
   page      = "Careers"
   headline  = "Join the Omniflow Team"
   subtitle  = "Build the future of ERP with us."
   accent    = "#22C55E"
   tag       = "Careers"
   lang      = "en"
   url_path  = "en/careers"

   [banners.careers-id]
   # ... repeat for id and zh ...
   ```

2. **Regenerate + rerender + convert** (see Quick start above).

3. **SEOHead.tsx** — add to `STATIC_BANNER_KEYS`:
   ```ts
   const STATIC_BANNER_KEYS: Record<string, string> = {
     // ... existing ...
     careers: "careers",
   };
   ```

4. Done. Build + prerender to verify.

## Design notes

- **Dimensions**: 1200×630 px (OG standard)
- **Fonts**: Outfit (headings), Space Grotesk (badge + URL). Loaded from Google Fonts in the HTML template.
- **Colors**: Each banner gets an `accent` hex → auto-generates radial glow, badge border, headline gradient, and bottom accent line.
- **Layout** (top → bottom, all centered):
  - Logomark: 110×110 px, white polygon SVG (`viewBox="0 0 1000 1000"`)
  - Wordmark: 300 px wide, white path SVG (`viewBox="0 175 1000 140"` — cropped tight, no top whitespace)
  - Logomark → wordmark: `margin-top: -2px` (zero visible gap)
  - Badge pill: `margin-top: 24px`, `font-size: 14px`, Space Grotesk, uppercase, accent-colored border + bg
  - Headline: `margin-top: 10px`, `font-size: 50px`, `font-weight: 800`, accent gradient on key words
  - Subtitle: `margin-top: 8px`, `font-size: 23px`, `color: #94A3B8`
  - URL: `margin-top: 10px`, `font-size: 18px`, Space Grotesk, `color: #64748B`
  - Frame: `justify-content: center`, `padding: 56px 80px 60px`, `gap: 0` (all spacing via manual margins)
- **Background**: Dark navy gradient `#0A0F1A → #111827 → #151F32` with subtle grid overlay (56×56 px) and radial accent glows
- **Accent line**: 4 px gradient bar at the very bottom, fades from transparent → accent → transparent
- **Badge**: Space Grotesk monospace pill between wordmark and headline. The `tag` field in data.toml becomes the badge text.
- **Logo**: Inline SVG (white logomark polygon + cropped wordmark paths) — no external assets needed.
- **File size**: PNG → WebP at quality 85 via `sharp`. Each ~21 KB.
- **Total**: 96 banners, ~2 MB on disk.
- **Playwright**: 1 browser session, 4 concurrent pages. Renders all 96 in ~2-3 minutes.
