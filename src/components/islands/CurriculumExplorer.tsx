import { useRef, useState } from 'react';
import type { Level } from '../../data/types';

interface Props {
  levels: Level[];
}

export default function CurriculumExplorer({ levels }: Props) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % levels.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + levels.length) % levels.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = levels.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  const level = levels[active];

  const columns: [string, string[]][] = [
    ['Theory', level.theory],
    ['Skills', level.skills],
    ['You build', level.build],
  ];

  return (
    <div>
      <div role="tablist" aria-label="Fellowship levels" className="flex flex-wrap gap-2">
        {levels.map((l, i) => (
          <button
            key={l.n}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`level-tab-${l.n}`}
            aria-selected={active === i}
            aria-controls={`level-panel-${l.n}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`btn btn-sm inline-flex items-center gap-2 border ${
              active === i
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line bg-surface text-fg hover:border-line-strong hover:bg-surface-2'
            }`}
          >
            Level {l.n}
            {l.later && (
              <span
                className={`rounded-sm px-1.5 py-0.5 text-[0.75rem] font-semibold uppercase ${
                  active === i ? 'bg-accent-ink/15 text-accent-ink' : 'bg-accent-dim text-accent'
                }`}
              >
                Later
              </span>
            )}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`level-panel-${level.n}`}
        aria-labelledby={`level-tab-${level.n}`}
        className="card mt-6 p-5 md:p-7"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="display-md">{level.title}</h3>
          {level.later && (
            <span className="rounded-sm bg-accent px-2 py-0.5 text-[0.8125rem] font-semibold text-accent-ink">
              Later level
            </span>
          )}
        </div>
        {level.later && (
          <p className="mt-2 text-[0.9375rem] text-muted">Arrives after you've shipped the fundamentals.</p>
        )}

        <div className="mt-7 grid gap-7 md:grid-cols-3">
          {columns.map(([heading, items]) => (
            <div key={heading}>
              <h4 className="label">{heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed md:text-base">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-1 size-3.5 shrink-0 text-accent"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8.5l3.5 3.5L13 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
