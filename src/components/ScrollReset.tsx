"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Start every new page at the very top.
 * Next.js scrolls to the top of the page *content*, which sits under the
 * sticky header, so pages would open a header's height down.
 * Skipped for #section links (e.g. /equipment#straps) and for the
 * browser's back/forward buttons, which restore your old position.
 */
export default function ScrollReset() {
  const pathname = usePathname();
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
