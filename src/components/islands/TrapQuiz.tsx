import { useState } from 'react';
import type { QuizQuestion } from '../../data/types';

interface Props {
  questions: QuizQuestion[];
  registerHref?: string;
  registerLabel?: string;
  acceleratorHref?: string;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="ml-auto size-4 shrink-0 text-accent" fill="none" aria-hidden="true">
      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" className="ml-auto size-4 shrink-0 text-fg" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function TrapQuiz({
  questions,
  registerHref = '#register',
  registerLabel = 'Register free',
  acceleratorHref = '/accelerator',
}: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = answered === questions.length;
  const score = questions.filter((q) => answers[q.id] === q.correct).length;
  const perfect = score === questions.length;

  return (
    <div aria-live="polite">
      <ol className="border-t border-line">
        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          return (
            <li key={q.id} className="border-b border-line py-8 first:pt-0">
              <fieldset>
                <legend className="text-base font-medium sm:text-lg">
                  <span className="font-label mr-3 text-muted">Q{qi + 1}</span>
                  {q.prompt}
                </legend>

                {q.context && (
                  <p className="mt-3 rounded-lg border border-line bg-bg px-4 py-3 font-mono text-sm text-muted">
                    {q.context}
                  </p>
                )}

                <div className="mt-4 grid gap-2">
                  {q.options.map((option, oi) => {
                    const isCorrect = submitted && oi === q.correct;
                    const isWrongPick = submitted && oi === chosen && oi !== q.correct;
                    const labelClass = submitted
                      ? isCorrect
                        ? 'border-accent/60 bg-accent/10 text-fg'
                        : isWrongPick
                          ? 'border-fg/30 text-fg'
                          : 'border-transparent text-muted'
                      : chosen === oi
                        ? 'border-line bg-surface-2 text-fg'
                        : 'border-transparent text-fg/80 hover:border-line hover:bg-surface-2';

                    return (
                      <label
                        key={oi}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors sm:text-base ${labelClass}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={oi}
                          checked={chosen === oi}
                          disabled={submitted}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                          className="mt-1 size-4 shrink-0 accent-accent"
                        />
                        <span>{option}</span>
                        {isCorrect && <CheckIcon />}
                        {isWrongPick && <XIcon />}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {submitted && (
                <p className="mt-4 rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-muted">
                  <span className="font-medium text-accent">Why: </span>
                  {q.why}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-40"
          >
            See my score
          </button>
          <p className="text-sm text-muted" aria-live="polite">
            {answered} of {questions.length} answered
          </p>
        </div>
      ) : (
        <div className="card mt-8 p-6 text-center sm:p-10">
          <p className="font-label text-muted">Your score</p>
          <p className="mt-2 font-display text-6xl leading-none">
            {score}
            <span className="text-muted"> / {questions.length}</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-base sm:text-lg">
            {perfect ? "You're ready for the Accelerator." : 'Score low? Join the Mastermind to find out why.'}
          </p>
          <div className="mt-6">
            {perfect ? (
              <a
                href={acceleratorHref}
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover"
              >
                Explore the Accelerator
              </a>
            ) : (
              <a
                href={registerHref}
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover"
              >
                {registerLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
