# AI Under the Hood — Identity Exploration

Series 002 for Algonacci. Eight directions, none selected.

```
designs/ai-under-the-hood/
├── index.html    ← the contact sheet, 2400×4664
├── styles.css
└── README.md     ← this document
```

Render from the repo root:

```bash
node render.mjs --width 2400 --height 4664 --scale 2 --png ai-under-the-hood/index.html
```

Output lands at `output/ai-under-the-hood/index.png` (4800×9328).

---

## The problem this study is answering

Systems at Scale already owns a visual language: near-black canvas, warm-white
type, lime for healthy/recovery, topology and routing as the storytelling
grammar, publication metadata in the corners. It works because infrastructure
genuinely *is* a graph of things connected to other things.

AI Under the Hood cannot borrow that. Its subject is not a graph of machines,
it is **arithmetic on representations**. Nothing in tokenisation, sampling, or
the residual stream is usefully drawn as a node with an edge coming out of it.
Reaching for topology here would produce the exact failure the brief names —
Systems at Scale with different text — and it would also be *wrong about the
subject*, which is worse.

So every direction below starts from a different question: what is the smallest
honest picture of this computation? The recurring principle is:

> Make invisible computation visible. Not robots, not brains, not networks of
> glowing dots — the arithmetic itself, drawn the way a laboratory would draw it.

### A note on the board itself

The Systems at Scale study is printed on warm paper with an ink grid. This one
is its inverse: near-black ground, warm-white type. That is not contrarianism.
The brief requires a signature colour that survives on black, and the series
will ship on black, so a study printed on any other substrate would be judging
the colour under conditions it will never meet. Same grid discipline, same
metadata rigour, opposite ground — the two boards should read as a matched pair
of volumes, not as one template used twice.

### Everything on the board is computed

The attention matrices, the Rule 110 field, the long tail, the context band and
the embedding scatter are all generated in the page from a seeded PRNG and the
real rules — not drawn by hand to look plausible. A board arguing for honesty
about computation should not fake its own diagrams. The seed is fixed, so two
renders are byte-identical.

The attention densities in particular follow the diagonal-plus-first-column
shape that real attention heads show (the well-documented *attention sink*)
rather than a prettier flat random field.

---

## Typography

| Role | Face | Why |
|---|---|---|
| Editorial / display | **Archivo** 700–800 | American grotesk, mechanically even, colder than Manrope's humanist warmth. A different rhythm from Systems at Scale, without leaving the family of serious editorial sans. |
| Notation / annotation | **IBM Plex Mono** 300–500 | Publication-scientific rather than developer-tooling. DM Mono belongs to the other series. |

The tension the brief asked for — computational notation against editorial
grotesk — is load-bearing rather than decorative. In directions 01, 04, 06 and
07 the typography is doing the explaining: the title is tokenised, or carries
probabilities, or sits inside an aperture with ghosted text outside it. Where
type does *not* explain anything, it stays quiet and structural.

---

## Colour

Five hypotheses are under test. **None is locked**, and no direction has been
tuned to make one win.

| | Value | Character | Used by |
|---|---|---|---|
| **H1 SODIUM** | `#FFA524` | Instrument amber. Sodium lamp, CRT, laboratory apparatus. | 01, 06 |
| **H2 SPECTRAL** | `#FF2D6F` | Magenta. Reads as measurement, not as brand. Nothing in AI marketing looks like this. | 02, 04 |
| **H3 AQUA** | `#35E3C4` | Oscilloscope green-cyan. Cool without touching AI blue. | 03, 07 |
| **H4 BIPOLAR** | `#FF4A2B` ↔ `#35E3C4` | A *relationship*, not a colour: warm is positive, cool is negative. | 05 |
| **H5 ACHROMATIC** | ink only | The control. If a direction survives with no accent at all, that is worth knowing. | 08 |

Deliberately absent: lime (Systems at Scale owns it as *healthy/recovery*), and
the blue-violet gradient that every AI product on earth is currently wearing.

