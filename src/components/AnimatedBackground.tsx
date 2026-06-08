"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-black" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-[8%] h-[75vh] w-[75vh] -translate-x-1/2 rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.12, 0.94, 1],
          opacity: [0.7, 1, 0.8, 0.7],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-[8%] h-[75vh] w-[75vh] -translate-x-1/2 rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 60%)",
        }}
        animate={{
          scale: [1.1, 0.9, 1.05, 1.1],
          x: [-20, 30, -10, -20],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-[15%] top-[45%] h-[45vh] w-[45vh] rounded-full bg-violet-600/6 blur-[120px]"
        animate={{ x: [0, 50, 15, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] bottom-[8%] h-[35vh] w-[35vh] rounded-full bg-emerald-500/5 blur-[100px]"
        animate={{ x: [0, -35, -5, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
