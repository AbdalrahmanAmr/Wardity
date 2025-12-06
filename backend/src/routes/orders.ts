import { Router, Response } from "express";
import { db } from "../database/init.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";
import { validate, createOrderSchema } from "../utils/validation.js";
import { generateId } from "../utils/id.js";

export const ordersRouter = Router();

// All order routes require authentication
ordersRouter.use(authenticateToken);

/**
 * GET /api/orders
 * Get user's orders
 */
ordersRouter.get("/", (req: AuthRequest, res: Response) => {
  const orders = db
    .prepare(
      `
      SELECT 
        id,
        status,
        total,
        shipping_address as shippingAddress,
        payment_method as paymentMethod,
        created_at as createdAt,
        updated_at as updatedAt
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `
    )
    .all(req.userId!) as Array<{
    id: string;
    status: string;
    total: number;
    shippingAddress: string;
    paymentMethod: string | null;
    createdAt: string;
    updatedAt: string;
  }>;

  const ordersWithItems = orders.map((order) => {
    const items = db
      .prepare(
        `
        SELECT 
          oi.id,
          oi.quantity,
          oi.price,
          oi.selected_size as selectedSize,
          p.id as product_id,
          p.name,
          p.image,
          p.sku
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `
      )
      .all(order.id) as Array<{
      id: string;
      quantity: number;
      price: number;
      selectedSize: string | null;
      product_id: string;
      name: string;
      image: string;
      sku: string | null;
    }>;

    return {
      id: order.id,
      status: order.status,
      total: order.total,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod || undefined,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: items.map((item) => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.name,
          image: item.image,
          sku: item.sku,
        },
        quantity: item.quantity,
        price: item.price,
        selectedSize: item.selectedSize || undefined,
      })),
    };
  });

  res.json(ordersWithItems);
});

/**
 * GET /api/orders/:id
 * Get single order by ID
 */
ordersRouter.get("/:id", (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const order = db
    .prepare(
      `
      SELECT 
        id,
        status,
        total,
        shipping_address as shippingAddress,
        payment_method as paymentMethod,
        created_at as createdAt,
        updated_at as updatedAt
      FROM orders
      WHERE id = ? AND user_id = ?
    `
    )
    .get(id, req.userId!) as
    | {
        id: string;
        status: string;
        total: number;
        shippingAddress: string;
        paymentMethod: string | null;
        createdAt: string;
        updatedAt: string;
      }
    | undefined;

  if (!order) {
    res.status(404).json({
      message: "Order not found",
      status: 404,
    });
    return;
  }

  const items = db
    .prepare(
      `
      SELECT 
        oi.id,
        oi.quantity,
        oi.price,
        oi.selected_size as selectedSize,
        p.id as product_id,
        p.name,
        p.image,
        p.sku
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `
    )
    .all(id) as Array<{
    id: string;
    quantity: number;
    price: number;
    selectedSize: string | null;
    product_id: string;
    name: string;
    image: string;
    sku: string | null;
  }>;

  res.json({
    id: order.id,
    status: order.status,
    total: order.total,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod || undefined,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    items: items.map((item) => ({
      id: item.id,
      product: {
        id: item.product_id,
        name: item.name,
        image: item.image,
        sku: item.sku,
      },
      quantity: item.quantity,
      price: item.price,
      selectedSize: item.selectedSize || undefined,
    })),
  });
});

/**
 * POST /api/orders
 * Create new order from cart
 */
ordersRouter.post("/", (req: AuthRequest, res: Response) => {
  const { shippingAddress, paymentMethod } = validate(
    createOrderSchema,
    req.body
  );

  // Get cart items
  const cartItems = db
    .prepare(
      `
      SELECT 
        ci.product_id,
        ci.quantity,
        ci.selected_size,
        p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `
    )
    .all(req.userId!) as Array<{
    product_id: string;
    quantity: number;
    selected_size: string | null;
    price: number;
  }>;

  if (cartItems.length === 0) {
    res.status(400).json({
      message: "Cart is empty",
      status: 400,
    });
    return;
  }

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Create order
  const orderId = generateId();
  db.prepare(
    "INSERT INTO orders (id, user_id, status, total, shipping_address, payment_method) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    orderId,
    req.userId!,
    "pending",
    total,
    shippingAddress,
    paymentMethod || null
  );

  // Create order items
  for (const item of cartItems) {
    const orderItemId = generateId();
    db.prepare(
      "INSERT INTO order_items (id, order_id, product_id, quantity, price, selected_size) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(
      orderItemId,
      orderId,
      item.product_id,
      item.quantity,
      item.price,
      item.selected_size || null
    );
  }

  // Clear cart
  db.prepare("DELETE FROM cart_items WHERE user_id = ?").run(req.userId!);

  // Return created order
  const order = db
    .prepare(
      `
      SELECT 
        id,
        status,
        total,
        shipping_address as shippingAddress,
        payment_method as paymentMethod,
        created_at as createdAt,
        updated_at as updatedAt
      FROM orders
      WHERE id = ?
    `
    )
    .get(orderId) as {
    id: string;
    status: string;
    total: number;
    shippingAddress: string;
    paymentMethod: string | null;
    createdAt: string;
    updatedAt: string;
  };

  const items = db
    .prepare(
      `
      SELECT 
        oi.id,
        oi.quantity,
        oi.price,
        oi.selected_size as selectedSize,
        p.id as product_id,
        p.name,
        p.image,
        p.sku
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `
    )
    .all(orderId) as Array<{
    id: string;
    quantity: number;
    price: number;
    selectedSize: string | null;
    product_id: string;
    name: string;
    image: string;
    sku: string | null;
  }>;

  res.status(201).json({
    id: order.id,
    status: order.status,
    total: order.total,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod || undefined,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    items: items.map((item) => ({
      id: item.id,
      product: {
        id: item.product_id,
        name: item.name,
        image: item.image,
        sku: item.sku,
      },
      quantity: item.quantity,
      price: item.price,
      selectedSize: item.selectedSize || undefined,
    })),
  });
});

