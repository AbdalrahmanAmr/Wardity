import { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { CheckCircleIcon, TruckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface TrackingStep {
  status: string;
  date: string;
  description: string;
  completed: boolean;
}

const mockTrackingSteps: TrackingStep[] = [
  {
    status: "ordered",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Order placed",
    completed: true,
  },
  {
    status: "processing",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Order confirmed and processing",
    completed: true,
  },
  {
    status: "shipped",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Order shipped",
    completed: true,
  },
  {
    status: "delivered",
    date: new Date().toISOString(),
    description: "Order delivered",
    completed: false,
  },
];

export const OrderTracking: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-wardity-bg py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/orders" className="hover:text-primary">Orders</Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-gray-900">Order #{id}</span>
        </nav>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="relative">
              {mockTrackingSteps.map((step, index) => (
                <div key={step.status} className="relative pb-8 last:pb-0">
                  {index < mockTrackingSteps.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200" />
                  )}
                  <div className="flex gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon className="w-6 h-6" />
                      ) : step.status === "shipped" ? (
                        <TruckIcon className="w-6 h-6" />
                      ) : (
                        <ClockIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 capitalize">{step.status}</h3>
                        <span className="text-sm text-gray-500">{formatDate(step.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-medium text-gray-900">#{id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium text-gray-900">
                  {mockTrackingSteps[0] ? formatDate(mockTrackingSteps[0].date) : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-primary">{formatCurrency(2590)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

