import { useEffect, useRef, useState } from 'react';

const NODES = [
  {
    id: 'context',
    label: 'Context',
    teach:
      'Select, compress, and refresh exactly the context the agent needs for the next step — and nothing more. Token budget is a design constraint, not an afterthought.',
  },
  {
    id: 'model',
    label: 'Model',
    teach:
      'Structure model calls with clear roles, stop conditions, and typed outputs the loop can act on — so a bad response becomes a handled branch, not a crash.',
  },
  {
    id: 'tools',
    label: 'Tools',
    teach:
      'Give the agent safe, typed tools — files, shell, tests, git — with permission boundaries, so it can do useful work inside limits you control.',
  },
  {
    id: 'memory',
    label: 'Memory',
    teach:
      'Separate short-term working state from durable project knowledge, so the agent can resume a task tomorrow without re-reading the whole repository.',
  },
  {
    id: 'review',
    label: 'Review',
    teach:
      'Gate the loop with evals and human review checkpoints, so the agent earns trust on every run instead of once in a demo.',
  },
] as const;

// Node centers in a 400x400 viewBox, arranged on a pentagon.
const POS: readonly (readonly [number, number])[] = [
  [200, 48],
  [344, 153],
  [289, 323],
  [111, 323],
  [56, 153],
];

const TOOL_CALLS = ['read_file, grep', 'edit_file', 'run_tests', 'git_diff, git_commit'];
const VERDICTS = ['pass', 'needs changes', 'pass', 'retry → pass'];

function edgeGeom(i: number) {
  const a = POS[i];
  const b = POS[(i + 1) % POS.length];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const trim = 42;
  return {
    x1: a[0] + ux * trim,
    y1: a[1] + uy * trim,
    x2: b[0] - ux * trim,
    y2: b[1] - uy * trim,
    angle: (Math.atan2(dy, dx) * 180) / Math.PI,
  };
}

export default function AgentLoopExplorer() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-play unless the user prefers reduced motion.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPlaying(!mq.matches);
    const onChange = () => {
      if (mq.matches) setPlaying(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % NODES.length);
      setStep((s) => s + 1);
    }, 2500);
    return () => window.clearInterval(id);
  }, [playing]);

  function select(i: number) {
    setActive(i);
    setStep((s) => s + 1);
  }

  function onNodeKeyDown(e: React.KeyboardEvent, i: number) {
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % NODES.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + NODES.length) % NODES.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = NODES.length - 1;
    if (next !== null) {
      e.preventDefault();
      select(next);
      btnRefs.current[next]?.focus();
    }
  }

  const node = NODES[active];
  const contextTokens = 2400 + step * 487;
  const toolsCalled = 1 + step;
  const memoryEntries = 3 + step;
  const verdict = VERDICTS[step % VERDICTS.length];
  const lastTools = TOOL_CALLS[step % TOOL_CALLS.length];

  const metrics: [string, string][] = [
    ['Context tokens', `${contextTokens.toLocaleString('en-US')} / 32k`],
    ['Tools called', `${toolsCalled} — last: ${lastTools}`],
    ['Memory entries', `${memoryEntries} durable · 4 working`],
    ['Review verdict', verdict],
  ];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* Loop diagram */}
      <div
        className="relative mx-auto aspect-square w-full max-w-md"
        role="group"
        aria-label="Agent loop stages — use arrow keys to move between stages"
      >
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden="true">
          {POS.map((_, i) => {
            const g = edgeGeom(i);
            const isActive = i === active;
            return (
              <g key={i} className={isActive ? 'text-accent' : 'text-line'}>
                <line
                  x1={g.x1}
                  y1={g.y1}
                  x2={g.x2}
                  y2={g.y2}
                  stroke="currentColor"
                  strokeWidth={isActive ? 2 : 1.5}
                  className="transition-colors"
                />
                <polygon
                  points="0,-5 11,0 0,5"
                  transform={`translate(${g.x2} ${g.y2}) rotate(${g.angle})`}
                  fill="currentColor"
                  className="transition-colors"
                />
              </g>
            );
          })}
        </svg>
        {NODES.map((n, i) => (
          <button
            key={n.id}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            type="button"
            onClick={() => select(i)}
            onKeyDown={(e) => onNodeKeyDown(e, i)}
            aria-pressed={active === i}
            className={`absolute flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-medium transition-colors sm:size-20 sm:text-sm ${
              active === i
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line bg-surface text-fg hover:border-muted'
            }`}
            style={{ left: `${POS[i][0] / 4}%`, top: `${POS[i][1] / 4}%` }}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="space-y-4">
        <div className="card p-6 sm:p-8">
          <p className="eyebrow">{node.label} — what the Bootcamp teaches</p>
          <p className="mt-3 text-base leading-relaxed text-fg sm:text-lg">{node.teach}</p>
        </div>

        <div className="card p-6 sm:p-8" aria-live="polite">
          <div className="flex items-center justify-between gap-4">
            <p className="font-label text-muted">Agent state — step {step + 1}</p>
            <span className="flex items-center gap-2 text-xs text-muted">
              <span
                className={`inline-block size-1.5 rounded-full ${playing ? 'bg-accent' : 'bg-muted'}`}
                aria-hidden="true"
              />
              {playing ? 'running' : 'paused'}
            </span>
          </div>
          <dl className="mt-4 space-y-2.5">
            {metrics.map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2.5 last:border-0 last:pb-0">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-right font-mono text-sm text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            className="inline-flex items-center justify-center rounded-full border border-line px-5 py-2 text-sm font-medium text-fg transition-colors hover:border-fg"
          >
            {playing ? 'Pause auto-step' : 'Resume auto-step'}
          </button>
          <p className="text-xs text-muted">Steps through the loop every 2.5s, or click any node.</p>
        </div>
      </div>
    </div>
  );
}
