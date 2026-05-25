import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCE = [
  { text: "Happy 17th, Maithili.", delay: 0.3 },
  { text: "Issue 17 · Vol. 1", delay: 2.0 },
  { text: "For you, only.", delay: 3.8 },
  { text: "A Birthday Issue · MMXXVI", delay: 5.4 },
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

    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 0.5 + Math.random() * 1.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.15 - Math.random() * 0.35,
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
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
    setShowFullscreenPrompt(false);
  };

  useEffect(() => {
    if (showFullscreenPrompt) return;
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 1400);
    }, 8000);
    return () => clearTimeout(t);
  }, [showFullscreenPrompt, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[180] bg-ink flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 1.4, ease: [0.7, 0, 0.3, 1] } }}
        >
          <style>{`
            body { overflow: hidden !important; }
            ::-webkit-scrollbar { display: none !important; }
          `}</style>

          <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
          <GoldParticles />

          {/* Fullscreen prompt */}
          <AnimatePresence>
            {showFullscreenPrompt && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-6">For the best experience</div>
                  <h2 className="font-display text-3xl md:text-5xl italic text-cream mb-4">
                    Open in fullscreen.
                  </h2>
                  <div className="hairline-gold w-24 mx-auto my-5" />
                  <p className="font-serif2 italic text-cream/60 text-base mb-8">
                    This issue was made to be experienced fully.
                  </p>
                  <button
                    onClick={enterFullscreen}
                    className="px-10 py-4 border border-gold-deep text-gold-deep text-[11px] tracking-[0.3em] uppercase hover:bg-gold-deep hover:text-ink transition-colors"
                  >
                    Enter Fullscreen ⤢
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cinematic sequence */}
          {!showFullscreenPrompt && (
            <>
              {/* top hairline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute top-12 w-32 hairline-gold"
                style={{ left: "50%", transform: "translateX(-50%)", transformOrigin: "center" }}
              />

              {/* text lines */}
              <div className="relative z-10 text-center px-6 flex flex-col items-center gap-4 w-full">
                {SEQUENCE.map((line, i) => (
                  <div key={i} className="overflow-hidden w-full text-center">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: line.delay,
                        duration: 1.0,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className={`font-display italic text-center ${
                        i === 0
                          ? "text-3xl md:text-6xl gold-foil"
                          : i === 1
                          ? "text-lg md:text-2xl text-gold-deep tracking-[0.25em]"
                          : i === 2
                          ? "text-2xl md:text-4xl text-cream/80"
                          : "text-[10px] tracking-[0.5em] uppercase text-gold-deep/50 not-italic"
                      }`}
                    >
                      {line.text}
                    </motion.div>
                  </div>
                ))}

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 4.8, duration: 1 }}
                  className="hairline-gold w-24 mt-2"
                />
              </div>

              {/* bottom hairline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 w-32 hairline-gold"
                style={{ left: "50%", transform: "translateX(-50%)", transformOrigin: "center" }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};