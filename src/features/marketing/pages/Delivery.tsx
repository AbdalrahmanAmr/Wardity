import { FC } from "react";
import {
  TruckIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

export const Delivery: FC = () => {
  return (
    <div className="min-h-screen bg-wardity-bg dark:bg-wardity-bg-dark py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Delivery Information
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about our delivery service
          </p>
        </div>

        {/* Delivery Areas */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Delivery Areas</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We currently offer delivery services to the following areas:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Cairo (All districts)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Giza (All districts)
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            We're continuously expanding our delivery network. Contact us to check if we deliver to
            your area.
          </p>
        </section>

        {/* Delivery Times */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Delivery Times</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Same-Day Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Orders placed before 2:00 PM will be delivered on the same day. Delivery times are
                between 9:00 AM and 10:00 PM.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Next-Day Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Orders placed after 2:00 PM will be delivered the next day. You can also schedule
                deliveries up to 30 days in advance.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Business Hours
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Sunday - Thursday: 9:00 AM - 10:00 PM
                <br />
                Friday - Saturday: 10:00 AM - 11:00 PM
              </p>
            </div>
          </div>
        </section>

        {/* Delivery Fees */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <CurrencyDollarIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Delivery Fees</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GiftIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Free Delivery
                </h3>
              </div>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Orders over 500 EGP qualify for free delivery!
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Standard Delivery Fee
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Orders under 500 EGP: 50 EGP delivery fee
              </p>
            </div>
          </div>
        </section>

        {/* Delivery Features */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <TruckIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Delivery Features
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Secure Packaging
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All orders are carefully packaged to ensure your flowers arrive fresh and beautiful.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <GiftIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Free Gift Wrapping
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All orders include complimentary gift wrapping and a personalized message card.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <ClockIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Real-Time Tracking
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track your order in real-time with SMS and email notifications.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  100% Satisfaction
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  If you're not satisfied, contact us within 24 hours for a replacement or refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
            Important Delivery Notes
          </h3>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              Please ensure someone is available to receive the delivery at the specified address.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              We'll contact you via phone before delivery to confirm the address and timing.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              If no one is available, we'll attempt delivery again or contact you to reschedule.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              For special occasions, we recommend placing orders at least 24 hours in advance.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

