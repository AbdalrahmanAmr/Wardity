import { FC, type ReactElement } from "react";
import { Link } from "react-router-dom";
import type { Category } from "@/shared/types";

interface CategoryCardProps {
  category: Category;
}

const categoryIcons: Record<string, ReactElement> = {
  flower: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="34" x2="20" y2="20" />
      <line x1="14" y1="34" x2="16" y2="22" />
      <line x1="26" y1="34" x2="24" y2="22" />
      <circle cx="20" cy="16" r="4" />
      <ellipse cx="20" cy="10" rx="2.5" ry="4" />
      <ellipse cx="26" cy="13" rx="2.5" ry="4" transform="rotate(60 26 13)" />
      <ellipse cx="14" cy="13" rx="2.5" ry="4" transform="rotate(-60 14 13)" />
      <circle cx="13" cy="19" r="3" />
      <circle cx="27" cy="19" r="3" />
      <path d="M12 30 Q20 28 28 30" strokeLinecap="round" />
    </svg>
  ),

  gift: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="24" height="14" rx="0.5" />
      <rect x="6" y="15" width="28" height="6" rx="0.5" />
      <line x1="20" y1="15" x2="20" y2="34" />
      <line x1="6" y1="18" x2="34" y2="18" />
      <path d="M20 15 C16 10 10 10 12 15" strokeLinecap="round" />
      <path d="M20 15 C24 10 30 10 28 15" strokeLinecap="round" />
      <circle cx="20" cy="15" r="1.5" />
    </svg>
  ),

  cake: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="26" width="24" height="8" rx="0.5" />
      <rect x="13" y="18" width="14" height="8" rx="0.5" />
      <line x1="17" y1="18" x2="17" y2="14" />
      <line x1="20" y1="18" x2="20" y2="12" />
      <line x1="23" y1="18" x2="23" y2="14" />
      <path d="M17 14 C16 12 18 11 17 9 C18 11 19 12 17 14Z" />
      <path d="M20 12 C19 10 21 9 20 7 C21 9 22 10 20 12Z" />
      <path d="M23 14 C22 12 24 11 23 9 C24 11 25 12 23 14Z" />
      <path d="M13 18 Q15 16 17 18 Q19 16 21 18 Q23 16 27 18" strokeLinecap="round" />
    </svg>
  ),

  chocolate: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="24" height="18" rx="2" />
      <line x1="8" y1="18" x2="32" y2="18" />
      <line x1="16" y1="18" x2="16" y2="30" />
      <line x1="24" y1="18" x2="24" y2="30" />
      <line x1="8" y1="24" x2="32" y2="24" />
      <path d="M14 12 C14 8 20 8 20 12" strokeLinecap="round" />
      <path d="M20 12 C20 8 26 8 26 12" strokeLinecap="round" />
    </svg>
  ),

  "hand-bouquet": (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 22 L14 34" strokeLinecap="round" />
      <path d="M20 22 L20 34" strokeLinecap="round" />
      <path d="M24 22 L26 34" strokeLinecap="round" />
      <path d="M12 23 Q20 20 28 23" strokeLinecap="round" />
      <ellipse cx="20" cy="13" rx="3" ry="4" />
      <ellipse cx="14" cy="15" rx="3" ry="3.5" />
      <ellipse cx="26" cy="15" rx="3" ry="3.5" />
      <ellipse cx="17" cy="10" rx="2.5" ry="3.5" transform="rotate(-15 17 10)" />
      <ellipse cx="23" cy="10" rx="2.5" ry="3.5" transform="rotate(15 23 10)" />
    </svg>
  ),

  "flower-box": (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="22" width="24" height="12" rx="1" />
      <line x1="8" y1="26" x2="32" y2="26" />
      <circle cx="14" cy="16" r="4" />
      <circle cx="20" cy="14" r="4" />
      <circle cx="26" cy="16" r="4" />
      <circle cx="17" cy="12" r="2.5" />
      <circle cx="23" cy="12" r="2.5" />
    </svg>
  ),

  vase: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 16 L12 34 H28 L26 16" strokeLinejoin="round" />
      <path d="M14 16 Q14 14 16 14 H24 Q26 14 26 16" />
      <line x1="20" y1="14" x2="20" y2="8" />
      <path d="M20 10 C16 8 14 5 16 4 C18 6 20 8 20 10Z" />
      <path d="M20 8 C24 6 26 3 24 2 C22 4 20 6 20 8Z" />
      <line x1="16" y1="22" x2="24" y2="22" opacity="0.4" />
    </svg>
  ),

  perfume: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="16" width="12" height="18" rx="1" />
      <rect x="16" y="12" width="8" height="4" rx="0.5" />
      <line x1="20" y1="12" x2="20" y2="8" />
      <circle cx="20" cy="7" r="2" />
    </svg>
  ),

  plant: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 26 L11 34 H29 L27 26Z" strokeLinejoin="round" />
      <rect x="11" y="22" width="18" height="4" rx="0.5" />
      <line x1="20" y1="22" x2="20" y2="14" />
      <path d="M20 18 C16 16 12 11 15 8 C17 12 20 14 20 18Z" />
      <path d="M20 15 C24 13 28 8 25 6 C23 10 20 12 20 15Z" />
      <path d="M20 14 C20 10 22 7 20 5 C18 7 20 10 20 14Z" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="12" />
    <circle cx="20" cy="20" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="20" y1="26" x2="20" y2="32" />
    <line x1="8" y1="20" x2="14" y2="20" />
    <line x1="26" y1="20" x2="32" y2="20" />
  </svg>
);

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  const icon = categoryIcons[category.imageType] ?? fallbackIcon;

  return (
    <Link to={`/categories/${category.slug}`} className="group block">
      <div className="relative aspect-[3/4] flex flex-col items-center justify-center bg-cream border border-gold/20 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_8px_32px_rgba(201,169,110,0.12)] overflow-hidden">

        {/* SVG icon */}
        <div className="w-10 h-10 text-gold group-hover:text-primary transition-colors duration-300">
          {icon}
        </div>

        {/* Decorative rule */}
        <div className="w-6 h-px bg-gold/50 mx-auto mt-6 mb-3" />

        {/* Category name */}
        <span className="font-heading font-light text-base tracking-widest text-charcoal group-hover:text-primary transition-colors duration-300 text-center px-4">
          {category.name}
        </span>
      </div>
    </Link>
  );
};
