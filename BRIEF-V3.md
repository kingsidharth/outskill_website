# V3 brief — packaging, landing pages, and copy (founder's intent, structured)

Builds on BRIEF-V2.md and DESIGN.md. Everything here is a requirement unless marked *optional*. **Copy must be crisp. No verbal diarrhoea.** Short sentences. Use type as composition: big numerals, Condensed display lines, labels — not paragraphs.

## 1. One landing page per workshop (rung 0)

Every workshop packaging gets its own LP at `/workshops/<slug>`, with an **outcome-focused 90-minute promise**:

| slug | name | ICP |
|---|---|---|
| `chatgpt` | ChatGPT Workshop | generalists, vibe coders |
| `codex` | Codex Workshop | coders |
| `claude-code` | Claude Code Workshop | coders |
| `copilot` | Copilot Workshop | coders (GitHub Copilot) |
| `ai-for-pms` | AI for Product Managers | PMs |
| `ai-for-founders` | AI for Founders | founders *(new — founder marked it "?", build it, keep it easy to hide via `enabled: false`)* |

**LP structure (same skeleton for all six):**
1. Hero: eyebrow "Free · 90 minutes · Live", promise headline (outcome, not tool), one-line subhead, CTA "Reserve a seat", InfoBlocks: **Duration: 90 minutes** · **When: Sat, NN Sep at HH:MM AM/PM IST** (that exact format; computed next session; the day name must be right) · Format: Live online · Price: Free.
2. **The ladder of use cases & demos (3–5 numbered steps).** Start from what this user might do *today*, super basic, and map over their **full workflow — waterfall steps are a good model**. The deeper we go, the more mysterious it gets: steps 1–3 are fully described, step 4 is a teaser (title + one line), **step 5 is a "Surprise" — not on the LP** (render as a locked/redacted card: "Step 5 — we keep this one for the room"). Example for PMs: 1 PRD → 2 Technical considerations → 3 UX & prototypes → 4 Market analysis & pricing → 5 (hidden: user simulation & user testing with simulations). Same shape for building software (e.g. 1 write the ticket → 2 scaffold & change code → 3 tests & review → 4 refactor a real repo → 5 hidden). Underlying promise on every LP: **"Things you can start using today."**
3. "Vibe coders welcome" line on the coder workshops (encourage them to attend).
4. **Social proof**: 2–3 short quotes with name + role (use `src/data/testimonials.ts`; names/roles from the reference site are allowed; **if no real quote text exists, leave `quote: ''` with `TODO(founder)` and render the card without a quote — never fabricate**), then **"Rated 4.9 / 5 · avg."** line **below** the quotes.
5. **Mentor profile** card: photo placeholder, name, one-line credential, 3 bullets (`src/data/mentors.ts`, `TODO(founder)` values — do not invent a person; render "Your mentor" with a neutral placeholder until filled).
6. "Looking for something more serious?" → 2–3 higher course cards (LadderCard, **no prices**) + **"Help me decide" quiz** (reuse PathChooser or a 3-question variant).
7. "Non-tech options" strip (ChatGPT workshop, AI for PMs, AI for Founders) on coder LPs; "Ready to write code?" strip (coder workshops) on non-tech LPs.
8. FAQ (short), Newsletter, StickyCTA.

`/workshops` stays as the index (switcher can remain) but links to each LP.

## 2. Cards never show prices. Dedicated pages carry a pricing section.

- `LadderCard`, the Explore menu, and every product card show a **tier label** instead of a rupee amount: `Free` / `Paid` / `By application`. Time and outcome stay.
- Each of **Bootcamp, Accelerator, Fellowship** has a dedicated page with:
  - a **Pricing section** (the only place amounts appear): list price struck + current (Bootcamp), amount + Apply (Accelerator, Fellowship), what the price includes, payment note.
  - a **"What you get" checklist** (static ✓ list, 8–12 items).
  - **"Is this for me?" — a clickable checklist island** (`IsThisForMe.tsx`): 6–8 statements the visitor ticks; result line updates live ("5 of 7 — this fits" / "2 of 7 — start with the Mastermind"), with the recommended CTA.

## 3. Mastermind promise

Headline promise: **"We'll demo and show you the behind-the-scenes of common to uncommon things."** Keep the countdown/coupon. Tighten copy.

## 4. Accelerator page — outcome-focused fast-track

