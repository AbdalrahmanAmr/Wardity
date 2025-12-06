import { z } from "zod";

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Product validation schemas
export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be positive"),
  image: z.string().url("Image must be a valid URL"),
  badge: z.string().optional().nullable(),
  imageDesc: z.string().optional(),
  brandLogo: z.string().url().optional().nullable(),
  status: z.enum(["In stock", "Out of stock"]).optional(),
  sku: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  occasionId: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();

// Cart validation schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  selectedSize: z.string().optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

// Wishlist validation schemas
export const addToWishlistSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

// Order validation schemas
export const createOrderSchema = z.object({
  shippingAddress: z.string().min(1, "Shipping address is required"),
  paymentMethod: z.string().optional(),
});

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

