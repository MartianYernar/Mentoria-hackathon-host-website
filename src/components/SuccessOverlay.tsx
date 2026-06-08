"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface SuccessOverlayProps {
  visible: boolean;
  onReset: () => void;
}

export default function SuccessOverlay({ visible, onReset }: SuccessOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#00ff00]/20"
              initial={{ width: 80, height: 80, opacity: 0.6 }}
              animate={{ width: 600, height: 600, opacity: 0 }}
              transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }}
            />
          ))}

          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#00ff00]"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((i / 12) * Math.PI * 2) * 180,
                y: Math.sin((i / 12) * Math.PI * 2) * 180,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
          ))}

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#00ff00]/15 ring-1 ring-[#00ff00]/40"
            >
              <Check className="h-10 w-10 text-[#00ff00]" strokeWidth={2.5} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-[#00ff00]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#00ff00]">
                  Регистрация подтверждена
                </span>
                <Sparkles className="h-4 w-4 text-[#00ff00]" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Вы в игре!
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
                Ваша заявка принята. Следите за почтой — скоро пришлём детали
                онлайн-тура. Удачи!
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={onReset}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 rounded-md border border-[#00ff00] px-6 py-2.5 text-sm font-medium text-[#00ff00] transition-colors hover:bg-[#00ff00]/10"
            >
              Зарегистрировать ещё одного участника
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
