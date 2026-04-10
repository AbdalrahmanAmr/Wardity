import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { useOrders } from "@/features/orders/queries/orderQueries";
import { formatDate, formatCurrency } from "@/shared/utils/formatters";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { ErrorBlock } from "@/shared/components/ErrorBlock";
import { TruckIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";
import type { OrderStatus } from "@/shared/types";

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return <CheckCircleIcon className="w-5 h-5 text-success" />;
    case "shipped":
    case "processing":
      return <TruckIcon className="w-5 h-5 text-blue-500" />;
    case "pending":
      return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    case "cancelled":
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "delivered":
      return "text-success bg-success/10";
    case "shipped":
      return "text-blue-600 bg-blue-50";
    case "processing":
      return "text-yellow-600 bg-yellow-50";
    case "pending":
      return "text-gray-600 bg-gray-50";
    case "cancelled":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const Orders: FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: orders, isLoading, isError, error } = useOrders();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-wardity-bg py-12">
        <div className="container mx-auto px-4">
          <ErrorBlock message={error?.message || "Failed to load orders"} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wardity-bg py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <TruckIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <Link
              to="/"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-bold text-gray-900">
                        {order.receiptNumber ? `Order ${order.receiptNumber}` : `Order #${order.id}`}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{formatCurrency(order.total)}</p>
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex gap-4 overflow-x-auto">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
