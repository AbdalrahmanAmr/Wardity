import { FC, type ReactElement } from "react";
import { Link } from "react-router-dom";
import type { Occasion } from "@/types";

interface OccasionCardProps {
  occasion: Occasion;
}

const occasionIcons: Record<string, ReactElement> = {
  "3D_snowman_tree": (
    // Pine tree — triangle silhouette + trunk
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3 L19 15 H5Z" />
      <path d="M12 9 L17 18 H7Z" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="10" y1="21" x2="14" y2="21" />
    </svg>
  ),

  "3D_cake_candles": (
    // Two-tier cake + single candle + flame
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="15" width="16" height="6" />
      <rect x="7" y="10" width="10" height="5" />
      <line x1="12" y1="10" x2="12" y2="7" />
      <path d="M12 7 C11 5.5 13 5 12 3.5 C13 5 14 5.5 12 7Z" />
      <path d="M7 10 Q9 8.5 11 10 Q13 8.5 15 10 Q17 8.5 17 10" />
    </svg>
  ),

  "3D_balloons": (
    // Two oval balloons with strings
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="9" cy="9" rx="4.5" ry="6" />
      <path d="M9 15 Q8 17 9 18" />
      <path d="M9 18 Q12 20 13 22" />
      <ellipse cx="16" cy="8" rx="4" ry="5.5" />
      <path d="M16 13.5 Q15 15.5 16 16.5" />
      <path d="M16 16.5 Q14 19 13 22" />
    </svg>
  ),

  "3D_rings": (
    // Two overlapping rings
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5" cy="12" r="5.5" />
      <circle cx="14.5" cy="12" r="5.5" />
    </svg>
  ),

  "3D_sign": (
    // Simple heart outline
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20 C12 20 3 14 3 8 A4 4 0 0 1 10 6 L12 9 L14 6 A4 4 0 0 1 21 8 C21 14 12 20 12 20Z" />
    </svg>
  ),

  "3D_cap": (
    // Graduation cap — flat square top + tassel
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,4 22,9 12,14 2,9" />
      <path d="M7 11.5 V17 Q12 20 17 17 V11.5" />
      <line x1="22" y1="9" x2="22" y2="15" />
      <line x1="22" y1="15" x2="20" y2="17" />
    </svg>
  ),

  "3D_clouds": (
    // Cloud + small star — newborn / baby
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 17 A4 4 0 0 1 5 9 A3 3 0 0 1 10 7 A5 5 0 0 1 20 10 A3 3 0 0 1 19 17Z" />
      <path d="M15 5 L15.6 6.8 H17.5 L16 8 L16.6 9.8 L15 8.6 L13.4 9.8 L14 8 L12.5 6.8 H14.4Z" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="13" />
    <path d="M4 11 H20" />
    <path d="M12 4 C10 4 9 6 12 8 C15 6 14 4 12 4Z" />
    <line x1="12" y1="4" x2="12" y2="8" />
  </svg>
);

export const OccasionCard: FC<OccasionCardProps> = ({ occasion }) => {
  const icon = occasionIcons[occasion.imageType] ?? fallbackIcon;
  const slug = occasion.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      to={`/occasions/${slug}`}
      className="group flex flex-col items-center p-2"
    >
      {/* Icon square */}
      <div className="w-14 h-14 border border-gold/25 bg-champagne/50 flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:bg-champagne">
        <div className="w-5 h-5 text-gold/70 group-hover:text-gold transition-colors duration-300">
          {icon}
        </div>
      </div>

      {/* Label */}
      <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-charcoal/50 group-hover:text-charcoal transition-colors duration-300 text-center mt-3">
        {occasion.name}
      </span>
    </Link>
  );
};
