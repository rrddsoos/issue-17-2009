import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Maithili — born 06 June 2009. Counts to next upcoming June 6.
const BDAY = (() => {
  const now = new Date();
  const passed = now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 6);
  const y = passed ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(y, 5, 6, 0, 0, 0); // June 6
})();

export const Countdown = ({ onZero }: { onZero?: () => void }) => {
  const [t, setT] = useState(() => BDAY.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      const d = BDAY.getTime() - Date.now();
      setT(d);
      if (d <= 0) onZero?.();
    }, 1000);
    return () => clearInterval(id);
  }, [onZero]);

  const isNow = t <= 0;
  const days = Math.max(0, Math.floor(t / 86400000));
  const hrs = Math.max(0, Math.floor((t % 86400000) / 3600000));
  const mins = Math.max(0, Math.floor((t % 3600000) / 60000));
  const secs = Math.max(0, Math.floor((t % 60000) / 1000));

  return (
    <section className="relative py-32 px-6 bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-4">{isNow ? "06 · 06 · today" : "Counting down to 06 June"}</div>
        {isNow ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="font-display text-[10rem] md:text-[14rem] leading-none gold-foil">17</div>
            <h2 className="font-display text-5xl md:text-7xl gold-foil mt-4">Happy Birthday, Maithili.</h2>
          </motion.div>
        ) : (
          <>
            <h2 className="font-display text-5xl md:text-7xl mb-10">Until her <em className="italic">seventeenth</em>.</h2>
            <div className="grid grid-cols-4 gap-4 md:gap-10 max-w-3xl mx-auto">
              {[
                { v: days, l: "Days" }, { v: hrs, l: "Hours" },
                { v: mins, l: "Minutes" }, { v: secs, l: "Seconds" },
              ].map((u) => (
                <div key={u.l} className="flex flex-col items-center">
                  <div className="font-display text-5xl md:text-8xl text-cream tabular-nums">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] tracking-[0.4em] uppercase text-cream/50 mt-2">{u.l}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
