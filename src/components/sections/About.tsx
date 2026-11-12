import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

const notes: [string, string][] = [
  ["Studying", "B.Tech, Materials Science & Engineering, IIT Kanpur"],
  ["Year", "Final year (2023 – present)"],
  ["Working on", "Decision intelligence at MyConsciOS"],
  ["Interested in", "Software engineering, AI/ML, data science"],
  ["Away from the desk", "Dance, acrylics, shaders, flight"],
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <SectionHead number="01" label="About" title="Between the lattice and the loss curve." italic={["lattice", "loss", "curve"]} />

      <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
        {/* Marginalia */}
        <Reveal className="col-span-12 lg:col-span-3">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 border-t border-ink pt-5 sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
            {notes.map(([k, v]) => (
              <div key={k} className="border-b border-rule pb-4">
                <dt className="label text-muted">{k}</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <Reveal>
            <p className="display text-[clamp(1.6rem,2.9vw,2.5rem)] leading-[1.12]">
              I study materials: why some conduct heat and others hold it, and why a crystal behaves the way its
              bonds say it should. Along the way I noticed that the most interesting questions in my field were
              turning into <em className="text-accent">data problems</em>, so I learned to build the tools that answer them.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 gap-10 text-[1.02rem] leading-[1.75] text-ink-soft md:columns-2">
            <p className="dropcap mb-6 break-inside-avoid-column">
              At IIT Kanpur, that meant taking Computational Methods, Materials Informatics and AI/ML alongside my
              Materials Science and Engineering coursework. My first serious project brought the two together: a
              graph neural network that learns chemical bonding from crystal structures, trained on DFT data I
              generated myself.
            </p>
            <p className="mb-6">
              Since then I&rsquo;ve kept working on problems I find interesting. I&rsquo;ve built systems to detect
              deepfaked faces in video, to explain why an image looks AI-generated, and to transcribe Sanskrit
              speech. At University College London I researched how regulated banks can fine-tune LLMs privately.
              Now, as an AI/ML engineering intern at MyConsciOS, I&rsquo;m shipping a decision-intelligence platform
              end to end.
            </p>
            <p className="mb-6">
              What I care about most is that things work in practice: models that run behind a real API, results
              that hold up on a held-out test set, and interfaces people actually use. Competitive programming
              (Specialist on Codeforces) keeps my fundamentals sharp.
            </p>
            <p className="mb-6">
              The rest of the time, I dance. I was Secretary of the KOS Dance Club and danced on teams that won gold
              at Inter IIT, Antaragni and Galaxy. I also paint in acrylics, write shaders, and keep an eye on the
              sky. Engineering and choreography have more in common than people expect: both need structure,
              timing, and a lot of rehearsal.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex items-center gap-4">
            <span className="h-px w-10 bg-ink" />
            <span className="display text-2xl italic">Shivraj</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
