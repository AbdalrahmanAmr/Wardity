/**
 * Category and occasion types
 */
export interface Category {
  name: string;
  slug: string;
  imageType: string;
  bgColor?: string;
}

export interface Occasion {
  name: string;
  slug: string;
  imageType: string;
}
