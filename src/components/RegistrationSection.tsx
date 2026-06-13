"use client";

import RegistrationClosed from "@/components/RegistrationClosed";
import RegistrationForm from "@/components/RegistrationForm";
import { useRegistrationOpen } from "@/hooks/useRegistrationOpen";
import { REGISTRATION_DEADLINE_LABEL } from "@/lib/registration";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 15 };

const RegistrationSection = forwardRef<HTMLElement>(function RegistrationSection(
  _,
  ref,
) {
  const registrationOpen = useRegistrationOpen();

  return (
    <motion.section
      ref={ref}
      id="register"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={SPRING}
      className="scroll-mt-24 border-t border-[#0e2615] py-20"
    >
      <div className="overflow-hidden rounded-2xl border border-[#1a2e1a] bg-[#0a0f0a]">
        <div className="h-[2px] bg-[#00ff00] shadow-[0_0_12px_rgba(0,255,0,0.45)]" />
        <div className="p-8 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00ff00]">
            Регистрация
          </p>

          <AnimatePresence mode="wait">
            {registrationOpen === null ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 h-64 animate-pulse rounded-2xl bg-[#0e2615]/40"
                aria-hidden="true"
              />
            ) : registrationOpen ? (
              <motion.div
                key="open"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  Забронируйте место
                </h2>
                <p className="mt-2 text-lg font-semibold text-[#00ff00]">
                  Участие бесплатное
                </p>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
                  Заполните форму ниже, чтобы зарегистрировать команду.
                  Регистрация закрывается {REGISTRATION_DEADLINE_LABEL}.
                </p>
                <div className="mt-10">
                  <RegistrationForm />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <RegistrationClosed />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
});

export default RegistrationSection;
