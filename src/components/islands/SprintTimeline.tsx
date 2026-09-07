import { useState, useRef, useCallback, useEffect } from 'react';
import type { Sprint } from '../../data/types';

interface Props {
  sprints: Sprint[];
}

export default function SprintTimeline({ sprints }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((index: number) => {
    if (!listRef.current) return;
    const children = listRef.current.children;
    if (children[index]) {
      children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, []);

  const select = useCallback((n: number) => {
    setSelected((prev) => (prev === n ? null : n));
    // Sprint numbers start at 0, so the child index is the position in the
    // array, not `n - 1`. Matches what the keyboard handler already does.
    scrollTo(sprints.findIndex((s) => s.n === n));
  }, [scrollTo, sprints]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (selected === null) return;
    const idx = sprints.findIndex((s) => s.n === selected);
    if (idx < 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = sprints[Math.min(idx + 1, sprints.length - 1)];
      setSelected(next.n);
      scrollTo(idx + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = sprints[Math.max(idx - 1, 0)];
      setSelected(prev.n);
      scrollTo(idx - 1);
    }
  }, [selected, sprints, scrollTo]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (selected === null) return;
      const idx = sprints.findIndex((s) => s.n === selected);
      if (idx < 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = sprints[Math.min(idx + 1, sprints.length - 1)];
        setSelected(next.n);
        scrollTo(idx + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = sprints[Math.max(idx - 1, 0)];
        setSelected(prev.n);
        scrollTo(idx - 1);
      }
    };
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  }, [selected, sprints, scrollTo]);

  return (
    <div
      ref={listRef}
      className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-4 md:flex-col md:snap-none md:items-stretch md:overflow-x-visible"
      role="listbox"
      aria-label="Sprint timeline"
      tabIndex={0}
    >
      {sprints.map((sprint) => {
        const isOpen = selected === sprint.n;
        return (
          <div
            key={sprint.n}
            role="option"
            aria-selected={isOpen}
            className={`snap-start shrink-0 w-[85vw] md:w-full card card-hover cursor-pointer p-4 md:p-5 ${
              isOpen ? 'border-accent bg-surface-2' : ''
            }`}
            onClick={() => select(sprint.n)}
            onKeyDown={handleKey}
          >
            <div className="flex items-center gap-3">
              <span className="num flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-bg text-[0.8125rem] text-muted">
                {sprint.n}
              </span>
              <div className="min-w-0">
                <p className="heading-xs truncate">{sprint.title}</p>
                <p className="label mt-0.5">{sprint.days}</p>
              </div>
              <svg
                className={`ml-auto size-4 shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            {isOpen && (
              <div className="mt-4 space-y-3 border-t border-line pt-4">
                <div>
                  <p className="label label-accent">Focus</p>
                  <p className="mt-1 text-[0.9375rem]">{sprint.focus}</p>
                </div>
                <div>
                  <p className="label label-accent">Learn</p>
                  <ul className="mt-1 space-y-0.5">
                    {sprint.learn.map((item, i) => (
                      <li key={i} className="text-[0.9375rem] text-muted before:mr-2 before:text-accent before:content-['▸']">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label label-accent">Ship</p>
                  <p className="mt-1 text-[0.9375rem]">{sprint.ship}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sprint.tools.map((tool, i) => (
                    <span key={i} className="rounded-md border border-line px-2.5 py-0.5 text-[0.8125rem] text-muted">{tool}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}