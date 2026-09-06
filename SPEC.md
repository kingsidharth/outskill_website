# Outskill Engineering — Site Spec (single source of truth)

Static-first marketing site for Outskill's **four AI Engineering programs**, built with **Astro 7 (SSR, Node standalone) + React islands + Tailwind v4**. Read this whole file before touching code. Do NOT edit files you do not own (see Ownership).

## Positioning (from the founder — do not soften)

"Show, don't tell." Every page must *demonstrate* the outcome with an interactive island, not just list bullets. Copy is direct, confident, engineer-to-engineer. No fluff, no "unlock your potential".

| Route | Program | One-line promise | Interactive "show" island |
|---|---|---|---|
| `/` | Hub | Pick the program that matches where you are. | `ProgramPicker` (3-question switcher that recommends a program) |
| `/mastermind` | **2-Day AI Engineering Mastermind** (free, live, 12 hrs, 3 sessions) | Productivity & demos. See what agents actually do, then do it. | `AgentTerminal` (animated terminal: ticket → plan → code → tests → PR) + `TrapQuiz` |
| `/bootcamp` | **AI Engineering Bootcamp** (14-day, sprint-based) | We teach you how to *build* the Cursors and Claude Codes of the world: coding agents, tool loops, context management, eval. | `AgentLoopExplorer` (click through context → tools → memory → review loop, live state) |
| `/accelerator` | **AI Engineering Accelerator** (self-paced + live, 70+ hrs, 7+ apps, 1 yr updates) | Full spectrum: LLM apps, RAG, automation, agents, multi-agent, production. | `SprintTimeline` (interactive sprint 0–7 timeline with deliverables) |
| `/fellowship` | **AI Engineering Fellowship (GEF)** (6 months, hybrid) | ML fundamentals + theory + forward-deployed engineering skills + implementation. Fine-tuning and architecture arrive in later levels. | `CurriculumExplorer` (level tabs with skills / builds / theory split) |

**Bootcamp wording rule:** describe building coding agents, tool-calling loops, context/memory management, evals, sandboxing. NEVER use the word "harness" anywhere on the site.

**Mastermind trap quiz (exact questions; answers marked ✅ are correct):**
1. Conversation: "What is the capital of France?" → "Paris". How did the LLM answer? (a) Looked up a database (b) Searched the internet (c) Cache ✅(d) None of the above
2. What is pre-training? (a) Something before training (b) Something to do with data (c) Test before training ✅(d) None of the above
3. How do you know which model is best for a task? (a) Trial & error (b) Benchmarks ✅(c) Need more information
4. If you built a customer-support AI bot for your company you'd need: (a) Fine-tuning (b) Training (c) ML ✅(d) None of the above
Scoring copy: 4/4 → "You're ready for the Accelerator." Otherwise → **"Score low? Join the Mastermind to find out why."** with Register CTA. Show a one-line "why" per question after submit, hidden until the quiz is submitted.

## Brand tokens (already in `src/styles/global.css` — use the CSS variables / Tailwind theme, do not invent colors)

- Background `--bg: #0A0A0A`, surface `--surface: #141414`, border `--line: #262626`
- Text `--fg: #F5F5F5`, muted `--muted: #A3A3A3`
- Accent **lime** `--accent: #B8EF43`, accent-hover `#C8F563`, accent-ink (text on lime) `#0A0A0A`
- Display font: `Instrument Serif` (Google) for H1/H2 — class `font-display`
- Body/UI font: `Fira Sans` (Google) — default. Labels/eyebrows: `IBM Plex Sans` uppercase tracking-wide, class `font-label`
- Radius: 12px cards, 999px pills. Cards: `bg-surface border border-line rounded-xl`.
- Motion: subtle only. `prefers-reduced-motion` must disable animations.

## Layout & components (owner: GLM)

