"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { LatticeCanvas } from "../LatticeCanvas";

export function HeroFigure({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -90]);

  return (
    <motion.figure
      style={{ y, ["--d" as string]: "0.55s" }}
      className={`fade-in relative ${className ?? ""}`}
    >
      <div className="relative aspect-[16/10] w-full border border-rule bg-paper-deep/40 lg:aspect-[3/2]">
        <LatticeCanvas className="absolute inset-0 h-full w-full cursor-crosshair touch-pan-y" />
        {/* registration marks */}
        <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-ink" />
        <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-ink" />
        <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-ink" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-ink" />
        <span className="pointer-events-none absolute right-2 top-2 bg-paper px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">k → ω(k)</span>
      </div>
      <figcaption className="label mt-3 flex justify-between gap-4 text-muted">
        <span>
          <span className="text-ink">Fig. 0</span>: A lattice is never quite at rest.
        </span>
        <span className="hidden text-right sm:inline">Move across it to add heat</span>
      </figcaption>
    </motion.figure>
  );
}
