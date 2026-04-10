import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";
import { generateId } from "../utils/id.js";
import { calculateShipping } from "../utils/shipping.js";
import {
  sendOrderConfirmationEmail,
  sendOrderNotificationToOwner,
  generateWhatsAppOrderLink,
} from "../utils/notifications.js";

interface FormattedItem {
  id: string;
  product: { id: string; name: string; image: string; sku: string | null };
  quantity: number;
  price: number;
  selectedSize?: string;
}

const ORDER_COLS = `id, receipt_number, status, subtotal, shipping_cost, total,
  customer_name, customer_email, customer_phone,
  shipping_address, city, area,
  delivery_date, delivery_time, delivery_notes,
  payment_method, created_at, updated_at`;

const ITEMS_QUERY = `
  SELECT oi.id, oi.quantity, oi.price, oi.selected_size as selectedSize,
    p.id as product_id, p.name, p.image, p.sku
  FROM order_items oi JOIN products p ON oi.product_id = p.id
  WHERE oi.order_id = ?`;

function formatOrder(order: RowDataPacket, items: RowDataPacket[]): Record<string, unknown> {
  return {
    id: order.id,
    receiptNumber: order.receipt_number,
    status: order.status,
    subtotal: Number(order.subtotal),
    shippingCost: Number(order.shipping_cost),
    total: Number(order.total),
    customerName: order.customer_name,
    customerEmail: order.customer_email,
    customerPhone: order.customer_phone,
    shippingAddress: order.shipping_address,
    city: order.city,
    area: order.area,
    deliveryDate: order.delivery_date,
    deliveryTime: order.delivery_time,
    deliveryNotes: order.delivery_notes,
    paymentMethod: order.payment_method || undefined,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    items: items.map((item): FormattedItem => ({
      id: item.id,
      product: { id: item.product_id, name: item.name, image: item.image, sku: item.sku },
      quantity: item.quantity,
      price: Number(item.price),
      selectedSize: item.selectedSize || undefined,
    })),
  };
}

async function generateReceiptNumber(): Promise<string> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT MAX(CAST(SUBSTRING(receipt_number, 5) AS UNSIGNED)) as maxSeq FROM orders WHERE receipt_number LIKE 'WRD-%'"
  );
  const seq = ((rows[0].maxSeq ?? 0) + 1).toString().padStart(6, "0");
  return `WRD-${seq}`;
}

