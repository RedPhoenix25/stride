"use client";

import { useEffect } from "react";
import { CheckIcon } from "./icons";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ open, message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 inline-flex h-12 -translate-x-1/2 items-center gap-2.5 rounded-input bg-ink px-5 font-body text-meta font-medium text-white"
    >
      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-pill bg-volt text-ink">
        <CheckIcon className="h-2.5 w-2.5" strokeWidth={2.5} />
      </span>
      {message}
    </div>
  );
}
