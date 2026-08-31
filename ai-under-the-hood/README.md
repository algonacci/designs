# AI Under the Hood

Visual identity for Algonacci **Series 002** — an editorial series about what
actually happens inside a machine learning system.

> **Aperture shows what is visible.
> The diagram shows what is computed.**

```
ai-under-the-hood/
├── canonical/      ← THE SYSTEM. Start here.
│   ├── IDENTITY.md      the specification. If anything disagrees with it, it loses.
│   ├── MOTION-TEST.md   what must be verified before motion is locked
│   ├── tokens.css       design tokens
│   ├── system.css       identity layer + computational primitives
│   ├── frame-01…09.html canonical applications, 1080×1920
│   └── reference.html   canonical reference sheet
└── exploration/    ← eight directions, superseded, kept as record
    ├── EXPLORATION.md
    └── index.html · styles.css
```

Rendered output lives in `output/ai-under-the-hood/`.

## Render

From the repo root. Frames first — the reference sheet embeds them.

```bash
node render.mjs --width 1080 --height 1920 --scale 1 --png ai-under-the-hood/canonical/frame-0{1,2,3,4,5,6,7,8,9}.html
```

```bash
node render.mjs --width 2400 --height 6260 --scale 2 --png ai-under-the-hood/canonical/reference.html
```

The exploration board, if it is ever needed again:

```bash
node render.mjs --width 2400 --height 4664 --scale 2 --png ai-under-the-hood/exploration/index.html
```

## The short version

- **Signature colour:** sodium `#FFA524`, and it belongs to the aperture alone.
- **Mark:** an aperture tick-band — ticks passing through two sodium rules, full
  height inside, suppressed but still present outside.
- **Publication identifier:** `ALG / UNDER·HOOD / 001`, a sibling of
  `ALG / SYS·SCALE / 001`.
- **Every diagram is computed** from the real rules with a fixed seed. Ratios are
  never adjusted to make a picture read; when a true aperture is too small to
  see, it is magnified with the factor printed, not widened.
- **Not Systems at Scale.** That series draws routes between machines. This one
  draws numbers being reweighted.

Read `canonical/IDENTITY.md` before changing anything.
