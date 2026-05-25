import { motion } from "framer-motion";
import editorsBg from "@/assets/editors-note-bg.jpg";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { FadeUp, FadeIn, SlideInLeft } from "@/components/AnimatedText";

export const EditorsNote = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
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

      <div className="relative z-10 min-h-screen flex items-center py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <SlideInLeft className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-4">
            Editor's Note · pp. 04
          </SlideInLeft>

          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream mb-10">
            <AnimatedHeading text="A few words, before you turn the page." delay={0.1} />
          </h2>

          <FadeIn delay={0.4} className="font-serif2 text-xl leading-relaxed text-cream/90 drop-cap">
            Maithili — or should i say "Miss Majestic" — some people enter your life like a sentence you didn't know you were waiting to read. The kind that makes you put the book down for a moment and stare at the ceiling, smiling. This issue is a small attempt to bind one such sentence into something you can hold. Inside, you'll find a magazine made for an audience of exactly one — interviews with no journalists, fashion shoots with no photographers, and a letter signed only with my name. Happy seventeenth, my favorite headline.
          </FadeIn>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hairline-gold w-32 mt-10 origin-left"
          />
          <FadeUp delay={0.8} className="mt-4 font-hand text-3xl text-blush">
            — Yours, always.
          </FadeUp>
        </div>
      </div>
    </section>
  );
};