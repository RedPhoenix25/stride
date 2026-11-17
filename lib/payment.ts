import type { PaymentResult, PaymentStatus, Scenario } from "./types";
import { formatNaira } from "./format";

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeReference(): string {
  let code = "";
  for (let index = 0; index < 6; index += 1) {
    code += REFERENCE_ALPHABET[Math.floor(Math.random() * REFERENCE_ALPHABET.length)];
  }
  return `TRX-${code}`;
}

export function makeOrderNumber(): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `ST-${digits}`;
}

const SCENARIO_STATUS: Record<Scenario, PaymentStatus> = {
  1: "success",
  2: "declined",
  3: "insufficient_funds",
  4: "expired_card",
  5: "network_error",
  6: "cvv_mismatch",
};

const SCENARIO_DELAY: Record<Scenario, number> = {
  1: 1800,
  2: 0,
  3: 0,
  4: 0,
  5: 4000,
  6: 0,
};

export function processPayment(scenario: Scenario): Promise<PaymentResult> {
  const result: PaymentResult = {
    status: SCENARIO_STATUS[scenario],
    reference: makeReference(),
  };
  const delay = SCENARIO_DELAY[scenario];
  if (delay === 0) return Promise.resolve(result);
  return new Promise((resolve) => setTimeout(() => resolve(result), delay));
}

export interface BannerCopy {
  title: string;
  reason: string;
}

export function bannerCopy(
  status: PaymentStatus,
  total: number,
): BannerCopy | null {
  switch (status) {
    case "declined":
      return {
        title: "Payment declined.",
        reason:
          "Your bank didn't approve this payment. Nothing was charged. Try another card, or contact your bank if it keeps happening.",
      };
    case "insufficient_funds":
      return {
        title: "Card has insufficient funds.",
        reason: `Your bank says this card can't cover ${formatNaira(total)}. Nothing was charged. Try a card with a higher balance, or reduce your order.`,
      };
    case "expired_card":
      return {
        title: "Card has expired.",
        reason:
          "The expiry date on this card is in the past. Check the date on the card, or use a different one.",
      };
    case "network_error":
      return {
        title: "We couldn't reach your bank.",
        reason:
          "The payment service didn't respond. Nothing was charged. Check your connection and try again.",
      };
    case "cvv_mismatch":
      return {
        title: "CVV doesn't match.",
        reason: "Check the 3-digit code on the back of your card.",
      };
    case "success":
      return null;
  }
}
