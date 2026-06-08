"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
  delay?: number;
}

export default function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  pattern,
  title,
  delay = 0,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <label
        htmlFor={id}
        className={`mb-1 block text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
          focused ? "text-[#00ff00]" : "text-zinc-600"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        pattern={pattern}
        title={title}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent py-3 text-sm text-white placeholder:text-zinc-700 outline-none transition-colors duration-300"
      />
      <div className="relative h-px w-full bg-white/[0.08]">
        <motion.div
          className="absolute inset-0 origin-left bg-[#00ff00]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : value ? 0.3 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
