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
      smoothTouch: true,
      syncTouch: true,
      infinite: false,
    });
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // Force lenis to recalculate scroll height after page fully loads
    window.addEventListener("load", () => lenis.resize());

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("load", () => lenis.resize());
    };
  }, []);
  return null;
};