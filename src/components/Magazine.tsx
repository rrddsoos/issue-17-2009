import { useRef, useState, forwardRef, ReactNode, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const HERO_VIDEO_SRC = "/media/cover-story.mp4";
const HERO_VIDEO_POSTER = "/media/cover-story-poster.jpg";

const HeroFilmPage = forwardRef<HTMLDivElement>((_, ref) => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [open]);

  const goFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    const req = v.requestFullscreen || (v as unknown as { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen;
    if (req) req.call(v);
  };

  return (
    <div ref={ref} className="bg-paper relative overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative h-full w-full p-10 md:p-14 flex flex-col">
        <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">And finally —</div>
        <h2 className="font-display text-4xl italic mb-6">Press play.</h2>
        <button
          type="button"
          data-cursor="hover"
          onClick={() => setOpen(true)}
          className="relative flex-1 bg-ink rounded-sm overflow-hidden flex items-center justify-center group"
          style={{ minHeight: 320 }}
        >
          <img
            src={HERO_VIDEO_POSTER}
            alt=""
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 grain opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-burgundy/40 via-transparent to-gold/20" />
          <div className="relative z-10 flex flex-col items-center gap-3 text-cream">
            <div className="h-16 w-16 rounded-full border-2 border-cream/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-ink/30 backdrop-blur-sm">
              <svg width="22" height="22" viewBox="0 0 16 16"><polygon points="4,3 13,8 4,13" fill="currentColor"/></svg>
            </div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-cream/80">A short film · for you</div>
          </div>
        </button>
        <p className="font-hand text-xl text-burgundy mt-4">— a little something I made for you.</p>
        <div className="absolute bottom-5 left-6 text-[10px] tracking-[0.4em] uppercase text-ink/50 font-body">10 · ICONIC SINCE 2009</div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none w-screen h-screen sm:rounded-none bg-ink border-0 p-0 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 grain opacity-25 pointer-events-none" />
          <video
            ref={videoRef}
            src={HERO_VIDEO_SRC}
            poster={HERO_VIDEO_POSTER}
            controls
            playsInline
            className="relative z-10 w-full h-full object-contain bg-ink"
          />
          <button
            type="button"
            onClick={goFullscreen}
            className="absolute top-4 right-16 z-20 text-[10px] tracking-[0.4em] uppercase text-cream/80 hover:text-cream border border-cream/40 px-3 py-1.5 rounded-sm bg-ink/50 backdrop-blur-sm"
            data-cursor="hover"
          >
            Fullscreen ⤢
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
});
HeroFilmPage.displayName = "HeroFilmPage";

type FlipBook = { pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number; getPageCount: () => number } };