H4 deserves particular attention. Attention weights, vector components and layer
deltas all have **sign**, and a two-pole pair encodes sign for free. That gives
the palette a semantic job rather than a decorative one, which is what the brief
asked for. It is also the riskiest, because two accents are harder to keep
disciplined across twenty episodes than one.

---

## The eight directions

### 01 — SEGMENTATION · `TEXT → ⟦ TOKENS ⟧` · H1 Sodium

**Philosophy.** Before a model can do anything, it destroys your text. The unit
it works in is not the word, and the boundaries are not where you would put
them. That violence is the first thing a viewer needs to understand, and it is
also completely invisible in every other explanation of AI.

**Visual grammar.** Unequal blocks in a row. Unequal is the whole idea — equal
blocks would be a grid, and a grid is a lie about how tokenisers work. Leading
space marked with a raised dot. Token IDs set beneath in mono, small, as index
rather than emphasis. The title is set the way a tokeniser would actually cut
it: `AI` `·UN` `DER` `·THE` `·HO` `OD`.

**Motion grammar.** *Cut.* One unbroken bar snaps into unequal segments left to
right, one cut per beat, no easing on the cut itself — a cut is instantaneous or
it is not a cut. IDs settle afterwards.

**Strengths.** The strongest typographic idea on the board; the title treatment
is unmistakably about the subject. The mark is dead simple and survives to 16px.
Episode-agnostic: any topic can be introduced with its own key term tokenised.

**Weaknesses.** Its diagram language is narrow. Segmentation explains
tokenisation and context length beautifully, and has very little to say about
sampling, embeddings, or emergence. There is a real risk of the identity
appearing to promise a series about tokenisers.

**Differentiation.** Systems at Scale has nothing horizontal, nothing
type-as-data, and nothing built on deliberate irregularity.

---

### 02 — WEIGHT FIELD · `WHO LOOKS AT WHOM` · H2 Spectral

**Philosophy.** Attention is usually drawn as a web of glowing nodes, which is
both a cliché and false — attention is a *matrix*, and its most important
property is a triangle: a token cannot attend to the future. Drawing the mask
rather than the web is more honest and, conveniently, has never been used as a
brand mark.

**Visual grammar.** Square grid, density as weight, causal mask as negative
space. Marginal bars for row sums. The one accent marks the active query row.
Empty cells are annotated as *masked*, not as *zero* — a distinction the
diagram must never blur.

**Motion grammar.** *Redistribute.* A query row lights and its weights move
under a hard constraint that the row still totals 1.00 — density leaves one cell
exactly as it arrives in another. Nothing fades in. The mask never animates,
because it is structure, not state.

**Strengths.** The triangle is the single most distinctive mark here; at 16px it
is unmistakable and unmistakably *not* another AI logo. Conservation of total
weight gives motion a rule to obey, which is rare and valuable. Scales
semantically: matrices can carry real per-episode data.

**Weaknesses.** Density fields are fragile at small sizes and in video
compression — a 14×14 grid of subtly different greys will band badly at
Instagram bitrates. Rows of near-equal cells can read as decorative texture
rather than data. It also risks becoming *the attention series* the way 01 risks
becoming *the tokeniser series*.

**Differentiation.** Complete. Systems at Scale has no field, no density, no
matrix.

---

### 03 — COORDINATE · `MEANING AS POSITION` · H3 Aqua

**Philosophy.** Embeddings are usually illustrated as glowing particle clouds,
which communicates *mystery*. The truth is the opposite: a vector is a
**measurement**, and meaning is a *distance you can print*. So: axes, ticks,
labelled clusters, a stated distance, and an explicit admission that 4096
dimensions have been thrown onto two.

**Visual grammar.** Instrument plot. Convex cluster outlines rather than blobs.
Vector from origin. `d = 0.31` printed on the connecting line. A standing
annotation that projection is lossy — the diagram declares its own limitation,
which is exactly the register a technical publication should have.

**Motion grammar.** *Project.* Points arrive as a vertical column of raw
numbers, then are thrown onto the plane. Axes draw first, points land, cluster
outlines close last. The camera never moves — only the data can.

