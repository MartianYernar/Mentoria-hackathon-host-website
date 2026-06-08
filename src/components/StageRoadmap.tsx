"use client";

import { motion } from "framer-motion";
import { Globe, Trophy } from "lucide-react";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  {
    id: 1,
    title: "Этап 1: Онлайн-тур",
    description:
      "Сначала все команды проходят жесткий онлайн-отбор. Покажите продукт, код и амбиции — только лучшие пройдут дальше.",
    icon: Globe,
    accent: "from-violet-500/20 to-violet-500/5",
    ring: "ring-violet-500/30",
    dot: "bg-violet-400",
  },
  {
    id: 2,
    title: "Этап 2: Офлайн-финал",
    description:
      "Лучшие команды едут на финальную битву в Астану. 27–28 июня на площадке NU — 48 часов интенсивного хакинга.",
    icon: Trophy,
    accent: "from-emerald-500/20 to-emerald-500/5",
    ring: "ring-emerald-500/30",
    dot: "bg-emerald-400",
  },
];

export default function StageRoadmap() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="relative">
      <div className="absolute left-8 top-8 bottom-8 hidden w-px bg-gradient-to-b from-violet-500/40 via-white/10 to-emerald-500/40 sm:block" />

      <div className="space-y-6">
        {STAGES.map((stage, index) => {
          const isActive = activeStage === index;
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
              onHoverStart={() => setActiveStage(index)}
              onClick={() => setActiveStage(index)}
              layout
              className="relative cursor-pointer sm:pl-16"
            >
              <motion.div
                layout
                className={`absolute left-[26px] top-8 hidden h-3 w-3 rounded-full sm:block ${stage.dot}`}
                animate={{
                  scale: isActive ? 1.4 : 1,
                  boxShadow: isActive
                    ? "0 0 20px rgba(139, 92, 246, 0.6)"
                    : "0 0 0px transparent",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              <motion.div
                layout
                animate={{
                  scale: isActive ? 1.01 : 1,
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.015)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ring-1 transition-colors duration-500 ${
                  isActive ? stage.ring : "ring-white/[0.06]"
                }`}
              >
                <motion.div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stage.accent}`}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <motion.div
                    animate={{ rotate: isActive ? 0 : -8, scale: isActive ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]"
                  >
                    <Icon
                      className={`h-5 w-5 ${index === 0 ? "text-violet-400" : "text-emerald-400"}`}
                    />
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-600">
                        {String(stage.id).padStart(2, "0")}
                      </span>
                      <motion.h3
                        layout
                        className="text-lg font-semibold text-white sm:text-xl"
                      >
                        {stage.title}
                      </motion.h3>
                    </div>
                    <motion.p
                      layout
                      animate={{ opacity: isActive ? 1 : 0.6 }}
                      className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base"
                    >
                      {stage.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
