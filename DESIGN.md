# Outskill V2 — design system

The homepage (`src/pages/index.astro`) is the reference implementation. Every
other page composes the same primitives. If a page needs something this file
does not describe, add it here first.

---

## 1. Principles

1. **Commitment before name.** Every program surface reads TIME → COST →
   OUTCOME, then the program name in small muted text. Customers shop for a
   weekend they can spare and a result they want, not for the word
   "Fellowship". `LadderCard.astro` encodes this order; do not reorder it.
2. **Outcome, not syllabus.** Headlines describe what someone walks away with
   ("Ship three working agent demos by Sunday night"), never a list of
   technologies. Tool names belong in supporting bullets.
3. **Mobile is the design, desktop is the enhancement.** Everything was drawn
   at 390px first. Desktop rules live in `md:` and up.
4. **No hype words.** No "transform", "master", "10x", "revolutionary". Plain
   sentences, concrete numbers.
5. **Never invent a fact.** Prices, dates, and counts come from
   `src/data/*.ts`. No fabricated testimonials — the outcomes section states
   what the programs produce, attributed to the program, not to a person.

---

## 2. Tokens (`src/styles/global.css`, `@theme`)

Tailwind v4 exposes `@theme` entries as `--color-*`, `--font-*`, `--radius-*`
and generates utilities from them (`bg-bg`, `text-muted`, `border-line`,
`font-display`). Bare aliases (`--bg`, `--accent`, `--paper`, …) are
re-declared on `:root` **only** so inline `style=""` strings resolve. If you
use a variable in an inline style, confirm it exists — a bad variable makes the
browser drop the whole declaration (this is how V1 lost its hero images).

### Ground
| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0A0A0A` | page ground |
| `--color-bg-deep` | `#050505` | inset strips (trust strip) |
| `--color-surface` | `#131313` | cards |
| `--color-surface-2` | `#1B1B1B` | card hover, menu rows |
| `--color-line` | `#292929` | hairlines, card borders |
| `--color-line-strong` | `#3A3A3A` | ghost buttons, vertical rules |

### Ink
| Token | Value | Contrast on bg | Use |
|---|---|---|---|
| `--color-fg` | `#F4F2ED` | 17.5:1 | body and headings (warm off-white) |
| `--color-muted` | `#A6A29A` | 7.4:1 | secondary copy, labels |
| `--color-faint` | `#6F6C66` | 3.4:1 | **decorative only** — struck-through prices, program names in a card footer. Never a whole sentence. |

### Accent
`--color-accent #B8EF43` / `--color-accent-hover #C9F565` /
`--color-accent-ink #0A0A0A` (text on lime) / `--color-accent-dim #2C3A14`
(15% accent fill for selected states and featured cards).

Accent is a **destination marker**: prices you pay, primary buttons, active
selections, the logo dot. It is not a decorative colour — if more than about
5% of a viewport is lime, cut something.

### Paper (inverted)
`--color-paper #F2EFE9`, `--color-paper-ink #121110`,
`--color-paper-muted #57534C`, `--color-paper-line #DCD7CC`. Used once per page
at most, to break a long dark scroll. On the homepage that is the newsletter
block. `Section tone="paper"` switches a whole section.

### Radii
`--radius-sm 4px` (logo chips) · `--radius-md 8px` (buttons, inputs) ·
`--radius-lg 12px` (cards) · `--radius-xl 16px`.

---

## 3. Type

Self-hosted Fira only. `src/styles/fonts.css` is imported by `Base.astro`
before `global.css`. Only `FiraSans-Regular.woff2` and
`FiraSansCondensed-Bold.woff2` are preloaded. There are no Google Fonts
requests anywhere.

- **Fira Sans** — everything by default.
- **Fira Sans Condensed Bold** — display sizes only (`.display-*`). Never below
  1.75rem.
- **Fira Code** — `.num`, for stat metrics and numerals on engineering
  surfaces. Used sparingly; the hero stats deliberately use Condensed instead
  because `4.9/5` reads badly in a monospace.

### Base size
`html { font-size: 15px }`, `@media (min-width: 768px) { 16px }`. Every size in
`rem`. This is the implementation of "14–15px mobile, 16px desktop".

