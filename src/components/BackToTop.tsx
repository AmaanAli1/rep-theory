"use client";

import { useEffect, useState } from "react";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Fixed ↑ button that appears after one screen of scrolling and eases back to the top. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const start = window.scrollY;
    if (start <= 0) return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.scrollTo(0, 0);
    } else {
      // A custom ease: native smooth scrolling feels rushed on long pages
      const duration = Math.min(1100, 500 + start / 6);
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      let t0: number | null = null;
      const step = (ts: number) => {
        if (t0 === null) t0 = ts;
        const k = Math.min(1, (ts - t0) / duration);
        window.scrollTo(0, start * (1 - easeInOutCubic(k)));
        if (k < 1) requestAnimationFrame(step);
        else root.style.scrollBehavior = previous;
      };
      requestAnimationFrame(step);
    }
    // Move keyboard focus back to the top of the page too
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-40 flex size-13 items-center justify-center border-2 border-chalk bg-ink font-mono text-xl text-chalk transition duration-300 hover:-translate-y-[3px] hover:border-ink hover:bg-accent hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent motion-reduce:transition-none ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      ↑
    </button>
  );
}
