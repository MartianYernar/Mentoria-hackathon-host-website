"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Кто может участвовать?",
    answer:
      "Школьники и студенты, которые хотят попробовать себя в разработке и дизайне. Опыт приветствуется, но не обязателен — главное, чтобы была мотивация собрать проект.",
  },
  {
    question: "Нужна ли команда?",
    answer:
      "Можно участвовать одному или собрать команду от 1 до 4 человек. Если ищете тиммейтов — напишите нам в Telegram после регистрации.",
  },
  {
    question: "Как проходит отбор?",
    answer:
      "Первый тур онлайн с 13 по 18 июня. Второй тур офлайн с 27–28 июня. На финальный тур проходят 25–30 лучших команд по итогам онлайн-этапа.",
  },
  {
    question: "Какой призовой фонд?",
    answer:
      "Победители получают: 1,000,000 тг, сертификаты, скидку на Master Education 20%, а также возможно стажировка в компании Bahandi.",
  },
  {
    question: "Где проходит офлайн-финал?",
    answer:
      "Финальный офлайн-тур — 27–28 июня в Nazarbayev University, Астана. На площадке будет Wi-Fi, питание и всё необходимое для работы.",
  },
  {
    question: "До когда открыта регистрация?",
    answer:
      "Регистрация закрывается 13 июня в 00:00. Участие бесплатное — достаточно заполнить форму на сайте.",
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
                className="shrink-0 text-zinc-600 transition-colors group-hover:text-[#00ff00]"
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
