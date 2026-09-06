#!/bin/zsh
cd "$(dirname "$0")/.."
pnpm build
HOST=0.0.0.0 PORT=${PORT:-80} exec node dist/server/entry.mjs