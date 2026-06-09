"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CAMPUS_IMAGE = "/nu-campus.jpg";

export default function VenueSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="mt-12 overflow-hidden rounded-3xl border border-[#00ff00]/20 shadow-[0_0_64px_rgba(0,255,0,0.12)] ring-1 ring-[#00ff00]/10"
    >
      <div className="h-[2px] bg-[#00ff00] shadow-[0_0_16px_rgba(0,255,0,0.45)]" />

      <div className="relative flex min-h-[22rem] flex-col sm:min-h-[26rem] lg:min-h-[20rem] lg:flex-row">
        {/* Campus photo — full-card background on mobile, side panel on desktop */}
        <div className="absolute inset-0 lg:relative lg:min-h-[20rem] lg:w-[55%] lg:shrink-0">
          <Image
            src={CAMPUS_IMAGE}
            alt="Nazarbayev University — главный корпус"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>

        <div className="absolute inset-0 bg-black/50 lg:hidden" />

        {/* Text panel */}
        <div className="relative z-10 flex flex-1 flex-col justify-end p-6 sm:p-8 lg:w-[45%] lg:shrink-0 lg:justify-center lg:bg-black/55 lg:backdrop-blur-[2px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#00ff00]">
            Площадка финала
          </p>
          <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            Nazarbayev University
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
            Финальный офлайн-тур пройдёт на площадке Nazarbayev University в
            Астане — 27–28 июня. Лучшие команды соберутся здесь, чтобы
            доработать проект и представить его жюри.
          </p>
          <p className="mt-2 text-xs text-zinc-400">г. Астана</p>
        </div>
      </div>
    </motion.div>
  );
}
