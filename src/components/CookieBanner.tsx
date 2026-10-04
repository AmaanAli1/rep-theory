"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { saveConsent, useConsent } from "@/lib/consent";

/** First-visit cookie choice, bottom-left. Hidden once a choice is saved. */
export default function CookieBanner() {
  const consent = useConsent();
  const pathname = usePathname();
  const router = useRouter();

  // undefined = still on the server / not hydrated; object = already chose
  if (consent !== null) return null;

  const customize = () => {
    if (pathname === "/privacy") {
      const target = document.getElementById("cookie-settings");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      target?.querySelector<HTMLElement>("[role=switch]:not(:disabled)")?.focus({
        preventScroll: true,
      });
    } else {
      router.push("/privacy#cookie-settings");
    }
  };

  return (
    <section
      role="region"
      aria-label="Cookie choices"
      className="fixed bottom-4 left-4 right-4 z-40 flex max-w-[32.5rem] flex-col gap-3.5 border-2 border-chalk bg-ink p-5.5 text-chalk shadow-[8px_8px_0_var(--color-accent)] sm:bottom-6 sm:left-6 sm:right-auto"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        Cookies
      </span>
      <p className="leading-relaxed">
        Essential cookies keep the site working. Analytics and marketing stay
        off unless you turn them on.{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 transition-colors hover:text-accent"
        >
          Privacy policy
        </Link>
      </p>
      <div className="flex flex-wrap gap-2.5 font-mono text-xs uppercase tracking-[0.14em]">
        <button
          type="button"
          onClick={() => saveConsent({ analytics: true, marketing: true })}
          className="bg-chalk px-4.5 py-3 uppercase text-ink transition-colors duration-300 hover:bg-ember hover:text-[#f4f1ea]"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => saveConsent({ analytics: false, marketing: false })}
          className="border-2 border-chalk px-4 py-2.5 uppercase transition-colors duration-300 hover:bg-chalk hover:text-ink"
        >
          Reject all
        </button>
        <button
          type="button"
          onClick={customize}
          className="px-1.5 py-2.5 uppercase transition-colors duration-300 hover:text-accent"
        >
          Customize
        </button>
      </div>
    </section>
  );
}
