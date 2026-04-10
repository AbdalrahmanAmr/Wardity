/**
 * Product-related React Query hooks and query keys
 */
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/shared/services/api";
import type { Product, ProductDetail, PaginatedResponse } from "@/shared/types";

/**
 * Query keys factory for products
 */
export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...productQueryKeys.lists(), filters] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
  search: (query: string) => [...productQueryKeys.all, "search", query] as const,
};

/**
 * Fetch single product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => api.get<ProductDetail>(`/products/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch products list with filters.
 * The backend always returns PaginatedResponse; we extract the `data` array
 * so callers receive Product[].
 */
export function useProducts(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: productQueryKeys.list(filters),
    queryFn: async () => {
      const queryString = filters
        ? `?${new URLSearchParams(
            Object.entries(filters).reduce(
              (acc, [key, value]) => {
                if (value !== undefined && value !== null) {
                  acc[key] = String(value);
                }
                return acc;
              },
              {} as Record<string, string>
            )
          ).toString()}`
        : "";
      const res = await api.get<PaginatedResponse<Product>>(`/products${queryString}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch paginated products
 */
export function useProductsInfinite(pageSize = 20) {
  return useInfiniteQuery({
    queryKey: [...productQueryKeys.all, "infinite", pageSize],
    queryFn: ({ pageParam = 1 }) =>
      api.get<PaginatedResponse<Product>>(
        `/products?page=${pageParam}&pageSize=${pageSize}`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
}

interface SearchResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Search products (paginated)
 */
export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: productQueryKeys.search(query),
    queryFn: async () => {
      const result = await api.get<SearchResponse>(`/products/search?q=${encodeURIComponent(query)}&pageSize=50`);
      return result.data;
    },
    enabled: query.length > 2,
    staleTime: 2 * 60 * 1000,
  });
}

