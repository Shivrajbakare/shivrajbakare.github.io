import type { PlateKind } from "@/content/site";

/**
 * Hand-built SVG "plates" — one diagram per project, drawn like figures in a paper.
 * They explain the idea of each project rather than decorate it.
 */

const A = "var(--accent)";
const mono = { fontFamily: "var(--font-plex), monospace", fontSize: 10, letterSpacing: "0.05em" } as const;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 480 340" className="h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* ── CATGNN: a crystal graph with predicted bond strengths ── */
function CatgnnPlate() {
  const rnd = seeded(7);
  const nodes: { x: number; y: number; s: number }[] = [];
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 7; i++) {
      nodes.push({
        x: 70 + i * 56 + (j % 2) * 28 + (rnd() - 0.5) * 14,
        y: 60 + j * 52 + (rnd() - 0.5) * 12,
        s: (i + j) % 3,
      });
    }
  }
  const edges: { a: number; b: number; w: number; hot: boolean }[] = [];
  nodes.forEach((n, a) =>
    nodes.forEach((m, b) => {
      if (b <= a) return;
      const d = Math.hypot(n.x - m.x, n.y - m.y);
      if (d < 70) {
        const w = rnd();
        edges.push({ a, b, w, hot: w > 0.82 });
      }
    }),
  );
  const focus = nodes[17];
  return (
    <Frame label="Diagram: a crystal drawn as a graph, with some bonds highlighted by predicted bonding strength">
      {edges.map((e, i) => (
        <line
          key={i}
          x1={nodes[e.a].x}
          y1={nodes[e.a].y}
          x2={nodes[e.b].x}
          y2={nodes[e.b].y}
          stroke={e.hot ? A : "currentColor"}
          strokeOpacity={e.hot ? 0.95 : 0.22}
          strokeWidth={e.hot ? 2.2 : 0.5 + e.w * 1.6}
          style={e.hot ? { animation: `blink 3.2s ease-in-out ${(i % 5) * 0.5}s infinite` } : undefined}
        />
      ))}
      {/* spherical-harmonic lobes around one atom */}
      <g transform={`translate(${focus.x} ${focus.y})`} fill="none" stroke={A} strokeWidth="1" strokeDasharray="2 3">
        <ellipse rx="34" ry="12" />
        <ellipse rx="34" ry="12" transform="rotate(60)" />
        <ellipse rx="34" ry="12" transform="rotate(-60)" />
      </g>
      {nodes.map((n, i) =>
        n.s === 0 ? (
          <circle key={i} cx={n.x} cy={n.y} r="6" fill="currentColor" />
        ) : (
          <circle key={i} cx={n.x} cy={n.y} r={n.s === 1 ? 4.5 : 3.5} fill="var(--paper)" stroke="currentColor" strokeWidth="1.2" />
        ),
      )}
      <g style={mono} fill="currentColor">
        <text x="24" y="322">G = (atoms, bonds)</text>
        <text x="300" y="322" fill={A}>— predicted ICOHP / ICOBI</text>
        <text x={focus.x + 40} y={focus.y - 18} fill={A}>Yₗᵐ(θ, φ)</text>
      </g>
    </Frame>
  );
}

