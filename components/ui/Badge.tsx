import type { ReactNode } from "react";

export type BadgeVariant = "new" | "sale" | "out-of-stock";

const styles: Record<BadgeVariant, string> = {
  new: "bg-volt text-ink",
  sale: "bg-ink text-white",
  "out-of-stock": "bg-mist text-muted",
};

const labels: Record<BadgeVariant, string> = {
  new: "New",
  sale: "Sale",
  "out-of-stock": "Out of stock",
};

export function Badge({
  variant,
  children,
  className = "",
}: {
  variant: BadgeVariant;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-pill px-2.5 font-body text-micro font-semibold uppercase ${styles[variant]} ${className}`}
    >
      {children ?? labels[variant]}
    </span>
  );
}
