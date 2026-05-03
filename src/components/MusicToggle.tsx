import { useEffect, useRef, useState } from "react";

// Placeholder ambient track — swap with her favourite when ready.
const SRC = "https://cdn.pixabay.com/audio/2022/03/15/audio_1d2e2f1f0a.mp3";

export const MusicToggle = () => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true; a.volume = 0.25; a.preload = "none";
    ref.current = a;
    return () => { a.pause(); ref.current = null; };
  }, []);

  const toggle = () => {
    const a = ref.current; if (!a) return;
    if (on) { a.pause(); setOn(false); }
    else { a.play().then(() => setOn(true)).catch(() => {}); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
      <div className="hidden sm:flex flex-col items-end text-right leading-tight">
        <div className="text-[8px] tracking-[0.4em] uppercase text-ink/50">Now playing</div>
        <div className="font-serif2 italic text-sm text-ink">“Perfect”</div>
      </div>
      <button
        onClick={toggle}
        data-cursor="hover"
        className="relative h-14 w-14 rounded-full border border-ink/40 bg-ink flex items-center justify-center hover:border-burgundy transition-colors group"
        aria-label={on ? "Mute" : "Play"}
      >
        {/* vinyl */}
        <div className={`absolute inset-1 rounded-full bg-gradient-to-br from-ink to-black ${on ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }}>
          <div className="absolute inset-0 rounded-full" style={{ background: "repeating-radial-gradient(circle, hsl(var(--cream)/0.04) 0 1px, transparent 1px 3px)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-burgundy" />
        </div>
        <svg width="12" height="12" viewBox="0 0 16 16" className="relative z-10 text-cream">
          {on ? (
            <g fill="currentColor"><rect x="3" y="3" width="3" height="10"/><rect x="10" y="3" width="3" height="10"/></g>
          ) : (
            <polygon points="4,3 13,8 4,13" fill="currentColor"/>
          )}
        </svg>
      </button>
    </div>
  );
};
