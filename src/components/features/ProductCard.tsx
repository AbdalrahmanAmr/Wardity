import { FC } from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import type { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  onAddToCart: onAddToCartProp,
  onToggleWishlist: onToggleWishlistProp,
  isWishlisted: isWishlistedProp,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isWishlistedProp ?? isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCartProp) {
      onAddToCartProp(product);
    } else {
      addToCart(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlistProp) {
      onToggleWishlistProp(product);
    } else {
      toggleWishlist(product);
    }
  };

  // Ensure product has a valid ID
  if (!product.id) {
    console.error("ProductCard: product.id is missing", product);
    return null;
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-gray-900/50 hover:border-gold/40 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 card-hover cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
        <img
          src={product.image || `https://placehold.co/400x400/FAF7F2/D02046?text=${encodeURIComponent(product.name.slice(0, 10))}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-charcoal text-champagne text-[9px] font-medium tracking-widest uppercase px-2.5 py-[3px]">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-gray-800 hover:scale-110 transition-all z-20"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-5 h-5 text-primary" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          )}
        </button>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-600 z-20"
          aria-label="Add to cart"
        >
          <ShoppingBagIcon className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        {product.brandLogo && (
          <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 dark:text-gray-200">
            {product.brandLogo}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-gold">
            {product.price.toLocaleString()} <span className="text-sm font-normal text-gold/70">EGP</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

