"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import { BagIcon, MenuIcon } from "@/components/ui/icons";
import { MobileNav } from "./MobileNav";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Sneakers", href: "/shop?category=sneakers" },
  { label: "Apparel", href: "/shop?category=apparel" },
  { label: "Accessories", href: "/shop?category=accessories" },
];

export function Header() {
  const { count, ready } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="container-content flex h-16 items-center md:h-18 md:gap-12">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="focus-ring -ml-2 flex h-10 w-10 items-center justify-center rounded-pill lg:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        <Link
          href="/"
          className="focus-ring mx-auto font-display text-logo-m uppercase text-ink lg:mx-0 lg:text-logo"
          aria-label="Stride home"
        >
          Stride
        </Link>

        <nav className="hidden items-center gap-8 font-body text-meta font-medium lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring hover:underline hover:underline-offset-4 ${
                  active ? "underline underline-offset-4" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center lg:ml-auto">
          <Link
            href="/cart"
            aria-label={
              ready && count > 0 ? `Cart, ${count} items` : "Cart, empty"
            }
            className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-pill"
          >
            <BagIcon className="h-6 w-6" />
            {ready && count > 0 ? (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-pill bg-volt px-1 font-body text-micro font-semibold text-ink">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
