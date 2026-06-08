"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Кто может участвовать?",
    answer:
      "Разработчики, дизайнеры и новаторы любого уровня — от студентов до профессионалов. Если вы умеете создавать — вы нам подходите.",
  },
  {
    question: "Нужна ли команда?",
    answer:
      "Рекомендуем команды из 2–4 человек, но соло-участники тоже welcome. Перед событием будет канал для поиска тиммейтов.",
  },
  {
    question: "Как проходит отбор?",
    answer:
      "Сначала все команды проходят онлайн-тур с жёсткой оценкой проекта. В офлайн-финал в Астане попадают только лучшие.",
  },
  {
    question: "Какой призовой фонд?",
    answer:
      "Общий призовой фонд — 1 000 000 ₸. Победители получают денежные призы, мерч и менторские сессии с экспертами индустрии.",
  },
  {
    question: "Где проходит офлайн-финал?",
    answer:
      "27–28 июня на площадке Nazarbayev University в Астане. Организаторы обеспечат Wi-Fi, питание и рабочую атмосферу.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/[0.06]">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-zinc-300 transition-colors duration-300 group-hover:text-white sm:text-base">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 text-zinc-600 transition-colors group-hover:text-violet-400"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm leading-relaxed text-zinc-500">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
