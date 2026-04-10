import { FC, type ReactElement } from "react";
import { Link } from "react-router-dom";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

const categoryIcons: Record<string, ReactElement> = {
  illustration_bouquet: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      {/* Three stems */}
      <line x1="20" y1="34" x2="20" y2="20" />
      <line x1="14" y1="34" x2="16" y2="22" />
      <line x1="26" y1="34" x2="24" y2="22" />
      {/* Center bloom */}
      <circle cx="20" cy="16" r="4" />
      <ellipse cx="20" cy="10" rx="2.5" ry="4" />
      <ellipse cx="26" cy="13" rx="2.5" ry="4" transform="rotate(60 26 13)" />
      <ellipse cx="14" cy="13" rx="2.5" ry="4" transform="rotate(-60 14 13)" />
      {/* Side blooms */}
      <circle cx="13" cy="19" r="3" />
      <circle cx="27" cy="19" r="3" />
      {/* Wrap tie */}
      <path d="M12 30 Q20 28 28 30" strokeLinecap="round" />
    </svg>
  ),

  illustration_box_roses: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      {/* Box body */}
      <rect x="8" y="20" width="24" height="14" rx="0.5" />
      {/* Lid */}
      <rect x="6" y="15" width="28" height="6" rx="0.5" />
      {/* Ribbon vertical */}
      <line x1="20" y1="15" x2="20" y2="34" />
      {/* Ribbon horizontal on lid */}
      <line x1="6" y1="18" x2="34" y2="18" />
      {/* Bow loops */}
      <path d="M20 15 C16 10 10 10 12 15" strokeLinecap="round" />
      <path d="M20 15 C24 10 30 10 28 15" strokeLinecap="round" />
      {/* Bow knot */}
      <circle cx="20" cy="15" r="1.5" />
    </svg>
  ),

  illustration_vase_flowers: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      {/* Vase body */}
      <path d="M14 34 Q10 28 11 22 L13 16 H27 L29 22 Q30 28 26 34Z" strokeLinejoin="round" />
      {/* Vase neck/rim */}
      <line x1="13" y1="16" x2="27" y2="16" />
      {/* Left stem */}
      <path d="M17 16 C16 12 14 10 13 6" strokeLinecap="round" />
      {/* Right stem */}
      <path d="M23 16 C24 12 26 10 27 6" strokeLinecap="round" />
      {/* Left bloom */}
      <circle cx="13" cy="5" r="3" />
      {/* Right bloom */}
      <circle cx="27" cy="5" r="3" />
      {/* Leaf on left stem */}
      <path d="M15 12 C12 11 11 8 14 9" strokeLinecap="round" />
    </svg>
  ),

  illustration_potted_plant: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      {/* Pot body */}
      <path d="M13 26 L11 34 H29 L27 26Z" strokeLinejoin="round" />
      {/* Pot rim */}
      <rect x="11" y="22" width="18" height="4" rx="0.5" />
      {/* Central stem */}
      <line x1="20" y1="22" x2="20" y2="14" />
      {/* Left leaf */}
      <path d="M20 18 C16 16 12 11 15 8 C17 12 20 14 20 18Z" />
      {/* Right leaf */}
      <path d="M20 15 C24 13 28 8 25 6 C23 10 20 12 20 15Z" />
      {/* Small center leaf */}
      <path d="M20 14 C20 10 22 7 20 5 C18 7 20 10 20 14Z" />
    </svg>
  ),

  illustration_ring_box: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      {/* Box base */}
      <rect x="10" y="22" width="20" height="12" rx="1" />
      {/* Lid (open at angle) */}
      <path d="M10 22 Q10 12 20 10 Q30 12 30 22" />
      {/* Ring inside */}
      <circle cx="20" cy="29" r="4" />
      {/* Gem on ring */}
      <path d="M18 26 L20 23 L22 26 L20 28Z" />
    </svg>
  ),

  illustration_cake: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      {/* Cake base tier */}
      <rect x="8" y="26" width="24" height="8" rx="0.5" />
      {/* Top tier */}
      <rect x="13" y="18" width="14" height="8" rx="0.5" />
      {/* Candles */}
      <line x1="17" y1="18" x2="17" y2="14" />
      <line x1="20" y1="18" x2="20" y2="12" />
      <line x1="23" y1="18" x2="23" y2="14" />
      {/* Flames */}
      <path d="M17 14 C16 12 18 11 17 9 C18 11 19 12 17 14Z" />
      <path d="M20 12 C19 10 21 9 20 7 C21 9 22 10 20 12Z" />
      <path d="M23 14 C22 12 24 11 23 9 C24 11 25 12 23 14Z" />
      {/* Frosting drip */}
      <path d="M13 18 Q15 16 17 18 Q19 16 21 18 Q23 16 27 18" strokeLinecap="round" />
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
  const slug = category.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link to={`/categories/${slug}`} className="group block">
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
