import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = () => {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // Recalculate every second for 10 seconds to catch dynamic content
    const timers = [500, 1000, 2000, 3000, 5000, 10000].map(ms =>
      setTimeout(() => lenis.resize(), ms)
    );

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      timers.forEach(clearTimeout);
    };
  }, []);
  return null;
};