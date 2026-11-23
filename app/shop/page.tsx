"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { CloseIcon, ChevronDownIcon } from "@/components/ui/icons";

const categories: Array<{ label: string; value: Product["category"] }> = [
  { label: "Sneakers", value: "sneakers" },
  { label: "Apparel", value: "apparel" },
  { label: "Accessories", value: "accessories" },
];

type Sort = "newest" | "price-low" | "price-high";

function FilterSheet({
  open,
  category,
  sort,
  onClose,
  onApply,
}: {
  open: boolean;
  category: Product["category"] | null;
  sort: Sort;
  onClose: () => void;
  onApply: (category: Product["category"] | null, sort: Sort) => void;
}) {
  const [draftCategory, setDraftCategory] = useState(category);
  const [draftSort, setDraftSort] = useState(sort);

  useEffect(() => {
    if (open) {
      setDraftCategory(category);
      setDraftSort(sort);
    }
  }, [open, category, sort]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-ink/40"
      />
      <div className="absolute inset-x-0 bottom-0 rounded-t-sheet bg-paper shadow-sheet">
        <div className="mx-auto mt-3 h-1 w-10 rounded-pill bg-line" />
        <div className="flex items-center justify-between border-b border-line px-5 pb-4 pt-4">
          <h2 className="font-body text-body font-semibold">Filters</h2>
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-pill"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-7 px-5 pb-6 pt-5">
          <div>
            <p className="mb-3 font-body text-caption font-medium uppercase text-muted">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDraftCategory(null)}
                className={`focus-ring h-9 rounded-pill border px-3.5 font-body text-small ${
                  draftCategory === null ? "border-ink bg-ink text-white" : "border-line"
                }`}
              >
                All
              </button>
              {categories.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDraftCategory(item.value)}
                  className={`focus-ring h-9 rounded-pill border px-3.5 font-body text-small ${
                    draftCategory === item.value ? "border-ink bg-ink text-white" : "border-line"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <label className="block font-body text-small">
            <span className="mb-2 block font-medium">Sort</span>
            <span className="relative block">
              <select
                value={draftSort}
                onChange={(event) => setDraftSort(event.target.value as Sort)}
                className="focus-ring h-12 w-full appearance-none rounded-input border border-line bg-paper px-3.5 pr-10"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => { setDraftCategory(null); setDraftSort("newest"); }}>
              Clear all
            </Button>
            <Button onClick={() => { onApply(draftCategory, draftSort); onClose(); }}>
              Show products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Product["category"] | null;
  const category = categories.some((item) => item.value === categoryParam) ? categoryParam : null;
  const sort = (searchParams.get("sort") as Sort) || "newest";
  const [filterOpen, setFilterOpen] = useState(false);

  const updateParams = (nextCategory: Product["category"] | null, nextSort: Sort) => {
    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (nextSort !== "newest") params.set("sort", nextSort);
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const visibleProducts = products
    .filter((product) => !category || product.category === category)
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return products.indexOf(a) - products.indexOf(b);
    });

  return (
    <main>
      <div className="container-content pb-16 pt-8 md:pb-24 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex gap-2 font-body text-meta text-muted md:mb-10">
          <Link href="/" className="focus-ring hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink">Shop</span>
        </nav>

        <div className="flex items-end justify-between gap-6">
          <h1 className="font-display text-d-m-m uppercase md:text-d-m">All products</h1>
          <p className="hidden font-body text-small text-muted md:block">{visibleProducts.length} products</p>
        </div>

        <div className="mt-8 flex items-center justify-between border-b border-line pb-5 md:mt-10">
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => updateParams(null, sort)}
              className={`focus-ring h-10 rounded-pill border px-4 font-body text-small ${!category ? "border-ink bg-ink text-white" : "border-line"}`}
            >
              All
            </button>
            {categories.map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => updateParams(item.value, sort)}
                className={`focus-ring h-10 rounded-pill border px-4 font-body text-small ${category === item.value ? "border-ink bg-ink text-white" : "border-line"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="focus-ring h-10 rounded-pill border border-ink px-4 font-body text-small md:hidden"
          >
            Filters ({category ? 1 : 0})
          </button>
          <label className="relative ml-auto font-body text-small">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(event) => updateParams(category, event.target.value as Sort)}
              className="focus-ring h-10 appearance-none rounded-pill border border-line bg-paper py-0 pl-4 pr-9"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Sort: Price low</option>
              <option value="price-high">Sort: Price high</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </label>
        </div>

        {visibleProducts.length ? (
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:mt-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h2 className="font-display text-d-m-m uppercase md:text-d-m">No products found</h2>
            <p className="mx-auto mt-4 max-w-prose font-body text-small text-muted">Try another category or clear the filters.</p>
            <Button className="mt-6" onClick={() => updateParams(null, "newest")}>Clear filters</Button>
          </div>
        )}
      </div>
      <FilterSheet
        open={filterOpen}
        category={category}
        sort={sort}
        onClose={() => setFilterOpen(false)}
        onApply={updateParams}
      />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="min-h-[60vh]" />}>
      <ShopContent />
    </Suspense>
  );
}
