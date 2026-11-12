"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, profile } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 320 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  // Track which section is in view (home page only)
  useEffect(() => {
    if (!onHome) return;
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  // Mobile menu: lock scroll, close on Escape, focus first link
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.header
        className="fade-in fixed inset-x-0 top-0 z-50"
        style={{ ["--d" as string]: "0.7s" }}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`transition-[background-color,border-color,color] duration-500 ${
            open
              ? "border-b border-transparent bg-transparent text-paper"
              : scrolled || !onHome
                ? "border-b border-rule/80 bg-paper/95"
                : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:h-16 sm:px-8 lg:px-12"
          >
            <Link href={onHome ? "#top" : "/"} className="group flex items-baseline gap-3" aria-label="Shivraj Bakare, home">
              <span className="display text-[1.55rem] leading-none">
                Shivraj <span className="italic">Bakare</span>
              </span>
              <span className="label hidden text-muted md:inline">IIT Kanpur · MSE</span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.slice(1).map((item, i) => {
                const isActive = onHome && active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={href(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`label relative flex items-center gap-1.5 px-2.5 py-2 transition-colors ${
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      <span className="text-[0.6rem] text-accent/80">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-2.5 -bottom-0.5 h-px bg-ink"
                          transition={{ duration: 0.45 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li className="ml-3">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener"
                  className="label inline-flex items-center gap-2 border border-ink px-3.5 py-2 transition-colors hover:bg-ink hover:text-paper"
                >
                  Résumé <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="label flex items-center gap-2 py-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-5">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-4 pb-8 pt-20 text-paper sm:px-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6 }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6 }}
                  className="border-b border-paper/10"
                >
                  <a
                    href={href(item.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-2.5"
                  >
                    <span className="display text-[clamp(2.4rem,11vw,4rem)] leading-none">{item.label}</span>
                    <span className="label text-paper/40">{String(i).padStart(2, "0")}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="label flex flex-wrap gap-x-6 gap-y-3 text-paper/70">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.resume} target="_blank" rel="noopener">Résumé ↗</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
