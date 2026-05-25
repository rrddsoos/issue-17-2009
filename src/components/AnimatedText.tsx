import { motion } from "framer-motion";
import { ReactNode } from "react";

// Fade up — for subtitles and labels
export const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ delay, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// Fade in — for paragraphs
export const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ delay, duration: 1, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Slide in from left — for tags/labels
export const SlideInLeft = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ delay, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// Scale up — for hairlines and dividers
export const ScaleIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: false, margin: "-10%" }}
    style={{ originX: 0 }}
    transition={{ delay, duration: 1, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// Blur in — for special highlighted text
export const BlurIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, filter: "blur(12px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ delay, duration: 1, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