export async function getUserOrders(userId: string) {
  const pool = getPool();
  const [orders] = await pool.query<RowDataPacket[]>(
    `SELECT ${ORDER_COLS} FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [userId] as QueryParams
  );

  if (orders.length === 0) return [];

  const orderIds = orders.map((o) => o.id) as QueryParams;
  const placeholders = orderIds.map(() => "?").join(",");
  const [allItems] = await pool.query<RowDataPacket[]>(
    `SELECT oi.id, oi.order_id, oi.quantity, oi.price,
      oi.selected_size as selectedSize,
      p.id as product_id, p.name, p.image, p.sku
    FROM order_items oi JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id IN (${placeholders})`,
    orderIds
  );

  const itemsByOrder = new Map<string, RowDataPacket[]>();
  for (const item of allItems) {
    const list = itemsByOrder.get(item.order_id) ?? [];
    list.push(item);
    itemsByOrder.set(item.order_id, list);
  }

  return orders.map((order) => formatOrder(order, itemsByOrder.get(order.id) ?? []));
}

export async function getOrderById(orderId: string, userId: string) {
  const pool = getPool();
  const [orders] = await pool.query<RowDataPacket[]>(
    `SELECT ${ORDER_COLS} FROM orders WHERE id = ? AND user_id = ?`, [orderId, userId] as QueryParams
  );
  if (orders.length === 0) return null;

  const [items] = await pool.query<RowDataPacket[]>(ITEMS_QUERY, [orderId] as QueryParams);
  return formatOrder(orders[0], items);
}

export async function getReceipt(orderId: string, userId: string) {
  const pool = getPool();
  const [orders] = await pool.query<RowDataPacket[]>(
    `SELECT ${ORDER_COLS} FROM orders WHERE id = ? AND user_id = ?`, [orderId, userId] as QueryParams
  );
  if (orders.length === 0) return null;

  const order = orders[0];
  const [items] = await pool.query<RowDataPacket[]>(ITEMS_QUERY, [orderId] as QueryParams);

  return {
    receipt: {
      receiptNumber: order.receipt_number,
      date: order.created_at,
      status: order.status,
      customer: { name: order.customer_name, email: order.customer_email, phone: order.customer_phone },
      shipping: {
        address: order.shipping_address, city: order.city, area: order.area,
        deliveryDate: order.delivery_date, deliveryTime: order.delivery_time, notes: order.delivery_notes,
      },
      items: items.map((item) => ({
        name: item.name, sku: item.sku, quantity: item.quantity,
        unitPrice: Number(item.price), total: Number(item.price) * item.quantity,
        selectedSize: item.selectedSize || undefined,
      })),
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shipping_cost),
      total: Number(order.total),
      paymentMethod: order.payment_method,
    },
  };
}

interface CreateOrderInput {
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
  paymentDetails?: Record<string, unknown>;
  items?: Array<{ productId: string; quantity: number; selectedSize?: string }>;
}

export async function createOrder(userId: string, input: CreateOrderInput) {
  const pool = getPool();
  const {
    customerName, customerEmail, customerPhone,
    shippingAddress, city, area,
    deliveryDate, deliveryTime, deliveryNotes,
    paymentMethod, paymentDetails,
    items: clientItems,
  } = input;

  interface LineItem { product_id: string; quantity: number; selected_size: string | null; price: number }
  let lineItems: LineItem[];

  if (clientItems && clientItems.length > 0) {
    lineItems = [];
    for (const ci of clientItems) {
      const [prods] = await pool.query<RowDataPacket[]>(
        "SELECT id, price, status FROM products WHERE id = ?", [ci.productId] as QueryParams
      );
      if (prods.length === 0) throw Object.assign(new Error(`Product ${ci.productId} not found`), { statusCode: 400 });
      if (prods[0].status !== "In stock") throw Object.assign(new Error(`Product "${ci.productId}" is out of stock`), { statusCode: 400 });

      let finalPrice = Number(prods[0].price);
      if (ci.selectedSize) {
        const [sizeRows] = await pool.query<RowDataPacket[]>(
          "SELECT price FROM product_sizes WHERE product_id = ? AND name = ?",
          [ci.productId, ci.selectedSize] as QueryParams
        );
        if (sizeRows.length > 0) finalPrice = Number(sizeRows[0].price);
      }
      lineItems.push({ product_id: prods[0].id, quantity: ci.quantity, selected_size: ci.selectedSize || null, price: finalPrice });
    }
  } else {
    const [cartRows] = await pool.query<RowDataPacket[]>(
      `SELECT ci.product_id, ci.quantity, ci.selected_size, p.price, p.status
      FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?`,
      [userId] as QueryParams
    );

    const outOfStock = cartRows.find((i) => i.status !== "In stock");
    if (outOfStock) throw Object.assign(new Error(`Product "${outOfStock.product_id}" is out of stock`), { statusCode: 400 });

    lineItems = [];
    for (const row of cartRows) {
      let finalPrice = Number(row.price);
      if (row.selected_size) {
        const [sizeRows] = await pool.query<RowDataPacket[]>(
          "SELECT price FROM product_sizes WHERE product_id = ? AND name = ?",
          [row.product_id, row.selected_size] as QueryParams
        );
        if (sizeRows.length > 0) finalPrice = Number(sizeRows[0].price);
      }
      lineItems.push({ product_id: row.product_id, quantity: row.quantity, selected_size: row.selected_size, price: finalPrice });
    }
  }

  if (lineItems.length === 0) throw Object.assign(new Error("Cart is empty"), { statusCode: 400 });

  const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = calculateShipping(subtotal, area);
  const total = subtotal + shippingCost;
  const orderId = generateId();
  const receiptNumber = await generateReceiptNumber();

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      `INSERT INTO orders (
        id, user_id, receipt_number, status, subtotal, shipping_cost, total,
        customer_name, customer_email, customer_phone,
        shipping_address, city, area, delivery_date, delivery_time, delivery_notes,
        payment_method, payment_details
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId, userId, receiptNumber, "pending", subtotal, shippingCost, total,
        customerName, customerEmail, customerPhone,
        shippingAddress, city || null, area || null,
        deliveryDate || null, deliveryTime || null, deliveryNotes || null,
        paymentMethod || null, paymentDetails ? JSON.stringify(paymentDetails) : null,
      ] as QueryParams
    );

    for (const item of lineItems) {
      await conn.query(
        "INSERT INTO order_items (id, order_id, product_id, quantity, price, selected_size) VALUES (?, ?, ?, ?, ?, ?)",
        [generateId(), orderId, item.product_id, item.quantity, item.price, item.selected_size] as QueryParams
      );
    }

    await conn.query("DELETE FROM cart_items WHERE user_id = ?", [userId] as QueryParams);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  const [orderRows] = await pool.query<RowDataPacket[]>(`SELECT ${ORDER_COLS} FROM orders WHERE id = ?`, [orderId] as QueryParams);
  const [orderItems] = await pool.query<RowDataPacket[]>(ITEMS_QUERY, [orderId] as QueryParams);

  const notificationData = {
    orderId, receiptNumber, customerName, customerEmail, customerPhone,
    shippingAddress, city: city || null, area: area || null,
    deliveryDate: deliveryDate || null, deliveryTime: deliveryTime || null,
    deliveryNotes: deliveryNotes || null, paymentMethod: paymentMethod || null,
    items: orderItems.map((item) => ({ name: item.name, quantity: item.quantity, price: Number(item.price), selectedSize: item.selectedSize })),
    subtotal, shippingCost, total,
  };

  sendOrderConfirmationEmail(notificationData).catch(() => {});
  sendOrderNotificationToOwner(notificationData).catch(() => {});
  const whatsappLink = generateWhatsAppOrderLink(notificationData);

  const formatted = formatOrder(orderRows[0], orderItems);
  return { ...formatted, whatsappLink: whatsappLink || undefined };
}

export async function cancelOrder(orderId: string, userId: string) {
  const pool = getPool();
  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id, status FROM orders WHERE id = ? AND user_id = ?", [orderId, userId] as QueryParams
  );
  if (existing.length === 0) return null;
  if (existing[0].status !== "pending") throw Object.assign(new Error("Only pending orders can be cancelled"), { statusCode: 400 });

  await pool.query("UPDATE orders SET status = ? WHERE id = ?", ["cancelled", orderId] as QueryParams);

  const [orders] = await pool.query<RowDataPacket[]>(`SELECT ${ORDER_COLS} FROM orders WHERE id = ?`, [orderId] as QueryParams);
  const [items] = await pool.query<RowDataPacket[]>(ITEMS_QUERY, [orderId] as QueryParams);
  return formatOrder(orders[0], items);
}