**Strengths.** The most scientific-feeling direction; it looks like a paper
figure, which is a compliment. Honest about approximation. Highly reusable: any
episode with a comparison can be plotted.

**Weaknesses.** The crosshair mark is the weakest identifier on the board —
generic enough to belong to a data company, a mapping product, or an analytics
dashboard. Scatter plots are also the one thing here that *is* already in the
visual vocabulary of AI explainers.

**Differentiation.** Good, though "measured space" and "topology" are adjacent
enough that a careless episode could drift toward Systems at Scale's territory.

---

### 04 — LONG TAIL · `SAMPLE, NOT LOOK UP` · H2 Spectral

**Philosophy.** The single most misunderstood fact about these systems: the
output is drawn from a distribution, so the model can be asked the same question
twice and answer differently without anything being broken. The brief asked for
uncertainty to be made beautiful. The beauty is in the **tail** — the hundreds
of hairlines to the right, every one of them a thing that could have been said.

**Visual grammar.** Ranked bars, then the tail unrolled as ~176 hairlines,
annotated `AND 49 984 MORE`. Crucially the **third** candidate is marked as
sampled, not the first: sampling is not argmax, and an identity that quietly
implies otherwise is teaching the wrong thing on frame one. A temperature
triptych shows the same distribution at T = 0.2 / 0.8 / 1.5.

**Motion grammar.** *Sample.* Bars sort into rank, the tail unrolls, a cursor
walks the cumulative sum and stops inside a bar that is not the first.
Temperature is one continuous control, so it animates as one: tail rises and
head collapses together.

**Strengths.** The most emotionally legible direction — anyone who has used a
chatbot has felt this and never seen it drawn. The descending-step mark is
strong and tiny. Excellent editorial range: hallucination, evaluation,
temperature, determinism and creativity all live here.

**Weaknesses.** Bar charts are the most *familiar* form on the board; without
the tail it collapses into a generic analytics look. The mark is also the least
proprietary shape — descending bars are close to a signal-strength icon.

**Differentiation.** Systems at Scale uses bars for **capacity** (direction 04
of that study). This is the one genuine collision on the board, and it is not
trivial: two series in the same universe both leading with descending bars would
confuse the shelf. Resolvable — capacity bars grow, probability bars decay, and
the tail is unique to this one — but it must be resolved deliberately, not
assumed away.

---

### 05 — RESIDUAL STREAM · `ADD, DON'T REPLACE` · H4 Bipolar

**Philosophy.** The real architecture of a transformer is not a flowchart. It is
a single vector that is passed straight through, with each layer computing a
small delta and **adding** it. Nothing is replaced, and the dimension never
changes. Almost no popular explanation shows this, and it is the fact that makes
the rest of the architecture make sense.

**Visual grammar.** One continuous spine. Blocks branch off and rejoin. A
caliper annotation holds `d = 4096 · UNCHANGED` against the spine's constant
width. The bipolar accent pair encodes the *sign* of the delta: a layer may
subtract.

**Motion grammar.** *Add.* The delta detaches, travels the excursion, merges
back. The spine's weight grows by exactly the amount merged, never more. Layers
run in strict order and two excursions are never in flight at once, because in
the real thing they aren't.

**Strengths.** The most intellectually distinctive idea here — it teaches
something most viewers have never been told, in the mark itself. The vertical
spine is a genuinely unusual identity axis and works well in 9:16. Bipolar
colour has a real semantic job.

**Weaknesses.** The bypass mark is the hardest to read at 16px; at true size it
resolves to a vertical bar with a notch and loses most of its meaning. It is
also the least flexible diagram language on the board: the residual stream
explains transformer internals and has almost nothing to say about tokenisation,
RAG, agents, evaluation, or multimodality — which is more than half the stated
subject list.

**Differentiation.** Complete, and it is worth noting *why*: a spine with
excursions is the one structure here that a topology-minded designer would be
tempted to draw as a graph, and refusing to is what keeps it distinct.

---

### 06 — APERTURE · `INSIDE / OUTSIDE` · H1 Sodium

