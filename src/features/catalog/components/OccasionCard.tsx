import { FC, type ReactElement } from "react";
import { Link } from "react-router-dom";
import type { Occasion } from "@/shared/types";

interface OccasionCardProps {
  occasion: Occasion;
}

const occasionIcons: Record<string, ReactElement> = {
  birthday: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="15" width="16" height="6" />
      <rect x="7" y="10" width="10" height="5" />
      <line x1="12" y1="10" x2="12" y2="7" />
      <path d="M12 7 C11 5.5 13 5 12 3.5 C13 5 14 5.5 12 7Z" />
      <path d="M7 10 Q9 8.5 11 10 Q13 8.5 15 10 Q17 8.5 17 10" />
    </svg>
  ),

  newborn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="4" />
      <path d="M8 8 Q6 5 8 4" />
      <path d="M16 8 Q18 5 16 4" />
      <path d="M7 14 C7 12 17 12 17 14 L16 21 H8 L7 14Z" />
      <path d="M15 6 L15.4 7.2 H16.6 L15.6 7.8 L16 9 L15 8.2 L14 9 L14.4 7.8 L13.4 7.2 H14.6Z" />
    </svg>
  ),

  love: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20 C12 20 3 14 3 8 A4 4 0 0 1 10 6 L12 9 L14 6 A4 4 0 0 1 21 8 C21 14 12 20 12 20Z" />
    </svg>
  ),

  congrats: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21 L8 10 L14 16Z" />
      <path d="M12 3 L12.9 5.8 H15.9 L13.5 7.5 L14.4 10.3 L12 8.6 L9.6 10.3 L10.5 7.5 L8.1 5.8 H11.1Z" />
      <line x1="18" y1="4" x2="20" y2="2" />
      <line x1="20" y1="6" x2="22" y2="5" />
      <line x1="17" y1="8" x2="19" y2="9" />
    </svg>
  ),

  getwell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="18" height="11" rx="2" />
      <path d="M7 10 V7 A5 5 0 0 1 17 7 V10" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  ),

  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,4 22,9 12,14 2,9" />
      <path d="M7 11.5 V17 Q12 20 17 17 V11.5" />
      <line x1="22" y1="9" x2="22" y2="15" />
      <line x1="22" y1="15" x2="20" y2="17" />
    </svg>
  ),

  anniversary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="9.5" cy="12" r="5.5" />
      <circle cx="14.5" cy="12" r="5.5" />
    </svg>
  ),

  wedding: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="14" width="4" height="8" rx="0.5" />
      <circle cx="12" cy="8" r="5" />
      <path d="M10 8 L12 5 L14 8 L12 10Z" />
      <path d="M7 14 Q12 11 17 14" />
    </svg>
  ),

  housewarming: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12 L12 3 L21 12" />
      <path d="M5 12 V20 H19 V12" />
      <rect x="9" y="14" width="6" height="6" />
      <path d="M14 7 L17 7 L17 10" />
    </svg>
  ),

  thankyou: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21 C12 21 3 15 3 9 A4 4 0 0 1 10 7 L12 10 L14 7 A4 4 0 0 1 21 9 C21 15 12 21 12 21Z" />
      <path d="M9 13 L11 15 L15 11" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <rect x="4" y="8" width="16" height="13" />
    <path d="M4 11 H20" />
    <path d="M12 4 C10 4 9 6 12 8 C15 6 14 4 12 4Z" />
    <line x1="12" y1="4" x2="12" y2="8" />
  </svg>
);

const occasionGradients: Record<string, string> = {
  birthday: "from-pink-100 to-rose-50",
  newborn: "from-sky-100 to-blue-50",
  love: "from-red-100 to-pink-50",
  congrats: "from-amber-100 to-yellow-50",
  getwell: "from-green-100 to-emerald-50",
  graduation: "from-indigo-100 to-purple-50",
  anniversary: "from-violet-100 to-purple-50",
  wedding: "from-rose-100 to-pink-50",
  housewarming: "from-orange-100 to-amber-50",
  thankyou: "from-teal-100 to-cyan-50",
};

export const OccasionCard: FC<OccasionCardProps> = ({ occasion }) => {
  const icon = occasionIcons[occasion.imageType] ?? fallbackIcon;
  const gradient = occasionGradients[occasion.imageType] ?? "from-gray-100 to-gray-50";

  return (
    <Link
      to={`/occasions/${occasion.slug}`}
      className="group flex flex-col items-center"
    >
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${gradient} border border-gold/20 flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:shadow-lg group-hover:scale-105`}>
        <div className="w-8 h-8 md:w-10 md:h-10 text-gold/70 group-hover:text-gold transition-colors duration-300">
          {icon}
        </div>
      </div>
      <span className="text-[11px] md:text-xs tracking-[0.1em] uppercase font-sans text-charcoal/60 group-hover:text-charcoal transition-colors duration-300 text-center mt-3 max-w-[96px] leading-tight">
        {occasion.name}
      </span>
    </Link>
  );
};
