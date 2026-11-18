import Image from "next/image";
import type { ReactNode } from "react";
import { products } from "@/data/products";
import { deliveryFor, lineTotal, subtotalFor, totalFor } from "@/lib/cart";
import { formatNaira } from "@/lib/format";
import type { CartItem } from "@/lib/types";

interface OrderSummaryProps {
  items: CartItem[];
  title?: string;
  headerAction?: ReactNode;
  note?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function OrderSummary({
  items,
  title = "Order summary",
  headerAction,
  note,
  children,
  className = "",
}: OrderSummaryProps) {
  const lines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ item, product }] : [];
  });
  const subtotal = subtotalFor(items, products);
  const delivery = deliveryFor(subtotal);
  const total = totalFor(subtotal);

  return (
    <aside className={`border border-line p-6 ${className}`}>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h3 className="font-body text-body font-semibold">{title}</h3>
        {headerAction}
      </div>

      <ul>
        {lines.map(({ item, product }) => (
          <li
            key={`${item.productId}-${item.size}`}
            className="mb-4 flex items-center gap-3 border-b border-line pb-4"
          >
            <div className="relative aspect-product w-14 flex-none bg-mist">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-body text-meta font-semibold leading-snug">
                {product.name}
              </p>
              <p className="font-body text-caption text-muted">
                Size {item.size} · Qty {item.quantity}
              </p>
            </div>
            <p className="ml-auto font-body text-meta font-semibold tabular">
              {formatNaira(lineTotal(product.price, item.quantity))}
            </p>
          </li>
        ))}
      </ul>

      <dl className="mt-4 font-body text-meta">
        <div className="flex justify-between py-0.5">
          <dt>Subtotal</dt>
          <dd className="tabular">{formatNaira(subtotal)}</dd>
        </div>
        <div className="flex justify-between py-0.5">
          <dt>Delivery</dt>
          <dd className="tabular">
            {delivery === 0 ? "Free" : formatNaira(delivery)}
          </dd>
        </div>
        <div className="mt-2 flex justify-between border-t border-line pt-3 text-price-m font-semibold">
          <dt>Total</dt>
          <dd className="tabular">{formatNaira(total)}</dd>
        </div>
      </dl>

      {children ? (
        <div className="mt-5 flex flex-col gap-3">{children}</div>
      ) : null}
      {note ? (
        <div className="mt-3 font-body text-caption text-muted">{note}</div>
      ) : null}
    </aside>
  );
}
