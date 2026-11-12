import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Beyond } from "@/components/sections/Beyond";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Achievements />
      <Beyond />
      <Contact />
    </main>
  );
}
