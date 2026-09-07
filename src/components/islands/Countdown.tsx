import { useEffect, useState } from 'react';
import CouponUnlock from './CouponUnlock';
import { formatCohortDate, nextCohortAfter } from '../../data/mastermind';

interface Props {
  /** ISO 8601 with the +05:30 offset. Coupon expiry == cohort start. */
  expiresAt: string;
  /** The coupon code that makes the listed price free. */
  code: string;
  /** Date string the server already rendered, e.g. "Sat, 12 Sep 2026". */
  fallbackDate: string;
}

type Parts = { d: number; h: number; m: number; s: number };

function split(ms: number): Parts {
  const t = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(t / 86400), h: Math.floor(t / 3600) % 24, m: Math.floor(t / 60) % 60, s: t % 60 };
}

const pad = (n: number) => String(n).padStart(2, '0');

function spoken(p: Parts): string {
  const bits: string[] = [];
  if (p.d) bits.push(`${p.d} day${p.d === 1 ? '' : 's'}`);
  if (p.d || p.h) bits.push(`${p.h} hour${p.h === 1 ? '' : 's'}`);
  bits.push(`${p.m} minute${p.m === 1 ? '' : 's'}`);
  return bits.join(', ');
}

function Cell({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <span className="num block text-[1.75rem] leading-none text-accent md:text-[2rem]">{value}</span>
      <span className="mt-1.5 block text-[0.75rem] text-muted">{label}</span>
    </div>
  );
}

/**
 * One clock, two labels: the coupon expires at the instant the cohort starts,
 * so running two timers would only let them drift apart.
 *
 * SSR-safe. The server renders the stored date and no digits; `now` starts as
 * null and is only set in an effect, so the first client render matches the
 * server's HTML exactly (no hydration mismatch). When the deadline passes the
 * island rolls to the following Saturday 19:00 IST using the same helper the
 * page used at build time.
 */
export default function Countdown({ expiresAt, code, fallbackDate }: Props) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const stored = new Date(expiresAt).getTime();
  const rolled = now !== null && now >= stored;
  const target = rolled ? nextCohortAfter(new Date(now)).getTime() : stored;
  const dateLabel = now === null ? fallbackDate : formatCohortDate(new Date(target));
  const parts = now === null ? null : split(target - now);

  return (
    <div className="card p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="label">Coupon expires in</p>
        <p className="text-[0.8125rem] text-muted">
          Next cohort starts {dateLabel}, 7 PM IST
        </p>
      </div>

      {parts === null ? (
        <p className="num mt-4 text-[1.75rem] leading-none text-accent md:text-[2rem]">{fallbackDate}</p>
      ) : (
        <div className="mt-4 flex gap-5 md:gap-7" aria-hidden="true">
          <Cell value={String(parts.d)} label="days" />
          <Cell value={pad(parts.h)} label="hours" />
          <Cell value={pad(parts.m)} label="min" />
          <Cell value={pad(parts.s)} label="sec" />
        </div>
      )}

      {/* Announced at most once a minute: the text only changes when the
          minute does, so a screen reader is not read a ticking second hand. */}
      <p className="sr-only" aria-live="polite">
        {parts === null
          ? `Coupon valid until ${fallbackDate}, 7 PM IST.`
          : `Coupon expires in ${spoken(parts)}.`}
      </p>

      {rolled && (
        <p className="mt-3 text-[0.9375rem] text-fg">
          That weekend has started — the coupon renewed for the next weekend.
        </p>
      )}

      <div className="mt-5 border-t border-line pt-5">
        <CouponUnlock code={code} validUntil={dateLabel} />
      </div>
    </div>
  );
}
