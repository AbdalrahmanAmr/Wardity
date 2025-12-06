import { Router, Response } from "express";
import { db } from "../database/init.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";
import { validate, addToWishlistSchema } from "../utils/validation.js";
import { generateId } from "../utils/id.js";

export const wishlistRouter = Router();

// All wishlist routes require authentication
wishlistRouter.use(authenticateToken);

/**
 * GET /api/wishlist
 * Get current user's wishlist
 */
wishlistRouter.get("/", (req: AuthRequest, res: Response) => {
  const products = db
    .prepare(
      `
      SELECT 
        p.id,
        p.name,
        p.price,
        p.badge,
        p.image,
        p.image_desc as imageDesc,
        p.brand_logo as brandLogo,
        p.status,
        p.sku
      FROM wishlist_items wi
      JOIN products p ON wi.product_id = p.id
      WHERE wi.user_id = ?
      ORDER BY wi.created_at DESC
    `
    )
    .all(req.userId!) as Array<{
    id: string;
    name: string;
    price: number;
    badge: string | null;
    image: string;
    imageDesc: string | null;
    brandLogo: string | null;
    status: string;
    sku: string | null;
  }>;

  const formattedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    badge: p.badge,
    image: p.image,
    imageDesc: p.imageDesc,
    brandLogo: p.brandLogo,
    status: p.status as "In stock" | "Out of stock",
    sku: p.sku,
  }));

  res.json(formattedProducts);
});

/**
 * GET /api/wishlist/check/:productId
 * Check if product is in wishlist
 */
wishlistRouter.get("/check/:productId", (req: AuthRequest, res: Response) => {
  const { productId } = req.params;

  const item = db
    .prepare(
      "SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?"
    )
    .get(req.userId!, productId) as { id: string } | undefined;

  res.json(!!item);
});

/**
 * POST /api/wishlist/items
 * Add product to wishlist
 */
wishlistRouter.post("/items", (req: AuthRequest, res: Response) => {
  const { productId } = validate(addToWishlistSchema, req.body);

  // Check if product exists
  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(productId) as
    | {
        id: string;
        name: string;
        price: number;
        badge: string | null;
        image: string;
        image_desc: string | null;
        brand_logo: string | null;
        status: string;
        sku: string | null;
      }
    | undefined;

  if (!product) {
    res.status(404).json({
      message: "Product not found",
      status: 404,
    });
    return;
  }

  // Check if already in wishlist
  const existing = db
    .prepare(
      "SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?"
    )
    .get(req.userId!, productId) as { id: string } | undefined;

  if (existing) {
    res.status(409).json({
      message: "Product already in wishlist",
      status: 409,
    });
    return;
  }

  // Add to wishlist
  const itemId = generateId();
  db.prepare(
    "INSERT INTO wishlist_items (id, user_id, product_id) VALUES (?, ?, ?)"
  ).run(itemId, req.userId!, productId);

  res.status(201).json({
    id: product.id,
    name: product.name,
    price: product.price,
    badge: product.badge,
    image: product.image,
    imageDesc: product.image_desc,
    brandLogo: product.brand_logo,
    status: product.status as "In stock" | "Out of stock",
    sku: product.sku,
  });
});

/**
 * DELETE /api/wishlist/items/:productId
 * Remove product from wishlist
 */
wishlistRouter.delete("/items/:productId", (req: AuthRequest, res: Response) => {
  const { productId } = req.params;

  // Check if item exists and belongs to user
  const item = db
    .prepare(
      "SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?"
    )
    .get(req.userId!, productId) as { id: string } | undefined;

  if (!item) {
    res.status(404).json({
      message: "Wishlist item not found",
      status: 404,
    });
    return;
  }

  db.prepare("DELETE FROM wishlist_items WHERE id = ?").run(item.id);

  res.status(204).send();
});

