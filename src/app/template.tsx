"use client";

import { usePathname } from "next/navigation";

/**
 * Fade-up entrance on every page. Keyed by the URL path so it also replays
 * between pages in the same section (e.g. /blog → /blog/[slug]), where the
 * root template alone would stay mounted.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
