# Outskill site — V2 redesign brief (from the founder, verbatim intent)

The V1 build (see git history, SPEC.md) was judged **"terrible design"**. V2 is a redesign led by a stronger design model. Everything below is a hard requirement unless marked *optional*.

## Audience & information architecture

- Customers do **not** care what we call a program. "Fellowship", "Bootcamp" in a nav is meh. They care about **commitment of time, cost, and outcomes**. Every program surface must lead with those three, in that order, before any name.
- **Outcome visualised >>> skill visualised >> technical terms.** Copy and artwork show what someone *shipped/achieved*, not what they learned, and never a list of technologies as a headline.
- Two audiences, split explicitly on the homepage with fallbacks: **"For Coders"** (write code professionally) and **"For Vibe Coders"** (build with AI tools, little or no code). Each gets a section on `/` and a dedicated landing: `/coders` (engineering "homepage") and `/vibe-coders`.
- Nav (retain what works on outskill.com): **For Businesses / Upskill your Team**, **Newsletter**, **Explore Courses** (a menu that lists programs by *time × cost × outcome*, not by name). Logo left, single primary CTA right.

## Value ladder (the product truth — model the data exactly like this)

| Rung | What | Time | Price shown | CTA |
|---|---|---|---|---|
| 0 | **Workshops** — free, 90 minutes, usually every other day. Variants: **ChatGPT Workshop** (generalists) OR **Claude Code / Codex / Copilot Workshop** (coders; 90% same content, tool differs). Plus **AI for PMs** (free, 90 min). | 90 min | Free | Reserve a seat |
| 1 | **Mastermind** — 2 days, almost every weekend. Usually free, but *show a price* (₹4,999) and *unlock a time-bound coupon* that makes it free (countdown to coupon expiry + countdown to next cohort). **Must have a countdown.** | 2 days (weekend) | ₹4,999 → Free with coupon (timer) | Claim free seat |
| 2 | **Bootcamp** — paid. Retail ~₹2,000–2,500; listing price ₹10,000–25,000 shown struck through. | Short, intensive (existing 14-day sprint content) | ₹19,999 → ₹2,499 | Enrol |
| 3 | **Accelerator** — 14 days back-to-back. ₹1,25,000. List price, but CTA is **Apply now** (not buy). | 14 days, daily | ₹1,25,000 | Apply now |
| 4 | **Fellowship** — 6 months, weekends only: 4 months learning + 2 months capstone building. ~₹2,00,000. **Apply now only.** | 6 months, weekends | ₹2,00,000 | Apply now |

Existing copy for Mastermind/Bootcamp/Accelerator/Fellowship lives in `src/data/*.ts` — reuse the facts, rewrite the framing to outcomes-first.

## Homepage

- **Retain/improve the existing outskill.com homepage structure**: hero with headline + primary CTA + the **info blocks near the CTA (Start date / Start time / Duration / Format) — those matter**, then trust strip (learners, countries, alumni companies), then program ladder, then "choose your path" (coders vs vibe coders), testimonials/trust, FAQ, newsletter, footer.
- Hero reference copy (outskill.com today): "Transform Your Career with AI in One Weekend" / "Begin with Free Mastermind" / stats "Active Learners", "160+ Countries".
- **Static CTAs**: a persistent CTA is always visible (sticky bottom bar on mobile, sticky header CTA on desktop) on every page.

## Design system

