import { useState } from 'react';

interface Props {
  /** Absolute canonical URL of the page being shared. */
  url: string;
  /** The sentence that travels with the link. */
  text: string;
}

async function writeClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    /* fall through */
  }
  try {
    const el = document.createElement('textarea');
    el.value = value;
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
 * Copy link + three plain intent URLs. No SDKs, no third-party script, no
 * tracking: the anchors are real links and work before this island hydrates.
 */
export default function ShareBar({ url, text }: Props) {
  const [status, setStatus] = useState<string | null>(null);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  const links = [
    { label: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={async () => setStatus((await writeClipboard(url)) ? 'Link copied.' : 'Copy failed — use the address bar.')}
        >
          Copy link
        </button>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            {l.label}
          </a>
        ))}
      </div>
      <p className="mt-2 min-h-4 text-[0.8125rem] text-muted" role="status">{status}</p>
    </div>
  );
}
