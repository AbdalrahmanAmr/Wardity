import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().max(20, "Phone number is too long").optional().nullable(),
}).refine((d) => d.name !== undefined || d.phone !== undefined, {
  message: "At least one field (name or phone) is required",
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

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

export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  selectedSize: z.string().optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const addToWishlistSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  selectedSize: z.string().optional(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(8, "Phone number is required"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  city: z.string().optional(),
  area: z.string().optional(),
  deliveryDate: z.string().optional(),
  deliveryTime: z.string().optional(),
  deliveryNotes: z.string().optional(),
  paymentMethod: z.string().optional(),
  paymentDetails: z.object({
    cardName: z.string().optional(),
    cardLast4: z.string().max(4).optional(),
    walletTransferFrom: z.string().optional(),
  }).optional(),
  items: z.array(orderItemSchema).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
