import { courses, education } from "@/content/site";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Education() {
  const [iitk, ...school] = education;
  return (
    <section id="education" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <SectionHead number="04" label="Education" title="Trained as a materials scientist." italic={["materials", "scientist"]} />

      <div className="grid grid-cols-12 gap-y-16 lg:gap-x-12">
        {/* IIT Kanpur feature */}
        <Reveal className="col-span-12 lg:col-span-7">
          <div className="border-t border-ink pt-6">
            <p className="label flex justify-between text-muted">
              <span>{iitk.years}</span>
              <span>Undergraduate</span>
            </p>
            <h3 className="display mt-8 text-[clamp(2.5rem,5.6vw,5rem)]">
              Indian Institute of <em>Technology</em> Kanpur
            </h3>
            <p className="mt-4 text-[1.05rem] text-ink-soft">{iitk.qualification}</p>

            <div className="mt-12 flex items-end gap-4">
              <span className="display tabular text-[clamp(7rem,18vw,13rem)] leading-[0.72] text-accent">{iitk.score}</span>
              <span className="label pb-2 text-muted">{iitk.scale}</span>
            </div>
          </div>
        </Reveal>

        {/* Coursework */}
        <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="border-t border-ink pt-6">
            <p className="label text-muted">Relevant coursework</p>
            <ol className="mt-6">
              {courses.map((c, i) => (
                <li
                  key={c}
                  className="group flex items-baseline gap-4 border-b border-rule py-3 transition-colors hover:text-accent"
                >
                  <span className="label w-6 text-muted group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1rem]">{c}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Schooling ledger */}
        <div className="col-span-12">
          <p className="label mb-4 text-muted">School</p>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">School education</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Qualification</th>
                <th scope="col">School</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {school.map((s) => (
                <tr key={s.years} className="border-t border-rule align-baseline last:border-b">
                  <td className="display tabular w-[22%] py-6 text-4xl sm:text-5xl">{s.years}</td>
                  <td className="py-6 pr-4">
                    <span className="block text-[1rem] font-medium">{s.qualification}</span>
                    <span className="mt-1 block text-[0.92rem] text-ink-soft sm:hidden">{s.school}</span>
                  </td>
                  <td className="hidden py-6 pr-4 text-[0.98rem] text-ink-soft sm:table-cell">{s.school}</td>
                  <td className="py-6 text-right">
                    <span className="display tabular text-4xl sm:text-5xl">{s.score}</span>
                    <span className="label ml-1 text-muted">{s.scale}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
