import { ImageResponse } from "next/og";

/** Share-card image (1200×630) used when the site is posted on social media. */
export const alt = "Rep Theory: lifting gear and training programs built for the last rep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const weeks = Array.from({ length: 12 }, (_, i) => i);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0e0e",
          color: "#eceae4",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 4 }}>
          <span style={{ fontWeight: 900 }}>REP THEORY</span>
          <span style={{ color: "#ff5a1f" }}>GEAR + PROGRAMS · CAD</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 132, fontWeight: 900, lineHeight: 0.9, letterSpacing: -2 }}>
            THE LAST REP COUNTS.
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {weeks.map((i) => (
              <div
                key={i}
                style={{
                  width: 72,
                  height: 36,
                  background: i === 5 || i === 11 ? "transparent" : i < 5 ? "#3a3a3a" : "#eceae4",
                  border: i === 5 || i === 11 ? "4px solid #ff5a1f" : "4px solid transparent",
                }}
              />
            ))}
          </div>
        </div>
        <span style={{ fontSize: 26, color: "#a6a39c" }}>
          Lifting straps · Wrist wraps · Cable attachments · 12-week programs
        </span>
      </div>
    ),
    size,
  );
}
