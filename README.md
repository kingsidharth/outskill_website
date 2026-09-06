# Outskill Engineering

Static-first SSR marketing site for Outskill's four AI Engineering programs.

## Quick start

```zsh
pnpm dev           # dev server on http://localhost:4321
pnpm build         # production build → dist/
scripts/serve.sh   # build + serve on http://0.0.0.0:80
```

## Local domain

```zsh
sudo sh -c 'echo "127.0.0.1 outskill.local" >> /etc/hosts'
```

Then http://outskill.local resolves to your local server.

## Tailscale (remote access)

The server binds `0.0.0.0:80`, so it's reachable via your Tailscale IP:

- http://100.111.80.16
- http://kings-macbook-pro.tail540e1.ts.net

For HTTPS via Tailscale Funnel:

```zsh
tailscale serve --bg --https=443 http://127.0.0.1:80
```

## Architecture

- **Astro 7** with SSR (Node standalone adapter)
- **React 19** islands for interactive components
- **Tailwind v4** for styling
- Marketing pages are prerendered (`export const prerender = true`)
- `/api/*` routes remain dynamic (SSR)
- Forms submit to `/api/register` via `fetch` with inline success (no page reload)

## Ownership

| Owner | Files |
|---|---|
| Orchestrator | `SPEC.md`, `astro.config.mjs`, `src/styles/global.css`, `src/data/types.ts`, `package.json` |
| Codex | `src/data/*.ts` (except types.ts) |
| GLM | `src/layouts/*`, `src/components/*.astro`, `src/pages/mastermind.astro`, `TrapQuiz.tsx`, `AgentTerminal.tsx` |
| Kimi | `src/pages/bootcamp.astro`, `src/pages/fellowship.astro`, `AgentLoopExplorer.tsx`, `CurriculumExplorer.tsx` |
| DeepSeek | `src/pages/index.astro`, `src/pages/accelerator.astro`, `src/pages/api/*`, `ProgramPicker.tsx`, `SprintTimeline.tsx`, `scripts/*`, `README.md` |