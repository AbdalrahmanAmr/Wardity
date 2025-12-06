# 📁 Enhanced Project Structure

This document outlines the enhanced project structure with all improvements.

## 🎯 Structure Overview

```
src/
├── assets/                    # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── components/                # React components
│   ├── features/              # Feature-specific components
│   │   ├── CategoryCard.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── OccasionCard.tsx
│   │   ├── ProductCard.tsx
│   │   └── index.ts
│   │
│   ├── layout/                # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   │
│   └── ui/                     # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ErrorBlock.tsx
│       ├── ErrorBoundary.tsx   # ✨ NEW: Error boundary
│       ├── Header.tsx
│       ├── Input.tsx
│       ├── LoadingSpinner.tsx
│       └── index.ts
│
├── config/                     # ✨ NEW: Configuration files
│   ├── env.ts                  # Environment variable validation
│   └── index.ts
│
├── constants/                  # ✨ NEW: Centralized constants
│   ├── routes.ts               # Route definitions with helpers
│   ├── api.ts                  # API endpoint constants
│   ├── storage.ts              # LocalStorage keys
│   ├── pagination.ts           # Pagination defaults
│   └── index.ts
│
├── hooks/                      # Custom React hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── index.ts
│
├── layouts/                    # Layout components
│   └── RootLayout.tsx
│
├── pages/                      # Route pages
│   ├── Home.tsx
│   ├── Product.tsx
│   ├── NotFound.tsx
│   └── index.ts
│
├── router/                     # Router configuration
│   ├── index.tsx               # Router setup
│   └── loaders.ts              # ✨ NEW: Route loaders
│
├── services/                   # API & data services
│   ├── api.ts                  # API client
│   ├── queryClient.ts          # React Query configuration
│   └── queries/                # ✨ NEW: Organized query hooks
│       ├── productQueries.ts   # Product-related queries
│       ├── categoryQueries.ts  # Category-related queries
│       └── index.ts
│
├── types/                      # ✨ ENHANCED: Organized by domain
│   ├── api.ts                  # API types
│   ├── product.ts              # Product types
│   ├── category.ts             # Category types
│   ├── cart.ts                 # Cart types
│   ├── common.ts               # Common types
│   └── index.ts                # Central exports
│
├── utils/                      # Utility functions
│   ├── constants.ts            # (deprecated - use constants/)
│   ├── formatters.ts
│   └── index.ts
│
├── main.tsx                    # Entry point (with ErrorBoundary)
└── index.css                   # Global styles
```

## ✨ Key Enhancements

### 1. **Organized Query Hooks** (`services/queries/`)
- Separated by feature domain
- Query keys factory pattern
- Consistent structure across all queries
- Supports infinite queries for pagination

### 2. **Route Loaders** (`router/loaders.ts`)
- Prefetch data before components mount
- Better perceived performance
- Type-safe loader functions

### 3. **Type Organization** (`types/`)
- Split by domain (api, product, category, cart, common)
- Better maintainability
- Easier to find and update types

### 4. **Constants Management** (`constants/`)
- Centralized route definitions
- API endpoint constants
- Storage keys
- Pagination defaults
- Helper functions for dynamic routes

### 5. **Configuration** (`config/`)
- Type-safe environment variables
- Centralized configuration
- Easy to extend

### 6. **Error Boundary** (`components/ui/ErrorBoundary.tsx`)
- Catches React errors gracefully
- User-friendly error messages
- Retry functionality

## 📝 Usage Examples

### Using Query Hooks

```typescript
import { useProduct, useProducts } from "@/services/queries";

// In component
const { data, isLoading, error } = useProduct(productId);
const { data: products } = useProducts({ category: "electronics" });
```

### Using Route Loaders

```typescript
// In router/index.tsx
{
  path: "product/:id",
  element: <Product />,
  loader: productLoader, // Prefetches data
}
```

### Using Constants

```typescript
import { ROUTES, API_ENDPOINTS } from "@/constants";

// Navigate
navigate(ROUTES.PRODUCT_BY_ID("123"));

// API call
api.get(API_ENDPOINTS.PRODUCT("123"));
```

### Using Environment Config

```typescript
import { env } from "@/config";

const apiUrl = env.apiUrl;
const isDev = env.isDevelopment;
```

## 🔄 Migration Notes

### Old Constants → New Constants

**Before:**
```typescript
import { ROUTES, API, STORAGE_KEYS } from "@/utils/constants";
```

**After:**
```typescript
import { ROUTES, API_ENDPOINTS, STORAGE_KEYS } from "@/constants";
```

### Old Types → New Types

**Before:**
```typescript
import type { Product, ApiError } from "@/types";
```

**After:**
```typescript
// Still works! Central export maintained
import type { Product, ApiError } from "@/types";

// Or import from specific files
import type { Product } from "@/types/product";
import type { ApiError } from "@/types/api";
```

## 🎯 Best Practices

1. **Query Hooks**: Always use hooks from `services/queries/` instead of inline `useQuery`
2. **Constants**: Use constants from `constants/` instead of hardcoded strings
3. **Types**: Import from `types/index.ts` for convenience, or specific files for clarity
4. **Loaders**: Add loaders for routes that need data prefetching
5. **Error Handling**: Wrap app in ErrorBoundary (already done in `main.tsx`)

## 📚 Next Steps

Consider adding:
- `src/contexts/` - For React contexts if needed
- `src/lib/` - Third-party library configurations
- `src/store/` - If global state management needed (beyond React Query)
- `src/tests/` - Test files
- `src/mocks/` - Mock data for development

