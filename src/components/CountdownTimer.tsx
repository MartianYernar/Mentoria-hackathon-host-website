"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const OFFLINE_FINAL_DATE = new Date("2026-06-27T09:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = OFFLINE_FINAL_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = [
  { label: "Дней", key: "days" as const },
  { label: "Часов", key: "hours" as const },
  { label: "Мин", key: "minutes" as const },
  { label: "Сек", key: "seconds" as const },
];

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="flex justify-center gap-8 sm:gap-16">
        {UNITS.map((unit) => (
          <div key={unit.key} className="h-16 w-12 animate-pulse rounded bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end justify-center divide-x divide-white/[0.06]">
      {UNITS.map((unit, i) => (
        <motion.div
          key={unit.key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center px-6 sm:px-10 first:pl-0 last:pr-0"
        >
          <motion.p
            key={timeLeft[unit.key]}
            initial={{ opacity: 0.5, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-5xl font-bold tabular-nums tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {String(timeLeft[unit.key]).padStart(2, "0")}
          </motion.p>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-600">
            {unit.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
