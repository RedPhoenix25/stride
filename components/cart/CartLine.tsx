"use client";

import Image from "next/image";
import { formatNaira } from "@/lib/format";
import { lineTotal } from "@/lib/cart";
import type { CartItem, Product } from "@/lib/types";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

interface CartLineProps {
  item: CartItem;
  product: Product;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const categoryLabels: Record<Product["category"], string> = {
  sneakers: "Sneakers",
  apparel: "Apparel",
  accessories: "Accessories",
};

export function CartLine({
  item,
  product,
  onQuantityChange,
  onRemove,
}: CartLineProps) {
  return (
    <li className="flex gap-3.5 border-b border-line py-4 first:border-t md:gap-5 md:py-6">
      <div className="relative aspect-line w-20 flex-none bg-mist md:w-24">
        <Image
          src={product.images[0]}
          alt={`${product.name}, ${product.colourway}`}
          fill
          sizes="(max-width: 767px) 80px, 96px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col md:flex-row md:gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-body text-meta font-semibold md:text-card-price">
            {product.name}
          </h2>
          <p className="mt-1 font-body text-caption text-muted md:text-meta">
            {categoryLabels[product.category]} · Size {item.size} · {formatNaira(product.price)} each
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-3 md:mt-3.5 md:gap-5">
            <QuantityStepper
              value={item.quantity}
              max={product.stock}
              onChange={onQuantityChange}
              label={`Quantity for ${product.name}, size ${item.size}`}
            />
            <button
              type="button"
              onClick={onRemove}
              className="focus-ring rounded-sm font-body text-caption text-muted underline underline-offset-4 hover:text-ink md:text-meta"
              aria-label={`Remove ${product.name}, size ${item.size}`}
            >
              Remove
            </button>
            <p className="ml-auto font-body text-small font-semibold tabular text-right md:text-card-price">
              {formatNaira(lineTotal(product.price, item.quantity))}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