/* ── Explainable image forensics: patches, ranked artifacts, explanation ── */
function ForensicsPlate() {
  const boxes = [
    { x: 92, y: 64, w: 70, h: 54, r: 1 },
    { x: 196, y: 150, w: 58, h: 70, r: 2 },
    { x: 60, y: 188, w: 54, h: 40, r: 3 },
  ];
  return (
    <Frame label="Diagram: an image split into patches with three ranked suspicious regions and a written explanation">
      <rect x="24" y="30" width="270" height="230" fill="none" stroke="currentColor" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`v${i}`} x1={24 + (i + 1) * 30} y1="30" x2={24 + (i + 1) * 30} y2="260" stroke="currentColor" strokeOpacity="0.12" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="24" y1={30 + (i + 1) * 28.75} x2="294" y2={30 + (i + 1) * 28.75} stroke="currentColor" strokeOpacity="0.12" />
      ))}
      {/* the "image": a horizon, a sun, a figure */}
      <circle cx="226" cy="84" r="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M24 214 C 80 180, 120 200, 170 170 S 250 150, 294 176" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M118 96 q 10 -24 22 0 q -4 22 -11 22 q -7 0 -11 -22 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {boxes.map((b) => (
        <g key={b.r}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={A} fillOpacity={0.1 / b.r + 0.04} stroke={A} strokeWidth="1.4" strokeDasharray="4 3" />
          <rect x={b.x} y={b.y - 14} width="20" height="14" fill={A} />
          <text x={b.x + 5} y={b.y - 4} style={mono} fill="var(--paper)">
            {b.r}
          </text>
        </g>
      ))}
      {/* ranked list */}
      <g style={mono} fill="currentColor">
        <text x="318" y="42">RANKED ARTIFACTS</text>
        {boxes.map((b, i) => (
          <g key={b.r} transform={`translate(318 ${62 + i * 30})`}>
            <text y="9">{b.r}</text>
            <rect x="16" y="1" width={130 - i * 34} height="9" fill={i === 0 ? A : "currentColor"} fillOpacity={i === 0 ? 1 : 0.35} />
          </g>
        ))}
        <text x="318" y="172">VERDICT</text>
        <rect x="318" y="180" width="64" height="20" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <text x="330" y="194" fillOpacity="0.45">REAL</text>
        <rect x="388" y="180" width="64" height="20" fill="currentColor" />
        <text x="398" y="194" fill="var(--paper)">SYNTH.</text>
        <text x="318" y="230">VLM EXPLANATION</text>
      </g>
      {[0, 1, 2].map((i) => (
        <rect key={i} x="318" y={240 + i * 12} width={[134, 118, 82][i]} height="4" fill="currentColor" fillOpacity="0.3" />
      ))}
      <text x="24" y="322" style={mono} fill="currentColor">
        DINOv2 + SVM → CNN ensemble → priority fusion → VLM
      </text>
    </Frame>
  );
}

/* ── ISTVT: six face frames → Xception → spatio-temporal attention ── */
function IstvtPlate() {
  const spots = [
    [[0.32, 0.4], [0.5, 0.74]],
    [[0.68, 0.4], [0.5, 0.74]],
    [[0.32, 0.4], [0.3, 0.86]],
    [[0.5, 0.74], [0.7, 0.86]],
    [[0.68, 0.4], [0.32, 0.4]],
    [[0.5, 0.74], [0.3, 0.86]],
  ];
  return (
    <Frame label="Diagram: six aligned face frames with attention concentrated on the eyes, mouth and jawline, feeding a spatio-temporal transformer">
      {spots.map((s, i) => {
        const x = 24 + i * 74;
        const y = 34;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width="64" height="84" fill="none" stroke="currentColor" strokeOpacity="0.5" />
            <ellipse cx="32" cy="44" rx="21" ry="28" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <line x1="22" y1="36" x2="28" y2="36" stroke="currentColor" />
            <line x1="36" y1="36" x2="42" y2="36" stroke="currentColor" />
            <path d="M26 58 q6 4 12 0" fill="none" stroke="currentColor" />
            {s.map(([px, py], k) => (
              <circle
                key={k}
                cx={px * 64}
                cy={py * 84}
                r="9"
                fill={A}
                fillOpacity="0.35"
                style={{ animation: `blink 2.6s ease-in-out ${(i + k) * 0.3}s infinite` }}
              />
            ))}
            <text x="0" y="98" style={mono} fill="currentColor" fillOpacity="0.6">
              t{i + 1}
            </text>
          </g>
        );
      })}
      {/* pipeline */}
      <g style={mono} fill="currentColor">
        <path d="M240 150 V 172" stroke="currentColor" />
        <rect x="160" y="176" width="160" height="28" fill="none" stroke="currentColor" />
        <text x="196" y="194">XCEPTION · SPATIAL</text>
        <path d="M240 204 V 222" stroke="currentColor" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={132 + i * 18} y="226" width="12" height="12" fill={i % 4 === 1 ? A : "currentColor"} fillOpacity={i % 4 === 1 ? 0.9 : 0.25} />
        ))}
        <text x="352" y="236" fillOpacity="0.6">TOKENS</text>
        <path d="M240 240 V 256" stroke="currentColor" />
        <rect x="140" y="260" width="200" height="28" fill="currentColor" />
        <text x="164" y="278" fill="var(--paper)">SPATIAL × TEMPORAL ATTENTION</text>
        <text x="24" y="322">MTCNN-aligned crops · FaceForensics++</text>
        <text x="370" y="322" fill={A}>→ p(fake)</text>
      </g>
    </Frame>
  );
}

