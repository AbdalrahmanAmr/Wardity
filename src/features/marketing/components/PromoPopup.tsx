import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { XMarkIcon, GiftIcon } from "@heroicons/react/24/outline";

const POPUP_DISMISSED_KEY = "wardity_promo_dismissed";
const POPUP_DELAY_MS = 3000;

export const PromoPopup: FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading || isAuthenticated) return;

    const dismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading]);

  const handleDismiss = (): void => {
    setVisible(false);
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Top banner */}
        <div className="bg-gradient-to-r from-primary to-pink-500 px-6 py-8 text-center text-white">
          <GiftIcon className="w-14 h-14 mx-auto mb-3 drop-shadow-lg" />
          <h2 className="text-3xl font-extrabold tracking-tight">
            Get Up To <span className="text-yellow-300">30% OFF</span>
          </h2>
          <p className="mt-2 text-sm text-white/90">On your first order when you sign up today!</p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center">
          <p className="text-gray-600 text-sm mb-6">
            Join Wardity to enjoy exclusive discounts, early access to new collections,
            and special gifts with your orders.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/register"
              onClick={handleDismiss}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors text-center"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              onClick={handleDismiss}
              className="w-full text-primary border border-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Already have an account? Log In
            </Link>
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
            >
              No thanks, I'll skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
