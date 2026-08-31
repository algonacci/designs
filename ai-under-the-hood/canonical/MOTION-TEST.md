# AI Under the Hood — Motion Test Brief

For the implementation repository. **Nothing here blocks canonicalisation** — the
static system is locked. This is what must be verified before motion itself is
locked.

The static mark is not to be redesigned. If a test below fails, the fix is a
motion or encoding change, not a new mark.

---

## Conditions

Every test runs at the real delivery conditions, not in a preview window:

| | |
|---|---|
| Resolution | 1080 × 1920 |
| Frame rate | 30 fps |
| Codec | H.264, the actual publishing bitrate |
| Review surface | **a phone at arm's length**, not a desktop monitor |

Second-brain already records the lesson that produced this rule: a render that is
technically correct is not necessarily legible on the screen where the video is
actually consumed.

---

## Test 1 — the mark at 16 px in motion

The corner bug is a 1px tick band at small sizes. Static reduction passes. Under
inter-frame compression, 1px alternating light and dark is close to the worst
case for a codec.

**Verify:** the bug stays a legible aperture and does not dissolve into a smear
or shimmer between keyframes.

**If it fails:** raise the in-frame bug from 44px, or increase the tick pitch at
small sizes. Do not thicken the aperture edge relative to the ticks — the ratio is
part of the mark.

---

## Test 2 — the aperture edge must not soften

The canonical rule is that the edge is hard: a token is full height on one side
and suppressed on the other, in a single frame.

**Verify:** during SCAN, no frame shows an intermediate height. Confirm frame by
frame, not by watching.

**Risk:** motion blur or a codec's temporal smoothing can manufacture a soft edge
that was never authored. That would teach the opposite of what a context window
does.

---

## Test 3 — attention REDISTRIBUTE holds Σ = 1.00

Weight moves from cell to cell; nothing appears or fades.

**Verify:** sample intermediate frames and sum the row. It must stay 1.00
throughout, not only at the endpoints.

---

## Test 4 — SAMPLE can land off the favourite

The cursor walks the cumulative sum and must be able to stop inside a bar that is
not the first. This is the single most important honest detail in the series.

**Verify:** the sampled bar is reachable and readable; the pause on it is long
enough to register at phone size.

---

## Test 5 — MAGNIFY leaves the true aperture alone

**Verify:** across the whole magnify sequence the true aperture never moves,
never grows, and never eases. Only the fan lines and the inset animate.

---

## Test 6 — density at phone size

Frames 03 (attention), 06 (probability) and 07 (temperature) are the dense ones.

**Verify:** at phone size, held for the duration the edit actually gives them,
each is readable without pausing. If a frame needs a pause, it is too dense and
should be split into beats per the pacing rule.

---

## Test 7 — colour survives the encode

**Verify:** sodium `#FFA524` and magenta `#FF2D6F` remain distinguishable after
encoding, and that magenta has not crept into more than one primary object per
frame during animation. Cyan must still read as a mark, never as an area.

---

## Test 8 — the 4:5 crop in the feed

**Verify:** on a real Instagram grid, not a mock. Content must sit inside
y = 300…1620 in every animated state, including transitional ones.

---

## Reporting back

Anything that fails should come back as a change to this brief or to
`IDENTITY.md`, with the failing frame attached. The static specification is
versioned; motion findings amend it rather than fork it.
