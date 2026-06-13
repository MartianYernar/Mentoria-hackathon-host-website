"use client";

import { isRegistrationOpen } from "@/lib/registration";
import { useEffect, useState } from "react";

/** Re-evaluates every second so the UI flips exactly when the deadline hits. */
export function useRegistrationOpen(): boolean | null {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isRegistrationOpen());
    const id = setInterval(() => setOpen(isRegistrationOpen()), 1000);
    return () => clearInterval(id);
  }, []);

  return open;
}