/* ── Sanskrit ASR: waveform → CTC frames → text, with a feedback loop ── */
function AsrPlate() {
  const pts: string[] = [];
  for (let x = 0; x <= 432; x += 2) {
    const env = Math.sin((x / 432) * Math.PI) ** 0.6;
    const y = Math.sin(x * 0.21) * 0.6 + Math.sin(x * 0.053 + 1) * 0.4 + Math.sin(x * 0.9) * 0.25;
    pts.push(`${24 + x},${84 + y * 34 * env}`);
  }
  const frames = ["सं", "–", "स्", "स्", "–", "कृ", "–", "त", "त", "म्", "–"];
  return (
    <Frame label="Diagram: a speech waveform aligned by CTC into Sanskrit characters, with user corrections fed back to the model">
      <line x1="24" y1="84" x2="456" y2="84" stroke="currentColor" strokeOpacity="0.15" />
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x="24" y="34" style={mono} fill="currentColor">
        16 kHz AUDIO
      </text>
      <text x="370" y="34" style={mono} fill={A}>
        WAV2VEC2
      </text>
      {frames.map((f, i) => (
        <g key={i} transform={`translate(${30 + i * 39} 150)`}>
          <rect width="32" height="36" fill={f === "–" ? "none" : "currentColor"} fillOpacity={f === "–" ? 1 : 0.06} stroke="currentColor" strokeOpacity="0.5" />
          <text x="16" y="24" textAnchor="middle" fontSize="15" fill={f === "–" ? "currentColor" : "currentColor"} fillOpacity={f === "–" ? 0.35 : 1}>
            {f}
          </text>
          <line x1="16" y1="-6" x2="16" y2="-26" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="2 2" />
        </g>
      ))}
      <text x="24" y="210" style={mono} fill="currentColor">
        CTC FRAMES (– = BLANK)
      </text>
      <path d="M240 216 V 236" stroke="currentColor" />
      <text x="240" y="270" textAnchor="middle" fontSize="28" fill="currentColor">
        संस्कृतम्
      </text>
      {/* feedback loop */}
      <path d="M330 262 C 440 262, 470 170, 456 110" fill="none" stroke={A} strokeWidth="1.2" strokeDasharray="4 3" />
      <path d="M452 118 l4 -9 l4 9" fill="none" stroke={A} strokeWidth="1.2" />
      <text x="372" y="230" style={mono} fill={A}>
        FEEDBACK
      </text>
      <text x="24" y="322" style={mono} fill="currentColor">
        FastAPI · /transcribe · /feedback · Flan-T5
      </text>
    </Frame>
  );
}

export function Plate({ kind }: { kind: PlateKind }) {
  switch (kind) {
    case "catgnn":
      return <CatgnnPlate />;
    case "forensics":
      return <ForensicsPlate />;
    case "istvt":
      return <IstvtPlate />;
    case "asr":
      return <AsrPlate />;
  }
}
