"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatNaira } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { BagIcon } from "./icons";
import { SizeSheet } from "./SizeSheet";
import { Toast } from "./Toast";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  sneakers: "Sneakers",
  apparel: "Apparel",
  accessories: "Accessories",
};

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const outOfStock = product.stock === 0;
  const singleSize = product.sizes.length === 1;
  const firstColour = product.colourways[0];

  const addSize = (size: string) => {
    add(product.id, size, firstColour.name, 1, product.stock);
    setToastOpen(true);
  };

  const quickAdd = () => {
    if (singleSize) {
      addSize(product.sizes[0]);
      return;
    }
    setSheetOpen(true);
  };

  return (
    <article className="group min-w-0">
      <div className="relative aspect-product overflow-hidden bg-mist">
        <Image
          src={firstColour.images[0]}
          alt={`${product.name} in ${firstColour.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={`object-cover transition-transform duration-200 group-hover:scale-103 ${
            outOfStock ? "opacity-60" : ""
          }`}
        />
        <div className="absolute left-3 top-3">
          {outOfStock ? (
            <Badge variant="out-of-stock" />
          ) : product.badge ? (
            <Badge variant={product.badge} />
          ) : null}
        </div>
        {!outOfStock ? (
          <div className="absolute bottom-3 right-3 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              onClick={quickAdd}
              aria-label={
                singleSize
                  ? `Add ${product.name} to cart`
                  : `Choose a size for ${product.name}`
              }
            >
              <BagIcon className="h-5 w-5" />
            </Button>
          </div>
        ) : null}
      </div>

      <div className="pt-3">
        <h3 className="font-body text-body font-semibold leading-snug">
          <Link
            href={`/product/${product.slug}`}
            className="focus-ring line-clamp-2"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 font-body text-meta text-muted">
          {CATEGORY_LABEL[product.category]}
        </p>
        <p className="mt-1.5 font-body text-card-price font-semibold tabular">
          {formatNaira(product.price)}
          {product.compareAtPrice ? (
            <s className="ml-2 font-body text-meta font-normal text-muted">
              {formatNaira(product.compareAtPrice)}
            </s>
          ) : null}
        </p>
      </div>

      <SizeSheet
        product={product}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAdd={addSize}
      />
      <Toast
        open={toastOpen}
        message={`Added to cart · ${firstColour.name}`}
        onClose={() => setToastOpen(false)}
      />
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="min-w-0 animate-pulse" aria-hidden="true">
      <div className="aspect-product bg-mist" />
      <div className="pt-3">
        <div className="h-3 w-3/4 rounded-sm bg-line" />
        <div className="mt-2.5 h-2.5 w-2/5 rounded-sm bg-line" />
        <div className="mt-2.5 h-3 w-1/3 rounded-sm bg-line" />
      </div>
    </div>
  );
}
