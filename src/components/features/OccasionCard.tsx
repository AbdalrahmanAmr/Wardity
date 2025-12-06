import { FC } from "react";
import { Link } from "react-router-dom";
import type { Occasion } from "@/types";

interface OccasionCardProps {
  occasion: Occasion;
}

// Emoji mapping for occasion types
const occasionEmojis: Record<string, string> = {
  "3D_snowman_tree": "🎄",
  "3D_cake_candles": "🎂",
  "3D_balloons": "🎈",
  "3D_rings": "💍",
  "3D_sign": "🙏",
  "3D_cap": "🎓",
  "3D_clouds": "👶",
};

export const OccasionCard: FC<OccasionCardProps> = ({ occasion }) => {
  const emoji = occasionEmojis[occasion.imageType] || "🎁";

  return (
    <Link
      to={`/occasions/${occasion.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group flex flex-col items-center gap-3 p-4"
    >
      {/* Icon Circle */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center shadow-sm dark:shadow-gray-900/50 group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
        <span className="text-3xl md:text-4xl">{emoji}</span>
      </div>

      {/* Label */}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors text-center">
        {occasion.name}
      </span>
    </Link>
  );
};

