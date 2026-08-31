# AI Under the Hood — Canonical Visual Identity

**Series 002, Algonacci. This is the system.**

Locked. Not a study, not a set of options. Where this document and any earlier
exploration or convergence material disagree, this document wins.

```
ai-under-the-hood/
├── exploration/          eight directions, superseded, kept as record
│   ├── index.html · styles.css · EXPLORATION.md
└── canonical/            THE SYSTEM
    ├── tokens.css        design tokens
    ├── system.css        identity + computational primitives
    ├── frame-01…09.html  canonical applications, 1080×1920
    ├── reference.html    canonical reference sheet
    ├── IDENTITY.md       this document
    └── MOTION-TEST.md    brief for the implementation repository
```

Render:

```bash
node render.mjs --width 1080 --height 1920 --scale 1 --png ai-under-the-hood/canonical/frame-0{1,2,3,4,5,6,7,8,9}.html
```

```bash
node render.mjs --width 2400 --height 6260 --scale 2 --png ai-under-the-hood/canonical/reference.html
```

Frames must be rendered before the reference sheet; the sheet embeds them.

---

## 1 · The canonical law

> **Aperture shows what is visible.
> The diagram shows what is computed.**

Everything else in this document follows from that sentence.

- The **aperture** lives at the boundary of visible computational context. It is
  always sodium.
- **Computational diagrams never take sodium as a primary data colour.**
- Where a concept depends on information being **hidden, masked, excluded or out
  of view**, that content stays represented. It is drawn suppressed, not cropped
  away.

The two layers occupy different territory and different colour, so they can
share a frame without competing for the same job. A diagram reaching for sodium,
or an aperture wandering into the middle of a matrix, has broken the system.

### The aperture must always mean something

The aperture is not a decorative rectangle and is not applied by habit. If
nothing in a frame is genuinely out of view, the frame carries **no aperture** —
series recognition is carried by the corner bug and the section marker instead.
Frame 05 is the canonical example of a frame that correctly declines the device.

Where the aperture does appear, this is what it brackets:

| Frame | Aperture marks | Outside it |
|---|---|---|
| 01 Identity | the title; the visible span of a token stream | the rest of the stream |
| 02 Tokenisation | the four tokens under examination | the rest of the prompt, drawn |
| 03 Attention | the columns this query may see | the masked future |
| 04 Representation A | 24 components of 4 096 | the other 4 072 |
| 05 Representation B | *(none — nothing is out of view)* | — |
| 06 Probability | the top-k cutoff, magnified | 50 249 remaining candidates |
| 07 Temperature | the smallest set holding 90% of the mass | the rest of the distribution |
| 08 Residual | layers 12–16 | the other 91 layers |
| 09 Editorial | the last word of the statement | the sentence around it |

---

## 2 · Design tokens

Canonical values live in `tokens.css`. Nothing in a frame may hardcode a colour
or a size that exists there.

### Ground and ink

| Token | Value | Use |
|---|---|---|
| `--ground` | `#0A0A0D` | frame background. Not pure black — pure black clips in video encodes and kills the hairline structure the diagrams depend on |
| `--ground-raised` | `#101016` | panels, inset frames |
| `--ink` | `#F2EFE9` | primary information. Shared with Systems at Scale on purpose: one publication, one paper colour |
| `--ink-2` | `#A8A69F` | secondary reading |
| `--ink-3` | `#6E6C73` | annotation |
| `--ink-4` | `#3E3E48` | structure, ticks, suppressed content |
| `--hairline` | `#22232C` | grid, cell edges, table rules |

### Stroke — three weights only

| Token | Value | Use |
|---|---|---|
| `--w-hair` | `1px` | structure: grids, axes, cell edges, fan lines |
| `--w-mark` | `2px` | data: bars, plotted marks, join nodes |
| `--w-edge` | `4px` | **the aperture edge, and nothing else** |

A fourth weight makes diagrams look accidental.

### Space

