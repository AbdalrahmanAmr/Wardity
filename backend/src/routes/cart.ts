import { Router, Response } from "express";
import { db } from "../database/init.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";
import { validate, addToCartSchema, updateCartItemSchema } from "../utils/validation.js";
import { generateId } from "../utils/id.js";

export const cartRouter = Router();

// All cart routes require authentication
cartRouter.use(authenticateToken);

/**
 * GET /api/cart
 * Get current user's cart
 */
cartRouter.get("/", (req: AuthRequest, res: Response) => {
  const cartItems = db
    .prepare(
      `
      SELECT 
        ci.id,
        ci.quantity,
        ci.selected_size as selectedSize,
        p.id as product_id,
        p.name,
        p.price,
        p.badge,
        p.image,
        p.image_desc as imageDesc,
        p.brand_logo as brandLogo,
        p.status,
        p.sku
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
      ORDER BY ci.created_at DESC
    `
    )
    .all(req.userId!) as Array<{
    id: string;
    quantity: number;
    selectedSize: string | null;
    product_id: string;
    name: string;
    price: number;
    badge: string | null;
    image: string;
    imageDesc: string | null;
    brandLogo: string | null;
    status: string;
    sku: string | null;
  }>;

  const items = cartItems.map((item) => ({
    product: {
      id: item.product_id,
      name: item.name,
      price: item.price,
      badge: item.badge,
      image: item.image,
      imageDesc: item.imageDesc,
      brandLogo: item.brandLogo,
      status: item.status as "In stock" | "Out of stock",
      sku: item.sku,
    },
    quantity: item.quantity,
    selectedSize: item.selectedSize || undefined,
  }));

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  res.json({
    items,
    total,
    itemCount,
  });
});

/**
 * POST /api/cart/items
 * Add item to cart
 */
cartRouter.post("/items", (req: AuthRequest, res: Response) => {
  const { productId, quantity, selectedSize } = validate(
    addToCartSchema,
    req.body
  );

  // Check if product exists
  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(productId) as { id: string } | undefined;

  if (!product) {
    res.status(404).json({
      message: "Product not found",
      status: 404,
    });
    return;
  }

  // Check if item already exists in cart
  const existingItem = db
    .prepare(
      "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ? AND (selected_size = ? OR (selected_size IS NULL AND ? IS NULL))"
    )
    .get(req.userId!, productId, selectedSize || null, selectedSize || null) as
    | { id: string; quantity: number }
    | undefined;

  if (existingItem) {
    // Update quantity
    const newQuantity = existingItem.quantity + quantity;
    db.prepare("UPDATE cart_items SET quantity = ?, updated_at = datetime('now') WHERE id = ?").run(
      newQuantity,
      existingItem.id
    );
  } else {
    // Create new cart item
    const itemId = generateId();
    db.prepare(
      "INSERT INTO cart_items (id, user_id, product_id, quantity, selected_size) VALUES (?, ?, ?, ?, ?)"
    ).run(itemId, req.userId!, productId, quantity, selectedSize || null);
  }

  // Return updated cart
  const cartItems = db
    .prepare(
      `
      SELECT 
        ci.id,
        ci.quantity,
        ci.selected_size as selectedSize,
        p.id as product_id,
        p.name,
        p.price,
        p.badge,
        p.image,
        p.image_desc as imageDesc,
        p.brand_logo as brandLogo,
        p.status,
        p.sku
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
      ORDER BY ci.created_at DESC
    `
    )
    .all(req.userId!) as Array<{
    id: string;
    quantity: number;
    selectedSize: string | null;
    product_id: string;
    name: string;
    price: number;
    badge: string | null;
    image: string;
    imageDesc: string | null;
    brandLogo: string | null;
    status: string;
    sku: string | null;
  }>;

  const items = cartItems.map((item) => ({
    product: {
      id: item.product_id,
      name: item.name,
      price: item.price,
      badge: item.badge,
      image: item.image,
      imageDesc: item.imageDesc,
      brandLogo: item.brandLogo,
      status: item.status as "In stock" | "Out of stock",
      sku: item.sku,
    },
    quantity: item.quantity,
    selectedSize: item.selectedSize || undefined,
  }));

  const newItem = items.find(
    (item) =>
      item.product.id === productId &&
      item.selectedSize === selectedSize
  );

  res.status(201).json(newItem);
});

/**
 * PATCH /api/cart/items/:id
 * Update cart item quantity
 */
cartRouter.patch("/items/:id", (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { quantity } = validate(updateCartItemSchema, req.body);

  // Check if item exists and belongs to user
  const item = db
    .prepare("SELECT * FROM cart_items WHERE id = ? AND user_id = ?")
    .get(id, req.userId!) as { id: string } | undefined;

  if (!item) {
    res.status(404).json({
      message: "Cart item not found",
      status: 404,
    });
    return;
  }

  // Update quantity
  db.prepare(
    "UPDATE cart_items SET quantity = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(quantity, id);

  // Return updated item
  const updatedItem = db
    .prepare(
      `
      SELECT 
        ci.id,
        ci.quantity,
        ci.selected_size as selectedSize,
        p.id as product_id,
        p.name,
        p.price,
        p.badge,
        p.image,
        p.image_desc as imageDesc,
        p.brand_logo as brandLogo,
        p.status,
        p.sku
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ?
    `
    )
    .get(id) as {
    id: string;
    quantity: number;
    selectedSize: string | null;
    product_id: string;
    name: string;
    price: number;
    badge: string | null;
    image: string;
    imageDesc: string | null;
    brandLogo: string | null;
    status: string;
    sku: string | null;
  };

  res.json({
    product: {
      id: updatedItem.product_id,
      name: updatedItem.name,
      price: updatedItem.price,
      badge: updatedItem.badge,
      image: updatedItem.image,
      imageDesc: updatedItem.imageDesc,
      brandLogo: updatedItem.brandLogo,
      status: updatedItem.status as "In stock" | "Out of stock",
      sku: updatedItem.sku,
    },
    quantity: updatedItem.quantity,
    selectedSize: updatedItem.selectedSize || undefined,
  });
});

/**
 * DELETE /api/cart/items/:id
 * Remove item from cart
 */
cartRouter.delete("/items/:id", (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // Check if item exists and belongs to user
  const item = db
    .prepare("SELECT * FROM cart_items WHERE id = ? AND user_id = ?")
    .get(id, req.userId!) as { id: string } | undefined;

  if (!item) {
    res.status(404).json({
      message: "Cart item not found",
      status: 404,
    });
    return;
  }

  db.prepare("DELETE FROM cart_items WHERE id = ?").run(id);

  res.status(204).send();
});

/**
 * DELETE /api/cart
 * Clear entire cart
 */
cartRouter.delete("/", (req: AuthRequest, res: Response) => {
  db.prepare("DELETE FROM cart_items WHERE user_id = ?").run(req.userId!);

  res.status(204).send();
});

