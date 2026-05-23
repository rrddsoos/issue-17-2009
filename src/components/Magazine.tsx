import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SRC = `${import.meta.env.BASE_URL}media/perfect.mp3`;

export const MusicToggle = () => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true; a.volume = 0.25; a.preload = "none";
    ref.current = a;

    // Start music and show toggle when Gate dispatches the event
    const handleStartMusic = () => {
      a.play().then(() => setOn(true)).catch(() => {});
      setVisible(true);
    };
    window.addEventListener("start-music", handleStartMusic);

    // Pause music only when user-played videos (with controls) start
    const handleVideoPlay = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (!video.controls) return;
      if (ref.current && !ref.current.paused) {
        ref.current.pause();
        setOn(false);
      }
    };

    // Resume music only when user-played videos stop
    const handleVideoStop = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (!video.controls) return;
      if (ref.current) {
        ref.current.play().then(() => setOn(true)).catch(() => {});
      }
    };

    const observer = new MutationObserver(() => {
      document.querySelectorAll("video").forEach((v) => {
        v.removeEventListener("play", handleVideoPlay);
        v.removeEventListener("pause", handleVideoStop);
        v.removeEventListener("ended", handleVideoStop);
        v.addEventListener("play", handleVideoPlay);
        v.addEventListener("pause", handleVideoStop);
        v.addEventListener("ended", handleVideoStop);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      a.pause();
      ref.current = null;
      observer.disconnect();
      window.removeEventListener("start-music", handleStartMusic);
    };
  }, []);

  const toggle = () => {
    const a = ref.current; if (!a) return;
    if (on) { a.pause(); setOn(false); }
    else { a.play().then(() => setOn(true)).catch(() => {}); }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-3"
        >
          <div className="hidden sm:flex flex-col items-end text-right leading-tight">
            <div className="text-[8px] tracking-[0.4em] uppercase text-ink/50">Now playing</div>
            <div className="font-serif2 italic text-sm text-ink">"Perfect"</div>
          </div>
          <button
            onClick={toggle}
            data-cursor="hover"
            className="relative h-14 w-14 rounded-full border border-ink/40 bg-ink flex items-center justify-center hover:border-burgundy transition-colors group"
            aria-label={on ? "Mute" : "Play"}
          >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};