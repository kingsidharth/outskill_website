import { useState } from 'react';

type Answer = 'coders' | 'vibe';

const QUESTIONS: { id: string; prompt: string; options: { label: string; value: Answer }[] }[] = [
  {
    id: 'code',
    prompt: 'When something needs building, what do you open?',
    options: [
      { label: 'An editor and a terminal', value: 'coders' },
      { label: 'A chat window or a no-code tool', value: 'vibe' },
    ],
  },
  {
    id: 'goal',
    prompt: 'What would make the next three months worth it?',
    options: [
      { label: 'My team ships faster with agents in the loop', value: 'coders' },
      { label: 'My idea exists and people can use it', value: 'vibe' },
    ],
  },
];

const RESULTS = {
  coders: {
    title: 'Start on the coder track',
    body: 'Take the Claude Code, Codex, or Copilot workshop this week, then the free weekend Mastermind.',
    href: '/coders',
    cta: 'Open the coder track',
  },
  vibe: {
    title: 'Start on the vibe coder track',
    body: 'Take the ChatGPT workshop this week, then the free weekend Mastermind — no code required.',
    href: '/vibe-coders',
    cta: 'Open the vibe track',
  },
} as const;

export default function PathChooser() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const done = QUESTIONS.every((q) => answers[q.id]);
  const coders = Object.values(answers).filter((a) => a === 'coders').length;
  const result = RESULTS[coders >= 1 && coders >= Object.values(answers).length - coders ? 'coders' : 'vibe'];

  return (
    <div className="card p-5 md:p-7">
      <p className="label">Not sure? Two questions.</p>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {QUESTIONS.map((q) => (
          <fieldset key={q.id}>
            <legend className="heading-xs">{q.prompt}</legend>
            <div className="mt-3 flex flex-col gap-2">
              {q.options.map((o) => {
                const active = answers[q.id] === o.value;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                    aria-pressed={active}
                    className={`rounded-md border px-4 py-3 text-left text-[0.9375rem] transition-colors ${
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="heading-xs text-accent">{result.title}</p>
              <p className="mt-1 text-[0.9375rem] text-muted">{result.body}</p>
            </div>
            <a href={result.href} className="btn btn-accent btn-sm shrink-0">
              {result.cta}
            </a>
          </div>
        ) : (
          <p className="text-[0.9375rem] text-muted">Answer both to get a starting point.</p>
        )}
      </div>
    </div>
  );
}
