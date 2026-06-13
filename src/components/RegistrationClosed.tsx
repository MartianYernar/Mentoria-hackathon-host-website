"use client";

import { REGISTRATION_DEADLINE_LABEL } from "@/lib/registration";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function RegistrationClosed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 16 }}
      className="relative overflow-hidden rounded-2xl border border-[#1a2e1a] bg-[#0a0f0a] px-6 py-14 text-center sm:px-10 sm:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,255,0,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00ff00]/10"
          initial={{ width: 120, height: 120, opacity: 0.35 }}
          animate={{ width: 420, height: 420, opacity: 0 }}
          transition={{ duration: 3.5, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
          aria-hidden="true"
        />
      ))}

      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#00ff00]/10 ring-1 ring-[#00ff00]/35 shadow-[0_0_32px_rgba(0,255,0,0.15)]"
        >
          <Lock className="h-9 w-9 text-[#00ff00]" strokeWidth={2} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500"
        >
          Mentoria Hackathon
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
        >
          Registration is closed
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base"
        >
          Регистрация завершена {REGISTRATION_DEADLINE_LABEL}. Спасибо всем, кто
          успел подать заявку — скоро начнётся онлайн-отбор!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#faq"
            className="rounded-md border border-[#00ff00] px-6 py-2.5 text-sm font-bold text-[#00ff00] transition-colors hover:bg-[#00ff00]/10"
          >
            Читать FAQ
          </a>
          <a
            href="#about"
            className="rounded-md border border-[#1a2e1a] px-6 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
          >
            О хакатоне
          </a>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff00]/40 to-transparent"
        aria-hidden="true"
      />
    </motion.div>
  );
}
