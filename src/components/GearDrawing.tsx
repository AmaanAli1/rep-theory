import type { DrawingKind } from "@/components/ProductDrawing";

type Props = {
  kind: DrawingKind;
  colour: string; // fill for the main material
  stitch: string; // contrast colour for stitching on that material
  text: string; // custom embroidery / tag text
  choice?: string; // size, stiffness, grip width or length
  label: string; // accessible description
};

const INK = "var(--color-ink)";
const ACCENT = "var(--color-accent)";
const MONO = "var(--font-plex-mono), monospace";
const DISPLAY = "var(--font-big-shoulders), sans-serif";
const fade = "transition-[fill,stroke] duration-300";

function Label({
  x,
  y,
  anchor,
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={MONO}
      fontSize="12"
      fill={INK}
    >
      {children}
    </text>
  );
}

/** Large blueprint drawing on a gear detail page. Responds to colour and options. */
export default function GearDrawing({
  kind,
  colour,
  stitch,
  text,
  choice = "",
  label,
}: Props) {
  const svg = (children: React.ReactNode) => (
    <svg viewBox="0 0 480 300" role="img" aria-label={label} className="h-auto w-[92%]">
      {children}
    </svg>
  );
  const upper = choice.toUpperCase();

  switch (kind) {
    case "straps":
      return svg(
        <>
          <g fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round">
            <circle cx="80" cy="160" r="40" />
            <rect x="116" y="134" width="320" height="52" rx="4" fill={colour} className={fade} />
            <line x1="124" y1="143" x2="428" y2="143" stroke={stitch} strokeDasharray="6 5" strokeWidth="1.5" className={fade} />
            <line x1="124" y1="177" x2="428" y2="177" stroke={stitch} strokeDasharray="6 5" strokeWidth="1.5" className={fade} />
            <rect x="150" y="146" width="130" height="28" fill={ACCENT} stroke="none" />
            <g strokeWidth="1">
              <line x1="116" y1="100" x2="436" y2="100" />
              <line x1="116" y1="92" x2="116" y2="108" />
              <line x1="436" y1="92" x2="436" y2="108" />
              <line x1="456" y1="134" x2="456" y2="186" />
              <line x1="448" y1="134" x2="464" y2="134" />
              <line x1="448" y1="186" x2="464" y2="186" />
              <line x1="215" y1="176" x2="250" y2="236" />
            </g>
          </g>
          <text x="215" y="166" textAnchor="middle" fontFamily={DISPLAY} fontWeight="800" fontSize="17" letterSpacing="1" fill={INK}>
            {text}
          </text>
          <Label x={276} y={90} anchor="middle">600 MM</Label>
          <Label x={470} y={210} anchor="end">38 MM</Label>
          <Label x={254} y={252}>EMBROIDERY ZONE · MAX 12</Label>
        </>,
      );

    case "figure8":
      return svg(
        <>
          <g fill="none" strokeLinecap="round">
            {[95, 205].map((cy) => (
              <g key={cy}>
                <ellipse cx="250" cy={cy} rx="90" ry="52" stroke={INK} strokeWidth="22" />
                <ellipse cx="250" cy={cy} rx="90" ry="52" stroke={colour} strokeWidth="18" className={fade} />
              </g>
            ))}
            <rect x="215" y="138" width="70" height="24" fill={ACCENT} stroke={INK} strokeWidth="1.5" />
            <g stroke={INK} strokeWidth="1">
              <line x1="120" y1="43" x2="120" y2="257" />
              <line x1="112" y1="43" x2="128" y2="43" />
              <line x1="112" y1="257" x2="128" y2="257" />
              <line x1="285" y1="150" x2="380" y2="150" />
            </g>
          </g>
          <Label x={108} y={154} anchor="end">SIZE {upper}</Label>
          <Label x={386} y={154}>BOX-STITCHED CENTRE</Label>
        </>,
      );

    case "wraps":
      return svg(
        <>
          <g stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round">
            <rect x="50" y="125" width="300" height="50" rx="4" fill={colour} className={fade} />
            <line x1="134" y1="134" x2="342" y2="134" stroke={stitch} strokeDasharray="6 5" strokeWidth="1.5" className={fade} />
            <line x1="134" y1="166" x2="342" y2="166" stroke={stitch} strokeDasharray="6 5" strokeWidth="1.5" className={fade} />
            <rect x="60" y="132" width="60" height="36" fill={ACCENT} stroke="none" />
            <ellipse cx="395" cy="150" rx="44" ry="30" strokeWidth="16" />
            <ellipse cx="395" cy="150" rx="44" ry="30" stroke={colour} strokeWidth="12" className={fade} />
            <g strokeWidth="1">
              <line x1="50" y1="95" x2="350" y2="95" />
              <line x1="50" y1="87" x2="50" y2="103" />
              <line x1="350" y1="87" x2="350" y2="103" />
              <line x1="90" y1="168" x2="120" y2="230" />
            </g>
          </g>
          <Label x={200} y={85} anchor="middle">600 MM</Label>
          <Label x={124} y={244}>HOOK-AND-LOOP · {upper}</Label>
          <Label x={395} y={206} anchor="middle">THUMB LOOP</Label>
        </>,
      );

    case "latbar": {
      const wide = choice === "Wide";
      const hl = wide ? 70 : 168;
      const hr = wide ? 386 : 288;
      const dl = hl + 12;
      const dr = hr + 12;
      return svg(
        <>
          <g stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round">
            <line x1="240" y1="18" x2="240" y2="58" />
            <circle cx="240" cy="66" r="8" />
            <rect x="40" y="76" width="400" height="20" rx="4" fill={colour} className={fade} />
            {[hl, hr].map((x, i) => (
              <rect key={i} x={x} y="96" width="24" height="124" rx="9" fill={INK} className="transition-[x] duration-500 ease-out motion-reduce:transition-none" />
            ))}
            <g strokeWidth="1">
              <line x1={dl} y1="250" x2={dr} y2="250" />
              <line x1={dl} y1="242" x2={dl} y2="258" />
              <line x1={dr} y1="242" x2={dr} y2="258" />
            </g>
          </g>
          <Label x={240} y={278} anchor="middle">{upper} GRIP · NEUTRAL</Label>
          <Label x={256} y={44}>CABLE CARABINER</Label>
        </>,
      );
    }

    case "rope": {
      const long = choice.startsWith("90");
      const lx = long ? 168 : 186;
      const rx = long ? 312 : 294;
      const ly = long ? 262 : 214;
      return svg(
        <>
          <g strokeLinecap="round" fill="none">
            <circle cx="240" cy="34" r="14" stroke={INK} strokeWidth="3" />
            <path d={`M232 54 L${lx} ${ly}`} stroke={INK} strokeWidth="20" />
            <path d={`M248 54 L${rx} ${ly}`} stroke={INK} strokeWidth="20" />
            <path d={`M232 54 L${lx} ${ly}`} stroke={colour} strokeWidth="15" className={fade} />
            <path d={`M248 54 L${rx} ${ly}`} stroke={colour} strokeWidth="15" className={fade} />
            <circle cx={lx} cy={ly} r="15" fill={INK} />
            <circle cx={rx} cy={ly} r="15" fill={INK} />
            <rect x="196" y="60" width="88" height="24" fill={ACCENT} stroke={INK} strokeWidth="1.5" />
            <g stroke={INK} strokeWidth="1">
              <line x1="400" y1="34" x2="400" y2={ly} />
              <line x1="392" y1="34" x2="408" y2="34" />
              <line x1="392" y1={ly} x2="408" y2={ly} />
            </g>
          </g>
          <text x="240" y="77" textAnchor="middle" fontFamily={DISPLAY} fontWeight="800" fontSize="14" fill={INK}>
            {text}
          </text>
          <Label x={412} y={150}>{upper}</Label>
        </>,
      );
    }

    case "clips":
      return svg(
        <>
          <g stroke={INK} strokeWidth="2" strokeLinecap="round">
            <circle cx="190" cy="150" r="104" fill={colour} className={fade} />
            <circle cx="190" cy="150" r="76" fill="none" stroke={stitch} strokeDasharray="6 5" strokeWidth="1.5" className={fade} />
            <circle cx="190" cy="150" r="46" fill="#f4f2ec" />
            <path d="M276 96 L410 40 L428 74 L298 136 Z" fill={ACCENT} />
            <g strokeWidth="1" fill="none">
              <line x1="144" y1="282" x2="236" y2="282" />
              <line x1="144" y1="274" x2="144" y2="290" />
              <line x1="236" y1="274" x2="236" y2="290" />
              <line x1="236" y1="150" x2="236" y2="282" strokeDasharray="3 4" />
              <line x1="144" y1="150" x2="144" y2="282" strokeDasharray="3 4" />
            </g>
          </g>
          <Label x={300} y={286}>Ø 50 MM BAR</Label>
          <Label x={436} y={96} anchor="end">QUICK-LOCK LEVER</Label>
        </>,
      );
  }
}
