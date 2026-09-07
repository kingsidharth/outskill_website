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
                <legend className="heading-xs">
                  <span className="num mr-3 text-[0.875rem] text-accent">Q{qi + 1}</span>
                  {q.prompt}
                </legend>

                {q.context && (
                  <p className="mt-3 rounded-md border border-line bg-bg px-4 py-3 font-mono text-[0.875rem] text-muted">
                    {q.context}
                  </p>
                )}

                <div className="mt-4 grid gap-2">
                  {q.options.map((option, oi) => {
                    const isCorrect = submitted && oi === q.correct;
                    const isWrongPick = submitted && oi === chosen && oi !== q.correct;
                    const labelClass = submitted
                      ? isCorrect
                        ? 'border-accent/50 bg-accent-dim/30 text-fg'
                        : isWrongPick
                          ? 'border-fg/30 text-fg'
                          : 'border-transparent text-muted'
                      : chosen === oi
                        ? 'border-line bg-surface-2 text-fg'
                        : 'border-transparent text-fg/80 hover:border-line hover:bg-surface-2';

                    return (
                      <label
                        key={oi}
                        className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-[0.9375rem] transition-colors ${labelClass}`}
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
                <p className="mt-4 rounded-md border border-line bg-surface-2 px-4 py-3 text-[0.9375rem] leading-relaxed text-muted">
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
            className="btn btn-accent disabled:pointer-events-none disabled:opacity-40"
          >
            See my score
          </button>
          <p className="text-[0.9375rem] text-muted" aria-live="polite">
            {answered} of {questions.length} answered
          </p>
        </div>
      ) : (
        <div className="card mt-8 p-5 text-center md:p-10">
          <p className="label">Your score</p>
          <p className="num mt-2 text-[3rem] leading-none text-accent md:text-[3.5rem]">
            {score}
            <span className="text-faint"> / {questions.length}</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-[1.0625rem]">
            {perfect ? "You're ready for the Accelerator." : 'Score low? Join the Mastermind to find out why.'}
          </p>
          <div className="mt-6">
            {perfect ? (
              <a
                href={acceleratorHref}
                className="btn btn-ghost"
              >
                Explore the Accelerator
              </a>
            ) : (
              <a
                href={registerHref}
                className="btn btn-accent"
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
