import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "md" | "sm" | "icon";

const base =
  "focus-ring inline-flex items-center justify-center whitespace-nowrap font-body font-semibold transition-opacity disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-pill border border-transparent bg-ink text-white hover:opacity-90 disabled:bg-line disabled:text-muted",
  secondary:
    "rounded-pill border border-ink bg-paper text-ink hover:bg-mist disabled:border-line disabled:bg-paper disabled:text-muted",
  danger:
    "rounded-pill border border-transparent bg-error text-white hover:opacity-90 disabled:bg-line disabled:text-muted",
  ghost:
    "h-auto rounded-none border-0 p-0 text-small normal-case underline underline-offset-4 hover:opacity-70",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-12 px-6 text-btn uppercase",
  sm: "h-10 px-4 text-caption uppercase",
  icon: "h-10 w-10 px-0",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  full = false,
): string {
  const layout =
    variant === "ghost" ? variants.ghost : [variants[variant], sizes[size]].join(" ");
  return [base, layout, full ? "w-full" : ""].filter(Boolean).join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  full = false,
  loading = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonClasses(variant, size, full)} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </button>
  );
}
