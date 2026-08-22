# Aurona OG Banner

Open Graph banner for `aurona-frontend` (the Vite + React SPA at
`aurona.syncloud.my.id`). Colors, type scale, radii and copy follow
`aurona-project/aurona-frontend/DESIGN_STYLE.md` and the landing page's
English locale strings.

```
designs/aurona/
├── aurona_og.html   ← the banner, 1200x630
└── README.md
```

The brand mark is the exported `public/aurona-logo.svg`, copied to
`designs/img/logo/aurona-logo.svg`. Do not redraw it in CSS. Manrope loads
from Google Fonts at render time and falls back to the system sans stack,
matching the app.

## Render

From the repo root:

```bash
node render.mjs --width 1200 --height 630 --scale 2 --png aurona/aurona_og.html
```

Drop `--png` for a JPEG (`--quality` defaults to 92). Both land in
`output/aurona/`.

| Path | What it is |
|---|---|
| `output/aurona/aurona_og.png` | 2400x1260 PNG, lossless master |
| `output/aurona/aurona_og.jpg` | 2400x1260 JPEG, ~250 KB, the shippable `og:image` |

## Shipping it

Copy the JPEG into `aurona-frontend/public/` and point the tags at it in
`index.html`:

```html
<meta property="og:image" content="https://aurona.syncloud.my.id/aurona-og.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
```
