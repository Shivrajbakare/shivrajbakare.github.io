"use client";

import { motion, useInView as useMotionInView, type HTMLMotionProps } from "motion/react";
import { createElement, Fragment, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise block reveal when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits text into words that slide up from behind a mask, staggered.
 * The in-view trigger sits on the heading itself (the masked words are clipped, so they can't be observed).
 * The full string is exposed to assistive tech once; the animated words are hidden from it.
 */
export function RevealWords({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  italicWords = [],
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  italicWords?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useMotionInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const words = text.split(" ");
  return createElement(
    as,
    { className, "aria-label": text, ref },
    words.map((w, i) => (
      <Fragment key={i}>
        <span aria-hidden className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span
            className={`inline-block ${italicWords.includes(w.replace(/[.,—’']/g, "")) ? "italic text-accent" : ""}`}
            initial={{ y: "115%" }}
            animate={inView ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
          >
            {w}
          </motion.span>
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    )),
  );
}

/** Adds `is-drawn` to an SVG wrapper once it enters the viewport, triggering CSS stroke drawing. */
export function useInView<T extends Element>(margin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}
