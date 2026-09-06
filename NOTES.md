# Build notes

## Warnings in other owners' files

The following images referenced in Astro components/pages did not resolve at build time. These are not in DeepSeek-owned files:

- `/engacc/engaccm.webp` — likely in a component/page owned by GLM or Kimi
- `/mastermind/engmm.webp` — likely in mastermind.astro (GLM)
- `/engacc/engacc.webp` — likely in bootcamp or fellowship (Kimi)
- `/mastermind/ebtnbg.webp` — likely in mastermind.astro (GLM)
- `/mastermind/engmbg.webp` — likely in mastermind.astro (GLM)
- `/mastermind/engmd.webp` — likely in mastermind.astro (GLM)
- `/accelerator/btnmobile.webp` — likely in accelerator-related component (GLM)

These need either the image files placed in `public/` or the references corrected.