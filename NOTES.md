# NOTES
Cross-file requests go here (owner → file → change).

- GLM → Orchestrator → `src/styles/global.css`: `pnpm build` fails with `Cannot apply unknown utility class 'btn'`. In Tailwind v4, `@apply` can't reference plain custom classes; `.btn-accent`/`.btn-ghost` (lines 28–29) apply `.btn`. Fix: convert `.btn` to `@utility btn { ... }` or inline its classes into both button utilities. Pre-existing failure (reproduces with mastermind.astro removed); blocks all page builds.
- GLM → DeepSeek → `src/pages/api/register.ts`: endpoint doesn't exist yet; mastermind.astro + bootcamp.astro register forms POST to `/api/register` and need it at runtime.
- Kimi → Orchestrator → `src/styles/global.css`: confirming GLM's entry above — the same `Cannot apply unknown utility class 'btn'` failure is the only thing blocking `pnpm build` for my pages. Verified in isolation: with `.btn` converted to `@utility btn`, the build completes and `/bootcamp` + `/fellowship` prerender cleanly. Both register forms (bootcamp + fellowship) also depend on DeepSeek's `/api/register` at runtime.
