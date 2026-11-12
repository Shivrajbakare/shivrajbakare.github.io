import { achievements, honours } from "@/content/site";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { CountUp } from "../CountUp";

const offsets = ["lg:mt-0", "lg:mt-40", "lg:mt-16"];

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <SectionHead number="06" label="Achievements" title="A few things worth counting." italic={["counting"]} />

      {/* By the numbers */}
      <div className="grid grid-cols-1 gap-y-14 border-t border-ink pt-10 md:grid-cols-3 md:gap-x-10">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1} className={offsets[i]}>
            <p className="label flex justify-between text-muted">
              <span>{a.field}</span>
              <span>{a.year}</span>
            </p>
            <p className="mt-4 flex items-baseline gap-3">
              <CountUp value={a.figure} className="display tabular text-[clamp(5.5rem,11vw,10rem)] leading-[0.8]" />
              {a.unit && <span className="label text-accent">{a.unit}</span>}
            </p>
            <p className="mt-5 text-xl">{a.title}</p>
            <p className="mt-1.5 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">{a.detail}</p>
          </Reveal>
        ))}
      </div>

      {/* Honours roll */}
      <div className="mt-24 sm:mt-32">
        <Reveal className="mb-6 flex items-end justify-between gap-6">
          <h3 className="display text-4xl sm:text-5xl">
            Honours <em className="text-accent">&amp;</em> roles
          </h3>
          <span className="label hidden text-muted sm:block">Stage · Sky · Service · Research</span>
        </Reveal>
        <ul className="border-t border-ink">
          {honours.map((h, i) => (
            <li key={h.title}>
              <Reveal delay={i * 0.04} y={12}>
                <div className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-rule py-5 transition-colors duration-300 hover:bg-paper-deep/60 sm:py-6">
                  <span className="display col-span-4 text-[clamp(1.6rem,3vw,2.6rem)] italic text-accent transition-transform duration-500 group-hover:translate-x-2 sm:col-span-3 lg:col-span-2">
                    {h.label}
                  </span>
                  <span className="col-span-8 text-[1.08rem] font-medium sm:col-span-4 lg:col-span-3">{h.title}</span>
                  <span className="col-span-12 text-[0.95rem] leading-relaxed text-ink-soft sm:col-span-5 sm:col-start-8 lg:col-span-5 lg:col-start-6">
                    {h.detail}
                  </span>
                  <span className="label col-span-12 hidden text-right text-muted lg:col-span-2 lg:block">{h.field}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
