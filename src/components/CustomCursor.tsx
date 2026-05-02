import { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const overEls = () => {
      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      const interactive = el?.closest("a,button,input,textarea,[data-cursor='hover']");
      ringRef.current?.classList.toggle("scale-[2.2]", !!interactive);
      ringRef.current?.classList.toggle("border-burgundy", !!interactive);
    };

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      overEls();
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[100] h-[6px] w-[6px] rounded-full bg-ink" />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-gold-deep transition-[transform,border-color] duration-200" />
    </>
  );
};
