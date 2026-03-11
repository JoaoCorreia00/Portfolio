"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Floating text component - only animates when in viewport
export function FloatingCode1() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const text = "// Code in progress";

  return (
    <div ref={ref} className="absolute top-4 left-10 text-xs text-white/30 font-mono">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={isInView ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.08,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

// Floating code snippet 2 - only animates when in view
export function FloatingCode2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-8 -right-2 text-xs text-white/30 font-mono rotate-310"
      animate={isInView ? {
        y: [4, -4, 4],
        rotate: [10, 15, 10]
      } : { y: 0, rotate: 10 }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {`// Building solutions`}
    </motion.div>
  );
}
