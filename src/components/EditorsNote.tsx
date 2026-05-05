import { motion } from "framer-motion";

export const EditorsNote = () => {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-paper">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.9 }}
          className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-4"
        >Editor’s Note · pp. 04</motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl leading-[1.05] text-ink mb-10"
        >
          A few words, before<br/><em className="font-serif2">you turn the page.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
          className="font-serif2 text-xl leading-relaxed text-ink/85 drop-cap"
        >
          Maithili — baby, bachha, madam ji — some people enter your life like a sentence you didn’t know you were waiting to read. The kind that makes you put the book down for a moment and stare at the ceiling, smiling. This issue is a small attempt to bind one such sentence into something you can hold. Inside, you’ll find a magazine made for an audience of exactly one — interviews with no journalists, fashion shoots with no photographers, and a love letter signed only with my name. Happy seventeenth, my favorite headline.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hairline-gold w-32 mt-10 origin-left"
        />
        <div className="mt-4 font-hand text-3xl text-burgundy">— Yours, always.</div>
      </div>
    </section>
  );
};
