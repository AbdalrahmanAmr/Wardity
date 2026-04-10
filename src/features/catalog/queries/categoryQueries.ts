/**
 * Category-related React Query hooks and query keys
 */
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/services/api";
import type { Category, Occasion } from "@/shared/types";

/**
 * Query keys factory for categories
 */
export const categoryQueryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryQueryKeys.all, "list"] as const,
  list: () => [...categoryQueryKeys.lists()] as const,
  detail: (slug: string) => [...categoryQueryKeys.all, "detail", slug] as const,
};

/**
 * Query keys factory for occasions
 */
export const occasionQueryKeys = {
  all: ["occasions"] as const,
  lists: () => [...occasionQueryKeys.all, "list"] as const,
  list: () => [...occasionQueryKeys.lists()] as const,
  detail: (slug: string) => [...occasionQueryKeys.all, "detail", slug] as const,
};

/**
 * Fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: categoryQueryKeys.list(),
    queryFn: () => api.get<Category[]>("/categories"),
    staleTime: 10 * 60 * 1000, // 10 minutes (categories change rarely)
  });
}

/**
 * Fetch category by slug
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: categoryQueryKeys.detail(slug),
    queryFn: () => api.get<Category>(`/categories/${slug}`),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch all occasions
 */
export function useOccasions() {
  return useQuery({
    queryKey: occasionQueryKeys.list(),
    queryFn: () => api.get<Occasion[]>("/occasions"),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch occasion by slug
 */
export function useOccasion(slug: string) {
  return useQuery({
    queryKey: occasionQueryKeys.detail(slug),
    queryFn: () => api.get<Occasion>(`/occasions/${slug}`),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

