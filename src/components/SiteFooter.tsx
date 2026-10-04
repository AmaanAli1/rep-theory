import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-ink px-4 pb-24 pt-12 text-chalk sm:px-8 sm:pb-12 sm:pr-24 lg:pl-12">
      <div className="flex flex-wrap items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.12em]">
        <Link
          href="/"
          className="font-display text-3xl font-black normal-case tracking-wide transition-colors duration-300 hover:text-accent"
        >
          REP THEORY
        </Link>
        <ul className="flex flex-wrap gap-6">
          <li>
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-accent"
            >
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
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-accent"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-accent"
            >
              TikTok
            </a>
          </li>
        </ul>
        <span className="text-ash">
          © 2026 Rep Theory · CP340-B group project
        </span>
      </div>
    </footer>
  );
}
