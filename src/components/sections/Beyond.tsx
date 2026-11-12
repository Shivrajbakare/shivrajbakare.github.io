"use client";

import { beyond } from "@/content/site";
import { SectionHead } from "../SectionHead";
import { Reveal, useInView } from "../Reveal";

const P = { pathLength: 1 } as const;

function Sketch({ kind }: { kind: (typeof beyond)[number]["key"] }) {
  const [ref, drawn] = useInView<SVGSVGElement>();
  const common = {
    ref,
    viewBox: "0 0 320 200",
    className: `draw h-full w-full ${drawn ? "is-drawn" : ""}`,
    style: { ["--len" as string]: 1 } as React.CSSProperties,
    fill: "none",
    "aria-hidden": true,
  };

  if (kind === "dance")
    return (
      <svg {...common}>
        <path {...P} d="M20 150 C 60 40, 120 40, 140 110 S 210 190, 240 100 S 300 20, 300 60" stroke="var(--paper)" strokeWidth="1.4" />
        <path {...P} d="M30 165 C 70 70, 125 70, 150 125 S 215 195, 250 120 S 295 60, 305 80" stroke="var(--accent)" strokeWidth="1" strokeDasharray="1" />
        {[
          [60, 172],
          [96, 160],
          [182, 182],
          [224, 168],
        ].map(([x, y], i) => (
          <ellipse key={i} {...P} cx={x} cy={y} rx="7" ry="3.5" stroke="var(--paper)" strokeOpacity="0.6" transform={`rotate(${i % 2 ? 20 : -20} ${x} ${y})`} />
        ))}
        <circle {...P} cx="140" cy="110" r="4" stroke="var(--accent)" />
      </svg>
    );

  if (kind === "paint")
    return (
      <svg {...common}>
        <path {...P} d="M40 140 C 90 110, 140 150, 200 112" stroke="var(--accent)" strokeWidth="22" strokeLinecap="round" strokeOpacity="0.85" />
        <path {...P} d="M70 80 C 130 60, 180 92, 260 64" stroke="var(--olive)" strokeWidth="18" strokeLinecap="round" strokeOpacity="0.9" />
        <path {...P} d="M120 170 C 170 150, 220 172, 286 140" stroke="var(--paper)" strokeWidth="14" strokeLinecap="round" strokeOpacity="0.75" />
        <path {...P} d="M248 30 L 300 182" stroke="var(--paper)" strokeOpacity="0.5" strokeWidth="1.2" />
      </svg>
    );

  if (kind === "games")
    return (
      <svg {...common}>
        {/* perspective grid floor */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`r${i}`} {...P} x1={20} y1={120 + i * i * 2.2} x2={300} y2={120 + i * i * 2.2} stroke="var(--paper)" strokeOpacity="0.25" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`c${i}`} {...P} x1={160 + (i - 4) * 14} y1={120} x2={160 + (i - 4) * 36} y2={200} stroke="var(--paper)" strokeOpacity="0.25" />
        ))}
        {/* wireframe cube */}
        <g stroke="var(--paper)" strokeWidth="1.3">
          <path {...P} d="M160 28 L 204 50 L 204 98 L 160 120 L 116 98 L 116 50 Z" />
          <path {...P} d="M116 50 L 160 72 L 204 50 M160 72 L 160 120" />
        </g>
        <path {...P} d="M160 28 L 116 50 L 160 72 L 204 50 Z" stroke="var(--accent)" strokeWidth="1.3" />
      </svg>
    );

  return (
    <svg {...common}>
      <ellipse {...P} cx="160" cy="104" rx="130" ry="44" stroke="var(--paper)" strokeOpacity="0.45" transform="rotate(-12 160 104)" />
      <ellipse {...P} cx="160" cy="104" rx="80" ry="26" stroke="var(--paper)" strokeOpacity="0.3" transform="rotate(-12 160 104)" />
      <circle {...P} cx="160" cy="104" r="16" stroke="var(--paper)" strokeWidth="1.3" />
      <circle cx="285" cy="77" r="4.5" fill="var(--accent)" />
      {/* a glider's flight path */}
      <path {...P} d="M18 180 C 80 170, 120 150, 170 160 S 250 178, 300 150" stroke="var(--accent)" strokeDasharray="1" />
      <path {...P} d="M292 146 l 12 3 l -10 7" stroke="var(--accent)" />
    </svg>
  );
}

const layout = [
  "md:col-span-7",
  "md:col-span-5 md:mt-32",
  "md:col-span-5",
  "md:col-span-6 md:col-start-7 md:-mt-24",
];

export function Beyond() {
  return (
    <section id="beyond" className="bg-night text-paper">
      <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <SectionHead
          number="07"
          label="Beyond technology"
          title="Off the clock."
          italic={["clock"]}
          tone="night"
          aside="Engineering is how I spend my days. These are the things that make me who I am the rest of the time."
        />

        <div className="grid grid-cols-1 gap-y-20 md:grid-cols-12 md:gap-x-12">
          {beyond.map((b, i) => (
            <Reveal key={b.key} className={layout[i]}>
              <article>
                <div className="aspect-[16/10] w-full border-b border-paper/15 pb-4">
                  <Sketch kind={b.key} />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="display text-[clamp(2.2rem,4vw,3.5rem)]">{b.title}</h3>
                  <span className="label shrink-0 whitespace-nowrap text-paper/40">{String(i + 1).padStart(2, "0")} / 04</span>
                </div>
                <p className="display mt-2 text-xl italic text-accent-soft">{b.line}</p>
                <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-paper/75">{b.body}</p>
                {"link" in b && b.link && (
                  <a
                    href={b.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label link-under mt-5 inline-block text-paper/85"
                  >
                    {b.link.label} ↗
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
