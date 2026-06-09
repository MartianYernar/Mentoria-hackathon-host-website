"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, ImagePlus, X } from "lucide-react";
import { DragEvent, useRef, useState } from "react";

interface ReceiptUploadProps {
  file: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

function isAllowedReceipt(file: File): boolean {
  return (
    file.type.startsWith("image/") ||
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

export default function ReceiptUpload({
  file,
  previewUrl,
  onFileSelect,
  onRemove,
}: ReceiptUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(fileList: FileList | null) {
    const selected = fileList?.[0];
    if (selected && isAllowedReceipt(selected)) {
      onFileSelect(selected);
    }
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files);
  }

  const isPdf =
    file?.type === "application/pdf" || file?.name.toLowerCase().endsWith(".pdf");

  return (
    <div className="relative min-h-[120px]">
      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 backdrop-blur-md"
          >
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-[#00ff00]/30">
              {isPdf ? (
                <FileText className="h-8 w-8 text-[#00ff00]" />
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl ?? ""}
                    alt="Скриншот чека"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#00ff00]/10 mix-blend-overlay" />
                </>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{file.name}</p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {(file.size / 1024).toFixed(1)} КБ · Чек прикреплён
              </p>
            </div>
            <motion.button
              type="button"
              onClick={onRemove}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-red-400"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            whileHover={{ scale: 1.005 }}
            className={`cursor-pointer rounded-2xl border border-dashed px-6 py-8 text-center transition-colors duration-300 ${
              isDragging
                ? "border-[#00ff00]/60 bg-[#00ff00]/5"
                : "border-white/[0.08] bg-white/[0.01] hover:border-[#00ff00]/30 hover:bg-white/[0.02]"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*,.pdf,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files)}
            />
            <motion.div
              animate={isDragging ? { y: -4 } : { y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ImagePlus className="mx-auto h-6 w-6 text-zinc-600" />
              <p className="mt-3 text-sm text-zinc-400">
                Перетащите чек Kaspi или{" "}
                <span className="text-[#00ff00]">выберите файл</span>
              </p>
              <p className="mt-1 text-xs text-zinc-700">PNG, JPG, WEBP, PDF</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
