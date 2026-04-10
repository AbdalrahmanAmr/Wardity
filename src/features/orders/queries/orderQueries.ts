/**
 * Order-related React Query hooks and mutations
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/services/api";
import type { Order, CreateOrderInput, ReceiptData } from "@/shared/types";
import { cartQueryKeys } from "@/features/cart/queries/cartQueries";

export const orderQueryKeys = {
  all: ["orders"] as const,
  lists: () => [...orderQueryKeys.all, "list"] as const,
  list: () => [...orderQueryKeys.lists()] as const,
  details: () => [...orderQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...orderQueryKeys.details(), id] as const,
  receipt: (id: string) => [...orderQueryKeys.all, "receipt", id] as const,
};

export function useOrders() {
  return useQuery({
    queryKey: orderQueryKeys.list(),
    queryFn: () => api.get<Order[]>("/orders"),
    staleTime: 2 * 60 * 1000,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderQueryKeys.detail(id),
    queryFn: () => api.get<Order>(`/orders/${id}`),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useReceipt(id: string) {
  return useQuery({
    queryKey: orderQueryKeys.receipt(id),
    queryFn: async () => {
      const res = await api.get<{ receipt: ReceiptData }>(`/orders/${id}/receipt`);
      return res.receipt;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateOrderInput) =>
      api.post<Order, CreateOrderInput>("/orders", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}
