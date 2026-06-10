"use client";

import { motion } from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 15 };

function InfoCard({
  emoji,
  title,
  children,
  delay = 0,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...SPRING, delay }}
      className="overflow-hidden rounded-2xl border border-[#1a2e1a] bg-[#0a0f0a]"
    >
      <div className="h-[2px] bg-[#00ff00] shadow-[0_0_12px_rgba(0,255,0,0.35)]" />
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none" aria-hidden="true">
            {emoji}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StageCard({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-[#1a2e1a] bg-black/40 p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#00ff00]/30 bg-[#00ff00]/10 text-sm font-bold text-[#00ff00]">
          {number}
        </span>
        <h4 className="font-semibold text-white">{title}</h4>
      </div>
      <ul className="mt-4 space-y-2 pl-11">
        {items.map((item) => (
          <li key={item} className="relative text-sm leading-relaxed text-zinc-400 before:absolute before:-left-4 before:content-['•'] before:text-[#00ff00]/60">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HackathonInfoSection() {
  return (
    <motion.section
      id="info"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={SPRING}
      className="scroll-mt-24 border-t border-[#0e2615] py-20"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00ff00]">
        Подробнее
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
        Всё, что нужно знать о хакатоне
      </h2>

      <div className="mt-10 space-y-5">
        <InfoCard emoji="💡" title="Что такое хакатон?" delay={0}>
          <p>
            Mentoria Хакатон — это командное соревнование, в рамках которого
            участники за ограниченное время (24–30 часов) разрабатывают решение
            предложенного кейса.
          </p>
          <p>
            Проект не требуется готовить заранее — вся работа выполняется
            непосредственно во время мероприятия.
          </p>
        </InfoCard>

        <InfoCard emoji="🧭" title="Формат проведения" delay={0.05}>
          <p>Хакатон проходит в два этапа:</p>
          <div className="mt-2 space-y-4">
            <StageCard
              number="1"
              title="Онлайн-отбор"
              items={[
                "Участникам предоставляется кейс",
                "Срок выполнения: 4–5 дней",
                "Формат: онлайн-разработка решения",
                "По итогам отбора выбираются лучшие команды",
              ]}
            />
            <StageCard
              number="2"
              title="Офлайн-финал"
              items={[
                "Место проведения: Назарбаев Университет",
                "Участвуют: 25 лучших команд",
                "Формат: интенсивный хакатон на 24–30 часов",
                "Участники разрабатывают решение кейса в офлайн-формате",
              ]}
            />
          </div>
        </InfoCard>

        <InfoCard emoji="🏆" title="Призовой фонд" delay={0.1}>
          <p className="font-semibold text-[#00ff00]">
            Общий призовой фонд: 1 000 000 ₸
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2 text-zinc-300">
              <span aria-hidden="true">🥇</span>
              <span>1 место — 500 000 ₸</span>
            </li>
            <li className="flex items-center gap-2 text-zinc-300">
              <span aria-hidden="true">🥈</span>
              <span>2 место — 300 000 ₸</span>
            </li>
            <li className="flex items-center gap-2 text-zinc-300">
              <span aria-hidden="true">🥉</span>
              <span>3 место — 200 000 ₸</span>
            </li>
          </ul>
        </InfoCard>

        <div className="grid gap-5 sm:grid-cols-2">
          <InfoCard emoji="🎓" title="Дополнительно" delay={0.15}>
            <ul className="space-y-2">
              <li>Все участники получат сертификаты об участии</li>
              <li>В рамках офлайн-финала предусмотрен кофе-брейк</li>
              <li>
                Участники получат опыт командной работы и решения реальных
                кейсов в условиях ограниченного времени
              </li>
            </ul>
          </InfoCard>

          <InfoCard emoji="📌" title="Важно" delay={0.2}>
            <ul className="space-y-2">
              <li>Хакатон проводится впервые</li>
              <li>Участие возможно без готового проекта</li>
              <li>
                Все подробности кейсов и критерии оценки будут предоставлены на
                этапе отбора
              </li>
              <li>
                Команды, прошедшие онлайн-этап, приглашаются в офлайн-финал
              </li>
            </ul>
          </InfoCard>
        </div>
      </div>
    </motion.section>
  );
}