12px base (`--u`). Every gap is a multiple. Frame margin is 7 units (84px).

---

## 3 · Colour semantics

**Locked.** One signature, two semantics, two non-colour encodings.

| Token | Value | Meaning | Discipline |
|---|---|---|---|
| `--sodium` | **`#FFA524`** | aperture · in-view boundary · series signature | aperture edges, section marker, in-view labels. **Never on any datum.** |
| `--selected` | **`#FF2D6F`** | selected or sampled | **maximum one primary selected object per frame** |
| `--negative` | **`#35E3C4`** | sign · axis · direction | **marks, never fills an area** |
| `--ink` | `#F2EFE9` | primary information | the default; most of every frame |
| `--ink-4` | `#3E3E48` | suppressed: cut, outside, inactive | value, not hue |
| — | hatch | uncertain | texture, never hue |
| — | absence | masked / structurally impossible | outline only, **never filled**, not even very dark |

**No additional decorative brand colours.** Ever.

### Sodium and Systems at Scale's amber

Systems at Scale uses amber for **degraded / rerouting** — a *system state*.
AI Under the Hood uses sodium for **aperture / in-view boundary** — a *spatial
boundary*. The two are separated by grammar and usage, and that separation is
deliberate and sufficient. Sodium is not changed on account of the adjacency.

Lime remains the property of Systems at Scale and never appears in this series.

### Encoding rules

- **Sign is encoded by side of axis first, colour second.** Positive above,
  negative below. Cyan then marks the axis and caps the negative bars.
- **Suppression is encoded by value, never by hue.**
- **Masking is encoded by absence.** A masked cell is outlined and left empty. It
  is never filled with a dark grey, because "very little attention" and "cannot
  attend at all" are different facts and must not look similar.

### Violations found and corrected during finalisation

Recorded so they are not reintroduced:

1. Cyan filled every negative vector component — roughly half the vector went
   turquoise and cyan stopped being a semantic. **Cyan marks, it never fills.**
2. Sodium marked the leading-space dot in token boxes. A whitespace marker is
   notation, not an aperture. Moved to ink.
3. Magenta marked every subword-continuation token. Continuation is a structural
   fact, not a selection. Moved to a dashed underline.
4. The query column index was sodium while the query row was magenta — two
   colours for one object. Unified to magenta.
5. The temperature value `T = 0.8` was set in sodium. A temperature is not an
   aperture concept. Moved to ink.
6. Frame 02's aperture bracketed two tokens for no stated reason. Rebuilt so it
   marks the span under examination inside a longer prompt, with the surrounding
   tokens drawn and suppressed.

---

## 4 · Typography hierarchy

| Role | Face | Size @1080 | Tracking |
|---|---|---|---|
| Statement | Archivo 700 | 108 | −0.055em |
| Series title | Archivo 700 | 92 | −0.055em |
| Frame heading | Archivo 700 | 40 | −0.03em |
| Lead body | Archivo 400 | 30 | — |
| Data value | IBM Plex Mono 400 | 26 | 0.04em, tabular |
| Annotation | IBM Plex Mono 400 | 20 | 0.1em |
| Micro / identifier | IBM Plex Mono 400 | 16 | 0.14em |

**The split is a rule, not a preference: if a value came out of a computation, it
is set in mono.** Editorial voice is Archivo and never carries machine output.
Probabilities to three decimals, token IDs as integers, logits to two.

---

## 5 · Aperture specification

| Property | Value |
|---|---|
| Construction | two vertical rules, **open top and bottom** |
| Never | a closed rectangle |
| Edge weight | `--w-edge` 4px at 1080, scaling with the mark |
| Edge colour | `--sodium`, always |
| Edge quality | hard. Never dashed, never softened, never crossfaded |
| Placement | **measured from the rendered content**, never hardcoded |
| Trailing edge | may use `--sodium-dim` where the loss side needs de-emphasis; still hard |

A sequence has no vertical extent, so a closed box would be a lie about what the
device constrains. The edge is hard because eviction is hard; a fading edge
teaches the opposite of what a context window does.

