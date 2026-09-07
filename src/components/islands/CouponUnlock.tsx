import { useState } from 'react';

interface Props {
  /** The code that takes the listed price to zero. */
  code: string;
  /** Human date the coupon stops working, e.g. "Sat, 12 Sep 2026". */
  validUntil: string;
}

/**
 * "Reveal coupon" -> the code, with copy-to-clipboard.
 *
 * Not an island on its own: it is rendered inside Countdown so the two share
 * one expiry instant and one hydration boundary.
 */
export default function CouponUnlock({ code, validUntil }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Copied.');
    } catch {
      setStatus('Select the code above and copy it.');
    }
  };

  if (!revealed) {
    return (
      <div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRevealed(true)}>
          Reveal coupon
        </button>
        <p className="mt-2 text-[0.8125rem] text-muted">Valid until {validUntil}, 7 PM IST.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <code className="num rounded-md border border-accent/45 bg-accent-dim/30 px-3 py-2 text-[0.9375rem] text-accent">
          {code}
        </code>
        <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
          Copy code
        </button>
      </div>
      <p className="mt-2 text-[0.8125rem] text-muted" role="status">
        {status ? `${status} ` : ''}Valid until {validUntil}, 7 PM IST.
      </p>
    </div>
  );
}
