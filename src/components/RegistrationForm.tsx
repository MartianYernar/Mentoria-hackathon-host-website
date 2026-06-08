"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import KaspiPaymentBlock from "@/components/KaspiPaymentBlock";
import ReceiptUpload from "@/components/ReceiptUpload";
import SuccessOverlay from "@/components/SuccessOverlay";

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
  receiptImage: string;
  timestamp: string;
}

const INITIAL_FORM: FormFields = {
  fullName: "",
  email: "",
  teamName: "",
  telegram: "",
  phone: "",
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string" && reader.result.length > 0) {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function RegistrationForm() {
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!receiptFile) {
      setReceiptPreview(null);
      return;
    }
    const url = URL.createObjectURL(receiptFile);
    setReceiptPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [receiptFile]);

  function handleChange(field: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }

  function handleFileSelect(file: File) {
    setReceiptFile(file);
    setError(null);
  }

  function handleRemoveReceipt() {
    setReceiptFile(null);
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setReceiptFile(null);
    setIsSuccess(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!receiptFile) {
      setError("Загрузите скриншот подтверждения оплаты Kaspi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const receiptImage = await fileToBase64(receiptFile);

      const payload: SubmissionPayload = {
        name: form.fullName,
        email: form.email,
        teamName: form.teamName,
        telegram: form.telegram,
        phone: form.phone,
        receiptImage,
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
      setReceiptFile(null);
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

        <KaspiPaymentBlock />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">
            Подтверждение оплаты
          </p>
          <p className="mb-3 text-xs leading-relaxed text-zinc-500">
            Загрузите скриншот чека Kaspi на 3000 тг — это обязательное поле
            для завершения регистрации.
          </p>
          <ReceiptUpload
            file={receiptFile}
            previewUrl={receiptPreview}
            onFileSelect={handleFileSelect}
            onRemove={handleRemoveReceipt}
          />
        </motion.div>

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