Every frame computes its aperture position from the measured geometry of the
diagram it brackets, so the edges cannot drift off the tokens they name.

---

## 6 · Series mark specification

The **aperture tick-band**: a field of ticks passing through two sodium aperture
rules.

| Property | Value |
|---|---|
| Inside the aperture | full height, warm white |
| Outside the aperture | shorter, suppressed, **still present** |
| Outside : inside ratio | ≈ 0.36 |
| Edge weight | scales with the mark; 1px at 16px, 4px at 96px |
| Minimum size | **16px** |
| Corner bug | 44px, top right, on the header baseline |
| Monochrome | edges go to ink; in-ticks drop to `--ink-2`; separation by value |
| On paper | edges and in-ticks go to `--paper-ink`; outside to `--paper-rule` |

**The causal triangle is not the series mark** and must not be used as one. It
remains a diagram primitive for attention only.

---

## 7 · Publication identifier

```
ALG / UNDER·HOOD / 001
```

A sibling of, not a clone of, `ALG / SYS·SCALE / 001`.

| Property | Value |
|---|---|
| Structure | `ALG / {SERIES} / {EPISODE}` |
| Series token | middle dot, never a hyphen |
| Episode | three digits, zero padded |
| Placement | footer left, on the single footer baseline |
| Size | 16px mono, 0.14em tracking |

It is metadata, not a third logo. It never merges with the mark into a combined
badge.

---

## 8 · Computational diagram grammar

Nine primitives. Each traceable to an exploration direction, all obeying the same
four syntax rules.

| Primitive | Origin | Purpose |
|---|---|---|
| `.aperture` | 06 | boundary of visible context |
| `.mark` `.band` | 06 | series mark; long sequence at sequence scale |
| `.seq` `.tok` | 01 | tokens, IDs, boundaries, subword continuation |
| `.mx` `.rowsum` | 02 | attention, weights, causal mask, normalisation |
| `.plot` `.hull` `.vfield` | 03 | latent space, clusters, distance, signed vectors |
| `.dist` `.tail` `.zoom` | 04 | logits, probability, sampling, top-k, temperature |
| `.macro` `.fan` `.inset` | new | magnification of an extreme ratio |
| `.stream` `.join` | 05 | residual layers, deltas |
| `.states` | 07 | representation forms |

### What unifies them

1. **Annotation syntax** — hairline leader running *toward* its subject, 8px
   terminal square where a colour key is needed, mono uppercase, 0.1em tracking.
2. **Numeric notation** — machine output is always mono and tabular.
3. **Three stroke weights** — and 4px belongs to the aperture alone.
4. **12px spacing base** — everywhere.

### Mathematical honesty

- Attention density follows the diagonal-plus-first-column shape real heads show
  (the documented attention sink), not a flat random field.
- Temperature panels are a real softmax over one shared logit vector.
- The 90%-mass aperture in frame 07 is computed, so its widening is evidence.
- Rule fields, tails, bands and scatters are all generated from a fixed seed, so
  two renders are byte-identical.
- **Ratios are never adjusted to make a picture read.** See §10.

---

## 9 · Annotation grammar

```
.note.up      leader rises from the label to the subject above
.note.down    leader drops from the label to the subject below
.note.left    leader runs left from the label
.note.right   leader runs right from the label
```

- Leader: 1px, `--ink-4`, length set per instance via `--len`.
- Label: mono, uppercase, `--ink-3`; `<b>` promotes to `--ink` for the load-bearing
  clause; `<em>` promotes to `--sodium` **only when the clause is about what is in
  view**.
- `.sq` — an 8px square in the colour being keyed, when a colour needs naming.
- `.readout` — `KEY value` pairs for machine state, mono tabular.

Annotations state the fact that a viewer would otherwise get wrong. "Empty is not
zero. It is the future, masked out." is the model for the register.

---

## 10 · Magnification / inset primitive

