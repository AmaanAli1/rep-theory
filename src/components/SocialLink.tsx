import SocialIcon from "@/components/SocialIcon";
import type { SOCIAL } from "@/lib/site";

type Profile = (typeof SOCIAL)[number];

/**
 * Square social icon. Links out when the profile has a real URL; until then
 * it still shows (so visitors see where we'll be) with a "launching soon"
 * tooltip, and never points at an account we don't own.
 */
export default function SocialLink({ profile: s, size = "size-10" }: { profile: Profile; size?: string }) {
  const base = `group relative inline-flex ${size} items-center justify-center border-2 border-chalk transition`;
  if (s.url) {
    return (
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Rep Theory on ${s.name} (opens in a new tab)`}
        className={`${base} hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent hover:text-ink hover:shadow-[3px_3px_0_var(--color-chalk)]`}
      >
        <SocialIcon name={s.name} />
      </a>
    );
  }
  return (
    <span
      role="img"
      tabIndex={0}
      aria-label={`${s.name}: ${s.handle}, launching soon`}
      className={`${base} cursor-default outline-none hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent`}
    >
      <SocialIcon name={s.name} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] right-0 hidden animate-fade-in whitespace-nowrap bg-chalk px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink group-hover:block group-focus-visible:block"
      >
        {s.name} · soon
      </span>
    </span>
  );
}