- Title line + subtitle (crisp). Then **Skills**, each as a bold display line with one supporting sentence:
  1. Build ChatGPT / Perplexity-like apps.
  2. Sophisticated apps & automations with AI.
  3. Customise AI with your data.
  4. Demo to production — how do you scale, monitor, measure and control this?
  5. Build your own Cursor / Claude Code, and your own productivity.
  6. Build an AI team.
  - **Hackathon:** steal the skills by putting them to use. Collaborate with others.
  - **Network** of experienced folks.
- **The stack, rewritten as benefits** (not a logo wall): How do you use AI as part of software? How do you control AI, reduce hallucination, make it useful? Deployment. Customisation. Cost prediction & control.
- **Community**: "10–15+ years experience — ~75% of the room. Founders. PMs. Vibe coders. Indie hackers. You?" — set as big type elements.
- **Free: Python Basecamp** — a fresher session + resources to get up to speed with Python. Helps if: you're not familiar with Python · haven't coded in a while · are a vibe coder · don't write code/Python every day.
- **What we cover / What we don't cover** (two columns, honest): cover = Gen AI topics. Don't cover = the full traditional SWE stack (FE/BE) — *but we cover how they change when you use AI*; DB modelling — *though we cover patterns for gen AI*; InfoSec/traditional security — *we do cover security & production considerations that change due to AI, data, privacy*.
- **"Still unsure?" island** (`StillUnsure.tsx`): six prompts, each with three choices **[Want to know] [Meh] [Too technical]**; a running tally and a closing line ("4 × want to know — you'll like the Accelerator" / mostly "too technical" → "start with the Mastermind" / mostly "meh" → "try a 90-minute workshop first"). The six prompts, verbatim in spirit:
  1. Imagine you work at ChatGPT. You're the engineer. You don't prompt your AI — your user does. How does that change prompt engineering for you?
  2. AI is stateless — it has no memory. How do you give it memory?
  3. You're tasked with an AI customer-support bot. It needs to know who the customer is, active orders, status, options. How do you teach that to AI?
  4. How do you know which model is best for your task?
  5. How do you build something like Cursor — an agent that reads, writes and changes code for you?
  6. If you could build your own team with AI, who would you hire? [Product team roles] [Marketing team roles] [Media/YouTuber team roles] — "Learn to build any of these."
- **Open source in AI & local models** line.
- **Tools** (as a compact chip grid, after the benefits, never as the headline): Cursor, Claude Code, Codex, OpenAI SDK, Gemini SDK, Anthropic, OpenRouter, HuggingFace, Google Colab, MCP, Skills, Render, Vercel, Qdrant, Pinecone, LanceDB, CrewAI, LangGraph, Langfuse, Pydantic, Python, UV, FastAPI.
- **"How we solve for"** list (two columns, terse): Hallucinations · Customisation · Data & maths · Cost & estimation · Handling a ton of data · Standard or custom tools for agents · Turning your code/app into tools for agents · Taking advantage of the open-source community · Comparing options and models · Powering your API with AI, or AI with your API · Memory, context, context window, limitations, verification · Speed & latency.
- Pricing section + What you get + Is this for me (per §2). Keep SprintTimeline.

## 5. Bootcamp and Fellowship pages

Same dedicated-page pattern (§2). Bootcamp keeps the coding-agent outcome and AgentLoopExplorer; Fellowship keeps the six levels and CurriculumExplorer. Both get: Pricing section, What you get checklist, Is this for me island, community line, cover/don't cover (shorter), Python Basecamp mention where relevant (Bootcamp).

## 6. Homepage & /coders & /vibe-coders

Cards lose prices (§2). Workshops strip links to the six LPs. Nothing else structural.

## Data

- `src/data/workshops.ts` → one object per LP: slug, name, icp, enabled, promise, subhead, steps[1..5] (`{n, title, blurb, teaser?: boolean, hidden?: boolean}`), vibeWelcome, faq, related slugs.
- `src/data/testimonials.ts`, `src/data/mentors.ts` (with TODO(founder) placeholders — never invent quotes or people).
- Program data gets `pricing` (`{list?, current?, includes: string[], note}`), `whatYouGet: string[]`, `isThisForMe: string[]`, and for Accelerator `skills`, `stackBenefits`, `community`, `cover/dontCover`, `stillUnsure`, `tools`, `solveFor`.

## Guardrails (unchanged)

DESIGN.md tokens and type rules. No letter-spacing ≤ 25px. rem sizes. No hype words. No invented facts. `pnpm build` passes. Islands `client:visible`/`client:idle`. Never the word "harness".