**Philosophy.** The context window is not a memory. It is a hole you look
through, and everything outside it still exists — it just isn't visible. The
design consequence is precise: **what falls outside must still be drawn.**
Cropping it would illustrate forgetting; showing it dimmed illustrates the truth,
which is that the information is there and the model simply cannot reach it.

**Visual grammar.** A very long tick band running off both edges. A bright
aperture with amber boundary rules. Inside: full height, warm white. Outside:
short, dim, still present. The title lockup does the same thing typographically
— real series text ghosted above and below, the title itself bracketed inside
the window.

**Motion grammar.** *Slide.* The band moves left through a fixed aperture.
Nothing fades: a token is full height on one side of the edge and dim on the
other, in a single frame. Eviction has to feel like a hard boundary, because
that is what it is.

**Strengths.** The best title lockup on the board — the bracketed window with
ghost text is immediately explanatory and would work as a permanent series
signature. Conceptually rich: context, memory, retrieval, RAG, KV cache and
long-context tradeoffs all live here naturally. The mark is legible small.

**Weaknesses.** Tick bands are visually monotonous over twenty episodes; without
variation the series could look like the same frame every week. The bracket is
also the most *appropriable* device here — brackets around a title are a common
editorial move, so the concept carries more weight than the form does.

**Differentiation.** Complete.

---

### 07 — FOUR STATES · `ONE WORD, FOUR FORMS` · H3 Aqua

**Philosophy.** The brief's seventh territory, taken literally but arranged as a
**Rosetta stone** rather than a pipeline. The same word exists simultaneously as
glyph, token ID, vector and distribution. The identity is the *correspondence*,
not the flow — which is why the mark is a 2×2 quadrant showing all four at once
rather than an arrow chain.

**Visual grammar.** Quadrant mark. A four-row transition table with the
operation named on each transition (`LOOKUP`, `EMBED`, `TRANSFORM · PROJECT ·
SOFTMAX`). One accent rail marks the current state.

**Motion grammar.** *Convert.* One row at a time takes the next form while the
previous stays on screen, so the chain accumulates instead of replacing itself.
The container never moves; the chain is the content.

**Strengths.** The 2×2 is the most robust small mark on the board — it is a
solid square at 16px and still carries a hint of its four parts. Conceptually it
is the *superset* direction: it can absorb tokenisation, embeddings and sampling
as special cases, which makes it unusually scalable across twenty-plus episodes.

**Weaknesses.** That same generality is the problem — a 2×2 square is close to a
generic app icon, and the quadrant says nothing specific until you are already
close enough to read it. The table layout is also the most conventional
composition here; it risks looking like documentation rather than editorial.

**Differentiation.** Good. No overlap with Systems at Scale, though the quadrant
is the one mark that could be mistaken for a different brand entirely.

---

### 08 — RULE COMPOUND · `SIMPLE → COMPLEX` · H5 Achromatic

**Philosophy.** Emergence is the hardest thing on the subject list to draw
without lying, because most illustrations of it simply assert that something
complicated appeared. The honest move is to **show the entire rule next to the
entire result** and let the viewer verify that nothing was added. Rule 110 is
the strongest available citation: eight cases, no randomness, and provably
Turing-complete. If that can compound into arbitrary computation, so can
matrix multiplication.

**Visual grammar.** A computed automaton field from a single seed. The complete
eight-case rule sits beside it as a legend. Achromatic by design — the argument
is that structure alone is enough, and this direction is the control that tests
whether the series needs an accent colour at all.

**Motion grammar.** *Iterate.* One generation per beat, top to bottom, constant
rate, no easing, no fade. The rule legend stays on screen unchanged the entire
time so the viewer can keep checking that nothing new is being introduced. That
verification **is** the idea.

**Strengths.** The most conceptually ambitious and the most editorial — it makes
an argument rather than an illustration. Visually it is the least like anything
else in AI branding by a wide margin. Endlessly generative: every episode can
seed a different field.

