import { useMemo, useState } from 'react';

/**
 * "Still unsure?" — six prompts, three answers each (BRIEF-V3 §4).
 *
 * The tally is always visible; the verdict appears once at least four prompts
 * have an answer, so a single click never produces a recommendation.
 * Each prompt is a radio group in its own fieldset/legend.
 */

type Choice = 'want' | 'meh' | 'technical';

const CHOICES: { value: Choice; label: string }[] = [
  { value: 'want', label: 'Want to know' },
  { value: 'meh', label: 'Meh' },
  { value: 'technical', label: 'Too technical' },
];

interface Prompt {
  id: string;
  prompt: string;
}

interface Props {
  prompts: Prompt[];
  /** Role options shown beside the last prompt. They do not affect the tally. */
  roles?: string[];
  rolesLine?: string;
  applyHref?: string;
  mastermindHref?: string;
  workshopsHref?: string;
}

export default function StillUnsure({
  prompts,
  roles = [],
  rolesLine = '',
  applyHref = '#apply',
  mastermindHref = '/mastermind',
  workshopsHref = '/workshops',
}: Props) {
  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const [role, setRole] = useState<string | null>(null);

  const tally = useMemo(() => {
    const t = { want: 0, meh: 0, technical: 0 };
    for (const v of Object.values(answers)) t[v] += 1;
    return t;
  }, [answers]);

  const answered = tally.want + tally.meh + tally.technical;

  const verdict = useMemo(() => {
    if (answered < 4) return null;
    if (tally.want >= 4) {
      return {
        line: `${tally.want} × want to know — you'll like the Accelerator.`,
        cta: { label: 'Apply now', href: applyHref },
      };
    }
    if (tally.technical >= tally.meh && tally.technical >= tally.want) {
      return {
        line: 'Mostly too technical — start with the Mastermind.',
        cta: { label: 'See the Mastermind', href: mastermindHref },
      };
    }
    if (tally.meh >= tally.want) {
      return {
        line: 'Mostly meh — try a 90-minute workshop first.',
        cta: { label: 'Browse workshops', href: workshopsHref },
      };
    }
    return {
      line: `${tally.want} × want to know — you'll like the Accelerator.`,
      cta: { label: 'Apply now', href: applyHref },
    };
  }, [answered, tally, applyHref, mastermindHref, workshopsHref]);

  return (
    <div>
      <ol className="grid gap-3 md:grid-cols-2">
        {prompts.map((p, i) => {
          const current = answers[p.id];
          return (
            <li key={p.id} className="card p-5 md:p-6">
              <fieldset>
                <legend>
                  <span className="label text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-2 block text-[1rem] leading-snug text-fg">{p.prompt}</span>
                </legend>

                <div className="mt-4 flex flex-wrap gap-2">
                  {CHOICES.map((c) => {
                    const on = current === c.value;
                    return (
                      <label
                        key={c.value}
                        className={`cursor-pointer rounded-md border px-3 py-2 text-[0.875rem] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                          on ? 'border-accent bg-accent-dim text-fg' : 'border-line text-muted hover:border-line-strong hover:text-fg'
                        }`}
                      >
                        <input
                          type="radio"
                          name={p.id}
                          value={c.value}
                          className="sr-only"
                          checked={on}
                          onChange={() => setAnswers((a) => ({ ...a, [p.id]: c.value }))}
                        />
                        {c.label}
                      </label>
                    );
                  })}
                </div>

                {i === prompts.length - 1 && roles.length > 0 && (
                  <div className="mt-5 border-t border-line pt-4">
                    <div className="flex flex-wrap gap-2">
                      {roles.map((r) => (
                        <button
                          key={r}
                          type="button"
                          aria-pressed={role === r}
                          onClick={() => setRole((prev) => (prev === r ? null : r))}
                          className={`rounded-md border px-3 py-1.5 text-[0.8125rem] transition-colors ${
                            role === r ? 'border-accent text-accent' : 'border-line text-muted hover:border-line-strong hover:text-fg'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-[0.875rem] text-muted">{rolesLine}</p>
                  </div>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="card mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div aria-live="polite">
          <p className="label text-muted">
            {tally.want} want to know · {tally.meh} meh · {tally.technical} too technical
          </p>
          <p className="mt-1.5 text-[1.0625rem] font-semibold">
            {verdict ? verdict.line : `Answer ${4 - answered} more to see where you fit.`}
          </p>
        </div>
        {verdict && (
          <a href={verdict.cta.href} className="btn btn-ghost btn-sm w-full shrink-0 sm:w-auto">
            {verdict.cta.label}
          </a>
        )}
      </div>
    </div>
  );
}
