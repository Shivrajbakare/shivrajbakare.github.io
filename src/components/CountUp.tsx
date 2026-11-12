"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts a numeric string (e.g. "99.72" or "1441") up from zero once visible. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const target = parseFloat(value.replace(/,/g, ""));
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const grouped = value.includes(",");
  const fmt = (v: number) =>
    grouped ? v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : v.toFixed(decimals);
  const [display, setDisplay] = useState(value);

  // Server-render the real value (no-JS safe); once hydrated and still off-screen, reset to zero for the count.
  useEffect(() => {
    if (!reduce && !Number.isNaN(target) && !inView) setDisplay(fmt(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target, decimals]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
