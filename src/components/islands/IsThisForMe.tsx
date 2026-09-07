import { useMemo, useState } from 'react';

/**
 * Clickable "Is this for me?" checklist (BRIEF-V3 §2).
 * The visitor ticks statements; the verdict line updates live.
 */
interface Props {
  statements: string[];
  programLabel: string;
  /** Threshold (inclusive) at which the program "fits". Default: ceil(n/2). */
  fitAt?: number;
  fitCta: { label: string; href: string };
  fallbackCta: { label: string; href: string };
  fallbackLabel?: string;
}

export default function IsThisForMe({ statements, programLabel, fitAt, fitCta, fallbackCta, fallbackLabel = 'the Mastermind' }: Props) {
  const [ticked, setTicked] = useState<boolean[]>(() => statements.map(() => false));
  const count = ticked.filter(Boolean).length;
  const threshold = fitAt ?? Math.ceil(statements.length / 2);
  const fits = count >= threshold;
  const touched = count > 0;

  const verdict = useMemo(() => {
    if (!touched) return 'Tick what is true for you.';
    if (fits) return `${count} of ${statements.length} — ${programLabel} fits.`;
    return `${count} of ${statements.length} — start with ${fallbackLabel}.`;
  }, [touched, fits, count, statements.length, programLabel, fallbackLabel]);

  return (
    <div className="card p-5 sm:p-8">
      <ul className="grid gap-2 sm:grid-cols-2">
        {statements.map((s, i) => {
          const on = ticked[i];
          return (
            <li key={i}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-[0.9375rem] leading-snug transition-colors ${
                  on ? 'border-accent bg-accent-dim text-fg' : 'border-line text-fg/85 hover:border-line-strong'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-[0.2rem] size-4 shrink-0 accent-accent"
                  checked={on}
                  onChange={() => setTicked((t) => t.map((v, j) => (j === i ? !v : v)))}
                />
                <span>{s}</span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[1.0625rem] font-semibold" aria-live="polite">
          {verdict}
        </p>
        {touched && (
          <a
            href={fits ? fitCta.href : fallbackCta.href}
            className={`btn btn-sm w-full sm:w-auto ${fits ? 'btn-accent' : 'btn-ghost'}`}
          >
            {fits ? fitCta.label : fallbackCta.label}
          </a>
        )}
      </div>
    </div>
  );
}
