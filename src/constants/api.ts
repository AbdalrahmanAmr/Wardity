/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT: (id: string) => `/products/${id}`,
  PRODUCTS_SEARCH: "/products/search",
  CATEGORIES: "/categories",
  CATEGORY: (slug: string) => `/categories/${slug}`,
  OCCASIONS: "/occasions",
  OCCASION: (slug: string) => `/occasions/${slug}`,
  CART: "/cart",
  CART_ITEMS: "/cart/items",
} as const;

