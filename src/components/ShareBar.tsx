"use client";

import { useEffect, useRef, useState } from "react";
import SocialIcon from "@/components/SocialIcon";
import { SITE_URL } from "@/lib/site";

/**
 * Plain share links: no platform scripts, no tracking cookies, so they don't
 * need cookie consent.
 */
export default function ShareBar({ path, title }: { path: string; title: string }) {
  const url = `${SITE_URL}${path}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(`${title} | Rep Theory`);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const links = [
    { name: "X" as const, href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "Facebook" as const, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "LinkedIn" as const, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        Share
      </span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.name} (opens in a new tab)`}
          className="inline-flex size-10 items-center justify-center border-2 border-ink transition-colors hover:bg-ink hover:text-chalk"
        >
          <SocialIcon name={l.name} />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 items-center gap-2 border-2 border-ink px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-chalk"
      >
        <SocialIcon name="Link" className="size-[17px]" />
        <span aria-live="polite">{copied ? "✓ Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
