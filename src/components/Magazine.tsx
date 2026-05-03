import { useRef, useState, forwardRef, ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";

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
          <li>· Horoscope of the Year</li>
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
                <li className="flex justify-between"><span>Top 10 Memories</span><span className="text-ink/40">18</span></li>
                <li className="flex justify-between"><span>Horoscope of the Year</span><span className="text-ink/40">22</span></li>
                <li className="flex justify-between"><span>Letters to the Editor</span><span className="text-ink/40">26</span></li>
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
              <h2 className="font-display text-3xl mb-6 italic">Five questions, on the record.</h2>
              <div className="space-y-4 font-serif2 text-base text-ink/85">
                <div><span className="font-display font-bold">Q.</span> Best day, this year?<br/><span className="italic">A. The quiet one in October.</span></div>
                <div><span className="font-display font-bold">Q.</span> Comfort meal?<br/><span className="italic">A. Anything I cook for her.</span></div>
                <div><span className="font-display font-bold">Q.</span> A song that is yours?<br/><span className="italic">A. The one we play in the car.</span></div>
                <div><span className="font-display font-bold">Q.</span> A place we’ll go?<br/><span className="italic">A. Everywhere, eventually.</span></div>
                <div><span className="font-display font-bold">Q.</span> What now?<br/><span className="italic">A. Turn the page.</span></div>
              </div>
            </Page>

            <Page pageNum={5} side="R">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">Style File</div>
              <h2 className="font-display text-4xl mb-6">A look,<br/><em className="italic">in six frames.</em></h2>
              <div className="grid grid-cols-3 gap-3 flex-1">
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} className={`aspect-[3/4] ${i%2 ? 'bg-blush' : 'bg-cream-deep'} polaroid !p-2 !pb-6`}>
                    <div className="h-full w-full bg-gradient-to-br from-cream to-blush flex items-center justify-center">
                      <span className="font-display italic text-2xl text-ink/20">No. {i+1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Page>

            <Page pageNum={6} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">Top 10 Memories</div>
              <h2 className="font-display text-4xl italic mb-6">Greatest hits.</h2>
              <ol className="font-serif2 text-base space-y-2 text-ink/85">
                {["The first hello","Coffee, the long way","That trip","The kitchen dancing","Movie marathons","Surprise breakfasts","Long phone calls","Walking nowhere","The quiet Sundays","Every single day"].map((t,i) => (
                  <li key={i} className="flex gap-3"><span className="font-display text-burgundy w-6">{String(i+1).padStart(2,'0')}</span><span>{t}</span></li>
                ))}
              </ol>
            </Page>

            <Page pageNum={7} side="R">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">Horoscope · This Year</div>
              <h2 className="font-display text-4xl mb-6">Written in <em className="italic">your</em> stars.</h2>
              <p className="font-serif2 text-lg leading-relaxed text-ink/85">
                Mercury moves in your favor. Jupiter is generous. There will be a small kindness in March, an excellent meal in June, and a window seat in October that changes everything. Spend money on flowers and bookmarks. Trust the slow ones. Wear gold.
              </p>
              <div className="hairline-gold w-16 mt-6" />
              <p className="font-hand text-2xl text-burgundy mt-3">A great year, by every reading.</p>
            </Page>

            <Page pageNum={8} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">Letters to the Editor</div>
              <h2 className="font-display text-4xl italic mb-6">From the audience.</h2>
              <p className="font-serif2 text-base text-ink/60 italic">— Reserved for letters from your favorite people. Ask them to write a line; we’ll set it in print here.</p>
              <div className="mt-6 space-y-4 font-serif2 text-base text-ink/85">
                <div className="border-l-2 border-gold pl-4 italic">“Happiest birthday to the kindest person I know.” <span className="not-italic block text-sm text-ink/50 mt-1">— a friend, soon.</span></div>
                <div className="border-l-2 border-gold pl-4 italic">“You make every room better.” <span className="not-italic block text-sm text-ink/50 mt-1">— another, soon.</span></div>
              </div>
            </Page>

            <Page pageNum={9} side="R">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2">A Closing Note</div>
              <h2 className="font-display text-4xl italic mb-6">Until next issue.</h2>
              <p className="font-serif2 text-lg leading-relaxed text-ink/85">
                Thank you for reading. The next issue is already being written, in dishes done together and afternoons spent doing nothing in particular. Save your seat. Same time next year.
              </p>
              <div className="hairline-gold w-24 mt-8" />
              <p className="font-hand text-3xl text-burgundy mt-3">— With love.</p>
            </Page>

            <Page pageNum={10} side="L">
              <div className="text-[10px] tracking-[0.4em] uppercase text-burgundy mb-2">And finally —</div>
              <h2 className="font-display text-4xl italic mb-6">Press play.</h2>
              <div className="relative flex-1 bg-ink rounded-sm overflow-hidden flex items-center justify-center" style={{ minHeight: 320 }}>
                <div className="absolute inset-0 grain opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-br from-burgundy/40 via-transparent to-gold/20" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-cream">
                  <div className="h-16 w-16 rounded-full border-2 border-cream/80 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 16 16"><polygon points="4,3 13,8 4,13" fill="currentColor"/></svg>
                  </div>
                  <div className="text-[10px] tracking-[0.4em] uppercase text-cream/70">A short film · reserved</div>
                </div>
              </div>
              <p className="font-hand text-xl text-burgundy mt-4">— a little something I made for you.</p>
            </Page>

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
