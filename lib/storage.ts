import type { CartItem, Order } from "./types";

export const CART_KEY = "sportstore.cart.v1";
export const ORDER_KEY = "sportstore.order.v1";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked; the page still works for this session.
  }
}

export function readCart(): CartItem[] {
  const value = readJson<unknown>(CART_KEY);
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is CartItem =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as CartItem).productId === "string" &&
      typeof (item as CartItem).size === "string" &&
      Number.isInteger((item as CartItem).quantity) &&
      (item as CartItem).quantity > 0,
  );
}

export function writeCart(items: CartItem[]): void {
  writeJson(CART_KEY, items);
}

export function readOrder(): Order | null {
  const value = readJson<Order>(ORDER_KEY);
  return value && typeof value.orderNumber === "string" ? value : null;
}

export function writeOrder(order: Order): void {
  writeJson(ORDER_KEY, order);
}

export function clearOrder(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ORDER_KEY);
  } catch {
    // Nothing to recover from.
  }
}
