/**
 * Route loaders for data prefetching
 * These run before components mount, improving perceived performance
 */
import type { LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from "@/shared/services/queryClient";
import { productQueryKeys } from "@/features/products/queries/productQueries";
import { api } from "@/shared/services/api";
import type { ProductDetail } from "@/shared/types";

/**
 * Loader for product detail page
 * Prefetches product data before component renders
 */
export async function productLoader({
  params,
}: LoaderFunctionArgs): Promise<ProductDetail> {
  const id = params.id;
  if (!id) {
    throw new Error("Product ID is required");
  }

  // Prefetch product data
  return queryClient.ensureQueryData({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => api.get<ProductDetail>(`/products/${id}`),
  });
}

/**
 * Loader for category page
 */
export async function categoryLoader({
  params,
}: LoaderFunctionArgs): Promise<unknown> {
  const slug = params.slug;
  if (!slug) {
    throw new Error("Category slug is required");
  }

  return queryClient.ensureQueryData({
    queryKey: ["categories", "detail", slug],
    queryFn: () => api.get(`/categories/${slug}`),
  });
}

/**
 * Loader for occasion page
 */
export async function occasionLoader({
  params,
}: LoaderFunctionArgs): Promise<unknown> {
  const slug = params.slug;
  if (!slug) {
    throw new Error("Occasion slug is required");
  }

  return queryClient.ensureQueryData({
    queryKey: ["occasions", "detail", slug],
    queryFn: () => api.get(`/occasions/${slug}`),
  });
}

