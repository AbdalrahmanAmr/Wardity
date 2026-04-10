import { FC, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/shared/services/queryClient";
import { AuthProvider } from "@/features/auth";
import { CartProvider } from "@/features/cart";
import { WishlistProvider } from "@/features/wishlist";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DeliveryLocationProvider } from "@/contexts/DeliveryLocationContext";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DeliveryLocationProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </DeliveryLocationProvider>
    </LanguageProvider>
  </QueryClientProvider>
);
