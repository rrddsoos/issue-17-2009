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

    const resize = () => lenis.resize();
    window.addEventListener("load", resize);
    document.addEventListener("DOMContentLoaded", resize);
    setTimeout(resize, 1000);
    setTimeout(resize, 3000);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("load", resize);
      document.removeEventListener("DOMContentLoaded", resize);
    };
  }, []);
  return null;
};