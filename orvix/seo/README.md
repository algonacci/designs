# Orvix.id OG Banner Generator

Branded Open Graph (`og:image`) banners for every route on orvix.id.
12 banners, 1200×630, ~28 KB WebP each.

Same pipeline as `designs/omniflow/seo`, retuned for the Orvix brand.

```
designs/orvix/seo/
├── data.toml       ← single source of truth, edit this
├── generate.ts     ← data.toml → banner_*.html in this dir
├── render.ts       ← 1 Playwright browser → screenshots every HTML to PNG
├── convert.ts      ← PNG → WebP in orvix-id/public/og/, plus og.jpg default
├── banner_*.html   ← generated, do not commit
└── README.md
```

## Quick start

```bash
cd designs
bun run orvix/seo/generate.ts && bun run orvix/seo/render.ts && bun run orvix/seo/convert.ts
```

`render.ts` and `convert.ts` skip files that already exist. Pass `--force` to
both after editing `data.toml`, otherwise you will keep shipping the old images:

```bash
cd designs
bun run orvix/seo/generate.ts && bun run orvix/seo/render.ts --force && bun run orvix/seo/convert.ts --force
```

Requires `playwright` (with chromium installed) and `sharp`, both in
`designs/package.json`. If chromium is missing: `bun run install-browsers`.

## Output

| Path | What it is |
|---|---|
| `designs/output/orvix/seo/banner_*.png` | intermediate, 1200×630 PNG |
| `orvix-id/public/og/banner_*.webp` | per-route banners, quality 88 |
| `orvix-id/public/og.jpg` | site-wide default, built from `banner_home` |

The default is JPEG on purpose — it is the fallback every scraper hits, and a
few still handle WebP badly. Per-route banners can safely be WebP.

## Banners → routes

| Key | Route |
|---|---|
| `home` | `/` |
| `services` | `/services` |
| `about` | `/about` |
| `contact` | `/contact` |
| `service-managed-cloud` | `/services/managed-cloud` |
| `service-cloud-migration` | `/services/cloud-migration` |
| `service-managed-hosting` | `/services/managed-hosting` |
| `service-devops-cicd` | `/services/devops-cicd` |
| `service-backup-disaster-recovery` | `/services/backup-disaster-recovery` |
| `service-monitoring-security` | `/services/monitoring-security` |
| `service-private-hybrid-cloud` | `/services/private-hybrid-cloud` |
| `service-ai-saas-infrastructure` | `/services/ai-saas-infrastructure` |

Service keys map 1:1 to the `slug` values in
`orvix-id/src/data/siteContent.tsx`. Adding a service there means adding a
`[banners.service-{slug}]` entry here.

**Not yet wired.** `orvix-id/index.html` still points at the single `/og.jpg`
for every page. Serving the per-route banners needs `og:image` set from Helmet
in each page component — deliberately left for the SEO pass.

## Adding a route

1. Add a `[banners.KEY]` section to `data.toml`.
2. Regenerate with `--force` (see Quick start).
3. Point the route's `og:image` at `/og/banner_KEY.webp`.

## Design notes

- **Canvas**: 1200×630, `linear-gradient(135deg,#070b14,#0b0e19,#121a2e)` with a
  56 px grid overlay masked out toward the bottom, plus two radial accent glows.
- **Fonts**: Plus Jakarta Sans (headline/subtitle), Syne (wordmark), JetBrains
  Mono (badge + URL) — from Google Fonts, matching the site's own stack.
- **Lockup**: logomark and wordmark sit side by side, as in the navbar, not
  stacked the way Omniflow does it. Logomark keeps its cyan→purple gradient
  bars rather than the flat white treatment.
- **Layout** (centered column): logo → badge (26 px) → headline (16 px, 50 px/800)
  → subtitle (14 px, 22 px) → URL (18 px, mono) → 4 px accent bar at the bottom.

### Accent colours — keep them cool

`accent` drives the glow, badge, headline gradient, and bottom bar. **Only use
hues inside the Orvix ramp** (cyan `#4de4ff` → blue `#5b8cff` → purple
`#9b72ff`, teal and indigo are fine too). Warm accents like amber were tried and
tint the entire canvas brown — the banner stops looking like Orvix at a glance.
`generate.ts` derives its second gradient stop only 26° away for the same reason.

### Headlines

Set `<grad>` and `<br>` by hand in `data.toml`. Auto-wrapping at 50 px reliably
strands a single word on the last line, which looks broken in a feed preview.
Two lines is the target; three overflows the safe area.

## The platform banner

`banner_platform` belongs to a different site — the app on
**platform.orvix.id**, which lives in `orvix-project/platform`. It is excluded
from the normal convert path and shipped separately:

```bash
cd designs
bun run orvix/seo/generate.ts
bun run orvix/seo/render.ts
bun run orvix/seo/convert.ts --platform --force
```

That writes a single `platform/public/og.jpg`. JPEG only, no WebP and no `og/`
directory: the compro can ship WebP because it also ships an og.jpg fallback,
and a one-banner site has nothing to fall back to.

**One banner is the right number.** Every platform route except `/login` sits
behind auth and redirects, so a scraper can only ever reach the sign-in page.
Per-route banners there would be rendered, shipped, and never requested.

The `domain` field in `data.toml` is what keeps the bottom URL line honest —
without it every banner claims `orvix.id`, including ones pointing elsewhere.
