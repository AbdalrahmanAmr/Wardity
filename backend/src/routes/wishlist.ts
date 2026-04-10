import { Router, Response } from "express";
import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";
import { validate, addToWishlistSchema } from "../utils/validation.js";
import { generateId } from "../utils/id.js";

export const wishlistRouter = Router();

wishlistRouter.use(authenticateToken);

/**
 * GET /api/wishlist
 */
wishlistRouter.get("/", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const [products] = await pool.query<RowDataPacket[]>(
    `SELECT p.id, p.name, p.price, p.badge, p.image,
      p.image_desc as imageDesc, p.brand_logo as brandLogo, p.status, p.sku
    FROM wishlist_items wi
    JOIN products p ON wi.product_id = p.id
    WHERE wi.user_id = ?
    ORDER BY wi.created_at DESC`,
    [req.userId!] as QueryParams
  );

  res.json(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      badge: p.badge,
      image: p.image,
      imageDesc: p.imageDesc,
      brandLogo: p.brandLogo,
      status: p.status as "In stock" | "Out of stock",
      sku: p.sku,
    }))
  );
});

/**
 * GET /api/wishlist/check/:productId
 */
wishlistRouter.get("/check/:productId", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const { productId } = req.params;

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?",
    [req.userId!, productId] as QueryParams
  );

  res.json(rows.length > 0);
});

/**
 * POST /api/wishlist/items
 */
wishlistRouter.post("/items", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const { productId } = validate(addToWishlistSchema, req.body);

  const [products] = await pool.query<RowDataPacket[]>(
    "SELECT id, name, price, badge, image, image_desc, brand_logo, status, sku FROM products WHERE id = ?",
    [productId] as QueryParams
  );

  if (products.length === 0) {
    res.status(404).json({ message: "Product not found", status: 404 });
    return;
  }

  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?",
    [req.userId!, productId] as QueryParams
  );

  if (existing.length > 0) {
    res.status(409).json({ message: "Product already in wishlist", status: 409 });
    return;
  }

  const itemId = generateId();
  await pool.query(
    "INSERT INTO wishlist_items (id, user_id, product_id) VALUES (?, ?, ?)",
    [itemId, req.userId!, productId] as QueryParams
  );

  const product = products[0];
  res.status(201).json({
    id: product.id,
    name: product.name,
    price: Number(product.price),
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
 */
wishlistRouter.delete("/items/:productId", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const { productId } = req.params;

  const [items] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?",
    [req.userId!, productId] as QueryParams
  );

  if (items.length === 0) {
    res.status(404).json({ message: "Wishlist item not found", status: 404 });
    return;
  }

  await pool.query("DELETE FROM wishlist_items WHERE id = ?", [items[0].id] as QueryParams);
  res.status(204).send();
});