- **Mobile first.** Design at 390px first; desktop is the enhancement. Test both.
- **Type**: **Fira Sans** is the main font (self-hosted, `public/fonts/woff2/FiraSans-*.woff2` + TTF symlinks in `public/fonts/fira_sans/`). **Fira Sans Condensed** is the display/heading face at the largest sizes ("max to max" — use Condensed for big headlines only). **Fira Code** available for the engineering sub-site (code, terminal, numerals in stats). No Google Fonts requests.
- **Typesetting rules**: base font size **16px on desktop/tablet**, **14–15px equivalent on mobile**. **Do NOT touch letter-spacing for any text ≤ 25px.** Tracking adjustments only on display sizes > 25px.
- Engineering sub-site (`/coders`, program pages for coders) may use a different or subset style of the main one (e.g. Fira Code accents, denser grids), but shares tokens.
- Colors: keep the Outskill dark ground + lime `#B8EF43` accent; you may add one warm off-white and a muted secondary. Keep contrast AA.
- Hero artwork: **textured abstract**, generated with gpt-5.6-luna, already in `public/gen/v2/*.png` (home, coders, vibe, workshop, mastermind, bootcamp, accelerator, fellowship). Convert to WebP in the build step (`scripts/optimize-images.mjs`).

## Tech (unchanged)

Astro 7 SSR (Node standalone) + React 19 islands + Tailwind v4. Pages prerendered; `/api/register` dynamic. `pnpm build` must pass. Islands only where interaction exists (countdown, coupon unlock, path chooser, quiz, terminal, etc.). Keep V1 islands that still fit (`TrapQuiz`, `AgentTerminal`, `AgentLoopExplorer`, `CurriculumExplorer`, `SprintTimeline`) but restyle them.

## Technical guardrails (learned from V1 — do not repeat)

- Tailwind v4 `@theme` exposes tokens as `--color-bg`, `--color-accent`, etc. Bare `--bg` / `--accent` exist only as aliases defined in `global.css`. Inline styles must use a variable that actually exists, or the whole declaration is dropped (V1 lost its hero images this way).
- **Letter-spacing rule is currently violated in `global.css`**: `.font-label` sets `0.12em` tracking at 12px and `h1,h2` set `-0.01em` regardless of size. Fix: no `letter-spacing` on any rule that can render ≤ 25px. Tracking on headings only via a size-scoped class that is guaranteed > 25px (e.g. `.display-xl` used only at ≥ 32px).
- Base size: `html { font-size: 15px } @media (min-width: 768px) { html { font-size: 16px } }`, and every size in `rem`. That is the implementation of "16px desktop, 14–15px mobile".
- Fonts: `src/styles/fonts.css` already has all `@font-face` rules. Import it before `global.css`. Preload only `FiraSans-Regular.woff2` and `FiraSansCondensed-Bold.woff2` in `Base.astro`. Remove every Google Fonts `<link>`.
- Countdown / coupon must be SSR-safe: server renders a static placeholder (the date), the island computes remaining time in `useEffect`, or use `client:only="react"`. Add `nextCohortStart` (ISO with +05:30) and `couponExpiresAt` to the Mastermind data. Simplest honest logic: coupon expires when the cohort starts; a `scripts/next-weekend.mjs` style helper may roll the date to the next Saturday 19:00 IST if the stored date has passed.
- Islands hydrate with `client:visible` (below fold) or `client:idle`; never `client:load` for below-the-fold UI.
- Reference screenshots of the current outskill.com are in `ref/screens/*.png` (home, mastermind, accelerator, fellowship, generalist mastermind; desktop + mobile, full page + hero). Read them before designing.

## Assumptions (founder can flip any of these in `src/data/`)

- Mastermind list price ₹4,999, coupon makes it free until cohort start. Bootcamp list ₹19,999 → ₹2,499 (within the stated ranges). Accelerator shows ₹1,25,000 with **Apply now**. Fellowship shows ~₹2,00,000 with **Apply now** only.
- "Static CTAs" = persistent/sticky CTA (mobile bottom bar, desktop header button) on every page.
- Workshop cadence: "usually every other day" is rendered as "Next session: <computed next weekday 19:00 IST>" with a "runs every other day" note, not a hard schedule.
- "For Businesses / Upskill your Team" and "Newsletter" link to outskill.com's existing routes (`https://outskill.com/business`, `https://outskill.com/#newsletter`); we do not build those pages.
