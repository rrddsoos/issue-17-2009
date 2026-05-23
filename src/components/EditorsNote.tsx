import { motion } from "framer-motion";
import editorsBg from "@/assets/editors-note-bg.jpg";

export const EditorsNote = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={editorsBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.45) saturate(1.1)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(var(--ink)/0.3) 0%, transparent 30%, transparent 60%, hsl(var(--ink)/0.6) 100%)"
        }} />
        <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      </div>

      {/* content */}
      <div className="relative z-10 min-h-screen flex items-center py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.9 }}
            className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-4"
          >Editor's Note · pp. 04</motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-[1.05] text-cream mb-10"
          >
            A few words, before<br/><em className="font-serif2">you turn the page.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
            className="font-serif2 text-xl leading-relaxed text-cream/90 drop-cap"
          >
            Maithili — or should i say "Miss Majestic" — some people enter your life like a sentence you didn't know you were waiting to read. The kind that makes you put the book down for a moment and stare at the ceiling, smiling. This issue is a small attempt to bind one such sentence into something you can hold. Inside, you'll find a magazine made for an audience of exactly one — interviews with no journalists, fashion shoots with no photographers, and a letter signed only with my name. Happy seventeenth, my favorite headline.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hairline-gold w-32 mt-10 origin-left"
          />
          <div className="mt-4 font-hand text-3xl text-blush">— Yours, always.</div>
        </div>
      </div>
    </section>
  );
};