- `src/layouts/Base.astro` — `<html lang="en">`, meta, OG tags from props (`title`, `description`, `image`), fonts via Google Fonts `<link>` with `display=swap` + preconnect, imports `../styles/global.css`, `<ClientRouter />` from `astro:transitions`, skip-link, `<Nav />`, `<slot />`, `<Footer />`.
- `src/components/Nav.astro` — logo (text "Outskill" + small lime dot), links: Mastermind, Bootcamp, Accelerator, Fellowship; right: "Log in" (link to https://outskill.com) + lime pill CTA "Register free". Sticky, blur backdrop, mobile hamburger (pure CSS/`<details>` or tiny inline script, no React).
- `src/components/Footer.astro` — 3 columns (Programs, Company, Legal) + "© 2026 Sisinty Pvt. Ltd."
- `src/components/Section.astro` — wrapper with `eyebrow`, `title`, `lead` props, consistent max-w-6xl padding.
- `src/components/CTA.astro` — final call-to-action band with lime button.
- `src/components/StickyBar.astro` — mobile bottom sticky bar: program name, price (strike + current), button. Props from data.
- `src/components/FAQ.astro` — native `<details>` accordion.
- `src/components/Stat.astro`, `src/components/ProgramCard.astro`, `src/components/LogoWall.astro` (uses `/ref/*.svg|webp` alumni-company logos: cl*.svg, cs*.svg, co.svg).

## Data layer (owner: Codex) — `src/data/*.ts`

Types are in `src/data/types.ts` (owned by orchestrator; don't change). Each program exports a `Program` object: `mastermind.ts`, `bootcamp.ts`, `accelerator.ts`, `fellowship.ts`, plus `quiz.ts` (`QuizQuestion[]` for the trap quiz) and `site.ts` (nav links, footer, socials, hub copy). Pages import ONLY from `src/data`, never hardcode copy.

## Pages

- `src/pages/index.astro` — owner: DeepSeek. Hero + `ProgramPicker` island + 4 `ProgramCard`s + LogoWall + CTA.
- `src/pages/mastermind.astro` — owner: GLM. Hero (date/time/duration stats, free vs ₹4,999 strike) → "One weekend. A new way to ship." 5 topic cards → `AgentTerminal` island → 3 sessions schedule → `TrapQuiz` island → FAQ → CTA + StickyBar.
- `src/pages/bootcamp.astro` — owner: Kimi. Hero → "What you'll actually build" → `AgentLoopExplorer` island → 14-day sprint list → outcomes → FAQ → CTA.
- `src/pages/fellowship.astro` — owner: Kimi. Hero → 4 pillars (ML fundamentals / theory / forward-deployed skills / implementation) → `CurriculumExplorer` island → "Later levels: fine-tuning & architecture" → FAQ → CTA.
- `src/pages/accelerator.astro` — owner: DeepSeek. Hero (70+ hrs, 7+ apps, 1 yr updates, ₹49,999 / $999) → `SprintTimeline` island → "Beyond engineering" add-ons → FAQ → CTA + StickyBar.

Every page: `export const prerender = true;` at the top of frontmatter (SSR server, but marketing pages are prerendered; `/api/*` stays dynamic). Islands use `client:visible` (below fold) or `client:idle` (hero). Images: `<img loading="lazy" decoding="async" width height>` for `/ref/*`; hero images `fetchpriority="high"`.

## Islands (React, `src/components/islands/*.tsx`)

- `TrapQuiz.tsx` (GLM) — props `{questions: QuizQuestion[]}`; keyboard accessible radios; submit → score + per-question why + CTA; `aria-live` result.
- `AgentTerminal.tsx` (GLM) — no props; typewriter terminal (~20 lines) showing an agent taking a Jira-style ticket, reading files, running tests, opening a PR; "Replay" button; respects reduced motion (render final state).
- `ProgramPicker.tsx` (DeepSeek) — 3 questions (coding experience? time/week? goal?) → recommends one of 4 programs with link.
- `SprintTimeline.tsx` (DeepSeek) — props `{sprints}`; horizontal on desktop, vertical on mobile; click a sprint to expand deliverables + tools.
- `AgentLoopExplorer.tsx` (Kimi) — 5 nodes (Context, Model, Tools, Memory, Review) in a loop diagram (inline SVG); clicking a node shows what the Bootcamp teaches for it and a tiny "state" panel that updates.
- `CurriculumExplorer.tsx` (Kimi) — props `{levels}`; tabs per level; each shows Theory / Skills / You build; last two levels flagged "Later levels".

## Server / ops (owner: DeepSeek)

- `src/pages/api/register.ts` — POST JSON `{email, program}` → validates → appends to `data/registrations.jsonl` (gitignored) → `{ok:true}`. Forms on pages post here with `fetch` and show inline success; no page reload.
- `scripts/serve.sh` — builds then runs `HOST=0.0.0.0 PORT=80 node dist/server/entry.mjs`. `scripts/com.outskill.local.plist` (launchd agent) + `scripts/install-launchd.sh`. README with outskill.local + Tailscale instructions.

## Quality bar

- `pnpm build` must pass with zero errors. `pnpm astro check` clean.
- Lighthouse-minded: no layout shift (explicit img sizes), fonts swap, islands lazy, total JS per page < 60 KB gz.
- Semantic HTML, one `<h1>` per page, focus-visible rings in lime, color contrast AA.
- Mobile first: test at 390px and 1280px.

## Ownership map (no cross-edits; if you need a change in someone else's file, write it in `NOTES.md` at repo root)

- Orchestrator: `SPEC.md`, `astro.config.mjs`, `src/styles/global.css`, `src/data/types.ts`, `package.json`
- Codex (gpt-5.6-luna): `src/data/*.ts` (except types.ts)
- GLM 5.3 flash: `src/layouts/*`, `src/components/*.astro`, `src/pages/mastermind.astro`, `src/components/islands/TrapQuiz.tsx`, `AgentTerminal.tsx`
- Kimi K3: `src/pages/bootcamp.astro`, `src/pages/fellowship.astro`, `islands/AgentLoopExplorer.tsx`, `islands/CurriculumExplorer.tsx`
- DeepSeek v4 flash: `src/pages/index.astro`, `src/pages/accelerator.astro`, `src/pages/api/*`, `islands/ProgramPicker.tsx`, `islands/SprintTimeline.tsx`, `scripts/*`, `README.md`

## Data export contract (exact names — pages import these)

```ts
import { mastermind } from '../data/mastermind';   // export const mastermind: Program
import { bootcamp } from '../data/bootcamp';       // export const bootcamp: Program
import { accelerator } from '../data/accelerator'; // export const accelerator: Program
import { fellowship } from '../data/fellowship';   // export const fellowship: Program
import { quiz } from '../data/quiz';               // export const quiz: QuizQuestion[]
import { site } from '../data/site';               // export const site: Site
import { programs } from '../data/site';           // export const programs: Program[] (all four, in order)
```

Hero images (generated, 1600x900 WebP): `/gen/hero-hub.webp`, `/gen/hero-mastermind.webp`, `/gen/hero-bootcamp.webp`, `/gen/hero-accelerator.webp`, `/gen/hero-fellowship.webp`. Use as a dimmed background (`opacity-40`, gradient fade to `--bg` at bottom) behind hero text. If a file is missing at build time, fall back gracefully (CSS gradient), do not fail.
