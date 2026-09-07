import { useState } from 'react';

/**
 * Three questions, one recommended rung. A workshop-page variant of
 * PathChooser: that one splits coders from vibe coders, this one answers
 * "which step next?".
 *
 * Results are hardcoded rather than imported from `ladder.ts` on purpose —
 * cards never show amounts (BRIEF-V3 §2) and there is no reason to ship rupee
 * strings into the client bundle. Tier labels only.
 */

type Q = { id: string; prompt: string; options: { label: string; weight: number }[] };

const QUESTIONS: Q[] = [
  {
    id: 'time',
    prompt: 'How much time can you actually give this?',
    options: [
      { label: 'An evening, no more', weight: 0 },
      { label: 'One weekend', weight: 1 },
      { label: 'A couple of weeks', weight: 2.6 },
      { label: 'Months, if it pays off', weight: 4 },
    ],
  },
  {
    id: 'goal',
    prompt: 'What would make it worth it?',
    options: [
      { label: 'One thing working by tonight', weight: 0 },
      { label: 'A few demos I can show', weight: 1 },
      { label: 'A system of my own, deployed', weight: 2.6 },
      { label: 'Leading AI work where I am', weight: 4 },
    ],
  },
  {
    id: 'now',
    prompt: 'Where are you starting from?',
    options: [
      { label: 'I use AI in a chat window', weight: 0.4 },
      { label: 'I build with AI tools, little code', weight: 1 },
      { label: 'I ship software professionally', weight: 2.4 },
      { label: 'I already run agents in production', weight: 3.6 },
    ],
  },
];

const RESULTS = [
  {
    name: 'A 90-minute workshop',
    tier: 'Free',
    body: 'Start here. One session, one working thing, nothing to pay.',
    cta: 'See the workshops',
    href: '/workshops',
  },
  {
    name: 'The 2-day Mastermind',
    tier: 'Free',
    body: 'One weekend, three working demos, and a clear idea of what to take further.',
    cta: 'See the Mastermind',
    href: '/mastermind',
  },
  {
    name: 'The Bootcamp',
    tier: 'Paid',
    body: 'Two weeks of evening sprints. You build and deploy a coding agent of your own.',
    cta: 'See the Bootcamp',
    href: '/bootcamp',
  },
  {
    name: 'The Accelerator',
    tier: 'By application',
    body: 'Fourteen days back-to-back, prototype to production: evals, cost controls, monitoring.',
    cta: 'See the Accelerator',
    href: '/accelerator',
  },
  {
    name: 'The Fellowship',
    tier: 'By application',
    body: 'Six months of weekends, ending in a capstone system you built and defended.',
    cta: 'See the Fellowship',
    href: '/fellowship',
  },
];

export default function HelpMeDecide() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const picked = QUESTIONS.filter((q) => answers[q.id] !== undefined);
  const done = picked.length === QUESTIONS.length;
  const avg = picked.length ? picked.reduce((s, q) => s + answers[q.id], 0) / picked.length : 0;
  const result = RESULTS[Math.min(RESULTS.length - 1, Math.max(0, Math.round(avg)))];

  return (
    <div className="card p-5 md:p-7" data-help-me-decide>
      <p className="label">Help me decide · three questions</p>

      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {QUESTIONS.map((q) => (
          <fieldset key={q.id}>
            <legend className="heading-xs">{q.prompt}</legend>
            <div className="mt-3 flex flex-col gap-2">
              {q.options.map((o) => {
                const active = answers[q.id] === o.weight;
                return (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.weight }))}
                    className={`rounded-md border px-4 py-2.5 text-left text-[0.9375rem] transition-colors ${
                      active
                        ? 'border-accent bg-accent-dim text-fg'
                        : 'border-line text-muted hover:border-line-strong hover:text-fg'
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div
        className="mt-6 border-t border-line pt-5"
        aria-live="polite"
        style={{ opacity: done ? 1 : 0.45 }}
      >
        {done ? (
          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            data-help-me-decide-result
          >
            <div className="min-w-0">
              <p className="heading-xs text-accent">{result.name}</p>
              <p className="mt-1 text-[0.9375rem] text-muted">
                <span className="text-fg">{result.tier}</span> · {result.body}
              </p>
            </div>
            <a href={result.href} className="btn btn-ghost btn-sm shrink-0">
              {result.cta}
            </a>
          </div>
        ) : (
          <p className="text-[0.9375rem] text-muted">
            Answer all three and we will point at one step.
          </p>
        )}
      </div>
    </div>
  );
}
