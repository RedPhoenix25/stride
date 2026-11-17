"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "./Button";
import { FieldError } from "./FieldError";
import { SizePicker } from "./SizePicker";
import { CloseIcon } from "./icons";

interface SizeSheetProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAdd: (size: string) => void;
}

export function SizeSheet({ product, open, onClose, onAdd }: SizeSheetProps) {
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSize(null);
    setError(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const add = () => {
    if (!size) {
      setError(true);
      return;
    }
    onAdd(size);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close size picker"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-ink/40"
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Select a size for ${product.name}`}
        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-summary rounded-t-sheet bg-paper shadow-sheet"
      >
        <div className="mx-auto mt-3 h-1 w-10 rounded-pill bg-line" />
        <div className="flex items-center justify-between border-b border-line px-5 pb-3.5 pt-4">
          <div className="min-w-0">
            <p className="truncate font-body text-body font-semibold">
              {product.name}
            </p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close size picker"
            className="focus-ring flex h-8 w-8 flex-none items-center justify-center rounded-pill"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 pb-6 pt-5">
          <SizePicker
            sizes={product.sizes}
            value={size}
            onChange={(next) => {
              setSize(next);
              setError(false);
            }}
            disabled={product.stock === 0}
            label={`Sizes for ${product.name}`}
          />
          {error ? <FieldError>Select a size.</FieldError> : null}
          <Button full className="mt-5" onClick={add}>
            Add to bag
          </Button>
        </div>
      </div>
    </div>
  );
}
