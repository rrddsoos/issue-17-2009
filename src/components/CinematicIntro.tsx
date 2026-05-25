import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCE = [
  { text: "Happy 17th, Maithili.", delay: 0.2 },
  { text: "Issue 17 · Vol. 1", delay: 1.4 },
  { text: "For you, only.", delay: 2.4 },
];

const GoldParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 0.5 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.2 - Math.random() * 0.4,
      opacity: 0.1 + Math.random() * 0.5,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) { p.y = window.innerHeight + 10; p.x = Math.random() * window.innerWidth; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 74%, 65%, ${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export const CinematicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 1200);
    }, 4000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[180] bg-ink flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } }}
        >
          <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
          <GoldParticles />

          {/* hairline top */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-12 left-1/2 -translate-x-1/2 w-32 hairline-gold origin-center"
          />

          {/* text sequence */}
          <div className="relative z-10 text-center px-6 flex flex-col items-center gap-2">
            {SEQUENCE.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: line.delay,
                    duration: 0.9,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className={`font-display italic text-cream ${
                    i === 0 ? "text-3xl md:text-5xl gold-foil" :
                    i === 1 ? "text-lg md:text-2xl text-gold-deep tracking-[0.2em]" :
                    "text-2xl md:text-4xl text-cream/80"
                  }`}
                >
                  {line.text}
                </motion.div>
              </div>
            ))}

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.8 }}
              className="hairline-gold w-24 mt-4"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.3, duration: 0.6 }}
              className="text-[9px] tracking-[0.5em] uppercase text-gold-deep/60 mt-2"
            >
              A Birthday Issue · MMXXVI
            </motion.div>
          </div>

          {/* hairline bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 hairline-gold origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};