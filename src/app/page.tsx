"use client";

import FAQAccordion from "@/components/FAQAccordion";
import MentoriaLagTitle from "@/components/MentoriaLagTitle";
import RegistrationForm from "@/components/RegistrationForm";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Registration closes June 13, 2026 at 00:00 (Astana, UTC+5)
const REGISTRATION_DEADLINE = new Date("2026-06-13T00:00:00+05:00");

const SPRING = { type: "spring" as const, stiffness: 100, damping: 15 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...SPRING, delay: i * 0.08 },
  }),
};

const INFO_PILLS = [
  { emoji: "📅", text: "27–28 июня · финальный офлайн тур" },
  { emoji: "📍", text: "Локация: NU (Астана)" },
  { emoji: "👥", text: "Команду (от 1 до 4 человек)" },
  { emoji: "🎓", text: "От школьников до студентов" },
  { emoji: "💳", text: "3000 тенге с одной команды", highlight: true },
];

const PRIZES = [
  { title: "1,000,000 тг", desc: "Главный денежный призовой фонд" },
  { title: "Сертификаты", desc: "Официальное подтверждение ваших достижений" },
  { title: "Скидка на Master Education 20%", desc: "На обучение в Master Education" },
  {
    title: "Стажировка",
    desc: "Возможно стажировка в компании Bahandi",
  },
];

