import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

type Flower = {
  id: number;
  l: number; // left %
  b: number; // bottom %
  h: number; // height %
  hue: number;
  sway: number;
  delay: number;
  petals: number;
};

const COUNT = 60;

const makeFlowers = (): Flower[] => {
  const arr: Flower[] = [];
  for (let i = 0; i < COUNT; i++) {
    arr.push({
      id: i,
      l: Math.random() * 98,
      b: Math.random() * 55,
      h: 14 + Math.random() * 26,
      hue: 255 + Math.random() * 45,
      sway: 2.4 + Math.random() * 2.6,
      delay: Math.random() * 2,
      petals: 6,
    });
  }
  return arr.sort((a, b) => b.b - a.b); // back rows first
};

export const LavenderGarden = () => {
  const [flowers] = useState<Flower[]>(() => makeFlowers());
  const [bloomed, setBloomed] = useState<Set<number>>(new Set());
  const [petals, setPetals] = useState<Array<{ id: number; x: number; y: number; hue: number; rot: number }>>([]);
  const [butterflies, setButterflies] = useState<Array<{ id: number; from: { x: number; y: number }; to: { x: number; y: number } }>>([]);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const bloomFlower = (i: number, x: number, y: number) => {
    setBloomed(prev => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
    // burst petals
    const f = flowers[i];
    const burst = Array.from({ length: 10 }).map(() => ({
      id: idRef.current++,
      x,
      y,
      hue: f.hue + (Math.random() * 20 - 10),
      rot: Math.random() * 360,
    }));
    setPetals(p => [...p, ...burst]);
    setTimeout(() => {
      setPetals(p => p.filter(pp => !burst.find(b => b.id === pp.id)));
    }, 4000);
    // sometimes spawn a butterfly
    if (Math.random() > 0.55) {
      const bid = idRef.current++;
      const w = containerRef.current?.clientWidth ?? 800;
      const h = containerRef.current?.clientHeight ?? 600;
      setButterflies(b => [...b, {
        id: bid,
        from: { x, y },
        to: { x: Math.random() * w, y: Math.random() * h * 0.6 },
      }]);
      setTimeout(() => setButterflies(b => b.filter(bb => bb.id !== bid)), 6000);
    }
  };

  const handleClick = (e: React.MouseEvent, i: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : 0;
    const y = rect ? e.clientY - rect.top : 0;
    if (bloomed.has(i)) {
      // un-bloom on second tap
      setBloomed(prev => {
        const next = new Set(prev);
        next.delete(i);
        return next;
      });
    } else {
      bloomFlower(i, x, y);
    }
  };

  // bloom-all on hover sweep — track pointer crossing many stems
  const lastSweep = useRef(0);
  const handlePointerMove = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    const stem = target.closest("[data-flower]") as HTMLElement | null;
    if (!stem) return;
    const idx = Number(stem.dataset.flower);
    if (Number.isNaN(idx) || bloomed.has(idx)) return;
    const now = performance.now();
    if (now - lastSweep.current < 60) return;
    lastSweep.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    bloomFlower(idx, rect ? e.clientX - rect.left : 0, rect ? e.clientY - rect.top : 0);
  };

  const bloomAll = () => {
    flowers.forEach((f, i) => {
      if (!bloomed.has(i)) {
        setTimeout(() => bloomFlower(i, (f.l / 100) * (containerRef.current?.clientWidth ?? 800), (containerRef.current?.clientHeight ?? 600) * (1 - f.b / 100) - 40), i * 25);
      }
    });
  };

  const reset = () => { setBloomed(new Set()); setPetals([]); setButterflies([]); };

  // ambient drifting petals
  const ambient = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: (i * 17 + 5) % 100,
    delay: (i * 0.6) % 8,
    dur: 9 + (i % 5) * 2,
    hue: 265 + (i * 5) % 35,
  })), []);

  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(35 45% 95%) 0%, hsl(285 35% 86%) 45%, hsl(125 30% 72%) 100%)" }}>
      <div className="absolute inset-0 grain pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto text-center mb-8 relative z-10">
        <div className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-3">An Interactive Garden</div>
        <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-ink">
          Lavender lilies, <em className="italic gold-foil">just for you.</em>
        </h2>
        <p className="font-serif2 italic text-lg text-ink/70 mt-3">
          Tap a flower. Sweep across them. Pick the whole field.
          <span className="font-hand text-2xl text-burgundy ml-2">— {bloomed.size} of {COUNT} picked</span>
        </p>
        <div className="flex items-center justify-center gap-4 mt-5">
          <button onClick={bloomAll} data-cursor="hover" className="text-[10px] tracking-[0.4em] uppercase border-b border-ink/40 hover:border-burgundy pb-1">Bloom all →</button>
          <button onClick={reset} data-cursor="hover" className="text-[10px] tracking-[0.4em] uppercase border-b border-ink/40 hover:border-burgundy pb-1">Reset ↺</button>
        </div>
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
        onPointerMove={handlePointerMove}
        className="relative mx-auto max-w-6xl rounded-sm overflow-hidden"
        style={{ height: "min(78vh, 760px)", background: "linear-gradient(180deg, hsl(45 70% 90% / 0.4) 0%, hsl(280 40% 78% / 0.5) 50%, hsl(115 35% 55%) 100%)", boxShadow: "0 30px 80px -20px hsl(280 40% 30% / 0.4)" }}
      >
        {/* sun */}
        <div className="absolute top-8 right-12 w-28 h-28 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(45 90% 82%) 0%, hsl(45 90% 82% / 0) 70%)" }} />
        {/* distant hills */}
        <div className="absolute inset-x-0 bottom-[42%] h-24 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 100%, hsl(270 30% 65%) 0%, transparent 60%), radial-gradient(ellipse at 75% 100%, hsl(290 25% 60%) 0%, transparent 65%)", opacity: 0.5 }} />

        {/* ambient petals */}
        {ambient.map(a => (
          <div key={`amb-${a.id}`} className="absolute pointer-events-none"
            style={{
              left: `${a.left}%`, bottom: -10, width: 7, height: 7,
              borderRadius: "60% 40% 60% 40%",
              background: `hsl(${a.hue} 55% 75%)`,
              opacity: 0.55,
              animation: `lg-drift ${a.dur}s linear ${a.delay}s infinite`,
            }}
          />
        ))}

        {/* grass shadow */}
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 0%, hsl(115 40% 28% / 0.5) 100%)" }} />

        {/* flowers */}
        {flowers.map((f, i) => {
          const isBloom = bloomed.has(i);
          const z = Math.round(f.b);
          return (
            <button
              key={f.id}
              type="button"
              data-cursor="hover"
              data-flower={i}
              onClick={(e) => handleClick(e, i)}
              className="absolute group focus:outline-none"
              style={{
                left: `${f.l}%`,
                bottom: `${f.b}%`,
                height: `${f.h}%`,
                zIndex: 100 - z,
                transformOrigin: "bottom center",
                animation: `lg-sway ${f.sway}s ease-in-out ${f.delay}s infinite alternate`,
                filter: `brightness(${0.75 + f.b / 120})`,
              }}
              aria-label={`Flower ${i + 1}`}
            >
              <svg viewBox="0 0 40 200" preserveAspectRatio="xMidYMax meet" className="h-full w-auto block overflow-visible">
                <path d="M20 200 Q17 140 20 80" stroke="hsl(115 45% 32%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M20 155 Q6 145 4 124 Q18 132 20 150 Z" fill="hsl(115 38% 40%)" />
                <path d="M20 130 Q32 122 35 104 Q22 110 20 126 Z" fill="hsl(115 38% 44%)" opacity="0.9" />
                <g style={{ transformOrigin: "20px 70px", transform: isBloom ? "scale(1.25)" : "scale(0.75)", transition: "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                  {[0, 60, 120, 180, 240, 300].map(rot => (
                    <ellipse key={rot} cx="20" cy="55" rx="6.5" ry="15"
                      fill={`hsl(${f.hue} ${isBloom ? 65 : 35}% ${isBloom ? 74 : 58}%)`}
                      opacity={isBloom ? 0.95 : 0.55}
                      style={{ transform: `rotate(${rot}deg)`, transformOrigin: "20px 70px", transition: "fill 600ms, opacity 600ms" }}
                    />
                  ))}
                  <circle cx="20" cy="70" r={isBloom ? 5.5 : 3} fill="hsl(45 90% 65%)" style={{ transition: "r 600ms" }} />
                  {isBloom && (
                    <circle cx="20" cy="70" r="6" fill="none" stroke="hsl(45 90% 78%)" strokeWidth="0.8" opacity="0.7">
                      <animate attributeName="r" from="5" to="22" dur="1.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="1.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              </svg>
            </button>
          );
        })}

        {/* burst petals */}
        {petals.map(p => (
          <div key={p.id} className="absolute pointer-events-none"
            style={{
              left: p.x, top: p.y, width: 10, height: 10,
              borderRadius: "60% 40% 60% 40%",
              background: `hsl(${p.hue} 60% 75%)`,
              transform: `rotate(${p.rot}deg)`,
              animation: `lg-burst 3.5s ease-out forwards`,
              ['--tx' as string]: `${(Math.random() * 200 - 100).toFixed(0)}px`,
              ['--ty' as string]: `${(-100 - Math.random() * 200).toFixed(0)}px`,
            } as React.CSSProperties}
          />
        ))}

        {/* butterflies */}
        {butterflies.map(b => (
          <div key={b.id} className="absolute pointer-events-none"
            style={{
              left: b.from.x, top: b.from.y,
              animation: `lg-fly 6s ease-in-out forwards`,
              ['--dx' as string]: `${b.to.x - b.from.x}px`,
              ['--dy' as string]: `${b.to.y - b.from.y}px`,
            } as React.CSSProperties}
          >
            <svg width="26" height="22" viewBox="0 0 26 22" style={{ animation: "lg-flap 0.18s ease-in-out infinite alternate" }}>
              <ellipse cx="8" cy="11" rx="7" ry="9" fill="hsl(320 70% 70%)" opacity="0.85" />
              <ellipse cx="18" cy="11" rx="7" ry="9" fill="hsl(320 70% 70%)" opacity="0.85" />
              <ellipse cx="13" cy="11" rx="1" ry="6" fill="hsl(290 40% 25%)" />
            </svg>
          </div>
        ))}

        {bloomed.size >= COUNT && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-[200]">
            <p className="font-hand text-5xl md:text-6xl text-burgundy bg-paper/80 px-8 py-4 rounded-sm backdrop-blur-sm">
              a whole field — for you.
            </p>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        @keyframes lg-sway {
          from { transform: rotate(-3deg); }
          to { transform: rotate(3deg); }
        }
        @keyframes lg-burst {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(540deg); opacity: 0; }
        }
        @keyframes lg-drift {
          0% { transform: translate(0,0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translate(40px, -700px) rotate(360deg); opacity: 0; }
        }
        @keyframes lg-fly {
          0% { transform: translate(0,0); }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
        @keyframes lg-flap {
          from { transform: scaleX(1); }
          to { transform: scaleX(0.4); }
        }
      `}</style>
    </section>
  );
};
