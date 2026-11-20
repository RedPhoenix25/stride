"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const dateText = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export default function OrderConfirmationPage() {
  const { ready, order } = useStore();

  if (!ready) {
    return <div className="container-content py-20 text-center">Loading your order...</div>;
  }

  if (!order) {
    return (
      <section className="container-content py-20 text-center">
        <h1 className="font-display text-4xl uppercase">No order found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#6B6B63]">
          We could not find a completed order in this browser. Please complete checkout and payment first.
        </p>
        <Link href="/" className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-sm font-semibold uppercase tracking-wider text-white">
          Continue shopping
        </Link>
      </section>
    );
  }

  const address = order.address;

  return (
    <section className="container-content py-6 pb-16 md:py-10 md:pb-24">
      <div className="flex flex-wrap items-center gap-3 border-b border-[#E3E3DD] pb-5 text-[10px] font-semibold uppercase tracking-widest sm:gap-6">
        <span className="flex items-center gap-2 text-black">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black">✓</span>
          Delivery
        </span>
        <span className="flex items-center gap-2 text-black">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black">✓</span>
          Payment
        </span>
        <span className="flex items-center gap-2 text-black">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">3</span>
          Confirmation
        </span>
      </div>

      <h1 className="mt-8 font-display text-4xl uppercase leading-none md:mt-10 md:text-6xl">
        Order confirmed
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4A4A44] md:text-base md:leading-7">
        Thank you, {address.fullName}. Your order is saved in this browser. This is a demo store, so nothing was charged and no email was sent.
      </p>

      <div className="mt-8 grid items-start gap-7 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div className="border border-[#E3E3DD]">
          <div className="flex flex-col gap-3 border-b border-[#E3E3DD] bg-[#F4F4F0] px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B6B63]">Order number</p>
              <p className="mt-1 text-base font-semibold">{order.orderNumber}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B6B63]">Placed</p>
              <p className="mt-1 text-sm font-semibold">{dateText(order.createdAt)}</p>
            </div>
          </div>

          <div className="px-5 pb-6 md:px-6">
            {order.items.map((item, index) => (
              <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-4 border-b border-[#E3E3DD] py-5">
                <div className="h-24 w-[76px] shrink-0 overflow-hidden bg-[#F4F4F0] sm:h-[110px] sm:w-[88px]">
                  {item.product.images?.[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{item.product.name}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#6B6B63]">
                    {item.product.category} · Size {item.size} · Qty {item.quantity}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{money(item.lineTotal)}</p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <div className="flex justify-between py-1.5 text-sm"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
              <div className="flex justify-between py-1.5 text-sm"><span>Delivery</span><span>{money(order.delivery)}</span></div>
              <div className="mt-2 flex justify-between border-t border-[#E3E3DD] pt-4 text-base font-bold">
                <span>Total</span><span>{money(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="h-fit border border-[#E3E3DD] p-5 md:p-6">
          <h2 className="text-base font-semibold">Delivery details</h2>
          <div className="mt-4 text-sm leading-6 text-[#3A3A34]">
            <p className="font-semibold">{address.fullName}</p>
            <p>{address.street}</p>
            <p>{address.city}, {address.state}</p>
            <p>{address.phone}</p>
            <p>{address.email}</p>
          </div>

          <div className="mt-5 border-t border-[#E3E3DD] pt-4">
            <div className="flex justify-between gap-3 py-1.5 text-sm"><span className="text-[#6B6B63]">Method</span><span className="font-medium">Standard</span></div>
            <div className="flex justify-between gap-3 py-1.5 text-sm"><span className="text-[#6B6B63]">Estimated</span><span className="font-medium">3–5 days</span></div>
            <div className="flex justify-between gap-3 py-1.5 text-sm"><span className="text-[#6B6B63]">Card</span><span className="font-medium">•••• {order.cardLast4}</span></div>
            <div className="flex justify-between gap-3 py-1.5 text-sm">
              <span className="text-[#6B6B63]">Reference</span>
              <span className="break-all text-right font-mono text-xs">{order.reference}</span>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#6B6B63]">
            A copy of this order is stored in this browser only. No email notification is sent by this demo.
          </p>
          <Link href="/" className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#333]">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}