**Canonical. Never distort a computational ratio merely to make the aperture
visible.**

When the mathematically correct aperture is too small to communicate:

```
MACRO FIELD                the whole population, drawn honestly
    ▌▐                     TRUE APERTURE, geometrically correct, never widened
   ╱  ╲                    fan lines, hairline, ink-4
▌ ────────── ▐             MAGNIFIED VIEW, ×N printed
```

Rules:

1. The **true aperture keeps its correct width**. It is never widened.
2. If the true width falls below the rendering floor, it is drawn at 1px and the
   annotation **says so** — frame 06 prints *"0.13 px wide — drawn at the 1 px
   rendering floor."*
3. **Fan lines are structure**: 1px `--ink-4`. Never sodium — sodium belongs to
   the two edges the fan connects.
4. The magnified view **is itself an aperture** at another scale: the same two
   sodium rules, open top and bottom.
5. The **magnification factor is always printed** (`--mag-factor`, sodium).

Canonical application: frame 06, top-k = 8 of 50 257, magnified ×6 300.

---

## 11 · Representation density and pacing

**Do not force text → token → vector → projection into one dense frame.**
Representation transitions are separate beats.

| Beat | Content | Frame |
|---|---|---|
| **A** | human representation → tokenised → vector | 04 |
| **B** | vector → projection → spatial relationship | 05 |

Beat B opens with a reduced echo of Beat A's vector, drawn from the same seed in
the same order, so the two beats visibly describe the same object. Continuity is
carried by the artefact, not by a caption.

General rule: **one frame answers one question.** A frame that needs two headings
is two frames.

---

## 12 · Motion grammar

Motion is computational behaviour. No fades, no slides for their own sake, no
floating, no parallax.

| Verb | Belongs to | Behaviour | Constraint |
|---|---|---|---|
| **OPEN / CLOSE** | aperture | edges travel to position | never soften |
| **SCAN / SLIDE** | context | band moves through a fixed aperture | full height one side of the edge, dim the other, in one frame |
| **CUT** | tokenisation | a bar snaps into unequal segments | no easing on the cut; IDs settle after |
| **REDISTRIBUTE** | attention | weights move between cells | row total stays 1.00; the mask never animates |
| **PROJECT** | embeddings | points fall onto the plane | axes first, points land, hulls close last; camera never moves |
| **RESOLVE** | vectors | components rise from the axis | sign is visible from the first frame |
| **SAMPLE** | logits | cursor walks the cumulative sum | must be able to stop inside a bar that is not the first |
| **RESHAPE** | temperature | one continuous control | head and tail move together |
| **MAGNIFY** | inset | fan lines draw, then the inset resolves | the true aperture never moves or grows |
| **ADD** | residual | delta detaches, travels, merges | spine grows by exactly the merged amount; one excursion at a time |
| **CONVERT** | states | a row takes the next form | the previous row stays; the chain accumulates |

The aperture's own motion is the series' signature behaviour: **open** on the
title, **scan** during explanation, **close** on the conclusion.

See `MOTION-TEST.md` for what must be verified before motion is locked.

---

## 13 · Thumbnail and small-size rules

- **Content is vertically centred** in the frame body so the Instagram 4:5 crop
  cannot take it. Systems at Scale lost frames to this; the rule is inherited.
- Safe band: keep everything essential between **y = 300 and y = 1620**.
- Mark minimum: **16px**. Below that the tick band closes up and reads as a smear.
- The corner bug is 44px in-frame.
- **A frame must survive without its title.** Tested: a bare attention matrix
  with an aperture and no wordmark still reads as this series.

---

## 14 · Dark and light usage

**Dark is canonical.** The series ships on `--ground`.

Light application is permitted for print, documentation and partner contexts:

- ground → `--paper` `#F2EFE9`
- ink → `--paper-ink` `#101016`
- aperture edges → `--paper-ink` (`.aperture.on-paper`)
- mark → `.mark.on-paper`; outside ticks to `--paper-rule`

