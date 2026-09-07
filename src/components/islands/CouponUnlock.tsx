import { useState } from 'react';

interface Props {
  /** The code that takes the listed price to zero. */
  code: string;
  /** Human date the coupon stops working, e.g. "Fri, 11 Sep 2026". */
  validUntil: string;
  /**
   * Show the code straight away. The quiz result page passes this: the four
   * questions were the gate, so a second "Reveal" click would be theatre.
   */
  revealed?: boolean;
}

/** Clipboard API first; a throwaway textarea for browsers that refuse it. */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* fall through */
  }
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

/**
 * The coupon code, with copy-to-clipboard.
 *
 * Used two ways: inside Countdown on a page that still gates it behind a
 * click, and standalone on /quiz/result/<score> where it is already earned.
 */
export default function CouponUnlock({ code, validUntil, revealed: initial = false }: Props) {
  const [revealed, setRevealed] = useState(initial);
  const [status, setStatus] = useState<string | null>(null);

  const copy = async () => {
    setStatus((await writeClipboard(code)) ? 'Copied.' : 'Select the code above and copy it.');
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
