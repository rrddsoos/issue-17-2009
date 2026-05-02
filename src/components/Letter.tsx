import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LETTER = `My love,

Happy birthday. I rewrote this letter several times and each draft sounded smaller than what I meant. So here is the smallest, truest version:

You are the best thing in my ordinary, the reason mornings feel like beginnings, the joke I want to tell first. I hope this year is kind to you in a thousand small ways — good coffee, slow Sundays, songs that arrive at the perfect moment, and me, on time, every time.

Thank you for being yourself, loudly. I am, and will be, completely yours.`;

export const Letter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(i);
      if (i >= LETTER.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 bg-paper">
      <div className="max-w-2xl mx-auto">
        <div className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-4">A Letter, Handwritten</div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="font-display text-5xl md:text-6xl text-ink mb-10"
        >To <em className="italic gold-foil">you</em>.</motion.h2>

        <div className="relative bg-cream p-10 md:p-14 polaroid">
          <pre className="font-hand text-2xl md:text-3xl leading-[1.5] text-ink whitespace-pre-wrap font-normal">
            {LETTER.slice(0, shown)}
            {shown < LETTER.length && <span className="inline-block w-[2px] h-7 bg-burgundy align-middle animate-pulse ml-1" />}
          </pre>
        </div>
      </div>
    </section>
  );
};