const TIMER_UNITS = [
  { key: "days" as const, label: "ДНИ" },
  { key: "hours" as const, label: "ЧАСЫ" },
  { key: "minutes" as const, label: "МИН" },
  { key: "seconds" as const, label: "СЕК" },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = REGISTRATION_DEADLINE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimerCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative min-w-[68px] flex-1 sm:min-w-[88px]">
      <div className="overflow-hidden rounded-xl border border-[#1a2e1a]/80 bg-[#0a0f0a]/90 backdrop-blur-sm">
        <div className="h-[2px] bg-[#00ff00] shadow-[0_0_12px_rgba(0,255,0,0.5)]" />
        <div className="px-2.5 py-4 sm:px-4 sm:py-5">
          <p className="text-center font-mono text-3xl font-bold tabular-nums text-[#00ff00] sm:text-4xl lg:text-[2.75rem]">
            {value}
          </p>
          <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 sm:text-[11px]">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroCountdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        {TIMER_UNITS.map((u) => (
          <div key={u.key} className="h-[84px] flex-1 rounded-xl bg-[#0a0f0a] sm:h-[96px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {TIMER_UNITS.map((unit, i) => (
        <div key={unit.key} className="flex items-center">
          <TimerCard
            value={String(time[unit.key]).padStart(2, "0")}
            label={unit.label}
          />
          {i < TIMER_UNITS.length - 1 && (
            <span className="px-1 pb-5 font-mono text-xl font-bold text-[#00ff00] sm:px-2 sm:text-2xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const registerRef = useRef<HTMLElement>(null);

  const scrollToRegister = useCallback(() => {
    registerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(14,38,21,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(14,38,21,0.28)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(0,255,0,0.06),transparent_55%)]"
        aria-hidden="true"
      />

      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8"
      >
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/mentoria-logo.png"
            alt="Mentoria Hackathon"
            width={640}
            height={640}
            priority
            className="h-10 w-auto rounded-xl sm:h-11"
          />
          <span className="hidden text-sm font-bold tracking-wide text-[#00ff00] sm:inline">
            Mentoria Hackathon
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm text-zinc-400 transition-colors hover:text-white">
            О хакатоне
          </a>
          <a href="#faq" className="text-sm text-zinc-400 transition-colors hover:text-white">
            FAQ
          </a>
          <button
            type="button"
            onClick={scrollToRegister}
            className="rounded-full border border-[#00ff00] px-5 py-2 text-xs font-bold tracking-[0.15em] text-[#00ff00] transition-colors hover:bg-[#00ff00]/10"
          >
            РЕГИСТРАЦИЯ
          </button>
        </nav>

        <button
          type="button"
          onClick={scrollToRegister}
          className="rounded-full border border-[#00ff00] px-4 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#00ff00] md:hidden"
        >
          РЕГИСТРАЦИЯ
        </button>
      </motion.header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-28 sm:px-8">
        <section className="flex flex-col items-center pb-20 pt-8 text-center sm:pt-14">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#00ff00]/20 bg-[#0a120a]/80 px-5 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff00] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff00]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00ff00]">
              Регистрация открыта
            </span>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full"
          >
            <MentoriaLagTitle />
          </motion.div>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-4 bg-gradient-to-r from-[#00ff00] via-[#4ade80] to-[#22d3ee] bg-clip-text text-[clamp(1rem,3vw,1.5rem)] font-bold uppercase tracking-[0.45em] text-transparent"
          >
            ХАКАТОН
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex w-full max-w-4xl flex-wrap justify-center gap-3"
          >
            {INFO_PILLS.map((pill) => (
              <div
                key={pill.text}
                className={`flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-xs sm:text-sm ${
                  "highlight" in pill && pill.highlight
                    ? "border-[#00ff00]/40 bg-[#00ff00]/5 font-semibold text-[#00ff00]"
                    : "border-[#1a2e1a] bg-[#0a0f0a]/90 text-zinc-400"
                }`}
              >
                <span aria-hidden="true">{pill.emoji}</span>
                <span>{pill.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            custom={3.5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-5 max-w-xl text-center text-sm leading-relaxed text-zinc-500"
          >
            Взнос —{" "}
            <span className="font-semibold text-[#00ff00]">3000 тенге с одной команды</span>{" "}
            через Kaspi. После перевода загрузите скриншот чека в форме регистрации.
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-14 w-full max-w-2xl sm:max-w-3xl"
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
              До конца регистрации осталось
            </p>
            <HeroCountdown />
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-12 flex w-full max-w-lg flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          >
            <button
              type="button"
              onClick={scrollToRegister}
              className="w-full rounded-md bg-[#00ff00] px-8 py-3.5 text-sm font-black tracking-wide text-black transition-opacity hover:opacity-85 sm:w-auto"
            >
              ЗАРЕГИСТРИРОВАТЬСЯ →
            </button>
            <a
              href="#about"
              className="w-full rounded-md border border-[#00ff00] bg-black px-8 py-3.5 text-center text-sm font-bold tracking-wide text-[#00ff00] transition-colors hover:bg-[#00ff00]/5 sm:w-auto"
            >
              УЗНАТЬ БОЛЬШЕ
            </a>
          </motion.div>
        </section>

        <motion.section
          id="about"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={SPRING}
          className="scroll-mt-24 border-t border-[#0e2615] py-20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00ff00]">
            О хакатоне
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Два этапа. Призовой фонд — 1 000 000 тенге.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Mentoria Hackathon — соревнование для школьников и студентов, которые
            хотят за короткий срок собрать рабочий продукт. Участвовать можно
            одному или командой от 1 до 4 человек.
          </p>

          <div className="mt-10 max-w-2xl">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Процесс проведения Хакатона
            </h3>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-500 sm:text-base">
              <p>
                Первый тур онлайн с 13 по 18 июня. Второй тур офлайн с 27–28
                июня. На финальный тур будут отбираться 25–30 лучших команд.
              </p>
              <p>
                Финальный офлайн-тур проходит в Nazarbayev University, Астана.
                Команды работают над проектом на площадке, презентуют результат
                жюри и борются за главный приз.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-zinc-600">
            Регистрационный взнос:{" "}
            <span className="font-medium text-[#00ff00]">
              3000 тенге с одной команды через Kaspi
            </span>
            . Скриншот чека загружается в форме регистрации. Регистрация
            закрывается 13 июня в 00:00.
          </p>

          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00ff00]">
              Призы и бонусы
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {PRIZES.map((prize) => (
                <div
                  key={prize.title}
                  className="rounded-xl border border-[#1a2e1a] bg-[#0a0f0a] p-6"
                >
                  <div className="mb-3 h-[2px] w-10 bg-[#00ff00]" />
                  <h3 className="text-lg font-bold text-[#00ff00]">{prize.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {prize.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={registerRef}
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
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Забронируйте место
              </h2>
              <p className="mt-2 text-lg font-semibold text-[#00ff00]">
                3000 тенге с одной команды
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
                Заполните форму и переведите{" "}
                <span className="font-semibold text-[#00ff00]">
                  3000 тенге с одной команды
                </span>{" "}
                через Kaspi на номер +7 777 817 0007 (К. Султанмахмуд). Затем
                обязательно загрузите скриншот чека в разделе «Подтверждение
                оплаты» ниже — без чека заявка не будет принята.
              </p>
              <div className="mt-10">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="faq"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={SPRING}
          className="scroll-mt-24 border-t border-[#0e2615] py-20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00ff00]">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Вопросы и ответы
          </h2>
          <div className="mt-10">
            <FAQAccordion />
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 border-t border-[#0e2615] py-8 text-center">
        <p className="text-xs text-zinc-700">© 2026 Mentoria Hackathon · Астана</p>
      </footer>
    </div>
  );
}
