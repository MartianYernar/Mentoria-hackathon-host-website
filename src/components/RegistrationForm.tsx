"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import SuccessOverlay from "@/components/SuccessOverlay";
import { isRegistrationOpen } from "@/lib/registration";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxOj5N0Pkc_yMQr9cakkphFSX47ttyt2NsHqxrJeQwzbqZ-BUzqSgFrP0cR9RrUl9_S/exec";

interface FormFields {
  fullName: string;
  email: string;
  teamName: string;
  telegram: string;
  phone: string;
}

interface SubmissionPayload {
  name: string;
  email: string;
  teamName: string;
  telegram: string;
  phone: string;
  timestamp: string;
}

const INITIAL_FORM: FormFields = {
  fullName: "",
  email: "",
  teamName: "",
  telegram: "",
  phone: "",
};

export default function RegistrationForm() {
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setIsSuccess(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isRegistrationOpen()) {
      setError("Registration is closed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: SubmissionPayload = {
        name: form.fullName,
        email: form.email,
        teamName: form.teamName,
        telegram: form.telegram,
        phone: form.phone,
        timestamp: new Date().toISOString(),
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
      setForm(INITIAL_FORM);
    } catch {
      setError("Что-то пошло не так. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SuccessOverlay visible={isSuccess} onReset={resetForm} />

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="space-y-6">
          <FloatingInput
            id="fullName"
            label="Полное имя"
            value={form.fullName}
            onChange={(v) => handleChange("fullName", v)}
            placeholder="Иван Иванов"
            required
            delay={0}
          />
          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            placeholder="ivan@example.com"
            required
            delay={0.05}
          />
          <FloatingInput
            id="teamName"
            label="Название команды"
            value={form.teamName}
            onChange={(v) => handleChange("teamName", v)}
            placeholder="Code Crushers"
            required
            delay={0.1}
          />
          <FloatingInput
            id="telegram"
            label="Telegram капитана"
            value={form.telegram}
            onChange={(v) => handleChange("telegram", v)}
            placeholder="@username"
            pattern="^@?\w{5,32}$"
            title="Введите корректный Telegram, например @username"
            required
            delay={0.15}
          />
          <FloatingInput
            id="phone"
            label="Номер телефона"
            type="tel"
            value={form.phone}
            onChange={(v) => handleChange("phone", v)}
            placeholder="+7 (777) 123-45-67"
            required
            delay={0.2}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm text-red-400/90"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={isSubmitting ? {} : { scale: 1.02 }}
          whileTap={isSubmitting ? {} : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full rounded-md bg-[#00ff00] py-4 text-sm font-black text-black transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              "Подтвердить регистрацию"
            )}
          </span>
        </motion.button>
      </form>
    </>
  );
}
