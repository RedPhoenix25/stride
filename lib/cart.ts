import type { CartItem, Product } from "./types";

export const DELIVERY_FEE = 2500;
export const FREE_DELIVERY_THRESHOLD = 150000;

export function lineTotal(price: number, quantity: number): number {
  return price * quantity;
}

export function subtotalFor(
  items: CartItem[],
  products: Product[],
): number {
  return items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? sum + lineTotal(product.price, item.quantity) : sum;
  }, 0);
}

export function deliveryFor(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

export function totalFor(subtotal: number): number {
  return subtotal + deliveryFor(subtotal);
}

export function freeDeliveryRemaining(subtotal: number): number {
  return Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
}

export function countItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function addItem(
  items: CartItem[],
  productId: string,
  size: string,
  quantity = 1,
  stock = Infinity,
): CartItem[] {
  const existing = items.find(
    (item) => item.productId === productId && item.size === size,
  );
  if (!existing) {
    return [...items, { productId, size, quantity: Math.min(quantity, stock) }];
  }
  return items.map((item) =>
    item.productId === productId && item.size === size
      ? { ...item, quantity: Math.min(item.quantity + quantity, stock) }
      : item,
  );
}

export function removeItem(
  items: CartItem[],
  productId: string,
  size: string,
): CartItem[] {
  return items.filter(
    (item) => !(item.productId === productId && item.size === size),
  );
}

export function setQuantity(
  items: CartItem[],
  productId: string,
  size: string,
  quantity: number,
  stock = Infinity,
): CartItem[] {
  if (quantity <= 0) return removeItem(items, productId, size);
  const capped = Math.min(quantity, stock);
  return items.map((item) =>
    item.productId === productId && item.size === size
      ? { ...item, quantity: capped }
      : item,
  );
}
