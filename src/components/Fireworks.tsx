import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number; }

const COLORS = ["#C8A86B", "#E8C7C0", "#F4EFE6", "#5B1A1A", "#FFFFFF"];

export const Fireworks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const burst = (x: number, y: number) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const n = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.2;
        const sp = 2 + Math.random() * 4;
        particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 60 + Math.random() * 40, color, size: 1 + Math.random() * 2.2 });
      }
    };

    let raf = 0;
    let lastBurst = 0;
    const tick = (t: number) => {
      const r = canvas.getBoundingClientRect();
      ctx.fillStyle = "rgba(14, 14, 16, 0.18)";
      ctx.fillRect(0, 0, r.width, r.height);
      if (t - lastBurst > 600) {
        burst(r.width * (0.2 + Math.random() * 0.6), r.height * (0.2 + Math.random() * 0.4));
        lastBurst = t;
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.04;
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.99; p.vy *= 0.99;
        p.life++;
        const o = 1 - p.life / p.max;
        if (o <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = o;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [inView]);

  return (
    <section ref={ref} className="relative h-[100vh] bg-ink overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.2 }}
        >
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-4">— The Final Page —</div>
          <h2 className="font-display text-6xl md:text-8xl gold-foil leading-[0.95]">
            Happy Birthday,<br/><em className="italic">my favorite person.</em>
          </h2>
          <div className="hairline-gold w-32 mx-auto my-8" />
          <p className="font-hand text-3xl md:text-4xl text-blush">Here’s to you. Always.</p>
        </motion.div>
      </div>
    </section>
  );
};
