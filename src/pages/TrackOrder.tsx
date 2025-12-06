import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MagnifyingGlassIcon, TruckIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const TrackOrder: FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setIsSearching(true);
    // In a real app, you'd validate the order number and fetch order details
    // For now, we'll navigate to the order tracking page if it's a valid format
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to order detail page if order exists
      // For demo purposes, we'll just show a message
      if (orderNumber.trim().length > 5) {
        navigate(`/orders/${orderNumber.trim()}`);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-wardity-bg dark:bg-wardity-bg-dark py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TruckIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enter your order number to track the status of your delivery
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="orderNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Order Number
              </label>
              <div className="relative">
                <input
                  id="orderNumber"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., ORD-123456)"
                  required
                  className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                You can find your order number in the confirmation email we sent you.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSearching || !orderNumber.trim()}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <LoadingSpinner size="sm" />
                  Searching...
                </>
              ) : (
                <>
                  <TruckIcon className="w-5 h-5" />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Need Help?
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Can't find your order number?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Check your email inbox (and spam folder) for the order confirmation email we sent
                when you placed your order.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Still having trouble?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Contact our customer service team and we'll help you track your order.
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Order Status Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Order Status Guide
          </h3>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <strong>Processing:</strong> Your order is being prepared
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
              <strong>Out for Delivery:</strong> Your order is on its way
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <strong>Delivered:</strong> Your order has been delivered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

