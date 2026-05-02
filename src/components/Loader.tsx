import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Loader = () => {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 2200); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.7, 0, 0.3, 1] } }}
        >
          <div className="flex flex-col items-center gap-6">
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-ink">
              <motion.circle
                cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="0.6"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeInOut" }}
              />
              <motion.text
                x="60" y="74" textAnchor="middle" className="font-display"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, fontWeight: 900, fill: 'hsl(var(--burgundy))' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
              >&amp;</motion.text>
            </svg>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}
              className="font-serif2 italic tracking-[0.4em] text-xs text-ink/60"
            >ISSUE 01</motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
