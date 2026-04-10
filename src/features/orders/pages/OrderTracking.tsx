import { FC, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrder, useReceipt } from "@/features/orders/queries/orderQueries";
import { formatDate, formatCurrency } from "@/shared/utils/formatters";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { ErrorBlock } from "@/shared/components/ErrorBlock";
import {
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  ChevronRightIcon,
  CubeIcon,
  XCircleIcon,
  PrinterIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import type { OrderStatus } from "@/shared/types";

interface TrackingStep {
  key: OrderStatus;
  label: string;
  description: string;
}

const TRACKING_PIPELINE: TrackingStep[] = [
  { key: "pending", label: "Ordered", description: "Order placed" },
  { key: "processing", label: "Processing", description: "Order confirmed and processing" },
  { key: "shipped", label: "Shipped", description: "Order shipped" },
  { key: "delivered", label: "Delivered", description: "Order delivered" },
];

const STATUS_ORDER: Record<OrderStatus, number> = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

function getStepIcon(step: string, completed: boolean) {
  const cls = "w-6 h-6";
  if (completed) return <CheckCircleIcon className={cls} />;
  switch (step) {
    case "shipped":
      return <TruckIcon className={cls} />;
    case "delivered":
      return <CubeIcon className={cls} />;
    default:
      return <ClockIcon className={cls} />;
  }
}

export const OrderTracking: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError, error } = useOrder(id ?? "");
  const { data: receipt } = useReceipt(id ?? "");
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = (): void => {
    if (!receiptRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Receipt ${receipt?.receiptNumber ?? ""}</title>
      <style>
        body{font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222}
        h1{font-size:20px;margin-bottom:4px}
        table{width:100%;border-collapse:collapse;margin:16px 0}
        th,td{text-align:left;padding:8px 4px;border-bottom:1px solid #eee}
        th{font-weight:600;font-size:12px;text-transform:uppercase;color:#666}
        .total-row td{border-top:2px solid #222;font-weight:700;font-size:16px}
        .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
        .section{margin-bottom:16px}
        .label{font-size:12px;color:#666;margin-bottom:2px}
        @media print{body{padding:0}}
      </style></head><body>
      ${receiptRef.current.innerHTML}
      <script>window.print();window.close();</script>
      </body></html>
    `);
    printWindow.document.close();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4 flex justify-center py-16">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <ErrorBlock message={error?.message || "Order not found"} />
        </div>
      </div>
    );
  }

  const currentIndex = STATUS_ORDER[order.status];
  const isCancelled = order.status === "cancelled";

  return (
    <div className="min-h-screen bg-wardity-bg py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/orders" className="hover:text-primary">Orders</Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-gray-900">Order #{order.receiptNumber || order.id}</span>
        </nav>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
            {receipt && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <PrinterIcon className="w-4 h-4" />
                Print Receipt
              </button>
            )}
          </div>

          {/* Order Status */}
          {isCancelled ? (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center gap-4 text-red-600">
                <XCircleIcon className="w-10 h-10" />
                <div>
                  <h3 className="font-semibold text-lg">Order Cancelled</h3>
                  <p className="text-sm text-gray-600">This order has been cancelled.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="relative">
                {TRACKING_PIPELINE.map((step, index) => {
                  const completed = index <= currentIndex;
                  return (
                    <div key={step.key} className="relative pb-8 last:pb-0">
                      {index < TRACKING_PIPELINE.length - 1 && (
                        <div
                          className={`absolute left-5 top-10 w-0.5 h-full ${
                            index < currentIndex ? "bg-primary" : "bg-gray-200"
                          }`}
                        />
                      )}
                      <div className="flex gap-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            completed ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {getStepIcon(step.key, completed)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900">{step.label}</h3>
                            {completed && (
                              <span className="text-sm text-gray-500">
                                {index === 0
                                  ? formatDate(order.createdAt)
                                  : index === currentIndex
                                    ? formatDate(order.updatedAt)
                                    : ""}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Order Items */}
          {order.items.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Items</h2>
              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                        {item.selectedSize ? ` · ${item.selectedSize}` : ""}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-primary whitespace-nowrap">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-sm">
              {order.receiptNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Receipt Number</span>
                  <span className="font-medium text-gray-900">{order.receiptNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium text-gray-900">{formatDate(order.createdAt)}</span>
              </div>
              {order.customerName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer</span>
                  <span className="font-medium text-gray-900">{order.customerName}</span>
                </div>
              )}
              {order.customerPhone && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium text-gray-900">{order.customerPhone}</span>
                </div>
              )}
              {order.deliveryDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-gray-900">
                    {order.deliveryDate} {order.deliveryTime || ""}
                  </span>
                </div>
              )}
              {order.paymentMethod && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-medium text-gray-900 capitalize">{order.paymentMethod}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${order.shippingCost === 0 ? "text-success" : "text-gray-900"}`}>
                    {order.shippingCost === 0 ? "Free" : formatCurrency(order.shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-primary">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Printable Receipt (hidden) */}
          {receipt && (
            <div className="hidden">
              <div ref={receiptRef}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                  <div>
                    <h1 style={{ fontSize: "24px", margin: "0 0 4px 0" }}>Wardity</h1>
                    <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Premium Flowers & Gifts</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px 0" }}>
                      <DocumentTextIcon className="w-4 h-4 inline" /> Receipt {receipt.receiptNumber}
                    </p>
                    <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                      {formatDate(receipt.date)}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>Customer</p>
                  <p style={{ margin: 0 }}><strong>{receipt.customer.name}</strong></p>
                  <p style={{ margin: 0, fontSize: "13px" }}>{receipt.customer.email}</p>
                  <p style={{ margin: 0, fontSize: "13px" }}>{receipt.customer.phone}</p>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "12px", color: "#666", marginBottom: "2px" }}>Shipping Address</p>
                  <p style={{ margin: 0, fontSize: "13px" }}>{receipt.shipping.address}</p>
                  {receipt.shipping.city && <p style={{ margin: 0, fontSize: "13px" }}>{receipt.shipping.city}{receipt.shipping.area ? `, ${receipt.shipping.area}` : ""}</p>}
                  {receipt.shipping.deliveryDate && (
                    <p style={{ margin: 0, fontSize: "13px" }}>
                      Delivery: {receipt.shipping.deliveryDate} {receipt.shipping.deliveryTime || ""}
                    </p>
                  )}
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th style={{ textAlign: "center" }}>Qty</th>
                      <th style={{ textAlign: "right" }}>Price</th>
                      <th style={{ textAlign: "right" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}{item.selectedSize ? ` (${item.selectedSize})` : ""}</td>
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                        <td style={{ textAlign: "right" }}>{formatCurrency(item.unitPrice)}</td>
                        <td style={{ textAlign: "right" }}>{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "right" }}>Subtotal</td>
                      <td style={{ textAlign: "right" }}>{formatCurrency(receipt.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "right" }}>Shipping</td>
                      <td style={{ textAlign: "right" }}>{receipt.shippingCost === 0 ? "Free" : formatCurrency(receipt.shippingCost)}</td>
                    </tr>
                    <tr className="total-row">
                      <td colSpan={3} style={{ textAlign: "right", borderTop: "2px solid #222", fontWeight: 700 }}>Total</td>
                      <td style={{ textAlign: "right", borderTop: "2px solid #222", fontWeight: 700 }}>{formatCurrency(receipt.total)}</td>
                    </tr>
                  </tfoot>
                </table>

                {receipt.paymentMethod && (
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    Payment Method: <span style={{ textTransform: "capitalize" }}>{receipt.paymentMethod}</span>
                  </p>
                )}
                <p style={{ fontSize: "11px", color: "#999", marginTop: "24px", textAlign: "center" }}>
                  Thank you for shopping with Wardity!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
