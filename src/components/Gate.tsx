import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const TOKEN_KEY = "bday_token";

export const Gate = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState<boolean>(() => !!sessionStorage.getItem(TOKEN_KEY));
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(0);
  const silentRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement?.tagName === "INPUT") return;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Unlock iOS audio context on first touch
  const unlockAudio = () => {
    if (!silentRef.current) {
      const ctx = new AudioContext();
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
      silentRef.current = ctx;
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!pass.trim()) return;
    unlockAudio();
    setBusy(true); setErr("");
    try {
      const { data, error } = await supabase.functions.invoke("verify-passcode", { body: { passcode: pass } });
      if (error) throw error;
      if (data?.ok) {
        sessionStorage.setItem(TOKEN_KEY, data.token);
        setUnlocked(true);
        setTimeout(() => window.dispatchEvent(new CustomEvent("start-music")), 300);
      } else {
        setErr("Not quite. Try again.");
        setShake((s) => s + 1);
      }
    } catch {
      setErr("Something went wrong. Try again.");
    } finally { setBusy(false); }
  };

  return (
    <>
      {children}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            className="fixed inset-0 z-[150] bg-cream grain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } }}
          >
            <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
              <div className="absolute top-8 left-0 right-0 flex justify-between px-8 text-[10px] tracking-[0.4em] uppercase text-ink/60 font-body">
                <span>Vol. 01</span><span>Private Edition</span><span>MMXXVI</span>
              </div>

              <motion.div
                key={shake}
                animate={{ x: shake ? [-8, 8, -6, 6, 0] : 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full text-center"
              >
                <div className="text-[10px] tracking-[0.5em] uppercase text-burgundy mb-4">For Her Only</div>
                <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-ink">
                  A private<br/><em className="gold-foil">issue</em>
                </h1>
                <div className="hairline-gold w-24 mx-auto my-7" />
                <p className="font-serif2 text-lg italic text-ink/70 mb-8">
                  Enter the passcode to open the door.
                </p>

                <form onSubmit={submit} className="flex flex-col items-center gap-4">
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    onTouchStart={unlockAudio}
                    autoFocus
                    placeholder="• • • • • •"
                    className="w-full text-center font-display text-2xl tracking-[0.3em] bg-transparent border-b border-ink/40 focus:border-burgundy outline-none py-3 placeholder:text-ink/20"
                    data-cursor="hover"
                  />
                  <button
                    type="submit"
                    disabled={busy}
                    onTouchStart={unlockAudio}
                    className="mt-3 px-8 py-3 border border-ink text-[11px] tracking-[0.3em] uppercase hover:bg-ink hover:text-cream transition-colors disabled:opacity-50"
                    data-cursor="hover"
                  >
                    {busy ? "Opening…" : "Enter"}
                  </button>
                  {err && <div className="text-burgundy text-sm font-serif2 italic mt-2">{err}</div>}
                </form>

                <div className="mt-12 font-serif2 italic text-ink/40 text-sm">
                  Hint: your all time favorite song.
                </div>
              </motion.div>

              <div className="absolute bottom-8 left-0 right-0 text-center text-[10px] tracking-[0.4em] uppercase text-ink/50">
                — Crafted with care —
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};