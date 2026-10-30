import Link from "next/link";
import { SOCIAL } from "@/lib/site";
import SocialLink from "@/components/SocialLink";

/**
 * Three-column footer: logo left, links + social centred on the page,
 * copyright right. Stacks and centres on smaller screens.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-ink px-4 pb-24 pt-12 text-chalk sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 items-center justify-items-center gap-6 text-center font-mono text-[11px] uppercase tracking-[0.12em] lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        <Link
          href="/"
          className="font-display text-3xl font-black normal-case leading-none tracking-wide transition-colors duration-300 hover:text-accent lg:justify-self-start"
        >
          REP THEORY
        </Link>

        <div className="flex flex-col items-center gap-4.5 sm:flex-row sm:gap-6">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="transition-colors duration-300 hover:text-accent">
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/privacy#cookie-settings"
                className="transition-colors duration-300 hover:text-accent"
              >
                Cookie settings
              </Link>
            </li>
          </ul>
          <span aria-hidden="true" className="hidden h-6 w-px bg-[#3a3a3a] sm:block" />
          <ul aria-label="Rep Theory on social media" className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <li key={s.name} className="flex">
                <SocialLink profile={s} />
              </li>
            ))}
          </ul>
        </div>

        <span className="text-ash lg:justify-self-end lg:text-right">
          © 2026 Rep Theory · CP340-B group project
        </span>
      </div>
    </footer>
  );
}
