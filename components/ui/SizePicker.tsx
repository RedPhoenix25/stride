"use client";

interface SizePickerProps {
  sizes: string[];
  value: string | null;
  onChange: (size: string) => void;
  disabled?: boolean;
  label?: string;
}

export function SizePicker({
  sizes,
  value,
  onChange,
  disabled = false,
  label = "Size",
}: SizePickerProps) {
  return (
    <div
      className="grid grid-cols-6 gap-1.5 md:gap-2"
      role="group"
      aria-label={label}
    >
      {sizes.map((size) => {
        const selected = size === value;
        return (
          <button
            key={size}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onChange(size)}
            className={`focus-ring flex h-11 items-center justify-center rounded-pill border font-body text-meta font-medium transition-colors md:h-12 ${
              selected
                ? "border-ink bg-ink text-white"
                : "border-line bg-paper text-ink hover:border-ink"
            } disabled:cursor-not-allowed disabled:text-line disabled:hover:border-line`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
