import Link from "next/link";
import { profile } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12">
      <div className="label flex flex-col gap-4 text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${profile.email}`} className="hover:text-ink">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub ↗</a>
          <a href={profile.resume} target="_blank" rel="noopener" className="hover:text-ink">Résumé ↗</a>
        </div>
        <Link href="/" className="text-ink hover:text-accent">Home ↑</Link>
      </div>
    </footer>
  );
}