const LavenderGardenPage = forwardRef<HTMLDivElement, { pageNum: number; side: "L" | "R" }>(
  ({ pageNum, side }, ref) => {
    const FLOWERS = 14;
    const [bloomed, setBloomed] = useState<Set<number>>(new Set());
    const positions = [
      { l: 8, b: 6, h: 38, hue: 268 }, { l: 16, b: 4, h: 46, hue: 275 },
      { l: 24, b: 8, h: 34, hue: 262 }, { l: 32, b: 5, h: 50, hue: 280 },
      { l: 40, b: 7, h: 40, hue: 270 }, { l: 48, b: 4, h: 44, hue: 285 },
      { l: 56, b: 9, h: 36, hue: 265 }, { l: 64, b: 6, h: 48, hue: 278 },
      { l: 72, b: 5, h: 42, hue: 272 }, { l: 80, b: 8, h: 38, hue: 282 },
      { l: 88, b: 4, h: 46, hue: 268 }, { l: 12, b: 14, h: 30, hue: 290 },
      { l: 52, b: 16, h: 28, hue: 258 }, { l: 84, b: 14, h: 32, hue: 288 },
    ];

    const toggle = (i: number) => {
      setBloomed(prev => {
        const next = new Set(prev);
        next.has(i) ? next.delete(i) : next.add(i);
        return next;
      });
    };

    return (
      <div ref={ref} className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(35 40% 94%) 0%, hsl(280 30% 88%) 55%, hsl(110 25% 70%) 100%)" }}>
        <div className="absolute inset-0 grain pointer-events-none" />
        {/* sun */}
        <div className="absolute top-10 right-12 w-20 h-20 rounded-full" style={{ background: "radial-gradient(circle, hsl(45 80% 80%) 0%, hsl(45 80% 80% / 0) 70%)" }} />
        <div className="relative h-full w-full p-10 md:p-14 flex flex-col">
          <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">An Interactive Garden</div>
          <h2 className="font-display text-4xl italic mb-2">Lavender lilies,<br/>for you to pick.</h2>
          <p className="font-serif2 italic text-base text-ink/70">Tap a stem. Watch it bloom. <span className="font-hand text-xl text-burgundy ml-1">— {bloomed.size} picked</span></p>

          <div className="absolute inset-x-0 bottom-0 h-[55%]">
            {/* grass */}
            <div className="absolute inset-x-0 bottom-0 h-10" style={{ background: "linear-gradient(180deg, hsl(110 30% 55% / 0) 0%, hsl(110 35% 40%) 100%)" }} />
            {positions.slice(0, FLOWERS).map((p, i) => {
              const isBloom = bloomed.has(i);
              return (
                <button
                  key={i}
                  type="button"
                  data-cursor="hover"
                  onClick={(e) => { e.stopPropagation(); toggle(i); }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="absolute group"
                  style={{ left: `${p.l}%`, bottom: `${p.b}%`, height: `${p.h}%`, transformOrigin: "bottom center", animation: `sway ${3 + (i % 4) * 0.4}s ease-in-out ${i * 0.15}s infinite alternate` }}
                  aria-label={`Flower ${i + 1}`}
                >
                  <svg viewBox="0 0 40 200" preserveAspectRatio="xMidYMax meet" className="h-full w-auto block overflow-visible">
                    {/* stem */}
                    <path d="M20 200 Q18 140 20 80" stroke="hsl(110 40% 35%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    {/* leaf */}
                    <path d="M20 150 Q8 140 6 122 Q18 130 20 145 Z" fill="hsl(110 35% 42%)" />
                    {/* lily petals */}
                    <g style={{ transformOrigin: "20px 70px", transform: isBloom ? "scale(1.15)" : "scale(0.85)", transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                      {[0, 60, 120, 180, 240, 300].map(rot => (
                        <ellipse
                          key={rot}
                          cx="20" cy="55" rx="6" ry="14"
                          fill={`hsl(${p.hue} ${isBloom ? 60 : 40}% ${isBloom ? 72 : 60}%)`}
                          opacity={isBloom ? 0.92 : 0.7}
                          style={{ transform: `rotate(${rot}deg)`, transformOrigin: "20px 70px", transition: "fill 500ms, opacity 500ms" }}
                        />
                      ))}
                      <circle cx="20" cy="70" r={isBloom ? 5 : 3.5} fill="hsl(45 85% 65%)" style={{ transition: "r 500ms" }} />
                      {isBloom && (
                        <>
                          <circle cx="20" cy="70" r="9" fill="none" stroke="hsl(45 85% 75%)" strokeWidth="0.8" opacity="0.6">
                            <animate attributeName="r" from="5" to="18" dur="1.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.7" to="0" dur="1.2s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                    </g>
                  </svg>
                </button>
              );
            })}
            {/* floating petals when blooms exist */}
            {bloomed.size > 0 && Array.from({ length: Math.min(bloomed.size * 2, 12) }).map((_, i) => (
              <div
                key={`p-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${(i * 13 + 7) % 95}%`,
                  bottom: 0,
                  width: 8, height: 8,
                  borderRadius: "60% 40% 60% 40%",
                  background: `hsl(${265 + (i * 7) % 30} 55% 75%)`,
                  animation: `petal-float ${6 + (i % 5)}s linear ${i * 0.4}s infinite`,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>

          {bloomed.size >= FLOWERS && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="font-hand text-4xl text-burgundy bg-paper/70 px-6 py-3 rounded-sm backdrop-blur-sm">a whole bouquet — for you.</p>
            </div>
          )}

          <div className={`absolute bottom-5 ${side === "L" ? "left-6" : "right-6"} text-[10px] tracking-[0.4em] uppercase text-ink/60 font-body`}>
            {pageNum} · ICONIC SINCE 2009
          </div>
        </div>
        <style>{`
          @keyframes sway { from { transform: rotate(-2.5deg); } to { transform: rotate(2.5deg); } }
          @keyframes petal-float {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}40px, -380px) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }
);
LavenderGardenPage.displayName = "LavenderGardenPage";

const Page = forwardRef<HTMLDivElement, { children: ReactNode; pageNum?: number; side?: "L" | "R" }>(
  ({ children, pageNum, side }, ref) => (
    <div ref={ref} className="bg-paper relative overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative h-full w-full p-10 md:p-14 flex flex-col">
        {children}
        {pageNum !== undefined && (
          <div className={`absolute bottom-5 ${side === "L" ? "left-6" : "right-6"} text-[10px] tracking-[0.4em] uppercase text-ink/50 font-body`}>
            {pageNum} · ICONIC SINCE 2009
          </div>
        )}
      </div>
    </div>
  )
);
Page.displayName = "Page";

const Cover = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="relative bg-ink text-cream overflow-hidden">
    <div className="absolute inset-0 grain opacity-50" />
    <div className="relative h-full w-full p-10 flex flex-col">
      <div className="flex items-baseline justify-between text-[10px] tracking-[0.4em] uppercase text-cream/70">
        <span>ICONIC SINCE 2009</span><span>Issue 17 · The Birthday Edition</span>
      </div>
      <div className="flex-1 flex flex-col justify-end pb-8">
        <div className="text-[11px] tracking-[0.5em] uppercase text-gold-deep mb-3">For Maithili — 06 · 06</div>
        <h1 className="font-display text-6xl md:text-7xl leading-[0.9] mb-6">
          For <em className="gold-foil">her</em>,<br/>and her alone.
        </h1>
        <div className="hairline-gold w-32 my-4" />
        <ul className="font-serif2 italic text-lg space-y-1 text-cream/80">
          <li>· The Cover Story</li>
          <li>· The Interview</li>
          <li>· Top 10 Memories</li>
          <li>· Letters to the Editor</li>
        </ul>
      </div>
      <div className="text-[10px] tracking-[0.4em] uppercase text-cream/50">Open me →</div>
    </div>
  </div>
));
Cover.displayName = "Cover";

const Back = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="relative bg-burgundy text-cream overflow-hidden">
    <div className="absolute inset-0 grain opacity-40" />
    <div className="relative h-full w-full flex flex-col items-center justify-center p-10 text-center">
      <div className="text-[10px] tracking-[0.5em] uppercase text-cream/70 mb-6">— Fin —</div>
      <h2 className="font-display text-5xl md:text-6xl gold-foil mb-4">Happy Birthday</h2>
      <p className="font-hand text-3xl text-blush mt-2">forever yours.</p>
    </div>
  </div>
));
Back.displayName = "Back";

export const Magazine = () => {
  const bookRef = useRef<FlipBook | null>(null);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <section className="relative py-24 px-4 bg-cream-deep">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <div className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-3">The Centerpiece</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-ink">
            <em className="font-serif2 italic">ICONIC SINCE 2009</em>
          </h2>
          <p className="font-serif2 italic text-lg text-ink/60 mt-3">An issue of one. Click the cover.</p>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ filter: "drop-shadow(0 30px 60px hsl(var(--ink) / 0.25))" }}
        >
          {/* @ts-expect-error - lib types are loose */}
          <HTMLFlipBook
            width={820} height={1100} size="stretch" minWidth={420} maxWidth={980}
            minHeight={600} maxHeight={1280} maxShadowOpacity={0.4} showCover
            mobileScrollSupport drawShadow flippingTime={900}
            ref={(el: FlipBook) => { bookRef.current = el; }}
            onFlip={(e: { data: number }) => setPage(e.data)}
            onInit={(e: { object: { getPageCount: () => number } }) => setCount(e.object.getPageCount())}
            className="" style={{}} startPage={0} usePortrait autoSize={false} startZIndex={0} clickEventForward swipeDistance={30} showPageCorners disableFlipByClick={false}
          >
            <Cover />
            <Page pageNum={2} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-3">Contents</div>
              <h2 className="font-display text-4xl mb-8">In this issue.</h2>
              <ol className="font-serif2 text-lg space-y-3 text-ink/85">
                <li className="flex justify-between"><span>The Cover Story</span><span className="text-ink/40">04</span></li>
                <li className="flex justify-between"><span>The Interview</span><span className="text-ink/40">10</span></li>
                <li className="flex justify-between"><span>Style File</span><span className="text-ink/40">14</span></li>
                <li className="flex justify-between"><span>From Him</span><span className="text-ink/40">20</span></li>
                <li className="flex justify-between"><span>The Lavender Garden</span><span className="text-ink/40">22</span></li>
              </ol>
              <div className="hairline-gold w-24 mt-10" />
              <p className="font-hand text-2xl text-burgundy mt-4">— Page through, slowly.</p>
            </Page>

            <Page pageNum={3} side="R">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">Cover Story · pp. 04</div>
              <h2 className="font-display text-5xl leading-[1] mb-6">The Woman,<br/><em className="italic">The Myth.</em></h2>
              <p className="font-serif2 text-base leading-relaxed drop-cap text-ink/85">
                There’s a particular kind of person who walks into a room and rearranges the furniture without touching a thing. She is that kind of person. Soft-spoken until she isn’t, brilliant on a Tuesday, devastating in a doorway. This is the woman who taught me what it means to be paid attention to. The pages that follow are merely a footnote.
              </p>
              <div className="hairline-gold w-20 mt-6" />
              <p className="font-serif2 italic text-lg mt-4 text-burgundy">“The first thing I noticed was the way she laughed. The last will be too.”</p>
            </Page>

            <Page pageNum={4} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">The Interview</div>
              <h2 className="font-display text-3xl mb-6 italic">Four questions, on the record.</h2>
              <div className="space-y-4 font-serif2 text-base text-ink/85">
                <div><span className="font-display font-bold">Q.</span> Best day, this year?<br/><span className="italic">A. that one saturday of may</span></div>
                <div><span className="font-display font-bold">Q.</span> fav dish<br/><span className="italic">A. malka masoor</span></div>
                <div><span className="font-display font-bold">Q.</span> A song that is yours?<br/><span className="italic">A. The one we play in the car.</span></div>
                <div><span className="font-display font-bold">Q.</span> What now?<br/><span className="italic">A. Turn the page.</span></div>
              </div>
            </Page>

            <Page pageNum={5} side="R">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">Style File · I</div>
              <h2 className="font-display text-4xl mb-4">A look,<br/><em className="italic">in eight frames.</em></h2>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 min-h-0">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`${i%2 ? 'bg-blush' : 'bg-cream-deep'} polaroid !p-2 !pb-5 overflow-hidden`}>
                    <img src={`/media/style/style-${i}.jpg`} alt={`Frame ${i}`} className="h-full w-full object-cover" loading="eager" decoding="async" />
                  </div>
                ))}
              </div>
            </Page>

            <Page pageNum={6} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">Style File · II</div>
              <h2 className="font-display text-4xl mb-4">Continued,<br/><em className="italic">four more.</em></h2>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 min-h-0">
                {[5,6,7,8].map(i => (
                  <div key={i} className={`${i%2 ? 'bg-blush' : 'bg-cream-deep'} polaroid !p-2 !pb-5 overflow-hidden`}>
                    <img src={`/media/style/style-${i}.jpg`} alt={`Frame ${i}`} className="h-full w-full object-cover" loading="eager" decoding="async" />
                  </div>
                ))}
              </div>
            </Page>

            <Page pageNum={7} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">From Him</div>
              <h2 className="font-display text-4xl italic mb-6">From him.</h2>
              <p className="font-serif2 text-base text-ink/60 italic">— A few lines, set in print, just for you.</p>
              <div className="mt-6 space-y-4 font-serif2 text-base text-ink/85">
                <div className="border-l-2 border-gold pl-4 italic">“Happiest birthday to the kindest person I know.” <span className="not-italic block text-sm text-ink/50 mt-1">— a friend, soon.</span></div>
                <div className="border-l-2 border-gold pl-4 italic">“You make every room better.” <span className="not-italic block text-sm text-ink/50 mt-1">— another, soon.</span></div>
              </div>
            </Page>

            <LavenderGardenPage pageNum={8} side="R" />

            <Page pageNum={9} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">A Closing Note</div>
              <h2 className="font-display text-4xl italic mb-6">Until next issue.</h2>
              <p className="font-serif2 text-lg leading-relaxed text-ink/85">
                Thank you for reading. The next issue is already being written, in dishes done together and afternoons spent doing nothing in particular. Save your seat. Same time next year.
              </p>
              <div className="hairline-gold w-24 mt-8" />
              <p className="font-hand text-3xl text-burgundy mt-3">— With love.</p>
            </Page>

            <HeroFilmPage />


            <Back />
          </HTMLFlipBook>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={() => bookRef.current?.pageFlip().flipPrev()} className="text-[10px] tracking-[0.4em] uppercase border-b border-ink/40 hover:border-burgundy pb-1" data-cursor="hover">← Prev</button>
        <span className="font-serif2 italic text-sm text-ink/60">{Math.min(page+1, count || 1)} / {count || "—"}</span>
        <button onClick={() => bookRef.current?.pageFlip().flipNext()} className="text-[10px] tracking-[0.4em] uppercase border-b border-ink/40 hover:border-burgundy pb-1" data-cursor="hover">Next →</button>
      </div>
    </section>
  );
};
