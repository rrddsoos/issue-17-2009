import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import maithiliCover from "@/assets/maithili-cover.jpg";

const NAME = "MAITHILI";

export const Cover = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-cream">
      {/* background portrait */}
      <motion.div style={{ y: photoY }} className="absolute inset-0 z-0">
        <motion.img
          src={maithiliCover}
          alt="Maithili"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "60% center", filter: "sepia(0.05) saturate(1.05) contrast(1.1) brightness(0.85)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(var(--ink)/0.4) 0%, transparent 25%, transparent 65%, hsl(var(--ink)/0.7) 100%)"
        }} />
        <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      </motion.div>

      {/* masthead */}
      <div className="absolute top-0 inset-x-0 z-20 grid grid-cols-3 items-baseline px-6 md:px-12 pt-6 text-[10px] tracking-[0.4em] uppercase text-cream/80 font-body">
        <span>Issue 17 · The Birthday Edition</span>
        <span className="hidden md:inline text-center">A Special Issue, Just For You</span>
        <span className="text-right">VI · VI · MMXXVI</span>
      </div>

      <motion.div
        style={{ y, opacity: op }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[11px] tracking-[0.5em] uppercase text-cream/80 mb-4"
        >The woman of the year · turning seventeen</motion.div>

        {/* MAITHILI */}
        <div className="relative">
          <h1 aria-hidden className="absolute inset-0 font-display text-[18vw] md:text-[14vw] leading-[0.85] text-center select-none text-ink/90">
            {NAME}
          </h1>
          <h1
            className="relative font-display text-[18vw] md:text-[14vw] leading-[0.85] text-center select-none bg-clip-text text-transparent"
            style={{
              backgroundImage: `url(${maithiliCover})`,
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
              WebkitBackgroundClip: "text",
              WebkitTextStroke: "2px hsl(var(--ink))",
              filter: "contrast(1.25) saturate(1.15) brightness(0.9)",
              textShadow: "0 6px 30px hsl(var(--ink) / 0.35)",
            }}
          >
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
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="hairline-gold w-40 my-6"
        />

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="font-serif2 italic text-2xl md:text-3xl text-cream text-center max-w-2xl"
          style={{ textShadow: "0 2px 20px hsl(var(--ink)/0.5)" }}
        >
          One hundred reasons, a thousand mornings, and<br className="hidden md:block"/> a forever already in motion.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl text-center">
          {[
            { tag: "Cover Story", t: "The Woman, The Myth" },
            { tag: "Exclusive", t: "A Letter, Just For You" },
            { tag: "Inside", t: "Top 10 Memories" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.15, duration: 0.8 }}
              className="backdrop-blur-[2px]"
            >
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">{c.tag}</div>
              <div className="font-display text-lg italic text-cream">{c.t}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.4em] uppercase text-cream/60 flex flex-col items-center gap-2"
      >
        <span>Turn the page</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="h-8 w-px bg-cream/40" />
      </motion.div>
    </section>
  );
};