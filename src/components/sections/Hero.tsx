import { profile } from "@/content/site";
import { HeroFigure } from "./HeroFigure";

const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;

function Letters({ word, start, italic }: { word: string; start: number; italic?: boolean }) {
  return (
    <span aria-hidden className={`-mb-[0.18em] block overflow-hidden pb-[0.18em] ${italic ? "italic" : ""}`}>
      {word.split("").map((ch, i) => (
        <span key={i} className="rise" style={d(start + i * 0.045)}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-svh max-w-[1440px] flex-col px-4 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-12"
    >
      {/* Meta row */}
      <div className="fade-in label flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-muted" style={d(0.2)}>
        <span>
          {profile.major} <span className="text-rule">/</span> IIT Kanpur
        </span>
        <span className="flex items-center gap-2.5 text-ink">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Currently {profile.current.role} at {profile.current.org}
        </span>
      </div>
      <div className="rule-in mt-4 h-px bg-rule" style={d(0.1)} />

      {/* Name + lattice */}
      <div className="relative mt-8 grid grid-cols-12 gap-y-10 sm:mt-10 lg:mt-10 lg:items-start lg:gap-x-12">
        <h1
          aria-label={profile.name}
          className="display relative z-10 col-span-12 text-[clamp(5.2rem,21vw,13rem)] lg:col-span-7 lg:col-start-1 lg:row-start-1"
        >
          <Letters word={profile.firstName} start={0.15} />
          <span className="block pl-[14vw] sm:pl-[22vw] lg:pl-[7vw]">
            <Letters word={profile.lastName} start={0.4} italic />
          </span>
        </h1>
        <HeroFigure className="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-3" />
      </div>

      {/* Intro + CTAs */}
      <div className="mt-12 grid grid-cols-12 gap-y-10 lg:mt-auto lg:gap-x-12 lg:pt-8">
        <div className="col-span-12 md:col-span-8 lg:col-span-6">
          <p className="display overflow-hidden text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.02]">
            <span className="rise" style={d(0.75)}>
              I build models that notice <em className="text-accent">what&rsquo;s easy to miss.</em>
            </span>
          </p>
          <p className="fade-in mt-5 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft" style={d(0.95)}>
            I&rsquo;m a final-year Materials Science and Engineering student at IIT Kanpur. I work across
            software engineering, AI/ML and data science, on everything from graph neural networks for crystals
            to deepfake forensics and production LLM systems.
          </p>

          <div className="fade-in mt-8 flex flex-wrap items-center gap-3" style={d(1.1)}>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-ink px-5 py-3.5 text-[0.95rem] text-paper transition-colors hover:bg-accent"
            >
              Explore selected work
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 border border-ink px-5 py-3.5 text-[0.95rem] transition-colors hover:bg-ink hover:text-paper"
            >
              Download résumé <span aria-hidden className="label">PDF</span>
            </a>
            <a href="#contact" className="link-under ml-1 px-1 py-3 text-[0.95rem]">
              Get in touch
            </a>
          </div>
        </div>

        <dl
          className="fade-in label col-span-12 grid grid-cols-2 gap-x-6 gap-y-5 self-end border-t border-rule pt-5 text-muted sm:grid-cols-4 lg:col-span-5 lg:self-start lg:col-start-8 lg:grid-cols-2"
          style={d(1.25)}
        >
          {[
            ["Focus", "SWE · AI/ML · Data"],
            ["Now", "MyConsciOS"],
            ["Recently", "Research, UCL"],
            ["Off-hours", "Dance · Paint · Shaders"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.6rem] text-accent">{k}</dt>
              <dd className="mt-1.5 normal-case tracking-normal text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
