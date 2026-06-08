"use client";

import { motion } from "framer-motion";
import { CreditCard, QrCode } from "lucide-react";

export default function KaspiPaymentBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl bg-white/[0.02] px-5 py-6 backdrop-blur-md sm:px-6"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />

      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
          <CreditCard className="h-4 w-4 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">3000 тг через Kaspi</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">
            Переведите регистрационный взнос перед отправкой формы. Укажите
            название команды в комментарии к платежу. После оплаты загрузите
            скриншот чека в раздел «Подтверждение оплаты» ниже.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Номер Kaspi
          </p>
          <p className="mt-1.5 font-mono text-sm text-zinc-300">
            +7 (XXX) XXX-XX-XX
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/[0.03]">
            <QrCode className="h-6 w-6 text-zinc-700" />
          </div>
          <p className="text-xs text-zinc-600">QR-код (скоро)</p>
        </div>
      </div>
    </motion.div>
  );
}
