"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import {
  addItem,
  countItems,
  deliveryFor,
  removeItem,
  setQuantity,
  subtotalFor,
  totalFor,
} from "./cart";
import { readCart, readOrder, writeCart, writeOrder } from "./storage";
import type { CartItem, Order, Product, Scenario } from "./types";

export interface CartLine {
  item: CartItem;
  product: Product;
}

interface StoreValue {
  ready: boolean;
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  order: Order | null;
  scenario: Scenario;
  add: (productId: string, size: string, quantity?: number, stock?: number) => void;
  remove: (productId: string, size: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    quantity: number,
    stock?: number,
  ) => void;
  clear: () => void;
  setOrder: (order: Order) => void;
  setScenario: (scenario: Scenario) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [order, setOrderState] = useState<Order | null>(null);
  const [scenario, setScenario] = useState<Scenario>(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setOrderState(readOrder());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeCart(items);
  }, [items, ready]);

  const add = useCallback(
    (productId: string, size: string, quantity = 1, stock = Infinity) => {
      setItems((current) => addItem(current, productId, size, quantity, stock));
    },
    [],
  );

  const remove = useCallback((productId: string, size: string) => {
    setItems((current) => removeItem(current, productId, size));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number, stock = Infinity) => {
      setItems((current) =>
        setQuantity(current, productId, size, quantity, stock),
      );
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const setOrder = useCallback((next: Order) => {
    setOrderState(next);
    writeOrder(next);
  }, []);

  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return product ? [{ item, product }] : [];
      }),
    [items],
  );

  const subtotal = useMemo(
    () => subtotalFor(items, products),
    [items],
  );
  const delivery = deliveryFor(subtotal);
  const total = totalFor(subtotal);
  const count = countItems(items);

  const value: StoreValue = {
    ready,
    items,
    lines,
    count,
    subtotal,
    delivery,
    total,
    order,
    scenario,
    add,
    remove,
    updateQuantity,
    clear,
    setOrder,
    setScenario,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return value;
}
