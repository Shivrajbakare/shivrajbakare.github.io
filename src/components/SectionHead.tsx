import { RevealWords, Reveal } from "./Reveal";

/**
 * Editorial section opener: a numbered marker on a hairline, then a serif headline.
 * `tone="night"` is for sections on the dark background.
 */
export function SectionHead({
  number,
  label,
  title,
  italic = [],
  aside,
  tone = "paper",
}: {
  number: string;
  label: string;
  title: string;
  italic?: string[];
  aside?: React.ReactNode;
  tone?: "paper" | "night";
}) {
  const ruleColor = tone === "night" ? "bg-paper/20" : "bg-rule";
  const labelColor = tone === "night" ? "text-paper/55" : "text-muted";
  return (
    <header className="mb-12 sm:mb-16 lg:mb-20">
      <Reveal y={0} className="mb-8 flex items-center gap-4">
        <span className="label text-accent">§ {number}</span>
        <span className={`h-px flex-1 ${ruleColor}`} />
        <span className={`label ${labelColor}`}>{label}</span>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <RevealWords
          text={title}
          italicWords={italic}
          className="display text-[clamp(2.75rem,8vw,7.5rem)] lg:col-span-8"
        />
        {aside && (
          <Reveal delay={0.25} className={`max-w-sm text-[0.95rem] leading-relaxed lg:col-span-4 lg:justify-self-end ${tone === "night" ? "text-paper/70" : "text-ink-soft"}`}>
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}
