import { Router, Response } from "express";
import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";
import { validate, addToCartSchema, updateCartItemSchema } from "../utils/validation.js";
import { generateId } from "../utils/id.js";

export const cartRouter = Router();

cartRouter.use(authenticateToken);

const CART_QUERY = `
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
`;

function formatCartItems(rows: RowDataPacket[]) {
  return rows.map((item) => ({
    product: {
      id: item.product_id,
      name: item.name,
      price: Number(item.price),
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
}

/**
 * GET /api/cart
 */
cartRouter.get("/", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const uid = req.userId!;
  const [rows] = await pool.query<RowDataPacket[]>(CART_QUERY, [uid] as QueryParams);

  const items = formatCartItems(rows);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  res.json({ items, total, itemCount });
});

/**
 * POST /api/cart/items
 */
cartRouter.post("/items", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const { productId, quantity, selectedSize } = validate(addToCartSchema, req.body);

  const uid = req.userId!;
  const [products] = await pool.query<RowDataPacket[]>(
    "SELECT id, status FROM products WHERE id = ?", [productId] as QueryParams
  );

  if (products.length === 0) {
    res.status(404).json({ message: "Product not found", status: 404 });
    return;
  }

  if (products[0].status !== "In stock") {
    res.status(400).json({ message: "Product is out of stock", status: 400 });
    return;
  }

  const sizeVal = selectedSize || null;
  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ? AND (selected_size = ? OR (selected_size IS NULL AND ? IS NULL))",
    [uid, productId, sizeVal, sizeVal] as QueryParams
  );

  if (existing.length > 0) {
    const newQty = existing[0].quantity + quantity;
    await pool.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [newQty, existing[0].id] as QueryParams);
  } else {
    const itemId = generateId();
    await pool.query(
      "INSERT INTO cart_items (id, user_id, product_id, quantity, selected_size) VALUES (?, ?, ?, ?, ?)",
      [itemId, uid, productId, quantity, sizeVal] as QueryParams
    );
  }

  const [rows] = await pool.query<RowDataPacket[]>(CART_QUERY, [uid] as QueryParams);
  const items = formatCartItems(rows);
  const newItem = items.find((item) => item.product.id === productId && item.selectedSize === selectedSize);

  res.status(201).json(newItem);
});

/**
 * PATCH /api/cart/items/:id
 */
cartRouter.patch("/items/:id", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const { id } = req.params;
  const { quantity } = validate(updateCartItemSchema, req.body);

  const [items] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM cart_items WHERE id = ? AND user_id = ?", [id, req.userId!] as QueryParams
  );

  if (items.length === 0) {
    res.status(404).json({ message: "Cart item not found", status: 404 });
    return;
  }

  await pool.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [quantity, id] as QueryParams);

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT 
      ci.id, ci.quantity, ci.selected_size as selectedSize,
      p.id as product_id, p.name, p.price, p.badge, p.image,
      p.image_desc as imageDesc, p.brand_logo as brandLogo, p.status, p.sku
    FROM cart_items ci JOIN products p ON ci.product_id = p.id
    WHERE ci.id = ?`,
    [id] as QueryParams
  );
  const item = rows[0];

  res.json({
    product: {
      id: item.product_id,
      name: item.name,
      price: Number(item.price),
      badge: item.badge,
      image: item.image,
      imageDesc: item.imageDesc,
      brandLogo: item.brandLogo,
      status: item.status as "In stock" | "Out of stock",
      sku: item.sku,
    },
    quantity: item.quantity,
    selectedSize: item.selectedSize || undefined,
  });
});

/**
 * DELETE /api/cart/items/:id
 */
cartRouter.delete("/items/:id", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  const { id } = req.params;

  const [items] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM cart_items WHERE id = ? AND user_id = ?", [id, req.userId!] as QueryParams
  );

  if (items.length === 0) {
    res.status(404).json({ message: "Cart item not found", status: 404 });
    return;
  }

  await pool.query("DELETE FROM cart_items WHERE id = ?", [id] as QueryParams);
  res.status(204).send();
});

/**
 * DELETE /api/cart
 */
cartRouter.delete("/", async (req: AuthRequest, res: Response) => {
  const pool = getPool();
  await pool.query("DELETE FROM cart_items WHERE user_id = ?", [req.userId!] as QueryParams);
  res.status(204).send();
});
