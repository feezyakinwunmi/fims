"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SlideInTextProps {
  text: React.ReactNode;
  direction?: "left" | "right"; // Optionally specify direction
  duration?: number; // Animation duration
}

const SlideInText: React.FC<SlideInTextProps> = ({
  text,
  direction = "left",
  duration = 0.8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation only once

  const slideVariants = {
    hidden: {
      x: direction === "left" ? "-50%" : "50%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideVariants}
      className="text-lg font-bold"
    >
      {text}
    </motion.div>
  );
};

export default SlideInText;
