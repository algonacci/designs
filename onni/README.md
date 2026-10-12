# ONNI

Homepage banners for the ONNI storefront (ECommerce-ONNI-v2).

## Sizes

| Variant | Size | Shown |
|---|---|---|
| Desktop | 1920×517 | viewport ≥ 1024px (the storefront crops to exactly this ratio) |
| Mobile | 1080×1080 | below 1024px (cropped 1:1) |

The homepage intro card overlaps the bottom of the carousel by 72 CSS px, so
keep copy, CTAs and photo tags above the bottom **140px** (desktop) and
**210px** (mobile) of the design. See `banners/styles.css`.

## Render

```bash
node render.mjs --width 1920 --height 517 --scale 1 --quality 90 onni/banners/*_desktop.html
node render.mjs --width 1080 --height 1080 --scale 1 --quality 90 onni/banners/*_mobile.html
```

Output lands in `output/onni/banners/`. Upload to the storefront bucket under
`banners/` and reference the keys from `db/seeders/data/banners.js`.

Palette and type follow the storefront (`public/scss/abstracts/_variables.scss`):
green `#284637`, cream `#F3EFE9`, olive `#9E915C`, earth `#826A3F`,
text `#2D261F`, Hanken Grotesk. Product photos in `img/` come from the ONNI
master product data.
