export type Category = "sneakers" | "apparel" | "accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  colourway: string;
  sizes: string[];
  images: string[];
  badge?: "new" | "sale";
  stock: number;
  description: string;
  features: string[];
}

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
}

export type Scenario = 1 | 2 | 3 | 4 | 5 | 6;

export type PaymentStatus =
  | "success"
  | "declined"
  | "insufficient_funds"
  | "expired_card"
  | "network_error"
  | "cvv_mismatch";

export interface PaymentResult {
  status: PaymentStatus;
  reference: string;
}

export interface Order {
  orderNumber: string;
  reference: string;
  items: {
    product: Product;
    size: string;
    quantity: number;
    lineTotal: number;
  }[];
  address: Address;
  cardLast4: string;
  subtotal: number;
  delivery: number;
  total: number;
  createdAt: string;
}
