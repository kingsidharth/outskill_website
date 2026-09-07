import { useState } from 'react';
import type { QuizQuestion } from '../../data/types';

interface Props {
  questions: QuizQuestion[];
  /** Result pages are prerendered at `<resultBase><score>`, score 0..4. */
  resultBase?: string;
}

/**
 * The four trap questions. Answers are never scored in place any more — on
 * submit the browser navigates to the prerendered, shareable result page,
 * which is where the explanations and the coupon live (BRIEF-V4 §5).
 *
 * Nothing is stored and nothing is posted: the score is a path segment.
 */
export default function TrapQuiz({ questions, resultBase = '/quiz/result/' }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [going, setGoing] = useState(false);

  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = answered === questions.length;
  const score = questions.filter((q) => answers[q.id] === q.correct).length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered || going) return;
    setGoing(true);
    window.location.assign(`${resultBase}${score}`);
  };

  return (
    <form onSubmit={submit}>
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
                  {q.options.map((option, oi) => (
                    <label
                      key={oi}
                      className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-[0.9375rem] transition-colors ${
                        chosen === oi
                          ? 'border-line bg-surface-2 text-fg'
                          : 'border-transparent text-fg/80 hover:border-line hover:bg-surface-2'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={oi}
                        checked={chosen === oi}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className="mt-1 size-4 shrink-0 accent-accent"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!allAnswered || going}
          className="btn btn-accent disabled:pointer-events-none disabled:opacity-40"
        >
          See my score
        </button>
        <p className="text-[0.9375rem] text-muted" aria-live="polite">
          {answered} of {questions.length} answered
        </p>
      </div>
    </form>
  );
}
