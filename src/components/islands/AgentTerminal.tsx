import { useEffect, useState } from 'react';

type Line = {
  text: string;
  bodyClass: string;
  prefix?: string;
  prefixClass?: string;
  typed?: boolean;
};

const cmd = (text: string): Line => ({
  text,
  typed: true,
  prefix: '$ ',
  prefixClass: 'text-accent',
  bodyClass: 'text-fg',
});
const step = (text: string): Line => ({ text, prefix: '▸ ', prefixClass: 'text-muted', bodyClass: 'text-fg/85' });
const dim = (text: string): Line => ({ text, bodyClass: 'text-muted' });
const plus = (text: string): Line => ({ text, prefix: '  + ', prefixClass: 'text-accent', bodyClass: 'text-accent/90' });
const minus = (text: string): Line => ({
  text,
  prefix: '  - ',
  prefixClass: 'text-muted',
  bodyClass: 'text-muted line-through',
});
const pass = (text: string): Line => ({
  text,
  prefix: '  ✔ ',
  prefixClass: 'text-accent',
  bodyClass: 'text-fg/85',
});
const opened = (text: string): Line => ({
  text,
  prefix: '  ✔ ',
  prefixClass: 'text-accent',
  bodyClass: 'font-medium text-accent',
});
const meta = (text: string): Line => ({ text, bodyClass: 'text-muted' });
const blank = (): Line => ({ text: '', bodyClass: '' });

const SCRIPT: Line[] = [
  cmd('outskill agent run --ticket ENG-482'),
  blank(),
  dim('Ticket ENG-482 · "Checkout retry test is flaky in CI"'),
  dim('Scanning repo — 214 files, 3 test suites'),
  step('Reading src/checkout/retry.ts'),
  step('Reading src/checkout/retry.test.ts'),
  step('Root cause: retry timer not stubbed — races waitFor()'),
  blank(),
  step('Plan:'),
  dim('  1. Stub timers with vi.useFakeTimers()'),
  dim('  2. Advance 30s deterministically'),
  dim('  3. Assert at most 3 retries'),
  blank(),
  step('Patching src/checkout/retry.test.ts'),
  plus('vi.useFakeTimers();'),
  plus('await vi.advanceTimersByTimeAsync(30_000);'),
  minus('await waitFor(() => expect(retries).toBe(3));'),
  blank(),
  cmd('pnpm test checkout'),
  pass('retry.spec.ts — 12 passed · 2.1s'),
  pass('checkout suite — 41 passed · 6.8s'),
  step('All green — opening pull request…'),
  opened('PR #128 opened · fix(checkout): stabilize retry test'),
  meta('2 files changed · CI passing · ready for review'),
];

function TerminalLine({ line, partial }: { line: Line; partial: string | null }) {
  return (
    <div className={`whitespace-pre-wrap break-words ${line.bodyClass}`}>
      {line.prefix && <span className={line.prefixClass}>{line.prefix}</span>}
      {partial ?? line.text}
    </div>
  );
}

export default function AgentTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) setLineIdx(SCRIPT.length);
  }, [reduced]);

  const done = lineIdx >= SCRIPT.length;

  useEffect(() => {
    if (reduced || done) return;
    const line = SCRIPT[lineIdx];
    let delay: number;
    if (line.typed) delay = charIdx < line.text.length ? 24 : 340;
    else delay = line.text === '' ? 120 : 200;
    const t = window.setTimeout(() => {
      if (line.typed && charIdx < line.text.length) {
        setCharIdx((c) => c + 1);
      } else {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [lineIdx, charIdx, done, reduced]);

  const replay = () => {
    setLineIdx(0);
    setCharIdx(0);
  };

  const visibleCount = Math.min(lineIdx + 1, SCRIPT.length);
  const visible = SCRIPT.slice(0, visibleCount);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <p className="ml-2 font-mono text-xs text-muted">outskill — agent</p>
        <button
          type="button"
          onClick={replay}
          disabled={!done}
          className="font-label ml-auto rounded-full border border-line px-3 py-1 text-[11px] text-muted transition-colors hover:border-fg/40 hover:text-fg disabled:pointer-events-none disabled:opacity-40"
        >
          Replay
        </button>
      </div>

      <div
        role="img"
        aria-label="Terminal recording: an AI coding agent picks up ticket ENG-482, finds the root cause of a flaky test, patches it, runs the suite, and opens a pull request."
        className="flex h-[26rem] flex-col justify-end overflow-hidden p-4 font-mono text-[13px] leading-relaxed sm:h-[30rem] sm:p-6 sm:text-sm"
      >
        <div aria-hidden="true">
          {visible.map((line, i) => (
            <TerminalLine
              key={i}
              line={line}
              partial={
                i === lineIdx && line.typed && !reduced ? line.text.slice(0, charIdx) : null
              }
            />
          ))}
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
