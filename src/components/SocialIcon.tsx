/** Simple monochrome glyphs for social links (they inherit text colour). */
export type IconName = "Instagram" | "TikTok" | "X" | "Facebook" | "LinkedIn" | "Link";

export default function SocialIcon({
  name,
  className = "size-[18px]",
}: {
  name: IconName;
  className?: string;
}) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, className };
  switch (name) {
    case "Instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M14 3c.4 2.8 2.2 4.6 5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "X":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" fill="currentColor" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common}>
          <rect x="3" y="9" width="4" height="12" fill="currentColor" />
          <circle cx="5" cy="5" r="2.2" fill="currentColor" />
          <path d="M10 9h4v2c.8-1.4 2.2-2.2 4-2.2 2.6 0 4 1.7 4 5V21h-4v-6.5c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1 1-2.1 2.5V21h-4z" fill="currentColor" />
        </svg>
      );
    case "Link":
      return (
        <svg {...common}>
          <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