**Weaknesses.** It is the least *explanatory* of the day-to-day subjects — Rule
110 has nothing to say about tokenisation or sampling, so the identity would be
carrying a metaphor rather than a diagram language for most of the series. There
is also a real risk of it reading as generic "digital texture" or QR-code noise
at small sizes, and the mark is the weakest at 16px. Achromatic means giving up
semantic colour encoding entirely, which the brief specifically wants preserved.

**Differentiation.** Complete and total.

---

## Scalability across 20+ episodes

The question is whether the diagram language can carry a topic it was not
designed for. Scored against the brief's own subject list:

| # | Direction | Native topics | Reach | Verdict |
|---|---|---|---|---|
| 01 | Segmentation | tokenisation, context length, multilingual cost | 4–5 of 20 | narrow |
| 02 | Weight Field | attention, KV cache, MoE routing, context, multimodality | 9–11 of 20 | **broad** |
| 03 | Coordinate | embeddings, RAG, similarity, evaluation, clustering | 8–9 of 20 | broad |
| 04 | Long Tail | sampling, temperature, hallucination, evaluation, determinism | 8–10 of 20 | **broad** |
| 05 | Residual Stream | transformers, layers, parameters, quantisation, training | 6–7 of 20 | medium |
| 06 | Aperture | context, memory, RAG, KV cache, agents, long context | 8–9 of 20 | **broad** |
| 07 | Four States | almost anything, at the cost of specificity | 14+ of 20 | broad but thin |
| 08 | Rule Compound | emergence, scaling laws, training — metaphor elsewhere | 3–4 of 20 | narrow |

A useful pattern: the directions with the strongest *marks* (05, 08) have the
narrowest *diagram languages*, and the direction with the broadest reach (07)
has the least distinctive mark. Only 02, 04 and 06 score well on both — which is
also where the ranking lands.

---

## Strongest three

**1 · 06 APERTURE.** The only direction whose title lockup is already a finished
series signature. The bracketed window with real text ghosted outside it
explains the concept before a word of voice-over, works at every size, and is
equally strong on dark and light. Its diagram language reaches most of the
subject list, and its motion rule — hard edge, never a fade — is specific enough
to protect the identity from drifting into generic slide transitions. The
monotony risk is real but it is a production problem, not an identity problem.

**2 · 02 WEIGHT FIELD.** The best *mark*. A causal mask triangle is instantly
recognisable, is not currently in use by anything in this category, and is true
to the mechanism rather than decorative about it. The conservation constraint —
weight moves, never appears — gives motion a rule that will keep twenty episodes
coherent. The compression fragility of density fields is the one thing that
would need proving before commitment, and it should be tested at real Instagram
bitrates rather than argued about.

**3 · 04 LONG TAIL.** The strongest *teaching* direction and the one most likely
to make a viewer stop scrolling, because it draws a thing they have personally
experienced and never seen explained. Marking the third candidate as sampled is
the kind of correctness that earns a technical audience's trust in one frame.
Ranked third only because of the capacity-bar adjacency with Systems at Scale,
which is a genuine shelf-level risk rather than a theoretical one.

---

## Recommended for elimination

**08 RULE COMPOUND** — eliminate. It is the most beautiful idea on the board and
the wrong one for this job. It carries a metaphor rather than a diagram
language, so sixteen of twenty episodes would be drawn in a grammar that has
nothing to do with their content; the mark is the weakest at 16px; and going
achromatic surrenders the semantic colour encoding the brief explicitly wants to
keep. Worth preserving as a **single episode's** treatment for the emergence
topic — it would be outstanding there — but not as the series identity.

**03 COORDINATE** — eliminate on mark grounds. The thinking is sound and the
"projection is lossy" annotation is the most intellectually honest moment on the
board, but a crosshair with a plotted dot is not ownable. It would be a
reasonable *diagram language* to borrow into whichever direction wins; it is not
a viable identity on its own.

Directions 01, 05 and 07 should be kept in play. 01 has the best typographic
idea and could survive as a title treatment layered onto another direction's
diagram grammar; 05 teaches the most and deserves a second attempt at a mark
that reads below 24px; 07 is the safest and broadest, and is the right answer if
the series turns out to need one system for twenty very different topics more
than it needs a distinctive shape.

**No winner selected.**
