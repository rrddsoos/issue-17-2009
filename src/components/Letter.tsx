import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LETTER = `To,
the love of my life —

HAPPY 17TH BIRTHDAYYY MERA BACHHAA. NEVER THOUGHT I'D BE SUCH A BIG PART OF YOUR BIRTHDAY. YOU ARE THAT ONE PERSON THAT STANDS OUT IN MY EYES NO MATTER HOW BIG OF A CROWD. THE PERSON TO BRING JOY IN MY LIFE AGAIN, THE PERSON TO BRING THE LOST LIGHT IN ME.

NO MATTER HOW MUCH TIME I STAY WITH YOU, I DON'T THINK I WOULD BE ABLE TO FIGURE OUT WHY I LOVE YOU. SORRY — I MEANT EVERY BIT OF YOUR EXISTENCE. GOD HIMSELF MADE YOUR PRESENCE SO MAJESTIC THAT YOUR CHARISMA IS INCOMPREHENSIBLE.

ONCE AGAIN, HAPPY BIRTHDAYY 'THE' MAITHILII SHUKLAAAA. I LOVE YOU THE MOSTTTT. WISHING WE WILL CELEBRATE 17 YEARS OF US SOOOOOOOOONNN.

Yours,
only yours.`;

export const Letter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 5;
      setShown(i);
      if (i >= LETTER.length) clearInterval(id);
    }, 28);
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
        >To <em className="italic gold-foil">the love of my life</em>.</motion.h2>

        <div className="relative bg-cream p-10 md:p-14 polaroid">
          <pre className="font-hand text-2xl md:text-[1.7rem] leading-[1.55] text-ink whitespace-pre-wrap font-normal">
            {LETTER.slice(0, shown)}
            {shown < LETTER.length && <span className="inline-block w-[2px] h-7 bg-burgundy align-middle animate-pulse ml-1" />}
          </pre>
        </div>
      </div>
    </section>
  );
};
