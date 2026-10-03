/** Technical line drawings used instead of product photos.
 *  Strokes use currentColor, so the parent sets the line colour;
 *  the orange parts mark the feature that matters on each product. */

export type DrawingKind =
  "straps" | "figure8" | "wraps" | "latbar" | "rope" | "clips";

const ORANGE = "var(--color-accent)";

function Lines({ kind }: { kind: DrawingKind }) {
  switch (kind) {
    case "straps":
      return (
        <>
          <circle cx="22" cy="52" r="12" />
          <rect x="30" y="44" width="56" height="16" rx="2" />
          <line
            x1="34"
            y1="48"
            x2="82"
            y2="48"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <line
            x1="34"
            y1="56"
            x2="82"
            y2="56"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <rect
            x="42"
            y="48"
            width="18"
            height="8"
            fill={ORANGE}
            stroke="none"
          />
          <line x1="30" y1="32" x2="86" y2="32" strokeWidth="1" />
          <line x1="30" y1="28" x2="30" y2="36" strokeWidth="1" />
          <line x1="86" y1="28" x2="86" y2="36" strokeWidth="1" />
        </>
      );
    case "figure8":
      return (
        <>
          <ellipse cx="48" cy="30" rx="18" ry="15" />
          <ellipse cx="48" cy="66" rx="18" ry="15" />
          <rect
            x="38"
            y="44"
            width="20"
            height="8"
            fill={ORANGE}
            stroke="none"
          />
          <line x1="16" y1="30" x2="16" y2="66" strokeWidth="1" />
          <line x1="12" y1="30" x2="20" y2="30" strokeWidth="1" />
          <line x1="12" y1="66" x2="20" y2="66" strokeWidth="1" />
        </>
      );
    case "wraps":
      return (
        <>
          <rect x="12" y="40" width="56" height="16" rx="2" />
          <ellipse cx="78" cy="48" rx="10" ry="7" />
          <rect
            x="16"
            y="43"
            width="14"
            height="10"
            fill={ORANGE}
            stroke="none"
          />
          <line
            x1="34"
            y1="44"
            x2="64"
            y2="44"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <line
            x1="34"
            y1="52"
            x2="64"
            y2="52"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <line x1="12" y1="68" x2="68" y2="68" strokeWidth="1" />
          <line x1="12" y1="64" x2="12" y2="72" strokeWidth="1" />
          <line x1="68" y1="64" x2="68" y2="72" strokeWidth="1" />
        </>
      );
    case "latbar":
      return (
        <>
          <line x1="48" y1="12" x2="48" y2="28" />
          <circle cx="48" cy="31" r="3" />
          <rect x="10" y="34" width="76" height="8" rx="2" />
          <rect
            x="20"
            y="42"
            width="7"
            height="30"
            rx="3"
            fill={ORANGE}
            stroke="none"
          />
          <rect
            x="69"
            y="42"
            width="7"
            height="30"
            rx="3"
            fill={ORANGE}
            stroke="none"
          />
          <rect x="40" y="42" width="5" height="22" rx="2" />
          <rect x="51" y="42" width="5" height="22" rx="2" />
        </>
      );
    case "rope":
      return (
        <>
          <circle cx="48" cy="16" r="6" />
          <path d="M45 22 C40 40 34 56 30 72" strokeWidth="5" />
          <path d="M51 22 C56 40 62 56 66 72" strokeWidth="5" />
          <circle cx="29" cy="78" r="6" fill={ORANGE} stroke="none" />
          <circle cx="67" cy="78" r="6" fill={ORANGE} stroke="none" />
        </>
      );
    case "clips":
      return (
        <>
          <circle cx="42" cy="52" r="26" />
          <circle cx="42" cy="52" r="11" />
          <circle
            cx="42"
            cy="52"
            r="18"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
          <path d="M62 36 L84 24 L88 31 L67 44 Z" fill={ORANGE} stroke="none" />
        </>
      );
  }
}

export default function ProductDrawing({
  kind,
  className = "",
}: {
  kind: DrawingKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <Lines kind={kind} />
    </svg>
  );
}
