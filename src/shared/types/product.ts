/**
 * Product-related types
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  badge?: string | null;
  image: string;
  imageDesc?: string;
  brandLogo?: string | null;
  status?: "In stock" | "Out of stock";
  sku?: string;
}

export interface ProductDetail extends Product {
  gallery: {
    mainImage: string;
    thumbnails: string[];
  };
  description?: string;
  sizes?: ProductSize[];
  fintechProviders?: FintechProvider[];
}

export interface ProductSize {
  name: string;
  price: number;
  selected?: boolean;
}

export interface FintechProvider {
  name: string;
  icon?: string;
  offer?: {
    text: string;
    subtext: string;
    promoBadge?: string;
  };
}

export interface Bundle {
  id: string;
  mainProductPrice: number;
  addonProduct: {
    name: string;
    price: number;
    image: string;
  };
  totalBundlePrice: number;
}

