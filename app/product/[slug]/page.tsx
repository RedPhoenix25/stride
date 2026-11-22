"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/ui/FieldError";
import { ProductCard } from "@/components/ui/ProductCard";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { SizePicker } from "@/components/ui/SizePicker";
import { Toast } from "@/components/ui/Toast";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import { products } from "@/data/products";
import { formatNaira } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/types";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  sneakers: "Sneakers",
  apparel: "Apparel",
  accessories: "Accessories",
};

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((entry) => entry.slug === params.slug);

  if (!product) {
    return (
      <section className="container-content py-14 md:py-24">
        <h1 className="font-display text-d-m-m uppercase md:text-d-m">
          Product not found
        </h1>
        <p className="mt-3 font-body text-small text-muted md:text-body">
          This product may have moved or is no longer available.
        </p>
        <Link href="/shop" className="mt-6 inline-flex items-center gap-2 font-body text-small font-semibold underline underline-offset-4">
          Browse all products <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return <ProductDetails key={product.id} product={product} />;
}

function ProductDetails({ product }: { product: Product }) {
  const { add } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const closeToast = useCallback(() => setToastOpen(false), []);
  const outOfStock = product.stock < 1;

  const related = useMemo(
    () =>
      products
        .filter((entry) => entry.category === product.category && entry.id !== product.id)
        .slice(0, 4),
    [product],
  );

  const addToCart = () => {
    if (outOfStock) return;
    if (!size) {
      setSizeError(true);
      return;
    }
    add(product.id, size, quantity, product.stock);
    setSizeError(false);
    setToastOpen(true);
  };

  return (
    <>
      <section className="container-content pb-0 pt-5 md:pt-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 font-body text-meta text-muted md:mb-8">
          <Link href="/" className="focus-ring rounded-sm hover:text-ink">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="focus-ring rounded-sm hover:text-ink">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/shop?category=${product.category}`} className="focus-ring rounded-sm hover:text-ink">
            {CATEGORY_LABEL[product.category]}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="min-w-0">
            <div className="relative aspect-product overflow-hidden bg-mist">
              <Image
                src={activeImage}
                alt={`${product.name} in ${product.colourway}`}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              {product.badge ? (
                <div className="absolute left-4 top-4"><Badge variant={product.badge} /></div>
              ) : null}
            </div>
            {product.images.length > 1 ? (
              <div className="mt-3 grid grid-cols-2 gap-3 md:mt-4 md:gap-4" aria-label="Product images">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    aria-label={`View ${index === 0 ? "front" : `image ${index + 1}`} of ${product.name}`}
                    aria-pressed={activeImage === image}
                    className={`focus-ring relative aspect-product overflow-hidden bg-mist ${activeImage === image ? "ring-2 ring-ink ring-offset-2" : ""}`}
                  >
                    <Image src={image} alt="" fill sizes="(min-width: 768px) 24vw, 48vw" className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="min-w-0 md:py-2 lg:py-5">
            <p className="font-body text-caption font-medium uppercase text-muted">{CATEGORY_LABEL[product.category]}</p>
            <h1 className="mt-2 font-display text-d-m-m uppercase md:text-d-m">{product.name}</h1>
            <p className="mt-3 font-body text-price-m font-semibold tabular md:text-price">{formatNaira(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="mt-1 font-body text-small text-muted">
                <span className="sr-only">Original price </span>
                <s>{formatNaira(product.compareAtPrice)}</s>
              </p>
            ) : null}
            <p className="mt-5 border-b border-line pb-5 font-body text-small text-muted md:mt-6 md:pb-6">
              Colour: <span className="text-ink">{product.colourway}</span>
            </p>

            <div className="mt-5 md:mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-body text-small font-semibold">Size</p>
                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  className="focus-ring rounded-sm font-body text-meta text-muted underline underline-offset-4 hover:text-ink"
                >
                  Size guide
                </button>
              </div>
              <SizePicker
                sizes={product.sizes}
                value={size}
                onChange={(next) => {
                  setSize(next);
                  setSizeError(false);
                }}
                disabled={outOfStock}
                label={`Sizes for ${product.name}`}
              />
              {sizeError ? <FieldError>Select a size.</FieldError> : null}
              {outOfStock ? (
                <p className="mt-3 font-body text-meta text-muted">Out of stock</p>
              ) : null}
            </div>

            {!outOfStock ? (
              <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-6 md:gap-4">
                <QuantityStepper
                  value={quantity}
                  min={1}
                  max={product.stock}
                  label="Quantity"
                  onChange={(next) => setQuantity(Math.min(product.stock, Math.max(1, next)))}
                />
                <Button onClick={addToCart} className="min-w-0 flex-1">
                  Add to cart
                </Button>
              </div>
            ) : (
              <Button disabled full className="mt-5 md:mt-6">Out of stock</Button>
            )}

            <p className="mt-4 font-body text-meta text-muted">
              Free delivery over ₦150,000 · 3–5 working days
            </p>

            <div className="mt-6 border-t border-line md:mt-8">
              <details className="group border-b border-line py-4">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-sm font-body text-small font-semibold">
                  Details
                  <span className="text-h3-m font-normal transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="pt-3 font-body text-small leading-relaxed text-muted">
                  <p>{product.description}</p>
                  <ul className="mt-3 list-inside list-disc space-y-1">
                    {product.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
              </details>
              <details className="group border-b border-line py-4">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-sm font-body text-small font-semibold">
                  Delivery and returns
                  <span className="text-h3-m font-normal transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pt-3 font-body text-small leading-relaxed text-muted">
                  Delivery takes 3–5 working days. Orders over ₦150,000 ship free. For help with a return, contact the Stride team.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="container-content section section-last">
          <div className="mb-6 flex items-end justify-between md:mb-7">
            <h2 className="font-body text-h2-m font-semibold md:text-h2">You may also like</h2>
            <Link href={`/shop?category=${product.category}`} className="focus-ring flex items-center gap-2 rounded-sm font-body text-meta font-semibold underline underline-offset-4">
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-6">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      ) : null}

      {guideOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 md:items-center md:p-6">
          <div role="dialog" aria-modal="true" aria-labelledby="size-guide-title" className="w-full max-w-summary rounded-t-sheet bg-paper p-5 shadow-sheet md:rounded-sheet md:p-6">
            <div className="flex items-center justify-between">
              <h2 id="size-guide-title" className="font-body text-h3-m font-semibold">Size guide</h2>
              <button type="button" onClick={() => setGuideOpen(false)} className="focus-ring flex h-10 w-10 items-center justify-center rounded-pill" aria-label="Close size guide">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 font-body text-small text-muted">Available sizes for {product.name}.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((availableSize) => (
                <span key={availableSize} className="rounded-pill border border-line px-4 py-2 font-body text-meta">{availableSize}</span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <Toast open={toastOpen} message="Added to cart" onClose={closeToast} />
    </>
  );
}
