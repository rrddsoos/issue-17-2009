import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NAME = "MAITHILI";
const NICKNAMES = ["baby", "bachha", "madam ji"];

export const Cover = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-cream">
      {/* masthead */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-baseline justify-between px-6 md:px-12 pt-6 text-[10px] tracking-[0.4em] uppercase text-ink/70 font-body">
        <span>Issue 17 · The Birthday Edition</span>
        <span className="hidden md:inline">A Love Letter From Krishna</span>
        <span>VI · VI · MMXXVI</span>
      </div>

      <motion.div style={{ y, opacity: op }} className="relative z-0 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[11px] tracking-[0.5em] uppercase text-burgundy mb-6"
        >The woman of the year · turning seventeen</motion.div>

        <h1 className="font-display text-[18vw] md:text-[14vw] leading-[0.85] text-center text-ink select-none">
          {NAME.split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block"
            >{c}</motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="hairline-gold w-40 my-8"
        />

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="font-serif2 italic text-xl md:text-2xl text-ink/70 text-center max-w-xl"
        >
          One hundred reasons, a thousand mornings, and<br className="hidden md:block"/> a forever already in motion.
        </motion.p>

        {/* rotating nicknames */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
          className="mt-6 h-6 relative w-64 text-center overflow-hidden"
        >
          {NICKNAMES.map((n, i) => (
            <motion.span
              key={n}
              className="absolute inset-0 font-hand text-2xl text-burgundy"
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
              transition={{
                duration: NICKNAMES.length * 2.4,
                times: [i / NICKNAMES.length, (i + 0.15) / NICKNAMES.length, (i + 0.85) / NICKNAMES.length, (i + 1) / NICKNAMES.length],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >— {n} —</motion.span>
          ))}
        </motion.div>

        {/* cover lines */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl text-center">
          {[
            { tag: "Cover Story", t: "The Woman, The Myth" },
            { tag: "Exclusive", t: "A Letter From Krishna" },
            { tag: "Inside", t: "Top 10 Memories" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.15, duration: 0.8 }}
            >
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">{c.tag}</div>
              <div className="font-display text-lg italic text-ink">{c.t}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-ink/60 flex flex-col items-center gap-2"
      >
        <span>Turn the page</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="h-8 w-px bg-ink/40" />
      </motion.div>
    </section>
  );
};
