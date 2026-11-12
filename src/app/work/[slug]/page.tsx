import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { PlateFrame } from "@/components/plates/PlateFrame";
import { Reveal, RevealWords } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { SiteFooter } from "@/components/SiteFooter";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, type: "article" },
  };
}

function Row({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-y-5 border-t border-rule py-12 sm:py-16 lg:gap-x-12">
      <Reveal y={10} className="col-span-12 lg:col-span-3">
        <p className="label flex gap-3 lg:sticky lg:top-28">
          <span className="text-accent">{n}</span>
          <span className="text-muted">{label}</span>
        </p>
      </Reveal>
      <div className="col-span-12 lg:col-span-8 lg:col-start-5">{children}</div>
    </div>
  );
}

/** Splits a metric like "97.4%" or "200k+" into a countable number and its suffix. */
function splitMetric(v: string) {
  const m = v.match(/^([\d.,]+)(.*)$/);
  return m ? { num: m[1], rest: m[2] } : null;
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <main id="main" className="pt-20 sm:pt-24">
      <article className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="label flex items-center justify-between gap-4 border-b border-rule pb-4 pt-4 text-muted">
          <Link href="/#work" className="group inline-flex items-center gap-2 text-ink">
            <span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
            All work
          </Link>
          <span>
            Case study {p.index} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Title block */}
        <header className="grid grid-cols-12 gap-y-8 pb-14 pt-12 sm:pt-16 lg:gap-x-12 lg:pb-20">
          <div className="col-span-12 lg:col-span-9">
            <p className="label text-accent">
              {p.kicker}
              {p.codename ? ` · ${p.codename}` : ""}
            </p>
            <RevealWords
              as="h1"
              text={p.title}
              className="display mt-6 text-[clamp(3rem,8.5vw,8.25rem)]"
              stagger={0.05}
            />
          </div>
          <Reveal delay={0.3} className="col-span-12 lg:col-span-8">
            <p className="display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.18] text-ink-soft">{p.summary}</p>
          </Reveal>
          <Reveal delay={0.4} className="col-span-12">
            <dl className="grid grid-cols-1 gap-6 border-t border-ink pt-6 sm:grid-cols-3">
              <div>
                <dt className="label text-muted">Period</dt>
                <dd className="mt-1.5">{p.period}</dd>
              </div>
              <div>
                <dt className="label text-muted">Context</dt>
                <dd className="mt-1.5">{p.context}</dd>
              </div>
              <div>
                <dt className="label text-muted">Source</dt>
                <dd className="mt-1.5">
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link-under">
                    View on GitHub ↗
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </header>

        <PlateFrame kind={p.plate} number={p.index} caption={p.caption} priority className="mx-auto max-w-5xl" />

        {/* Body */}
        <div className="mt-20 sm:mt-28">
          <Row n="01" label="The problem">
            <Reveal>
              <p className="display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.22]">{p.problem}</p>
            </Reveal>
          </Row>

          <Row n="02" label="My contribution">
            <Reveal>
              <p className="max-w-2xl text-[1.1rem] leading-relaxed text-ink-soft">{p.contribution}</p>
            </Reveal>
          </Row>

          <Row n="03" label="Technical approach">
            <ol className="grid gap-px bg-rule sm:grid-cols-2">
              {p.approach.map((s, k) => (
                <li key={s.title} className="bg-paper">
                  <Reveal delay={k * 0.08} className="h-full p-6 sm:p-8">
                    <span className="display text-6xl leading-none text-accent">{k + 1}</span>
                    <h3 className="mt-5 text-lg font-medium">{s.title}</h3>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-soft">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Row>

          <Row n="04" label="Technologies">
            <Reveal>
              <ul className="flex flex-wrap gap-x-3 gap-y-3">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="label border border-rule px-3 py-2 text-ink transition-colors hover:border-ink"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Row>

          <Row n="05" label="Results">
            <dl className="grid grid-cols-1 gap-y-10 xs:grid-cols-2 sm:gap-x-10">
              {p.results.map((r, k) => {
                const m = splitMetric(r.value);
                return (
                  <Reveal key={r.label} delay={k * 0.08} className="border-t border-ink pt-5">
                    <dd className="display tabular text-[clamp(3.6rem,7vw,6rem)] leading-[0.85]">
                      {m ? (
                        <>
                          <CountUp value={m.num} />
                          <span className="text-accent">{m.rest}</span>
                        </>
                      ) : (
                        r.value
                      )}
                    </dd>
                    <dt className="label mt-3 text-muted">{r.label}</dt>
                  </Reveal>
                );
              })}
            </dl>
          </Row>
        </div>
      </article>

      {/* Next project */}
      <Link href={`/work/${next.slug}`} className="group mt-16 block border-y border-ink bg-paper-deep/50 transition-colors duration-500 hover:bg-ink hover:text-paper">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-14 sm:px-8 sm:py-20 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <p className="label text-accent">Next case study · {next.index}</p>
            <p className="display mt-4 text-[clamp(2.6rem,7vw,6.5rem)]">{next.display}</p>
          </div>
          <span aria-hidden className="display text-6xl transition-transform duration-500 group-hover:translate-x-3">
            →
          </span>
        </div>
      </Link>

      <SiteFooter />
    </main>
  );
}
