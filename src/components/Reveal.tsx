"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Fades its content up once, the first time it scrolls into view. */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Layout effect so content is hidden before first paint (no flicker)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
