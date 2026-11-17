"use client";

import { MinusIcon, PlusIcon } from "./icons";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  max?: number;
  min?: number;
  label?: string;
}

export function QuantityStepper({
  value,
  onChange,
  max = 99,
  min = 1,
  label = "Quantity",
}: QuantityStepperProps) {
  return (
    <div
      className="flex h-10 w-32 items-center justify-between rounded-input border border-line px-1.5"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className="focus-ring flex h-8 w-8 items-center justify-center rounded-pill disabled:cursor-not-allowed disabled:text-line"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="font-body text-meta font-medium tabular" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="focus-ring flex h-8 w-8 items-center justify-center rounded-pill disabled:cursor-not-allowed disabled:text-line"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