**Monochrome** must survive with no colour at all. In monochrome the aperture
edge goes to full ink and the in-view ticks drop to `--ink-2`, so the edge and
the content are separated by value rather than hue.

---

## 15 · Relationship to the Algonacci publication family

Shared with Systems at Scale, deliberately:

- warm-white ink on near-black
- publication identifier in the corner, same structure
- mono annotation with hairline leaders
- one header baseline, one footer baseline per frame
- a refusal to draw anything the underlying system does not actually do
- study material labelled as study material, never as finished artwork

These are what make the two read as volumes of one publication.

---

## 16 · Differentiation from Systems at Scale

| Dimension | Systems at Scale | AI Under the Hood |
|---|---|---|
| Subject | topology · routing · infrastructure · flow · system state | representation · selection · weight · probability · transformation · context |
| Primary object | a graph of machines connected to machines | a field of numbers being reweighted |
| Signature device | fault planes — offset layers with an extension | aperture — two rules bracketing a sequence that continues past them |
| Signature colour | lime · healthy / recovery | sodium · aperture / in-view boundary |
| Amber | degraded / rerouting — a system state | not used as a state; sodium is a boundary, not a condition |
| Colour logic | state of a system | role in a computation |
| Type pair | Manrope + DM Mono | Archivo + IBM Plex Mono |
| Motion | traffic moves along a route; a node fails; traffic reroutes | weight redistributes under a constraint; a window slides; a cursor samples |

**The test:** *if a frame could be moved into Systems at Scale by changing lime to
another colour, the convergence has failed.* No frame in this system survives that
move. There is no route, no node, no queue and no failover anywhere in it.

---

## 17 · Primitive inventory for the Remotion implementation

| Primitive | Purpose | Motion verb | Notes for implementation |
|---|---|---|---|
| `aperture` | boundary of visible context | OPEN · CLOSE · SCAN | position from measured geometry; two rules, open top and bottom |
| `mark` | series identifier | OPEN | 16px floor; mono and paper variants |
| `band` | long sequence at sequence scale | SLIDE | tick state flips in one frame at the edge |
| `seq` · `tok` | tokens, IDs, boundaries | CUT | unequal widths come from the glyphs; continuation is a dashed underline |
| `mx` · `rowsum` | attention, causal mask | REDISTRIBUTE | masked cells outlined, never filled; row sum invariant |
| `plot` · `hull` | latent space, distance | PROJECT | camera fixed; hulls close last |
| `vfield` | signed vector | RESOLVE | bars from a centre axis; cyan axis and caps only |
| `dist` · `zoom` | ranked candidates | SAMPLE · RESHAPE | sampled ≠ argmax must be expressible |
| `macro` · `fan` · `inset` | extreme-ratio magnification | MAGNIFY | true aperture immovable; factor printed |
| `stream` · `join` | residual layers | ADD | horizontal; spine width constant |
| `states` | representation forms | CONVERT | rows accumulate, never replace |
| `note` · `readout` | annotation, machine values | SETTLE | leader toward subject; mono tabular |

All primitives are seeded and deterministic. Port the seeded PRNG with them.

---

## 18 · Ghost context

Ghost context — real text drawn outside the aperture, suppressed — is a
**secondary device**. It must carry conceptual meaning: outside context, masked,
unselected, suppressed, or unavailable.

**It is never used to fill empty space.** A frame with nothing genuinely outside
its aperture carries no ghost text.

---

## 19 · Open items — not blocking

These are recorded for the implementation phase, and none of them blocks
canonicalisation:

1. **Motion under compression.** The 16px mark passes static reduction. It has not
   been tested at 30fps under H.264 at phone size. See `MOTION-TEST.md`.
2. **Aperture fatigue across a season.** Eight frames cannot answer whether the
   device becomes wallpaper by episode twenty. Review after the first ten
   thumbnails exist as a set.
3. **Ghost context production cost.** Real neighbouring-episode text is the honest
   choice and it means every episode needs its neighbours' titles.
