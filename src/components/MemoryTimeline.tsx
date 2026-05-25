import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { FadeIn, SlideInLeft, BlurIn } from "@/components/AnimatedText";

type Chapter = {
  tag: string;
  title: string;
  note: string;
  type: "video" | "image";
  src: string;
};

const memories: Chapter[] = [
  { tag: "Chapter I", title: "The Spark", note: "Where it all began.", type: "video", src: `${import.meta.env.BASE_URL}media/chapters/chapter-1.mp4` },
  { tag: "Chapter II", title: "During The Great Separation", note: "Distance, tested and survived.", type: "image", src: `${import.meta.env.BASE_URL}media/chapters/chapter-2.jpg` },
  { tag: "Chapter III", title: "Stronger This Time", note: "Returned, deeper than before.", type: "image", src: `${import.meta.env.BASE_URL}media/chapters/chapter-3.jpg` },
];

export const MemoryTimeline = () => {
  return (
    <section className="relative py-24 md:py-32 bg-cream">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* header */}
        <div className="mb-20 relative">
          <div className="absolute -top-14 left-0 right-0 z-10 flex justify-between text-[10px] tracking-[0.4em] uppercase text-ink/60">
            <span>Feature · The Memoir</span>
            <span>pp. 22 — 36</span>
          </div>

          <SlideInLeft className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-4">
            The Memoir
          </SlideInLeft>

          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] text-ink mb-6">
            <AnimatedHeading text="Three chapters, one love." delay={0.1} />
          </h2>

          <FadeIn delay={0.4} className="font-serif2 italic text-xl text-ink/70 max-w-md">
            Scroll, slowly. Each frame is a moment we earned.
          </FadeIn>
        </div>

        {/* chapters */}
        <div className="flex flex-col gap-24 md:gap-32">
          {memories.map((m, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col"
            >
              <motion.div
                className="relative aspect-[3/4] bg-cream-deep overflow-hidden polaroid"
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {m.type === "video" ? (
                  <video
                    src={m.src}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                  />
                ) : (
                  <img
                    src={m.src}
                    alt={m.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute bottom-3 left-3 right-3 font-hand text-2xl text-paper drop-shadow-lg">{m.title}</div>
              </motion.div>

              <motion.div
                className="mt-5 flex items-baseline gap-3"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: false }}
                style={{ originX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase text-gold-deep">{m.tag}</span>
                <div className="hairline flex-1 opacity-30" />
              </motion.div>

              <BlurIn delay={0.3}>
                <h3 className="font-display text-2xl italic mt-2 text-ink">{m.title}</h3>
              </BlurIn>

              <FadeIn delay={0.4}>
                <p className="font-serif2 text-lg text-ink/70 mt-1">{m.note}</p>
              </FadeIn>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};