import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedHeading = ({ text, className = "", delay = 0 }: Props) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: delay + i * 0.1,
              duration: 0.7,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
