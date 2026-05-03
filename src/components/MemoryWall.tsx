import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type Reel = { src?: string; poster?: string; caption: string };

const defaultReels: Reel[] = [
  { caption: "the laugh, on tape" },
  { caption: "a tuesday, somehow" },
  { caption: "car windows down" },
  { caption: "kitchen, dancing" },
  { caption: "the slow afternoon" },
  { caption: "and again, and again" },
];

const tilts = [-2, 1.5, -1, 2, -1.5, 1];

export const MemoryWall = ({ videos = defaultReels }: { videos?: Reel[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  const dialogVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (open === null && dialogVideoRef.current) {
      dialogVideoRef.current.pause();
    }
  }, [open]);

  return (
    <section className="relative bg-cream-deep py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-3">Feature · The Memory Wall</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-ink">
            Moving <em className="font-serif2 italic">pictures.</em>
          </h2>
          <div className="hairline-gold w-24 mx-auto my-5" />
          <p className="font-serif2 italic text-lg text-ink/60">Press play, on us.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {videos.map((v, i) => (
            <motion.button
              key={i}
              type="button"
              data-cursor="hover"
              onClick={() => v.src && setOpen(i)}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="polaroid !p-3 !pb-10 text-left group"
              style={{ cursor: v.src ? "pointer" : "default" }}
            >
              <div className="relative aspect-[3/4] bg-ink overflow-hidden">
                {v.poster ? (
                  <img src={v.poster} alt={v.caption} className="absolute inset-0 w-full h-full object-cover" />
                ) : v.src ? (
                  <video src={v.src} preload="metadata" muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-burgundy/40 via-ink to-gold/15" />
                )}
                <div className="absolute inset-0 grain opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full border-2 border-cream/85 bg-ink/30 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <svg width="18" height="18" viewBox="0 0 16 16"><polygon points="4,3 13,8 4,13" fill="hsl(var(--cream))" /></svg>
                  </div>
                </div>
                <div className="absolute top-2 left-2 text-[8px] tracking-[0.4em] uppercase text-cream/70">Reel No. {String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="mt-4 font-hand text-2xl text-burgundy text-center">{v.caption}</div>
            </motion.button>
          ))}
        </div>

        <p className="text-center font-serif2 italic text-sm text-ink/50 mt-12">— more reels, soon.</p>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-3xl bg-ink border-ink p-0 overflow-hidden">
          <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
          {open !== null && videos[open]?.src ? (
            <video
              ref={dialogVideoRef}
              src={videos[open].src}
              poster={videos[open].poster}
              controls
              autoPlay
              playsInline
              className="relative w-full aspect-video bg-ink"
            />
          ) : (
            <div className="aspect-video flex items-center justify-center text-cream/60 font-serif2 italic">Reel coming soon.</div>
          )}
          {open !== null && (
            <div className="relative px-6 py-4 font-hand text-2xl text-blush text-center">{videos[open].caption}</div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