### Scale
| Class | Mobile | ≥768 | ≥1280 | Face |
|---|---|---|---|---|
| `.display-xl` | 2.75rem (41px) | 4rem | 4.75rem | Condensed Bold |
| `.display-lg` | 2.25rem (34px) | 3.25rem | — | Condensed Bold |
| `.display-md` | 1.75rem (26px) | 2.25rem | — | Condensed Bold |
| `.heading-sm` | 1.25rem | — | — | Sans 600 |
| `.heading-xs` | 1.0625rem | — | — | Sans 600 |
| body | 1rem / 1.6 | — | — | Sans 400 |
| `.lead` | 1.125rem | 1.25rem | — | Sans 400, muted |
| `.label` / `.eyebrow` | 0.8125rem uppercase 600 | — | — | Sans |

### The letter-spacing rule (hard requirement)
**No `letter-spacing` on anything that can render at ≤ 25px.** Tracking exists
in exactly three rules — `.display-xl`, `.display-lg`, `.display-md` — each of
which is ≥ 1.75rem, i.e. ≥ 26.25px even at the 15px mobile base. Uppercase
labels get **no** tracking; weight and colour do that work instead.

Audit with `grep -rn "tracking-\|letter-spacing" src/`. Every hit must be one
of those three rules. One known violation remains outside my ownership:
`src/components/islands/CurriculumExplorer.tsx` uses `tracking-wide` at
`0.65rem` — whoever restyles the Fellowship page must remove it.

---

## 4. Spacing & layout

- `.wrap` — `max-width: 75rem`, `padding-inline: 1.25rem` (2rem ≥768). The one
  container. `.wrap-narrow` (48rem) for prose-only pages.
- Section rhythm: `py-14` mobile / `py-24` desktop (`Section.astro`).
- Header-to-content gap inside a section: `mt-9` / `mt-12`.
- Card padding: `p-5` mobile / `p-7` desktop (`p-4`/`p-5` for dense cards).
- Grid gaps: `gap-4` mobile, `gap-5`–`gap-6` desktop.
- Sections are separated by a single hairline (`<Section rule />`), not by
  alternating background colours. Use at most one tone change per page.

---

## 5. Components

All in `src/components/`.

| Component | Purpose |
|---|---|
| `Section.astro` | Section shell. Props: `eyebrow`, `title`, `lead`, `id`, `tone` (`dark`\|`surface`\|`paper`), `rule`. |
| `InfoBlocks.astro` | The Start date / Start time / Duration / Format blocks. `variant="grid"` (mobile, 2-up) or `variant="row"` (desktop, with a leading vertical rule beside a CTA). |
| `LadderCard.astro` | A value-ladder rung. Fixed reading order. `featured` tints free rungs. |
| `PathSplit.astro` | The two big Coders / Vibe Coders cards. |
| `TrustStrip.astro` | Tool logo chips + the investor line. |
| `Newsletter.astro` | Paper-toned signup. |
| `FAQ.astro` | `<details>` list, no JS. |
| `Stat.astro` | One metric. `size="lg"` for stat rows, `"sm"` in cards. |
| `CTA.astro` | Full-width closing CTA; accepts optional `info` blocks. |
| `StickyCTA.astro` | Persistent CTA. Mobile fixed bottom bar; hidden ≥768 because the header button carries it. Renders its own in-flow spacer so it never covers the footer. |
| `StickyBar.astro` | Deprecated shim mapping a `Program` to `StickyCTA`. Kept only so the un-restyled program pages build. New pages use `StickyCTA` directly. |
| `Nav.astro` | Logo left; For Businesses / Newsletter / **Explore Courses** menu; one primary CTA right. The menu is built from `ladder.ts` and lists time × cost × outcome, never bare names. Accepts a `cta` override. |
| `islands/PathChooser.tsx` | Two-question coders-vs-vibe fallback. `client:visible`. |
| `islands/NextSession.tsx` | Recomputes the next workshop date on mount so a prerendered build never shows a past date. `client:visible`. |

### Buttons
`.btn` + one of `.btn-accent` (primary), `.btn-ghost` (secondary),
`.btn-paper` (on paper sections). `.btn-sm` for nav and card footers,
`.btn-block` for full-width mobile. One accent button per view section.

**Apply-only rungs get a ghost button, not lime.** Applying is not buying; the
visual weight should say so.

### Cards
`.card` (surface + line + 12px radius); add `.card-hover` when the whole card
is a link. Interactive cards are `<a>` wrapping the content, not a `<div>` with
a JS handler.

---

## 6. The hero pattern

Retained from outskill.com and improved. Every page hero uses it.

```
full-bleed art layer (z -2)
scrim layer (z -1)
.grain overlay (::after, CSS noise, 20% overlay)
content:
  eyebrow
  h1.display-xl
  subhead (max 30rem)
  mobile:  InfoBlocks grid  →  full-width accent button  →  ghost button
  desktop: accent button | vertical rule | InfoBlocks row  →  text link
  hairline
  stats row (3 metrics, Condensed)
```

