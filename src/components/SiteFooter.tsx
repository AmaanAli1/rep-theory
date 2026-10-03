import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-ink px-4 py-12 text-chalk sm:px-8 lg:px-12">
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
            {/* Wired to the cookie consent banner in the privacy step */}
            <button
              type="button"
              className="uppercase transition-colors duration-300 hover:text-accent"
            >
              Cookie settings
            </button>
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
          © 2026 Rep Theory · A CP340 student project
        </span>
      </div>
    </footer>
  );
}
