"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { skills, skillGroups, type SkillGroup } from "@/content/site";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

const groupColor: Record<SkillGroup, string> = {
  lang: "#1b1a17",
  ml: "#b0502a",
  data: "#5b6140",
  eng: "#7a5537",
  sci: "#6f6a5c",
};

export function Skills() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState<SkillGroup | null>(null);
  const s = skills[selected];

  return (
    <section id="skills" className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <SectionHead
          number="05"
          label="Technical skills"
          title="A periodic table of tools."
          italic={["periodic"]}
          aside="I study materials, so the toolbox gets a periodic table. Pick an element to see where I've actually used it."
        />

        {/* Legend / filter */}
        <Reveal className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
          <button
            type="button"
            onClick={() => setFilter(null)}
            aria-pressed={filter === null}
            className={`label border px-3 py-2 transition-colors ${filter === null ? "border-ink bg-ink text-paper" : "border-rule hover:border-ink"}`}
          >
            All · {skills.length}
          </button>
          {(Object.keys(skillGroups) as SkillGroup[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setFilter(filter === g ? null : g)}
              aria-pressed={filter === g}
              className={`label flex items-center gap-2 border px-3 py-2 transition-colors ${
                filter === g ? "border-ink bg-ink text-paper" : "border-rule hover:border-ink"
              }`}
            >
              <span className="h-2 w-2" style={{ background: groupColor[g] }} aria-hidden />
              {skillGroups[g].name}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* Table */}
          <div className="col-span-12 lg:col-span-8">
            <ul className="grid grid-cols-4 gap-px border border-rule bg-rule xs:grid-cols-5 sm:grid-cols-7 xl:grid-cols-8">
              {skills.map((sk, i) => {
                const dim = filter !== null && sk.group !== filter;
                const isSel = selected === i;
                return (
                  <motion.li
                    key={sk.name}
                    className="bg-paper"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 8) * 0.04 + Math.floor(i / 8) * 0.06, duration: 0.5 }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      onMouseEnter={() => setSelected(i)}
                      onFocus={() => setSelected(i)}
                      aria-pressed={isSel}
                      aria-label={`${sk.name}, ${skillGroups[sk.group].name}`}
                      className="group relative flex aspect-square w-full flex-col justify-between p-2 text-left transition-[opacity,background-color,color] duration-300 sm:p-2.5"
                      style={{
                        opacity: dim ? 0.18 : undefined,
                        background: isSel ? groupColor[sk.group] : undefined,
                        color: isSel ? "var(--paper)" : undefined,
                      }}
                    >
                      <span
                        className="absolute inset-x-0 top-0 h-[3px] transition-opacity group-hover:opacity-100"
                        style={{ background: groupColor[sk.group], opacity: isSel ? 0 : 0.85 }}
                        aria-hidden
                      />
                      <span className="label text-[0.58rem] opacity-60">{i + 1}</span>
                      <span className="display text-[clamp(1.5rem,3vw,2.35rem)] leading-none">{sk.sym}</span>
                      <span className="truncate text-[0.62rem] leading-tight opacity-75 sm:text-[0.68rem]">{sk.name}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Readout */}
          <div className="col-span-12 lg:col-span-4" aria-live="polite">
            <div className="lg:sticky lg:top-28">
              <div className="border border-ink p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="label text-muted">Element {String(selected + 1).padStart(2, "0")}</span>
                  <span className="label flex items-center gap-2" style={{ color: groupColor[s.group] }}>
                    <span className="h-2 w-2" style={{ background: groupColor[s.group] }} aria-hidden />
                    {skillGroups[s.group].name}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="display mt-6 text-[7rem] leading-[0.8]" style={{ color: groupColor[s.group] }}>
                      {s.sym}
                    </p>
                    <p className="mt-5 text-2xl">{s.name}</p>
                    <p className="label mt-1 text-muted">{skillGroups[s.group].note}</p>
                    <div className="mt-8 border-t border-rule pt-4">
                      <p className="label text-muted">Where I&rsquo;ve used it</p>
                      <ul className="mt-3 space-y-1.5">
                        {s.usedIn.map((u) => (
                          <li key={u} className="flex items-baseline gap-2 text-[0.98rem]">
                            <span className="text-accent" aria-hidden>
                              →
                            </span>
                            {u === "Toolkit" ? "Part of my everyday toolkit" : u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="label mt-3 text-muted">
                {skills.length} elements · {Object.keys(skillGroups).length} groups
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