**Art loading, with fallbacks.** Never let a missing image break the page:

```css
.hero-art {
  background-image: url('/gen/v2/home-m.webp'),   /* mobile crop */
                    url('/gen/v2/home.webp'),     /* desktop art */
                    url('/gen/hero-hub.webp');    /* V1 fallback */
}
```
A layer that 404s is simply transparent, so the next one shows through. Swap
the first two per page (`coders`, `vibe`, `workshop`, `mastermind`,
`bootcamp`, `accelerator`, `fellowship` all exist in `public/gen/v2/`).

**Scrim.** The V2 artwork is dark-left / subject-right, so desktop uses a
horizontal gradient (opaque at 0%, clear by 100%) plus a light vertical one.
Mobile crops to `62% 38%` and uses a stronger diagonal + vertical scrim,
because the lime slab sits right where the subhead lands. Check any new hero
at 390px before shipping it: muted text over the lime slab fails AA fast.

---

## 7. Card patterns

**Ladder card** — `Step N` label · **TIME** (`display-md`) · format line ·
price block right-aligned (list struck in `faint`, current in accent `.num`) ·
price note · **OUTCOME** sentence at 1.0625rem in `fg` · up to 3 proof bullets
in muted · footer rule · program name (`faint`, small) + CTA kind + button.

**Path card** — accent hairline across the top, kicker label, `display-md`
title, body, three bullets, arrow link. Whole card is the link.

**Workshop card** — tool name + audience tag right, outcome line, arrow CTA.

**Outcome card** — big accent `.num` metric, `heading-sm` title, body. Metrics
are program facts ("3 demos", "1 agent"), never invented quotes.

---

## 8. How other pages should compose

```astro
<Base title=… description=… image="/gen/v2/<page>.webp" cta={{label, href}}>
  <hero>                      <!-- section 6 pattern, page's own art -->
  <TrustStrip />              <!-- optional -->
  <Section eyebrow title lead>…</Section>
  …
  <Section rule eyebrow="FAQ" title="Straight answers."><FAQ items={…} /></Section>
  <CTA … />
  <StickyCTA label price listPrice ctaLabel ctaHref />
</Base>
```

- `Base` takes an optional `cta` that overrides the header button for that
  page — a program page should point it at its own registration anchor.
- `StickyCTA` goes last, inside `Base`. It brings its own spacer.
- Program pages lead with time/cost/outcome in the hero info blocks, exactly
  like the homepage.
- `/coders` may use `.num` and denser grids; `/vibe-coders` should not — same
  tokens, different density.

---

## 9. Data

- `src/data/ladder.ts` — the value ladder, the single source of truth for the
  homepage and the Explore Courses menu. `rung`, `time`, `format`, `price
  {list, current, note}`, `outcome`, `proof`, `cta {label, href, kind}`.
- `src/data/workshops.ts` — the five free variants, plus
  `nextWorkshopSession()` / `formatIST()`. IST maths is done in UTC and shifted
  by +05:30 so the build machine's timezone is irrelevant.
- `src/data/site.ts` — nav, footer, hero copy, paths, outcomes, homepage FAQ.
- `src/data/types.ts` — V1 `Program` untouched; V2 types appended.

**Known discrepancy:** `ladder.ts` follows the brief's price assumptions
(Bootcamp ₹19,999 → ₹2,499, Accelerator ₹1,25,000, Fellowship ₹2,00,000).
`src/data/{bootcamp,accelerator,fellowship}.ts` still hold V1 numbers
(₹24,999 / ₹49,999 / "Apply for pricing"). Whoever restyles those pages must
reconcile them against `ladder.ts`.

---

## 10. Newsletter honesty note

No signup API exists, and none was invented. `Newsletter.astro` is a plain GET
form to `https://outskill.com/` carrying `email` and `from=engineering` so the
real signup form can prefill. The copy says "Continues on outskill.com". The
day a POST endpoint exists, change `action`/`method` — the markup does not need
to change.

---

## 11. Checklist before shipping a page

- [ ] `pnpm build` passes.
- [ ] `grep -rn "tracking-\|letter-spacing" src/` returns only `.display-*`.
- [ ] Screenshot at 390×844 and 1280×800; hero text passes AA over the art.
- [ ] Every hero art `url()` has a fallback layer beneath it.
- [ ] Islands are `client:visible` or `client:idle`, never `client:load`.
- [ ] One accent button per section; apply-only CTAs are ghost.
- [ ] Time → cost → outcome, before any program name.
