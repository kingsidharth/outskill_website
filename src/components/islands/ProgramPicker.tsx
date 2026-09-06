import { useState, useCallback } from 'react';
import type { Site, Program } from '../../data/types';

type PickerQuestion = Site['hub']['picker'][number];
type ProgramSummary = Pick<Program, 'slug' | 'name' | 'headline' | 'price'>;

interface Props {
  questions: PickerQuestion[];
  programs: ProgramSummary[];
}

type Answer = number | null;

const slugs: Program['slug'][] = ['mastermind', 'bootcamp', 'accelerator', 'fellowship'];

function rankPrograms(answers: number[], questions: PickerQuestion[]): ProgramSummary | null {
  const scores: Record<string, number> = { mastermind: 0, bootcamp: 0, accelerator: 0, fellowship: 0 };
  for (let q = 0; q < answers.length; q++) {
    const ans = answers[q];
    if (ans === null || ans === undefined) return null;
    const weights = questions[q].options[ans].weights;
    for (const [slug, w] of Object.entries(weights)) {
      scores[slug] += w;
    }
  }
  let best: string | null = null;
  let bestScore = -1;
  for (const slug of slugs) {
    if (scores[slug] > bestScore) {
      bestScore = scores[slug];
      best = slug;
    }
  }
  return null; // returned via lookup
}

export default function ProgramPicker({ questions, programs }: Props) {
  const [answers, setAnswers] = useState<Answer[]>(questions.map(() => null));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const currentQ = questions[step];

  const select = useCallback((idx: number) => {
    const next = [...answers];
    next[step] = idx;
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }, [step, answers, questions.length]);

  const startOver = useCallback(() => {
    setAnswers(questions.map(() => null));
    setStep(0);
    setDone(false);
  }, [questions]);

  const prevStep = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step]);

  const answeredCount = answers.filter((a) => a !== null).length;

  const scored = done && answers.every((a) => a !== null);
  let recommended: ProgramSummary | null = null;
  if (scored) {
    const scores: Record<string, number> = { mastermind: 0, bootcamp: 0, accelerator: 0, fellowship: 0 };
    for (let q = 0; q < answers.length; q++) {
      const w = questions[q].options[answers[q]!].weights;
      for (const [slug, val] of Object.entries(w)) {
        scores[slug] += val;
      }
    }
    let best = '';
    let bestScore = -1;
    for (const slug of slugs) {
      if (scores[slug] > bestScore) {
        bestScore = scores[slug];
        best = slug;
      }
    }
    recommended = programs.find((p) => p.slug === best) ?? null;
  }

  return (
    <div
      className="card p-6 sm:p-8"
      role="region"
      aria-label="Program recommendation quiz"
      aria-live="polite"
    >
      {/* Progress dots */}
      <div className="flex items-center gap-2" role="progressbar" aria-valuenow={answeredCount} aria-valuemin={0} aria-valuemax={questions.length}>
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i < answeredCount ? 'bg-accent' : 'bg-line'}`}
            aria-hidden="true"
          />
        ))}
        <span className="font-label ml-2 text-xs text-muted">{answeredCount}/{questions.length}</span>
      </div>

      {!done && currentQ && (
        <div className="mt-6">
          <fieldset>
            <legend className="text-lg font-medium">{currentQ.question}</legend>
            <div className="mt-4 space-y-2">
              {currentQ.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    answers[step] === i
                      ? 'border-accent bg-accent/10'
                      : 'border-line hover:border-fg/25'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${step}`}
                    value={i}
                    checked={answers[step] === i}
                    onChange={() => select(i)}
                    className="size-4 accent-accent"
                  />
                  <span className="text-sm sm:text-base">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-4 flex items-center gap-3">
            {step > 0 && (
              <button type="button" onClick={prevStep} className="btn-ghost text-sm">
                Back
              </button>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="mt-6">
          {recommended ? (
            <div>
              <p className="eyebrow text-accent">Recommended for you</p>
              <p className="mt-2 text-2xl font-display">{recommended.name}</p>
              <p className="mt-1 text-sm text-muted">{recommended.headline}</p>
              <p className="mt-2 text-sm">
                {recommended.price.original && (
                  <span className="mr-1.5 text-muted line-through">{recommended.price.original}</span>
                )}
                <span className="font-medium text-accent">{recommended.price.current}</span>
              </p>
              <a
                href={`/${recommended.slug}`}
                className="btn-accent mt-4 inline-flex"
              >
                View {recommended.name}
              </a>
            </div>
          ) : (
            <p className="text-muted">Could not determine a recommendation. Try again.</p>
          )}
          <button type="button" onClick={startOver} className="btn-ghost mt-4 text-sm">
            Start over
          </button>
        </div>
      )}
    </div>
  );
}