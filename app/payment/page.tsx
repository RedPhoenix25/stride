"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { colourwayOf } from "@/lib/cart";
import { bannerCopy, makeOrderNumber, processPayment } from "@/lib/payment";
import { useStore } from "@/lib/store";
import type { Order, Scenario } from "@/lib/types";

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const SCENARIO_LABEL: Record<Scenario, string> = {
  1: "Success",
  2: "Declined",
  3: "Insufficient funds",
  4: "Expired card",
  5: "Network error",
  6: "CVV mismatch",
};

export default function PaymentPage() {
  const router = useRouter();

  const {
    ready,
    lines,
    subtotal,
    delivery,
    total,
    checkoutDraft,
    scenario,
    setScenario,
    setOrder,
    clear,
  } = useStore();

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [processing, setProcessing] = useState(false);

  const cardDigits = cardNumber.replace(/\D/g, "");

  function handleCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  }

  function handleExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setExpiry(digits);
    }
  }

  async function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCvvError("");

    if (!ready) return;

    if (lines.length === 0) {
      setError("Your cart is empty. Please add a product before paying.");
      return;
    }

    if (!checkoutDraft) {
      setError("Your delivery details are missing. Please return to checkout.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter the name on your card.");
      return;
    }

    if (cardDigits.length !== 16) {
      setError("Please enter a valid 16-digit card number.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setError("Please enter the expiry date in MM/YY format.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid 3 or 4-digit CVV.");
      return;
    }

    setProcessing(true);

    const result = await processPayment(scenario);

    if (result.status === "cvv_mismatch") {
      setCvvError(
        `CVV doesn't match. Check the 3-digit code on the back of your card. Reference: ${result.reference}`,
      );
      setProcessing(false);
      return;
    }

    if (result.status !== "success") {
      const copy = bannerCopy(result.status, total);
      if (copy) {
        setError(`${copy.title} ${copy.reason} Reference: ${result.reference}`);
      }
      setProcessing(false);
      return;
    }

    const order: Order = {
      orderNumber: makeOrderNumber(),
      reference: result.reference,
      items: lines.map(({ item, product }) => ({
        product,
        size: item.size,
        colour: item.colour,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      })),
      address: checkoutDraft,
      cardLast4: cardDigits.slice(-4),
      subtotal,
      delivery,
      total,
      createdAt: new Date().toISOString(),
    };

    setOrder(order);
    clear();
    router.push("/order-confirmation");
  }

  if (!ready) {
    return (
      <div className="container-content py-20 text-center">
        Loading your order...
      </div>
    );
  }

  return (
    <section className="container-content py-10 pb-20">
      <div className="flex flex-wrap items-center gap-5 border-b border-[#E3E3DD] pb-5 text-xs font-semibold uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black">
            ✓
          </span>
          Delivery
        </span>

        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
            2
          </span>
          Payment
        </span>

        <span className="flex items-center gap-2 text-gray-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300">
            3
          </span>
          Confirmation
        </span>
      </div>

      <h1 className="mt-9 font-display text-4xl uppercase md:text-5xl">
        Payment
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div>
          {error && (
            <div
              role="alert"
              className="mb-6 border-l-4 border-red-600 bg-red-50 p-5 text-sm text-red-800"
            >
              {error}

              {!checkoutDraft && (
                <Link
                  href="/checkout"
                  className="mt-3 block font-semibold underline"
                >
                  Return to checkout
                </Link>
              )}
            </div>
          )}

          <div className="mb-6 bg-[#F4F4F0] p-4 text-sm leading-6 text-[#4A4A44]">
            Demo build — no real payment is taken. Any valid 16-digit card
            number works.
          </div>

          <form onSubmit={handlePayment}>
            <div>
              <label
                htmlFor="card-name"
                className="mb-2 block text-sm font-medium"
              >
                Name on card
              </label>
              <input
                id="card-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter name on card"
                autoComplete="cc-name"
                className="h-12 w-full rounded-md border border-[#E3E3DD] px-4 outline-none focus:border-black"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="card-number"
                className="mb-2 block text-sm font-medium"
              >
                Card number
              </label>
              <input
                id="card-number"
                value={cardNumber}
                onChange={(event) => handleCardNumber(event.target.value)}
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength={19}
                className="h-12 w-full rounded-md border border-[#E3E3DD] px-4 outline-none focus:border-black"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="mb-2 block text-sm font-medium"
                >
                  Expiry
                </label>
                <input
                  id="expiry"
                  value={expiry}
                  onChange={(event) => handleExpiry(event.target.value)}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  maxLength={5}
                  className="h-12 w-full rounded-md border border-[#E3E3DD] px-4 outline-none focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="mb-2 block text-sm font-medium"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  value={cvv}
                  onChange={(event) => {
                    setCvv(event.target.value.replace(/\D/g, "").slice(0, 4));
                    setCvvError("");
                  }}
                  placeholder="123"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={4}
                  aria-invalid={cvvError ? true : undefined}
                  aria-describedby={cvvError ? "cvv-error" : undefined}
                  className={`h-12 w-full rounded-md border px-4 outline-none ${
                    cvvError
                      ? "border-red-600 focus:border-red-600"
                      : "border-[#E3E3DD] focus:border-black"
                  }`}
                />
                {cvvError ? (
                  <p id="cvv-error" role="alert" className="mt-2 text-xs text-red-700">
                    {cvvError}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="my-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6B6B63]">
                Demo scenarios
              </p>

              <div className="flex flex-wrap gap-2">
                {([1, 2, 3, 4, 5, 6] as Scenario[]).map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => {
                      setScenario(number);
                      setError("");
                      setCvvError("");
                    }}
                    aria-pressed={scenario === number}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                      scenario === number
                        ? "border-black bg-black text-white"
                        : "border-[#E3E3DD] bg-white text-black"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-xs text-[#6B6B63]">
                {([1, 2, 3, 4, 5, 6] as Scenario[])
                  .map((number) => `${number}: ${SCENARIO_LABEL[number]}`)
                  .join(" · ")}
              </p>
            </div>

            <button
              type="submit"
              disabled={processing || lines.length === 0}
              className="flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {processing ? "Processing payment..." : `Pay ${money(total)}`}
            </button>
          </form>
        </div>

        <aside className="h-fit border border-[#E3E3DD] p-5 md:p-6">
          <h2 className="mb-5 text-base font-semibold">Order summary</h2>

          {lines.map(({ item, product }) => (
            <div
              key={`${item.productId}-${item.size}-${item.colour}`}
              className="mb-4 flex gap-3 border-b border-[#E3E3DD] pb-4"
            >
              <div className="h-[76px] w-[60px] shrink-0 overflow-hidden bg-[#F4F4F0]">
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={colourwayOf(product, item.colour).images[0]}
                    alt={`${product.name} in ${item.colour}`}
                    className="h-full w-full object-cover"
                  />
                }
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="mt-1 text-xs text-[#6B6B63]">
                  Size {item.size} · {item.colour} · Qty {item.quantity}
                </p>
              </div>

              <p className="whitespace-nowrap text-sm font-semibold">
                {money(product.price * item.quantity)}
              </p>
            </div>
          ))}

          <div className="flex justify-between py-2 text-sm">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>

          <div className="flex justify-between py-2 text-sm">
            <span>Delivery</span>
            <span>{money(delivery)}</span>
          </div>

          <div className="mt-2 flex justify-between border-t border-[#E3E3DD] pt-4 text-lg font-bold">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#6B6B63]">
            Free delivery on orders over ₦150,000.
          </p>
        </aside>
      </div>
    </section>
  );
}