import { useEffect, useState } from 'react';

type Props = {
  /** Date string rendered by the server at build time. */
  fallback: string;
  time: string;
};

function nextSlot(from: Date): Date {
  // 19:00 IST == 13:30 UTC on the same calendar day.
  const IST = 5.5 * 60 * 60 * 1000;
  const ist = new Date(from.getTime() + IST);
  const slot = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), 13, 30, 0));
  if (slot.getTime() <= from.getTime()) slot.setUTCDate(slot.getUTCDate() + 1);
  return slot;
}

/**
 * The page is prerendered, so the server-side date can go stale. This island
 * recomputes it on mount; until then the build-time string is shown.
 */
export default function NextSession({ fallback, time }: Props) {
  const [label, setLabel] = useState(fallback);

  useEffect(() => {
    // Hand-rolled so the month matches the workshop LPs ("Sep", not Intl's en-IN "Sept").
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const ist = new Date(nextSlot(new Date()).getTime() + 5.5 * 60 * 60 * 1000);
    setLabel(`${DAYS[ist.getUTCDay()]}, ${ist.getUTCDate()} ${MONTHS[ist.getUTCMonth()]}`);
  }, []);

  // V4: rendered exactly like any other InfoBlock value — Fira Sans semibold in
  // `fg`. No `.num`, no accent. The component carries the style itself because
  // its call sites wrap it in containers of different sizes.
  return (
    <span className="font-semibold text-fg">
      {label} at {time}
    </span>
  );
}
