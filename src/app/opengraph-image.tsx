import { ImageResponse } from "next/og";

export const alt = "Shivraj Bakare: ML engineer & materials scientist, IIT Kanpur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const dots = [];
  for (let j = 0; j < 6; j++)
    for (let i = 0; i < 6; i++)
      dots.push({ x: 820 + i * 56, y: 150 + j * 56, a: (i + j) % 2 === 0, hot: (i === 3 && j === 2) || (i === 2 && j === 3) });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2eee5",
          color: "#1b1a17",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {dots.map((d, k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.a ? 14 : 10,
              height: d.a ? 14 : 10,
              borderRadius: 999,
              background: d.hot ? "#b0502a" : d.a ? "#1b1a17" : "#f2eee5",
              border: d.a || d.hot ? "none" : "2px solid #1b1a17",
            }}
          />
        ))}
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#6b665c" }}>
          IIT Kanpur · Materials Science &amp; Engineering
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, lineHeight: 0.95, letterSpacing: -4 }}>Shivraj</div>
          <div style={{ fontSize: 128, lineHeight: 0.95, letterSpacing: -4, fontStyle: "italic", color: "#b0502a" }}>Bakare</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#45423b" }}>
          Software engineering · AI/ML · Data science
        </div>
      </div>
    ),
    size,
  );
}
