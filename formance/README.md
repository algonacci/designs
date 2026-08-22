# Formance Studio OG Banner

Open Graph banner for `Formance-Studio/studio` (Vite + React, live at
`formance-studio.syncloud.my.id`). Tokens come from
`studio/src/styles/marketing.css`; the headline and eyebrow are the landing
page's own copy.

```
designs/formance/
├── formance_og.html   ← the banner, 1200x630
└── README.md
```

The mark is `studio/public/logo.svg`, copied to
`designs/img/logo/formance-logo.svg`. Inter loads from Google Fonts at render
time, matching `--font-sans`.

The brand gradient (violet `#7c3cff` → indigo `#5747f5` → electric `#246bfe`)
is used as an accent only — on the two headline words the real `<h1>` also
gradients, the top hairline, and the Build button. The second-brain UI audit's
verdict is that Studio should read as a calm workshop, so the artefact carries
the emphasis and the chrome stays quiet.

## Render

From the repo root:

```bash
node render.mjs --width 1200 --height 630 --scale 2 --png formance/formance_og.html
```

Drop `--png` for a JPEG. Both land in `output/formance/`.

| Path | What it is |
|---|---|
| `output/formance/formance_og.png` | 2400x1260 PNG, lossless master |
| `output/formance/formance_og.jpg` | 2400x1260 JPEG, ~237 KB, the shippable `og:image` |

## Shipping it

Copy the JPEG to `studio/public/og.jpg` and point the tags at it in
`index.html`. Studio's `SEO.md` records the current tags and the domain
caveat: production is `formance-studio.syncloud.my.id`, while the PRD assumes
`studio.formance.com` and the sales mailto uses `formance.studio`. Whichever
wins, the canonical, the OG URL and this banner's footer have to agree.
