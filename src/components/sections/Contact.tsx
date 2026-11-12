"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/content/site";
import { Reveal, RevealWords } from "../Reveal";

function useIST() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const links = [
  { label: "LinkedIn", note: "in/Shivraj-Bakare", href: profile.linkedin, external: true },
  { label: "GitHub", note: "@Shivrajbakare", href: profile.github, external: true },
  { label: "Résumé", note: "PDF · 1 page", href: profile.resume, external: false },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useIST();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40">
        <Reveal y={0} className="mb-10 flex items-center gap-4">
          <span className="label text-accent">§ 08</span>
          <span className="h-px flex-1 bg-rule" />
          <span className="label text-muted">Contact</span>
        </Reveal>

        <RevealWords
          as="h2"
          text="Let’s work on the next hard problem."
          italicWords={["hard", "problem"]}
          className="display max-w-[14ch] text-[clamp(3.4rem,11vw,10.5rem)]"
          stagger={0.06}
        />

        <div className="mt-16 grid grid-cols-12 gap-y-14 sm:mt-24 lg:gap-x-12">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="label text-muted">Write to me</p>
            <a
              href={`mailto:${profile.email}`}
              className="display link-draw mt-4 inline-block break-all text-[clamp(1.9rem,4.6vw,3.9rem)] leading-tight transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-ink px-5 py-3.5 text-[0.95rem] text-paper transition-colors hover:bg-accent"
              >
                Send an email <span aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={copy}
                className="label relative min-w-[8.5rem] border border-ink px-4 py-[0.95rem] transition-colors hover:bg-ink hover:text-paper"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "y" : "n"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {copied ? "Copied ✓" : "Copy address"}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
            <p className="mt-10 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
              I&rsquo;m interested in software engineering, AI/ML engineering and data science roles. If you&rsquo;re
              building something that needs careful modelling and solid engineering, I&rsquo;d like to hear about it.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-8">
            <ul className="border-t border-ink">
              {links.map((l) => (
                <li key={l.label} className="border-b border-rule">
                  <a
                    href={l.href}
                    {...(l.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : { target: "_blank", rel: "noopener" })}
                    className="group flex items-center justify-between py-5"
                  >
                    <span>
                      <span className="display block text-3xl transition-transform duration-500 group-hover:translate-x-2">
                        {l.label}
                      </span>
                      <span className="label mt-1 block text-muted">{l.note}</span>
                    </span>
                    <span
                      aria-hidden
                      className="text-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Footer */}
        <footer className="label mt-28 flex flex-col gap-4 border-t border-ink pt-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Shivraj Bakare</span>
          <span>
            IIT Kanpur, India{time ? ` · ${time} IST` : ""}
          </span>
          <span className="hidden md:inline">Set in Instrument Serif, DM Sans &amp; IBM Plex Mono</span>
          <a href="#top" className="text-ink transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
