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
    setLabel(
      new Intl.DateTimeFormat('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: 'Asia/Kolkata',
      }).format(nextSlot(new Date()))
    );
  }, []);

  return (
    <span>
      <span className="num text-accent">{label}</span>
      <span className="text-muted"> · {time}</span>
    </span>
  );
}
