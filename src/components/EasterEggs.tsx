import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export const EasterEggs = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (buf.join("|").toLowerCase() === KONAMI.join("|").toLowerCase()) {
        setShow(true);
        confetti({ particleCount: 220, spread: 100, origin: { y: 0.6 }, colors: ["#C8A86B","#E8C7C0","#5B1A1A","#F4EFE6"] });
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-confetti-trigger]") && (e as any).detail === 3) {
        confetti({ particleCount: 150, spread: 80, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }, colors: ["#C8A86B","#E8C7C0","#5B1A1A"] });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("click", onClick); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-ink/85 grain flex items-center justify-center p-6"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-cream p-10 md:p-14 max-w-lg text-center polaroid"
          >
            <div className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-3">Secret · pp. ∞</div>
            <h3 className="font-display text-4xl mb-4">A bonus page.</h3>
            <p className="font-hand text-2xl text-ink leading-relaxed">
              You found it. Of course you did.<br/>You find everything that matters.
            </p>
            <div className="hairline-gold w-20 mx-auto my-5" />
            <div className="text-[10px] tracking-[0.4em] uppercase text-ink/50">Click anywhere to close</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
