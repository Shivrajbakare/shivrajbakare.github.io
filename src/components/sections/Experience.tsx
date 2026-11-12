"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "@/content/site";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="experience" className="bg-paper-deep/60">
      <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <SectionHead
          number="03"
          label="Experience"
          title="Where the work happened."
          italic={["work"]}
          aside="Industry, research and leadership, most recent first. Each entry lists what I built and the numbers it came with."
        />

        <ol ref={listRef} className="relative">
          {/* the timeline rail */}
          <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-rule lg:left-[calc(25%+7px)]" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent lg:left-[calc(25%+7px)]"
          />

          {experience.map((e, i) => (
            <li key={e.id} className={`relative grid grid-cols-1 lg:grid-cols-4 ${i < experience.length - 1 ? "pb-20 sm:pb-28" : ""}`}>
              {/* left: dates */}
              <Reveal y={10} className="pl-10 lg:pl-0 lg:pr-12 lg:text-right">
                <p className="label text-accent">{e.kind}</p>
                <p className="display tabular mt-2 text-2xl sm:text-3xl">{e.period}</p>
              </Reveal>

              {/* node */}
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -30% 0px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border border-accent bg-paper lg:left-[25%]"
              >
                <span className="absolute inset-[4px] rounded-full bg-accent" />
              </motion.span>

              {/* right: content */}
              <div className="mt-4 pl-10 lg:col-span-3 lg:mt-0 lg:pl-16">
                <Reveal>
                  <h3 className="display text-[clamp(2.2rem,4.4vw,3.75rem)]">{e.org}</h3>
                  <p className="mt-3 text-[1.05rem] font-medium">{e.role}</p>
                  {e.where && <p className="label mt-2 text-muted">{e.where}</p>}
                  <p className="display mt-6 max-w-2xl text-[1.55rem] italic leading-snug text-ink-soft">{e.lede}</p>
                </Reveal>

                <ul className="mt-8 max-w-3xl space-y-4">
                  {e.points.map((pt, k) => (
                    <li key={k}>
                      <Reveal delay={k * 0.05} y={14}>
                        <div className="grid grid-cols-[1.75rem_1fr] text-[0.98rem] leading-relaxed text-ink-soft">
                          <span className="label pt-1 text-accent/80">{String(k + 1).padStart(2, "0")}</span>
                          <span>{pt}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>

                {e.publication && (
                  <Reveal className="mt-10 max-w-3xl border-l-2 border-accent bg-paper/70 py-5 pl-6 pr-5">
                    <p className="label text-accent">Publication</p>
                    <p className="mt-2 text-[0.98rem] leading-relaxed">{e.publication}</p>
                  </Reveal>
                )}

                {e.figures && (
                  <Reveal className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                    {e.figures.map((f) => (
                      <div key={f.label}>
                        <p className="display tabular text-5xl leading-none">{f.value}</p>
                        <p className="label mt-2 text-muted">{f.label}</p>
                      </div>
                    ))}
                  </Reveal>
                )}

                <Reveal className="label mt-8 flex flex-wrap gap-x-2 gap-y-1 text-muted">
                  {e.tags.map((t, k) => (
                    <span key={t}>
                      {t}
                      {k < e.tags.length - 1 && <span className="ml-2 text-rule">·</span>}
                    </span>
                  ))}
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
