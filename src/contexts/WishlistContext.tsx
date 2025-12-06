import { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Product } from "@/types";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useLocalStorage<Product[]>("wardity-wishlist", []);

  const addToWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        if (prev.some((p) => p.id === product.id)) {
          return prev;
        }
        return [...prev, product];
      });
    },
    [setWishlist]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
    },
    [setWishlist]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((p) => p.id === productId);
    },
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

