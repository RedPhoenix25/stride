"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NIGERIAN_STATES } from "@/data/nigeria-states";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { OrderSummary } from "@/components/ui/OrderSummary";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { formatNaira } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Address } from "@/lib/types";

type AddressField = keyof Address;
type AddressErrors = Partial<Record<AddressField, string>>;

const EMPTY_ADDRESS: Address = {
  fullName: "",
  phone: "",
  email: "",
  street: "",
  city: "",
  state: "",
};

const FIELD_IDS: Record<AddressField, string> = {
  fullName: "full-name",
  phone: "phone",
  email: "email",
  street: "street-address",
  city: "city",
  state: "state",
};

function validateField(field: AddressField, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "fullName":
      return trimmed ? undefined : "Enter your full name.";
    case "phone": {
      const digits = value.replace(/\D/g, "");
      return /^\d{10,11}$/.test(digits)
        ? undefined
        : "Enter a valid Nigerian phone number, for example 0803 123 4567.";
    }
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? undefined
        : "Enter a valid email address.";
    case "street":
      return trimmed ? undefined : "Enter your street address.";
    case "city":
      return trimmed ? undefined : "Enter your city.";
    case "state":
      return trimmed ? undefined : "Select your state.";
  }
}

function validateAddress(address: Address): AddressErrors {
  return (Object.keys(FIELD_IDS) as AddressField[]).reduce<AddressErrors>(
    (errors, field) => {
      const error = validateField(field, address[field]);
      if (error) errors[field] = error;
      return errors;
    },
    {},
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { ready, items, delivery, checkoutDraft, setCheckoutDraft } = useStore();
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setAddress(checkoutDraft ?? EMPTY_ADDRESS);
    setInitialized(true);
  }, [ready, checkoutDraft]);

  useEffect(() => {
    if (ready && items.length === 0) router.replace("/cart");
  }, [ready, items.length, router]);

  function updateField(field: AddressField, value: string) {
    const next = { ...address, [field]: value };
    setAddress(next);
    setCheckoutDraft(next);

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, value),
      }));
    }
  }

  function handleBlur(field: AddressField) {
    const error = validateField(field, address[field]);
    setErrors((current) => ({ ...current, [field]: error }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAddress(address);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(FIELD_IDS) as AddressField[]).find(
      (field) => nextErrors[field],
    );

    if (firstInvalid) {
      window.requestAnimationFrame(() => {
        document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      });
      return;
    }

    setCheckoutDraft(address);
    router.push("/payment");
  }

  if (!ready || !initialized || items.length === 0) {
    return (
      <section className="container-content py-16" aria-busy="true">
        <p className="font-body text-small text-muted">Preparing checkout…</p>
      </section>
    );
  }

  return (
    <section className="container-content pb-16 pt-6 md:pb-24 md:pt-10">
      <StepIndicator current={0} />

      <h1 className="mt-7 font-display text-d-m-m uppercase text-ink md:mt-9 md:text-d-m">
        Checkout
      </h1>

      <div className="mt-7 grid items-start gap-10 md:mt-9 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <form onSubmit={handleSubmit} noValidate className="min-w-0">
          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="mb-4 font-body text-h3-m font-semibold text-ink md:mb-5 md:text-h3"
            >
              Contact
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                id={FIELD_IDS.fullName}
                label="Full name"
                autoComplete="name"
                value={address.fullName}
                error={errors.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                onBlur={() => handleBlur("fullName")}
              />
              <Input
                id={FIELD_IDS.phone}
                label="Phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0803 123 4567"
                value={address.phone}
                error={errors.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                onBlur={() => handleBlur("phone")}
              />
              <div className="md:col-span-2">
                <Input
                  id={FIELD_IDS.email}
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={address.email}
                  error={errors.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  onBlur={() => handleBlur("email")}
                />
              </div>
            </div>
          </section>

          <section aria-labelledby="address-heading" className="mt-8 md:mt-9">
            <h2
              id="address-heading"
              className="mb-4 font-body text-h3-m font-semibold text-ink md:mb-5 md:text-h3"
            >
              Delivery address
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Input
                  id={FIELD_IDS.street}
                  label="Street address"
                  autoComplete="street-address"
                  value={address.street}
                  error={errors.street}
                  onChange={(event) => updateField("street", event.target.value)}
                  onBlur={() => handleBlur("street")}
                />
              </div>
              <Input
                id={FIELD_IDS.city}
                label="City"
                autoComplete="address-level2"
                value={address.city}
                error={errors.city}
                onChange={(event) => updateField("city", event.target.value)}
                onBlur={() => handleBlur("city")}
              />
              <Select
                id={FIELD_IDS.state}
                label="State"
                autoComplete="address-level1"
                value={address.state}
                error={errors.state}
                onChange={(event) => updateField("state", event.target.value)}
                onBlur={() => handleBlur("state")}
              >
                <option value="">Select your state</option>
                {NIGERIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </div>
          </section>

          <section aria-labelledby="delivery-heading" className="mt-8 md:mt-9">
            <h2
              id="delivery-heading"
              className="mb-4 font-body text-h3-m font-semibold text-ink md:mb-5 md:text-h3"
            >
              Delivery method
            </h2>

            <div className="flex items-center gap-3 border border-line p-4 md:p-5">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-ink"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-ink" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-body text-small font-semibold text-ink">
                  Standard delivery
                </p>
                <p className="mt-0.5 font-body text-meta text-muted">
                  3–5 working days
                </p>
              </div>
              <p className="font-body text-meta font-semibold tabular text-ink">
                {delivery === 0 ? "Free" : formatNaira(delivery)}
              </p>
            </div>
          </section>

          <Button type="submit" full className="mt-7">
            Continue to payment
          </Button>
        </form>

        <OrderSummary
          items={items}
          headerAction={
            <Link
              href="/cart"
              className="focus-ring rounded-sm font-body text-meta text-muted underline underline-offset-4 hover:text-ink"
            >
              Edit cart
            </Link>
          }
          note="Free delivery on orders over ₦150,000."
          className="w-full lg:sticky lg:top-24"
        />
      </div>
    </section>
  );
}
