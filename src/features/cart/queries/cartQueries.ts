/**
 * Cart-related React Query hooks and mutations
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/services/api";
import type { Cart, CartItem } from "@/shared/types";

/**
 * Query keys factory for cart
 */
export const cartQueryKeys = {
  all: ["cart"] as const,
  current: () => [...cartQueryKeys.all, "current"] as const,
};

/**
 * Fetch current cart
 */
export function useCart() {
  return useQuery({
    queryKey: cartQueryKeys.current(),
    queryFn: () => api.get<Cart>("/cart"),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Add item to cart mutation
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: {
      productId: string;
      quantity: number;
      selectedSize?: string;
    }) => api.post<CartItem, { productId: string; quantity: number; selectedSize?: string }>("/cart/items", item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

/**
 * Remove item from cart mutation
 */
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => api.delete(`/cart/items/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

/**
 * Update cart item quantity mutation
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) =>
      api.patch<CartItem, { quantity: number }>(`/cart/items/${itemId}`, {
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

/**
 * Clear entire cart mutation
 */
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete("/cart"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

