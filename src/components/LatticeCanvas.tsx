"use client";

import { useEffect, useRef } from "react";

/**
 * A two-species crystal lattice carrying a travelling phonon (lattice vibration).
 * Moving the pointer over it deposits "heat": nearby atoms vibrate harder and warm in colour.
 * A nod to the CATGNN lattice-thermal-conductivity work.
 */
export function LatticeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const INK = [27, 26, 23];
    const ACCENT = [176, 80, 42];

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let gap = 0;
    let ox = 0;
    let oy = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, heat: 0 };
    let phases: number[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = Math.max(26, Math.min(48, w / 11));
      cols = Math.floor(w / gap) + 1;
      rows = Math.floor(h / gap) + 1;
      ox = (w - (cols - 1) * gap) / 2;
      oy = (h - (rows - 1) * gap) / 2;
      phases = Array.from({ length: cols * rows }, (_, i) => ((Math.sin(i * 12.9898) * 43758.5453) % 1) * Math.PI * 2);
      if (reduced) draw(0);
    };

    const mix = (t: number) =>
      `rgb(${INK.map((c, i) => Math.round(c + (ACCENT[i] - c) * t)).join(",")})`;

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, w, h);
      const k = (Math.PI * 2) / (gap * 7); // wavelength ≈ 7 lattice spacings
      const omega = 1.4;
      const amp = gap * 0.12;
      pointer.heat *= 0.985;

      const pos: { x: number; y: number; heat: number }[] = new Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const x0 = ox + i * gap;
          const y0 = oy + j * gap;
          const wave = Math.sin(k * (x0 + y0 * 0.35) - omega * t);
          const dx = x0 - pointer.x;
          const dy = y0 - pointer.y;
          const local = pointer.heat * Math.exp(-(dx * dx + dy * dy) / (gap * gap * 5));
          const p = phases[idx];
          const jitter = local * gap * 0.22;
          pos[idx] = {
            x: x0 + wave * amp + Math.sin(t * 9 + p) * jitter,
            y: y0 + wave * amp * 0.35 + Math.cos(t * 11 + p * 1.7) * jitter,
            heat: Math.min(1, local),
          };
        }
      }

      // Bonds
      ctx.lineWidth = 1;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = pos[j * cols + i];
          const neighbours = [i < cols - 1 ? pos[j * cols + i + 1] : null, j < rows - 1 ? pos[(j + 1) * cols + i] : null];
          for (const b of neighbours) {
            if (!b) continue;
            const heat = (a.heat + b.heat) / 2;
            ctx.strokeStyle = heat > 0.05 ? `rgba(176,80,42,${0.18 + heat * 0.5})` : "rgba(27,26,23,0.16)";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Atoms: species A (filled, larger) and B (hollow, smaller) alternate like a rock-salt plane
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = pos[j * cols + i];
          const speciesA = (i + j) % 2 === 0;
          ctx.beginPath();
          if (speciesA) {
            ctx.fillStyle = mix(a.heat);
            ctx.arc(a.x, a.y, gap * 0.11, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = "#f2eee5";
            ctx.strokeStyle = mix(a.heat);
            ctx.lineWidth = 1.1;
            ctx.arc(a.x, a.y, gap * 0.075, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.lineWidth = 1;
          }
        }
      }
    };

    const loop = (time: number) => {
      if (visible) draw(time);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.heat = Math.min(1.4, pointer.heat + 0.08);
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    if (!reduced) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Animated diagram of a crystal lattice with a vibration wave travelling through it"
    />
  );
}
