import { useRef, useState, forwardRef, ReactNode, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import magazineBg from "@/assets/magazine-bg.jpg";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}media/reels/cover-story.mp4`;
const HERO_VIDEO_POSTER = `${import.meta.env.BASE_URL}media/reels/cover-story-poster.jpg`;

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
    <section className="relative py-24 px-4 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 z-0">
        <img
          src={magazineBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.35) saturate(1.2)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, hsl(var(--ink)/0.5) 0%, transparent 30%, transparent 70%, hsl(var(--ink)/0.5) 100%)"
        }} />
        <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto text-center mb-10 relative z-10">
        <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-3">The Centerpiece</div>
        <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-cream">
          <em className="font-serif2 italic">ICONIC SINCE 2009</em>
        </h2>
        <p className="font-serif2 italic text-lg text-cream/60 mt-3">An issue of one. Click the cover.</p>
      </div>

      {/* Desktop flipbook */}
      <div className="hidden md:flex justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ filter: "drop-shadow(0 30px 60px hsl(var(--ink) / 0.25))" }}
        >
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
                <li className="flex justify-between"><span>POV: Model</span><span className="text-ink/40">22</span></li>
              </ol>
              <div className="hairline-gold w-24 mt-10" />
              <p className="font-hand text-2xl text-burgundy mt-4">— Page through, slowly.</p>
            </Page>

            <Page pageNum={3} side="R">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">Cover Story · pp. 04</div>
              <h2 className="font-display text-5xl leading-[1] mb-6">The Woman,<br/><em className="italic">The Myth.</em></h2>
              <p className="font-serif2 text-base leading-relaxed drop-cap text-ink/85">
                There's a particular kind of person who walks into a room and rearranges the furniture without touching a thing. She is that kind of person. Soft-spoken until she isn't, brilliant on a Sunday, devastating in a doorway. This is the woman who taught me what it means to be paid attention to. The pages that follow are merely a footnote.
              </p>
              <div className="hairline-gold w-20 mt-6" />
              <p className="font-serif2 italic text-lg mt-4 text-burgundy">"The first thing I noticed was the way she laughed. The last will be too."</p>
            </Page>

            <Page pageNum={4} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">The Interview</div>
              <h2 className="font-display text-3xl mb-6 italic">Four questions, on the record.</h2>
              <div className="space-y-4 font-serif2 text-base text-ink/85">
                <div><span className="font-display font-bold">Q.</span> Best day, this year?<br/><span className="italic">A. that one saturday of may</span></div>
                <div><span className="font-display font-bold">Q.</span> fav dish<br/><span className="italic">A. malka masoor</span></div>
                <div><span className="font-display font-bold">Q.</span> A song that is yours?<br/><span className="italic">A. The passcode of this web.</span></div>
                <div><span className="font-display font-bold">Q.</span> What now?<br/><span className="italic">A. Turn the page.</span></div>
              </div>
            </Page>

            <Page pageNum={5} side="R">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">Style File · I</div>
              <h2 className="font-display text-4xl mb-4">A look,<br/><em className="italic">in eight frames.</em></h2>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 min-h-0">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`${i%2 ? 'bg-blush' : 'bg-cream-deep'} polaroid !p-2 !pb-5 overflow-hidden`}>
                    <img src={`${import.meta.env.BASE_URL}media/style/style-${i}.jpg`} alt={`Frame ${i}`} className="h-full w-full object-cover" loading="eager" decoding="async" />
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
                    <img src={`${import.meta.env.BASE_URL}media/style/style-${i}.jpg`} alt={`Frame ${i}`} className="h-full w-full object-cover" loading="eager" decoding="async" />
                  </div>
                ))}
              </div>
            </Page>

            <Page pageNum={7} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">From Him</div>
              <h2 className="font-display text-4xl italic mb-6">From him.</h2>
              <p className="font-serif2 text-base text-ink/60 italic">— A few lines, set in print, just for you.</p>
              <div className="mt-6 space-y-4 font-serif2 text-base text-ink/85">
                <div className="border-l-2 border-gold pl-4 italic">"Happiest birthday beta." <span className="not-italic block text-sm text-ink/50 mt-1">— Father, soon.</span></div>
                <div className="border-l-2 border-gold pl-4 italic">"You make every room better." <span className="not-italic block text-sm text-ink/50 mt-1">— husband, soon.</span></div>
              </div>
            </Page>

            {/* NEW POV PAGE */}
            <Page pageNum={8} side="R">
              <div className="relative -m-10 md:-m-14 h-full overflow-hidden" style={{ margin: "-2.5rem", height: "calc(100% + 5rem)" }}>
                <img
                  src={`${import.meta.env.BASE_URL}media/magazine-pov.jpg`}
                  alt="POV"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(180deg, transparent 35%, hsl(0 0% 0% / 0.88) 100%)"
                }} />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-cream">
                  <div className="text-[9px] tracking-[0.4em] uppercase text-gold-deep/80 mb-2">Style · Exclusive</div>
                  <h2 className="font-display text-3xl italic leading-[1.1] mb-3">
                    POV — you are a model<br/>of your own league.
                  </h2>
                  <div className="hairline-gold w-16 my-3" />
                  <p className="font-serif2 text-xs leading-relaxed text-cream/80 max-w-xs">
                    She doesn't follow the brief. She is the brief. In a world of references and mood boards, Maithili arrives already edited — unfiltered, unhurried, entirely herself. Vogue calls it presence. We call it her.
                  </p>
                  <div className="text-[8px] tracking-[0.3em] uppercase text-cream/40 mt-3">08 · ICONIC SINCE 2009</div>
                </div>
              </div>
            </Page>

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

      {/* Mobile view */}
      <div className="md:hidden flex flex-col gap-6 px-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="!bg-ink text-cream p-10 polaroid border border-gold-deep/20"
        >
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">For Maithili — 06 · 06</div>
          <h2 className="font-display text-4xl leading-[0.9] mb-4">For <em className="gold-foil">her</em>,<br/>and her alone.</h2>
          <div className="hairline-gold w-24 my-5" />
          <ul className="font-serif2 italic text-base space-y-2 text-cream/80 mb-6">
            <li>· The Cover Story</li>
            <li>· The Interview</li>
            <li>· Style File</li>
            <li>· From Him</li>
            <li>· POV: Model</li>
          </ul>
          <p className="font-serif2 italic text-cream/60 text-sm border-t border-cream/20 pt-4">
            Open on a desktop for the full flipbook experience ✦
          </p>
        </motion.div>
      </div>

      <div className="hidden md:flex items-center justify-center gap-6 mt-8 relative z-10">
        <button onClick={() => bookRef.current?.pageFlip().flipPrev()} className="text-[10px] tracking-[0.4em] uppercase border-b border-cream/40 hover:border-gold-deep pb-1 text-cream" data-cursor="hover">← Prev</button>
        <span className="font-serif2 italic text-sm text-cream/60">{Math.min(page+1, count || 1)} / {count || "—"}</span>
        <button onClick={() => bookRef.current?.pageFlip().flipNext()} className="text-[10px] tracking-[0.4em] uppercase border-b border-cream/40 hover:border-gold-deep pb-1 text-cream" data-cursor="hover">Next →</button>
      </div>
    </section>
  );
};