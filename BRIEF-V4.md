# V4 brief — naming, workshop default, quiz-gated coupon, pricing redesign (founder's intent)

Builds on BRIEF-V2/V3 and DESIGN.md. Hard requirements.

## 1. Program names — everywhere (nav, Explore menu, ladder cards, footers, sticky bars, page titles, data)

| Rung | Short name (use exactly) | Time |
|---|---|---|
| 0 | **90 min Workshop** | 90 minutes, free |
| 1 | **Weekend Mastermind** | 2 days, weekend, free with coupon |
| 2 | **2-Day Bootcamp** | 2 days, paid (₹19,999 → ₹2,499) — **Bootcamp is now 2 days**, not 14. Keep the coding-agent outcome and the AgentLoopExplorer; compress the curriculum into 2 days × 2 sessions (4 sessions). The 14-day sprint content belongs to the Accelerator only. |
| 3 | **14 days Accelerator** | 14 days back-to-back, by application |
| 4 | **6M Fellowship** | 6 months, weekends, by application |

Long names (e.g. "2-Day AI Engineering Mastermind") may remain in SEO titles only.

## 2. Workshop default page (`/workshops`)

- Headline promise: **"Unlock AI productivity for coders, SWEs, QA, SDEs, DevOps, data folks and PMs."** (render the audience list as type: a wrapping row of role chips or a big condensed line; not a paragraph).
- The common page lists the tools **as logos** (ChatGPT, Codex, Claude Code, GitHub Copilot, plus "AI for PMs" / "AI for Founders" as text badges), **not as links** — one shared "Reserve a seat" flow.
- Dedicated per-tool pages (`/workshops/<slug>`) stay, with the **tool logo in the hero**, but they are **linked only from the Footer** ("Workshops by tool" column). Remove tool-page links from the homepage/coders/vibe strips and from the `/workshops` body (those point at `/workshops` instead).
- Logos: use existing assets where present (`public/ref/` has Claude and Copilot marks — identify by rendering, not by filename); for ChatGPT/OpenAI/Codex create a neutral monogram badge (`public/logos/<slug>.svg`, simple lettermark in the site's tokens) and leave `TODO(founder): drop the official SVG here`. Never hand-draw a trademark from memory.

## 3. Type: less funkiness

- The "When" value (`Mon, 7 Sep at 7:00 PM IST`) is rendered **in the same style as the other InfoBlock values** (Fira Sans semibold, `text-fg`) — no `.num`, no accent, no monospace. Same for NextSession wherever it appears. Fira Code stays only for the countdown digits, the terminal, and code.

## 4. Pricing section — redesign (current one is "hideous")

Replace `PricingSection.astro` with a calm, single-card layout: eyebrow, one big display amount (struck list price small above it), one line of what it includes as a single comma-separated sentence or a 2-column tight list, one button, one note. No boxed grid, no lime border, no bullets-with-squares. Must look good at 390px first. Apply-only rungs: ghost button, amount shown, "Applications reviewed in 48 hours" style note.

## 5. Coupon hidden behind a quiz

- The Mastermind coupon is **not** shown on the page. Instead a CTA: **"Check your AI knowledge"** (fallback label if a page needs a shorter one: **"Take the quiz"**).
- `/quiz` — dedicated page with the 4 trap questions (reuse TrapQuiz logic and exact copy). On submit, navigate to a **shareable result page**: `/quiz/result/<score>` for score 0–4 (prerendered via `getStaticPaths`). The result page: big score, one-line verdict (≤4 wrong → "Score low? Join the Mastermind to find out why." / 4/4 → "You're ready for the Accelerator."), per-question "why" lines (fetched from `quiz.ts`, rendered statically per score page is NOT possible per-answer — so render the four whys generally, marked "what the room usually gets wrong"), **the coupon reveal (code + copy button + valid-until)**, share buttons (copy link, X, LinkedIn, WhatsApp — plain `https://` intent links, no SDKs), and the Mastermind CTA. Each score page has its own `<title>`/OG description ("I scored 3/4 on Outskill's AI knowledge check").
- Mastermind page: the price block keeps ₹4,999 struck → "Free with coupon" + countdown, and the button becomes "Check your AI knowledge" → `/quiz`. The on-page TrapQuiz section is replaced by a short teaser linking to `/quiz`.

## 6. Copy simplification

- Every FAQ heading reads exactly **"Straight answers."**
- Cut section leads to one sentence. Kill any remaining hype or filler.

## Guardrails (unchanged)

DESIGN.md tokens; no letter-spacing ≤ 25px; rem; Condensed only for display classes; no invented facts; never "harness". `pnpm build` passes. Cards never show amounts (tier labels only); amounts only in the pricing section.
