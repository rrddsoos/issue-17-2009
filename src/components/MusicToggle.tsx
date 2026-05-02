import { useEffect, useRef, useState } from "react";

// Soft public-domain piano loop
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
    <button
      onClick={toggle}
      data-cursor="hover"
      className="fixed bottom-6 right-6 z-[90] h-12 w-12 rounded-full border border-ink/40 bg-cream/80 backdrop-blur-sm flex items-center justify-center hover:border-burgundy transition-colors"
      aria-label={on ? "Mute music" : "Play ambient music"}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" className="text-ink">
        {on ? (
          <g fill="currentColor"><rect x="3" y="3" width="3" height="10"/><rect x="10" y="3" width="3" height="10"/></g>
        ) : (
          <polygon points="4,3 13,8 4,13" fill="currentColor"/>
        )}
      </svg>
    </button>
  );
};
