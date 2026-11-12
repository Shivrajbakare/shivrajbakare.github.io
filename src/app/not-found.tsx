import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-[1440px] flex-col justify-center px-4 sm:px-8 lg:px-12">
      <p className="label text-accent">Error 404</p>
      <h1 className="display mt-6 text-[clamp(4rem,14vw,12rem)]">
        Vacancy <em className="text-accent">defect.</em>
      </h1>
      <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
        There&rsquo;s a missing atom where this page should be. The rest of the lattice is intact.
      </p>
      <Link href="/" className="mt-10 inline-flex w-fit items-center gap-3 bg-ink px-5 py-3.5 text-paper transition-colors hover:bg-accent">
        ← Back to the portfolio
      </Link>
    </main>
  );
}
