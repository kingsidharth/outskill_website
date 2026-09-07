import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

type Variant = {
  slug: string;
  tool: string;
  tag: string;
  outcome: string;
  build: string[];
  needs: string;
  href: string;
};

type Props = {
  variants: Variant[];
};

/**
 * The five workshop flavours. Same 90 minutes, same shape — the tool differs,
 * so the tool is the only thing you choose.
 *
 * A real tablist: roving tabindex, arrow/Home/End keys, aria-selected, one
 * panel labelled by its tab. The hash (#claude-code) is read on mount and
 * written with replaceState so the URL is shareable without a scroll jump.
 */
export default function WorkshopSwitcher({ variants }: Props) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * On mobile the tabs sit in a horizontally scrolling row. Nudge the strip
   * itself rather than calling scrollIntoView, which would also move the page.
   */
  const revealTab = useCallback((i: number) => {
    const list = listRef.current;
    const tab = tabRefs.current[i];
    if (!list || !tab) return;
    const pad = 20;
    const left = tab.offsetLeft - pad;
    const right = tab.offsetLeft + tab.offsetWidth + pad;
    if (left < list.scrollLeft) list.scrollLeft = left;
    else if (right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth;
  }, []);

  // Hash is read after mount only — reading location during render would
  // desync the prerendered markup from the first client render.
  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      const slug = window.location.hash.replace(/^#/, '');
      const i = variants.findIndex((v) => v.slug === slug);
      if (i < 0) return;
      setActive(i);
      revealTab(i);
      if (scroll) rootRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
    };
    fromHash(true);
    const onHash = () => fromHash(false);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [variants, revealTab]);

  const select = useCallback(
    (i: number, focus = false) => {
      setActive(i);
      revealTab(i);
      if (focus) tabRefs.current[i]?.focus();
      // Keep history.state — Astro's ClientRouter stores scroll position there.
      try {
        window.history.replaceState(window.history.state, '', `#${variants[i].slug}`);
      } catch {
        /* replaceState can throw in sandboxed frames; the tab still switches. */
      }
    },
    [variants, revealTab]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = variants.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  const v = variants[active];

  return (
    <div ref={rootRef} className="scroll-mt-20">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Pick the tool your workshop runs in"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {variants.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${item.slug}`}
              aria-selected={on}
              aria-controls={`panel-${item.slug}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={[
                'shrink-0 rounded-md border px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors',
                on
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line-strong text-muted hover:border-fg hover:text-fg',
              ].join(' ')}
            >
              {item.tool}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${v.slug}`}
        aria-labelledby={`tab-${v.slug}`}
        tabIndex={-1}
        className="card mt-5 p-5 md:p-7"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="heading-sm">
            <span className="text-accent">{v.tool}</span> Workshop
          </p>
          <p className="text-[0.8125rem] text-muted">{v.tag}</p>
        </div>

        <p className="mt-4 max-w-2xl text-[1.125rem] leading-snug text-fg md:text-[1.25rem]">{v.outcome}</p>

        <p className="label mt-7">You build</p>
        <ul className="mt-3 grid gap-2.5 md:grid-cols-3 md:gap-5">
          {v.build.map((b) => (
            <li key={b} className="flex gap-2.5 text-[0.9375rem] leading-snug text-muted">
              <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-muted">{v.needs}</p>
          <a href={v.href} className="btn btn-accent w-full shrink-0 sm:w-auto">
            Reserve a seat
          </a>
        </div>
      </div>
    </div>
  );
}
