/**
 * Order-related types matching backend API responses
 */

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItemProduct {
  id: string;
  name: string;
  image: string;
  sku: string | null;
}

export interface OrderItem {
  id: string;
  product: OrderItemProduct;
  quantity: number;
  price: number;
  selectedSize?: string;
}

export interface Order {
  id: string;
  receiptNumber: string | null;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  total: number;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  shippingAddress: string;
  city: string | null;
  area: string | null;
  deliveryDate: string | null;
  deliveryTime: string | null;
  deliveryNotes: string | null;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  whatsappLink?: string;
}

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
  selectedSize?: string;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city?: string;
  area?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  deliveryNotes?: string;
  paymentMethod?: string;
  paymentDetails?: Record<string, string>;
  items?: CreateOrderItemInput[];
}

export interface ReceiptData {
  receiptNumber: string | null;
  date: string;
  status: string;
  customer: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
  shipping: {
    address: string;
    city: string | null;
    area: string | null;
    deliveryDate: string | null;
    deliveryTime: string | null;
    notes: string | null;
  };
  items: Array<{
    name: string;
    sku: string | null;
    quantity: number;
    unitPrice: number;
    total: number;
    selectedSize?: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string | null;
}
