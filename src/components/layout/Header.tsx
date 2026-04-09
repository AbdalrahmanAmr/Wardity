import { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  UserIcon,
  TruckIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useDeliveryLocation } from "@/contexts/DeliveryLocationContext";
import { useWishlist } from "@/contexts/WishlistContext";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { location, setLocation, availableLocations } = useDeliveryLocation();
  const { wishlist } = useWishlist();
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 bg-cream shadow-sm">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo — SVG rose + Cormorant Garamond italic wordmark */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            {/* Decorative rose SVG */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              {/* Five petals radiating from center */}
              <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" />
              <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.85" transform="rotate(72,12,12)" />
              <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.75" transform="rotate(144,12,12)" />
              <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.8" transform="rotate(216,12,12)" />
              <path d="M12 12C10 9 10 6 12 4.5C14 6 14 9 12 12Z" fill="#D02046" opacity="0.9" transform="rotate(288,12,12)" />
              {/* Inner petal layer for depth */}
              <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(36,12,12)" />
              <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(108,12,12)" />
              <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(180,12,12)" />
              <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(252,12,12)" />
              <path d="M12 12C11.2 10.5 11.2 8.5 12 7.5C12.8 8.5 12.8 10.5 12 12Z" fill="#A61435" transform="rotate(324,12,12)" />
              {/* Rose centre */}
              <circle cx="12" cy="12" r="2" fill="#8A1029" />
              <circle cx="12" cy="12" r="0.75" fill="#FAF7F2" opacity="0.6" />
            </svg>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="font-heading italic text-[1.65rem] text-primary tracking-wide leading-none">
                Wardity
              </span>
              <span className="text-[8.5px] tracking-[0.22em] text-gray-400 dark:text-gray-500 uppercase font-sans mt-1">
                A Blooming Connection
              </span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            {/* Delivery Location */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <TruckIcon className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">Delivery To</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    {location.name}
                    <ChevronDownIcon className="w-3 h-3" />
                  </p>
                </div>
              </button>
              {showLocationMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px] z-50">
                  {availableLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setLocation(loc);
                        setShowLocationMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        location.id === loc.id ? "bg-primary/5 text-primary" : ""
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.name || "Account"}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">Login</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative"
            >
              <HeartIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors relative"
            >
              <ShoppingBagIcon className="w-6 h-6 text-primary" />
              <span className="hidden sm:block text-sm font-medium text-primary">Basket</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            {/* Delivery Location - Mobile */}
            <button className="flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
              <TruckIcon className="w-5 h-5 text-primary" />
              <div className="text-left flex-1">
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Delivery To</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Greater Cairo</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </button>

            {/* Wishlist - Mobile */}
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-2"
            >
              <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="ml-auto w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

