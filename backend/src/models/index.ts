export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  password_hash: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  badge: string | null;
  image: string;
  image_desc: string | null;
  brand_logo: string | null;
  status: "In stock" | "Out of stock";
  sku: string | null;
  description: string | null;
  category_id: string | null;
  occasion_id: string | null;
  collection: string | null;
  created_at: string;
}

export interface ProductSize {
  name: string;
  price: number;
  product_id: string;
}

export interface ProductGallery {
  product_id: string;
  main_image: string;
  thumbnails: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_type: string;
  bg_color: string | null;
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  image_type: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  selected_size: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  receipt_number: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping_cost: number;
  total: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string | null;
  area: string | null;
  delivery_date: string | null;
  delivery_time: string | null;
  delivery_notes: string | null;
  payment_method: string | null;
  payment_details: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  selected_size: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
}

export interface FormattedProduct {
  id: string;
  name: string;
  price: number;
  badge: string | null;
  image: string;
  imageDesc: string | null;
  brandLogo: string | null;
  status: "In stock" | "Out of stock";
  sku: string | null;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
