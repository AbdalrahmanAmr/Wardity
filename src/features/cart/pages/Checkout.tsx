import { FC, useState } from "react";
import { useCart } from "@/features/cart/context/CartContext";
import { useAuth } from "@/features/auth";
import { useCreateOrder } from "@/features/orders/queries/orderQueries";
import { ErrorBlock } from "@/shared/components/ErrorBlock";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { formatCurrency } from "@/shared/utils/formatters";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { calculateShipping, getDeliveryAreas, FREE_SHIPPING_THRESHOLD } from "@/shared/utils/shipping";

export const Checkout: FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const createOrder = useCreateOrder();
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "Cairo",
    area: "",
    postalCode: "",
    deliveryDate: "",
    deliveryTime: "",
    notes: "",
    payment: "cash",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
    walletTransferFrom: "",
  });

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add items to your cart before checkout</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircleIcon className="w-24 h-24 text-success mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            {receiptNumber && (
              <p className="text-lg font-semibold text-primary mb-2">
                Receipt: {receiptNumber}
              </p>
            )}
            <p className="text-gray-600 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to={createdOrderId ? `/orders/${createdOrderId}` : "/orders"}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                {createdOrderId ? "View Receipt & Track" : "View Orders"}
              </Link>
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Send via WhatsApp
                </a>
              )}
              <Link
                to="/"
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const deliveryAreas = getDeliveryAreas();
  const shippingCost = calculateShipping(cart.total, formData.area);
  const total = cart.total + shippingCost;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError(null);

    const customerName = `${formData.firstName} ${formData.lastName}`.trim();
    const shippingAddress = [
      formData.address,
      formData.area ? `Area: ${formData.area}` : "",
      `${formData.city}${formData.postalCode ? ` ${formData.postalCode}` : ""}`,
    ]
      .filter(Boolean)
      .join(", ");

    const orderItems = cart.items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
    }));

    const paymentDetails: Record<string, string> = {};
    if (formData.payment === "card" && formData.cardNumber) {
      paymentDetails.cardName = formData.cardName;
      paymentDetails.cardLast4 = formData.cardNumber.replace(/\s/g, "").slice(-4);
    }
    if (formData.payment === "wallet" && formData.walletTransferFrom) {
      paymentDetails.walletTransferFrom = formData.walletTransferFrom;
    }

    createOrder.mutate(
      {
        customerName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress,
        city: formData.city,
        area: formData.area || undefined,
        deliveryDate: formData.deliveryDate || undefined,
        deliveryTime: formData.deliveryTime || undefined,
        deliveryNotes: formData.notes || undefined,
        paymentMethod: formData.payment,
        paymentDetails: Object.keys(paymentDetails).length > 0 ? paymentDetails : undefined,
        items: orderItems,
      },
      {
        onSuccess: (order) => {
          clearCart();
          setCreatedOrderId(order.id);
          setReceiptNumber(order.receiptNumber);
          setWhatsappLink(order.whatsappLink || null);
          setOrderPlaced(true);
        },
        onError: (err) => {
          const message =
            typeof err === "object" && err !== null && "message" in err
              ? (err as { message: string }).message
              : "Failed to place order. Please try again.";
          setError(message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-wardity-bg py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorBlock message={error} />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <div className="mt-0">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={2}
                    placeholder="Building number, street name, apartment..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    >
                      <option value="Cairo">Cairo</option>
                      <option value="Giza">Giza</option>
                      <option value="Alexandria">Alexandria</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                      Area *
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    >
                      <option value="">Select area</option>
                      {deliveryAreas.map((da) => (
                        <option key={da.name} value={da.name}>
                          {da.name} — {formatCurrency(da.rate)} delivery
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Options</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Date *
                    </label>
                    <input
                      id="deliveryDate"
                      name="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Time *
                    </label>
                    <select
                      id="deliveryTime"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    >
                      <option value="">Select time</option>
                      <option value="09:00-12:00">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="12:00-15:00">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="15:00-18:00">Evening (3:00 PM - 6:00 PM)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special instructions for delivery..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${formData.payment === "cash" ? "border-primary bg-primary/5" : "border-gray-200"}`}>
                    <input type="radio" name="payment" value="cash" checked={formData.payment === "cash"} onChange={handleChange} className="text-primary focus:ring-primary" />
                    <span className="ml-3 font-medium">Cash on Delivery</span>
                  </label>

                  {/* Credit/Debit Card */}
                  <div>
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${formData.payment === "card" ? "border-primary bg-primary/5 rounded-b-none" : "border-gray-200"}`}>
                      <input type="radio" name="payment" value="card" checked={formData.payment === "card"} onChange={handleChange} className="text-primary focus:ring-primary" />
                      <span className="ml-3 font-medium">Credit/Debit Card</span>
                    </label>
                    {formData.payment === "card" && (
                      <div className="border border-t-0 border-primary/30 rounded-b-lg p-4 bg-gray-50 space-y-4">
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                          <input id="cardName" name="cardName" type="text" value={formData.cardName} onChange={handleChange} required placeholder="Name on card" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                        </div>
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                          <input id="cardNumber" name="cardNumber" type="text" value={formData.cardNumber} onChange={handleChange} required placeholder="0000 0000 0000 0000" maxLength={19} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                            <input id="cardExpiry" name="cardExpiry" type="text" value={formData.cardExpiry} onChange={handleChange} required placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono" />
                          </div>
                          <div>
                            <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                            <input id="cardCvv" name="cardCvv" type="text" value={formData.cardCvv} onChange={handleChange} required placeholder="123" maxLength={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                          Your payment details are secure and encrypted
                        </p>
                      </div>
                    )}
                  </div>

                  {/* InstaPay */}
                  <div>
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${formData.payment === "instapay" ? "border-primary bg-primary/5 rounded-b-none" : "border-gray-200"}`}>
                      <input type="radio" name="payment" value="instapay" checked={formData.payment === "instapay"} onChange={handleChange} className="text-primary focus:ring-primary" />
                      <span className="ml-3 font-medium">InstaPay</span>
                    </label>
                    {formData.payment === "instapay" && (
                      <div className="border border-t-0 border-primary/30 rounded-b-lg p-4 bg-gray-50">
                        <div className="text-center space-y-4">
                          <p className="text-sm text-gray-700 font-medium">
                            Transfer to the following InstaPay account:
                          </p>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
                            <p className="text-2xl font-bold text-primary font-mono tracking-wider">
                              01012345678
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Wardity — InstaPay</p>
                          </div>
                          {/* QR Code placeholder */}
                          <div className="flex justify-center">
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-3 inline-block">
                              <svg viewBox="0 0 120 120" className="w-32 h-32">
                                <rect width="120" height="120" fill="white" />
                                {/* Simulated QR code pattern */}
                                <rect x="10" y="10" width="30" height="30" fill="#222" rx="2" />
                                <rect x="15" y="15" width="20" height="20" fill="white" rx="1" />
                                <rect x="20" y="20" width="10" height="10" fill="#222" rx="1" />
                                <rect x="80" y="10" width="30" height="30" fill="#222" rx="2" />
                                <rect x="85" y="15" width="20" height="20" fill="white" rx="1" />
                                <rect x="90" y="20" width="10" height="10" fill="#222" rx="1" />
                                <rect x="10" y="80" width="30" height="30" fill="#222" rx="2" />
                                <rect x="15" y="85" width="20" height="20" fill="white" rx="1" />
                                <rect x="20" y="90" width="10" height="10" fill="#222" rx="1" />
                                {/* Center data blocks */}
                                {[45, 52, 59, 66, 73].map((x) =>
                                  [10, 17, 24, 45, 52, 59, 66, 80, 87, 94, 101].map((y) => (
                                    <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" fill={(x + y) % 14 < 7 ? "#222" : "white"} />
                                  )),
                                )}
                                {[10, 17, 24, 31, 38].map((x) =>
                                  [45, 52, 59, 66, 73].map((y) => (
                                    <rect key={`b${x}-${y}`} x={x} y={y} width="5" height="5" fill={(x * y) % 3 === 0 ? "#222" : "white"} />
                                  )),
                                )}
                                {[80, 87, 94, 101, 108].map((x) =>
                                  [45, 52, 59, 66, 73, 80, 87].map((y) => (
                                    <rect key={`c${x}-${y}`} x={x} y={y} width="5" height="5" fill={(x + y) % 11 < 5 ? "#222" : "white"} />
                                  )),
                                )}
                              </svg>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400">
                            Scan the QR code with your banking app or use the number above
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Wallet */}
                  <div>
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${formData.payment === "wallet" ? "border-primary bg-primary/5 rounded-b-none" : "border-gray-200"}`}>
                      <input type="radio" name="payment" value="wallet" checked={formData.payment === "wallet"} onChange={handleChange} className="text-primary focus:ring-primary" />
                      <span className="ml-3 font-medium">Mobile Wallet</span>
                    </label>
                    {formData.payment === "wallet" && (
                      <div className="border border-t-0 border-primary/30 rounded-b-lg p-4 bg-gray-50 space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-700 font-medium mb-3">
                            Transfer to the following wallet number:
                          </p>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
                            <p className="text-2xl font-bold text-primary font-mono tracking-wider">
                              01098765432
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Wardity — Vodafone Cash</p>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="walletTransferFrom" className="block text-sm font-medium text-gray-700 mb-1">
                            Your wallet number (transferred from) *
                          </label>
                          <input
                            id="walletTransferFrom"
                            name="walletTransferFrom"
                            type="tel"
                            value={formData.walletTransferFrom}
                            onChange={handleChange}
                            required
                            placeholder="01XXXXXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Enter the number you are transferring from so we can verify your payment
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={createOrder.isPending}
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {createOrder.isPending ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - ${formatCurrency(total)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize || "default"}`} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-product.svg"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-primary">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-success font-medium" : ""}>
                    {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-gray-400">
                    Free shipping on orders over {formatCurrency(FREE_SHIPPING_THRESHOLD)}
                  </p>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
