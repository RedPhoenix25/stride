"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Sneakers", href: "/shop?category=sneakers" },
  { label: "Apparel", href: "/shop?category=apparel" },
  { label: "Accessories", href: "/shop?category=accessories" },
];

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
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

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-ink/40"
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute inset-x-0 bottom-0 rounded-t-sheet bg-paper shadow-sheet"
      >
        <div className="mx-auto mt-3 h-1 w-10 rounded-pill bg-line" />
        <div className="flex items-center justify-between border-b border-line px-5 pb-3.5 pt-4">
          <span className="font-body text-body font-semibold">Menu</span>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close menu"
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-pill"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="focus-ring flex items-center justify-between border-b border-line px-5 py-4 font-body text-body font-semibold"
            >
              {link.label}
              <ArrowRightIcon className="h-5 w-5 text-muted" />
            </Link>
          ))}
        </nav>
        <div className="px-5 pb-6 pt-4">
          <p className="font-body text-caption text-muted">
            Free delivery on orders over ₦150,000.
          </p>
        </div>
      </div>
    </div>
  );
}
