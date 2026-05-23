import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHOTOS = [
  { src: `${import.meta.env.BASE_URL}media/fav-1.jpg`, caption: "always her." },
  { src: `${import.meta.env.BASE_URL}media/fav-2.jpg`, caption: "this one. always this one." },
  { src: `${import.meta.env.BASE_URL}media/fav-3.jpg`, caption: "i keep coming back to this." },
  { src: `${import.meta.env.BASE_URL}media/fav-4.jpg`, caption: "my favourite frame." },
];

const SPECIAL = {
  src: `${import.meta.env.BASE_URL}media/fav-5.jpg`,
  caption: "the one i'll never forget.",
};

const RevealCard = ({ src, caption, index }: { src: string; caption: string; index: number }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative aspect-[3/4] bg-ink overflow-hidden polaroid !p-2 !pb-8 cursor-pointer"
      onClick={() => setRevealed(true)}
    >
      {/* hidden image */}
      <AnimatePresence>
        {revealed ? (
          <motion.img
            key="photo"
            src={src}
            alt=""
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.div
            key="hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-ink gap-4"
          >
            <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-gold-deep/60 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep/80">Tap to reveal</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* caption */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-2 left-0 right-0 text-center font-hand text-base text-ink/70"
        >
          {caption}
        </motion.div>
      )}
    </motion.div>
  );
};

const EnvelopeCard = () => {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");

  const handleClick = () => {
    if (stage === "closed") setStage("opening");
    else if (stage === "opening") setStage("open");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.6 }}
      className="col-span-1 md:col-span-2 flex justify-center"
    >
      <div className="w-full max-w-md cursor-pointer" onClick={handleClick}>
        <AnimatePresence mode="wait">
          {stage === "closed" && (
            <motion.div
              key="closed"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] bg-ink flex flex-col items-center justify-center gap-4 polaroid !p-6"
            >
              <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
              {/* envelope SVG */}
              <svg width="80" height="60" viewBox="0 0 80 60" className="relative z-10">
                <rect x="2" y="10" width="76" height="48" rx="3" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1.5"/>
                <path d="M2 10 L40 38 L78 10" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1.5"/>
                <path d="M2 58 L28 34" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1" opacity="0.5"/>
                <path d="M78 58 L52 34" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1" opacity="0.5"/>
              </svg>
              <div className="relative z-10 text-center">
                <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-1">A special one</div>
                <div className="font-hand text-2xl text-cream/80">tap to open</div>
              </div>
            </motion.div>
          )}

          {stage === "opening" && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] bg-ink flex flex-col items-center justify-center gap-4 polaroid !p-6"
            >
              <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
              <motion.svg
                width="80" height="60" viewBox="0 0 80 60"
                className="relative z-10"
              >
                <rect x="2" y="10" width="76" height="48" rx="3" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1.5"/>
                <motion.path
                  d="M2 10 L40 38 L78 10"
                  fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1.5"
                  initial={{ d: "M2 10 L40 38 L78 10" }}
                  animate={{ d: "M2 10 L40 -10 L78 10" }}
                  transition={{ duration: 0.6 }}
                />
                <path d="M2 58 L28 34" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1" opacity="0.5"/>
                <path d="M78 58 L52 34" fill="none" stroke="hsl(var(--gold-deep))" strokeWidth="1" opacity="0.5"/>
              </motion.svg>
              <div className="relative z-10 text-center">
                <div className="font-hand text-2xl text-gold-deep">opening...</div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-cream/50 mt-1">tap again</div>
              </div>
            </motion.div>
          )}

          {stage === "open" && (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative polaroid !p-2 !pb-10"
            >
              <img
                src={SPECIAL.src}
                alt=""
                className="w-full aspect-[4/3] object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 left-0 right-0 text-center font-hand text-xl text-ink/70"
              >
                {SPECIAL.caption}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const FavouritePhotos = () => {
  return (
    <section className="relative py-32 px-6 bg-ink overflow-hidden">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep/70 mb-4">A Private Collection</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] gold-foil">
            My favourite<br/><em className="italic">pictures of you.</em>
          </h2>
          <div className="hairline-gold w-24 mx-auto mt-6" />
          <p className="font-serif2 italic text-lg text-cream/50 mt-4">Each one, a moment I keep.</p>
        </motion.div>

        {/* 4 reveal cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {PHOTOS.map((p, i) => (
            <RevealCard key={i} src={p.src} caption={p.caption} index={i} />
          ))}
        </div>

        {/* special envelope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnvelopeCard />
        </div>
      </div>
    </section>
  );
};
