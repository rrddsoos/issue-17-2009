import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const memories = [
  { tag: "Chapter I", title: "The Spark", note: "Where it all began." },
  { tag: "Chapter II", title: "During The Great Separation", note: "Distance, tested and survived." },
  { tag: "Chapter III", title: "Stronger This Time", note: "Returned, deeper than before." },
];

const palette = ["from-blush", "from-cream", "from-paper", "from-blush", "from-cream", "from-paper"];

export const MemoryTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-cream">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-10 left-0 right-0 px-6 md:px-12 z-10 flex justify-between text-[10px] tracking-[0.4em] uppercase text-ink/60">
          <span>Feature · The Memoir</span>
          <span>pp. 22 — 36</span>
        </div>

        <motion.div style={{ x }} className="flex h-full items-center gap-12 pl-[10vw] pr-[20vw]">
          {/* intro panel */}
          <div className="shrink-0 w-[80vw] md:w-[60vw] flex flex-col justify-center">
            <div className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-4">The Memoir</div>
            <h2 className="font-display text-6xl md:text-8xl leading-[0.9] text-ink mb-6">
              Three chapters,<br/><em className="font-serif2 italic">one love.</em>
            </h2>
            <p className="font-serif2 italic text-xl text-ink/70 max-w-md">
              Scroll, slowly. Each frame is a moment we earned.
            </p>
          </div>

          {memories.map((m, i) => (
            <article key={i} className="shrink-0 w-[70vw] md:w-[36vw] flex flex-col">
              <div className={`relative aspect-[3/4] bg-gradient-to-br ${palette[i % palette.length]} to-cream-deep polaroid`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-8xl text-ink/12 italic" style={{ color: 'hsl(var(--ink) / 0.08)' }}>{i + 1}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 font-hand text-2xl text-burgundy">{m.title}</div>
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-[10px] tracking-[0.4em] uppercase text-gold-deep">{m.tag}</span>
                <div className="hairline flex-1 opacity-30" />
              </div>
              <h3 className="font-display text-2xl italic mt-2 text-ink">{m.title}</h3>
              <p className="font-serif2 text-lg text-ink/70 mt-1">{m.note}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
