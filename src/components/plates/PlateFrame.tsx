"use client";

import { motion } from "motion/react";
import type { PlateKind } from "@/content/site";
import { Plate } from "./Plates";

/** A plate inside a framed "print" with registration marks; reveals with a clip-path wipe. */
export function PlateFrame({
  kind,
  number,
  caption,
  className,
  priority = false,
}: {
  kind: PlateKind;
  number: string;
  caption: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <motion.div
        initial={priority ? false : { clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        className="relative border border-rule bg-paper-deep/50 p-4 text-ink sm:p-8"
      >
        <motion.div
          initial={priority ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[48/34] w-full transition-transform duration-700 group-hover:scale-[1.015]"
        >
          <Plate kind={kind} />
        </motion.div>
        <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-ink" />
        <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-ink" />
        <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-ink" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-ink" />
      </motion.div>
      <figcaption className="label mt-3 flex gap-3 text-muted">
        <span className="shrink-0 text-ink">Plate {number}</span>
        <span className="normal-case tracking-normal">{caption}</span>
      </figcaption>
    </figure>
  );
}
