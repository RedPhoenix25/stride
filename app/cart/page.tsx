"use client";

import Link from "next/link";
import { CartLine } from "@/components/cart/CartLine";
import { EmptyState } from "@/components/ui/EmptyState";
import { OrderSummary } from "@/components/ui/OrderSummary";
import { buttonClasses } from "@/components/ui/Button";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { ready, items, lines, count, updateQuantity, remove } = useStore();

  return (
    <section className="container-content pb-16 pt-6 md:pb-24 md:pt-10" aria-busy={!ready}>
      {!ready ? (
        <h1 className="font-display text-d-m-m uppercase text-ink md:text-d-m">
          Your cart
        </h1>
      ) : items.length === 0 ? (
        <div className="mx-auto max-w-content pt-6 md:pt-8">
          <EmptyState
            title="Your cart is empty"
            description="Nothing here yet. Browse the collection and add something to your bag."
            action={
              <Link href="/shop" className={buttonClasses("primary", "md")}>
                Shop all products
              </Link>
            }
          />
        </div>
      ) : (
        <>
          <h1 className="font-display text-d-m-m uppercase text-ink md:text-d-m">
            Your cart ({count} items)
          </h1>

          <div className="mt-5 flex flex-col items-start gap-6 md:mt-8 md:flex-row md:gap-16">
            <ul aria-label="Cart items" className="min-w-0 flex-1">
              {lines.map(({ item, product }) => (
                <CartLine
                  key={`${item.productId}-${item.size}-${item.colour}`}
                  item={item}
                  product={product}
                  onQuantityChange={(quantity) =>
                    updateQuantity(
                      item.productId,
                      item.size,
                      item.colour,
                      quantity,
                      product.stock,
                    )
                  }
                  onRemove={() => remove(item.productId, item.size, item.colour)}
                />
              ))}
            </ul>

            <OrderSummary
              items={items}
              className="w-full md:sticky md:top-24 md:w-96 md:flex-none"
              note="Free delivery on orders over ₦150,000."
            >
              <Link href="/checkout" className={buttonClasses("primary", "md", true)}>
                Proceed to checkout
              </Link>
              <Link href="/shop" className={buttonClasses("ghost", "md", true)}>
                Continue shopping
              </Link>
            </OrderSummary>
          </div>
        </>
      )}
    </section>
  );
}
