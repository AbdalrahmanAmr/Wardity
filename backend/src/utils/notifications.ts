import nodemailer from "nodemailer";

function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

interface OrderNotificationData {
  orderId: string;
  receiptNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string | null;
  area: string | null;
  deliveryDate: string | null;
  deliveryTime: string | null;
  deliveryNotes: string | null;
  paymentMethod: string | null;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    selectedSize: string | null;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Fallback: log to console in dev mode (no actual email sent)
  return null;
}

function buildOrderEmailHtml(data: OrderNotificationData): string {
  const itemRows = data.items
    .map(
      (item) =>
          `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(item.name)}${item.selectedSize ? ` (${escapeHtml(item.selectedSize)})` : ""}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${item.price.toFixed(2)} EGP</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${(item.price * item.quantity).toFixed(2)} EGP</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:#D02046;color:white;padding:24px;text-align:center">
        <h1 style="margin:0;font-size:24px">Wardity</h1>
        <p style="margin:4px 0 0;opacity:0.9;font-size:14px">Order Confirmation</p>
      </div>

      <div style="padding:24px">
        <p style="font-size:16px">Hello <strong>${escapeHtml(data.customerName)}</strong>,</p>
        <p>Thank you for your order! Here are your order details:</p>

        <div style="background:#f9f9f9;padding:16px;border-radius:8px;margin:16px 0">
          <p style="margin:0 0 4px"><strong>Receipt:</strong> ${data.receiptNumber}</p>
          <p style="margin:0 0 4px"><strong>Order ID:</strong> ${data.orderId}</p>
          ${data.deliveryDate ? `<p style="margin:0 0 4px"><strong>Delivery:</strong> ${data.deliveryDate} ${data.deliveryTime || ""}</p>` : ""}
          ${data.paymentMethod ? `<p style="margin:0"><strong>Payment:</strong> ${data.paymentMethod}</p>` : ""}
        </div>

        <h3 style="border-bottom:2px solid #D02046;padding-bottom:8px">Order Items</h3>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#f5f5f5">
              <th style="padding:8px;text-align:left;font-size:12px">Item</th>
              <th style="padding:8px;text-align:center;font-size:12px">Qty</th>
              <th style="padding:8px;text-align:right;font-size:12px">Price</th>
              <th style="padding:8px;text-align:right;font-size:12px">Total</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-radius:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span>Subtotal:</span>
            <strong>${data.subtotal.toFixed(2)} EGP</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span>Shipping:</span>
            <strong>${data.shippingCost === 0 ? "Free" : `${data.shippingCost.toFixed(2)} EGP`}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:18px;border-top:2px solid #D02046;padding-top:8px;margin-top:8px">
            <span><strong>Total:</strong></span>
            <strong style="color:#D02046">${data.total.toFixed(2)} EGP</strong>
          </div>
        </div>

        <h3 style="margin-top:24px">Delivery Address</h3>
        <p style="margin:0">${escapeHtml(data.shippingAddress)}</p>
        ${data.city ? `<p style="margin:4px 0 0">${escapeHtml(data.city)}${data.area ? `, ${escapeHtml(data.area)}` : ""}</p>` : ""}
        ${data.deliveryNotes ? `<p style="margin:8px 0 0;font-style:italic;color:#666">Notes: ${escapeHtml(data.deliveryNotes)}</p>` : ""}

        <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />
        <p style="font-size:12px;color:#999;text-align:center">
          Thank you for shopping with Wardity!<br/>
          If you have questions, reply to this email or contact us.
        </p>
      </div>
    </div>
  `;
}

export async function sendOrderConfirmationEmail(data: OrderNotificationData): Promise<void> {
  const transporter = getTransporter();

  const html = buildOrderEmailHtml(data);
  const subject = `Wardity Order Confirmation - ${data.receiptNumber}`;

  if (!transporter) {
    console.log(`[Email] No SMTP configured. Would send to: ${data.customerEmail}`);
    console.log(`[Email] Subject: ${subject}`);
    return;
  }

  try {
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "orders@wardity.com";
    await transporter.sendMail({
      from: `"Wardity" <${fromEmail}>`,
      to: data.customerEmail,
      subject,
      html,
    });
    console.log(`[Email] Sent order confirmation to ${data.customerEmail}`);
  } catch (error) {
    console.error(`[Email] Failed to send order confirmation for ${data.receiptNumber} to ${data.customerEmail}:`, error instanceof Error ? error.message : error);
  }
}

export async function sendOrderNotificationToOwner(data: OrderNotificationData): Promise<void> {
  const transporter = getTransporter();
  const ownerEmail = process.env.OWNER_EMAIL || "abdalrahmanamr275@gmail.com";

  const subject = `New Order ${data.receiptNumber} — ${data.total.toFixed(2)} EGP`;
  const html = buildOrderEmailHtml(data);

  if (!transporter || !ownerEmail) {
    console.log(`[Email] Owner notification: New order ${data.receiptNumber} from ${data.customerName}`);
    return;
  }

  try {
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "orders@wardity.com";
    await transporter.sendMail({
      from: `"Wardity Orders" <${fromEmail}>`,
      to: ownerEmail,
      subject,
      html,
    });
    console.log(`[Email] Sent owner notification to ${ownerEmail}`);
  } catch (error) {
    console.error(`[Email] Failed to send owner notification for ${data.receiptNumber}:`, error instanceof Error ? error.message : error);
  }
}

export function generateWhatsAppOrderLink(data: OrderNotificationData): string {
  const ownerPhone = process.env.WHATSAPP_PHONE || "201115239553";
  if (!ownerPhone) return "";

  const itemsList = data.items
    .map((item) => `  - ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} EGP`)
    .join("\n");

  const message = [
    `*New Order — ${data.receiptNumber}*`,
    `Customer: ${data.customerName}`,
    `Phone: ${data.customerPhone}`,
    `Email: ${data.customerEmail}`,
    "",
    `*Items:*`,
    itemsList,
    "",
    `Subtotal: ${data.subtotal.toFixed(2)} EGP`,
    `Shipping: ${data.shippingCost === 0 ? "Free" : `${data.shippingCost.toFixed(2)} EGP`}`,
    `*Total: ${data.total.toFixed(2)} EGP*`,
    "",
    `Address: ${data.shippingAddress}`,
    data.city ? `City: ${data.city}${data.area ? `, ${data.area}` : ""}` : "",
    data.deliveryDate ? `Delivery: ${data.deliveryDate} ${data.deliveryTime || ""}` : "",
    data.deliveryNotes ? `Notes: ${data.deliveryNotes}` : "",
    data.paymentMethod ? `Payment: ${data.paymentMethod}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const phone = ownerPhone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
