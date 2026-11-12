import Link from "next/link";
import { projects, profile } from "@/content/site";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { PlateFrame } from "../plates/PlateFrame";

export function Projects() {
  return (
    <section id="work" className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <SectionHead
          number="02"
          label="Selected work"
          title="Four problems, worked through."
          italic={["worked", "through"]}
          aside={
            <>
              Research and engineering projects, from crystal graphs to video forensics. Each one has a full
              case study: the problem, what I built, and how it performed.
            </>
          }
        />

        <ol className="flex flex-col gap-28 sm:gap-36 lg:gap-48">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={p.slug} className="group">
                <Reveal y={0} className="label mb-6 flex items-center gap-4 text-muted">
                  <span className="text-accent">{p.index}</span>
                  <span className="hidden sm:inline">{p.kicker}</span>
                  <span className="h-px flex-1 bg-rule" />
                  <span>{p.period}</span>
                </Reveal>

                <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
                  <Link
                    href={`/work/${p.slug}`}
                    aria-label={`${p.title}: read the case study`}
                    className={`col-span-12 lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
                  >
                    <PlateFrame kind={p.plate} number={p.index} caption={p.caption} />
                  </Link>

                  <div
                    className={`col-span-12 flex flex-col lg:col-span-5 ${
                      flip ? "lg:order-1 lg:col-start-1 lg:pt-4" : "lg:pt-24"
                    }`}
                  >
                    <Reveal>
                      {p.codename && <p className="label mb-3 text-accent">{p.codename}</p>}
                      <h3 className="display text-[clamp(2.6rem,5.4vw,4.75rem)]">
                        <Link href={`/work/${p.slug}`} className="transition-colors hover:text-accent">
                          {p.display}
                        </Link>
                      </h3>
                      <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{p.summary}</p>
                    </Reveal>

                    <Reveal delay={0.1} className="mt-8 flex items-end gap-5 border-t border-rule pt-6">
                      <span className="display tabular text-[clamp(3.25rem,6vw,5.25rem)] leading-[0.8]">
                        {p.headline.value}
                      </span>
                      <span className="label pb-1 text-muted">{p.headline.label}</span>
                    </Reveal>

                    <Reveal delay={0.15}>
                      <ul className="label mt-6 flex flex-wrap gap-y-1.5 leading-5 text-ink-soft" aria-label="Technologies">
                        {p.stack.map((s, k) => (
                          <li key={s} className="whitespace-nowrap">
                            {s}
                            {k < p.stack.length - 1 && <span aria-hidden className="mx-2 text-rule">/</span>}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                        <Link
                          href={`/work/${p.slug}`}
                          className="group/cta inline-flex items-center gap-3 text-[0.98rem]"
                        >
                          <span className="link-draw">Read the case study</span>
                          <span
                            aria-hidden
                            className="inline-block transition-transform duration-500 group-hover/cta:translate-x-1.5"
                          >
                            →
                          </span>
                        </Link>
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label text-muted transition-colors hover:text-ink"
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-28 flex flex-col items-start justify-between gap-6 border-t border-ink pt-8 sm:flex-row sm:items-center">
          <p className="display text-3xl italic sm:text-4xl">More experiments live on GitHub.</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label border border-ink px-4 py-3 transition-colors hover:bg-ink hover:text-paper"
          >
            github.com/Shivrajbakare ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
