import { FC } from "react";

interface SectionHeaderProps {
  /** Small uppercase eyebrow text rendered above the title */
  label?: string;
  /** Main heading — rendered in Cormorant Garamond at light weight */
  title: string;
  /** Optional supporting copy below the title */
  subtitle?: string;
  /** Horizontal alignment — centered puts rule between label and title; left puts rule below title */
  align?: "left" | "center";
  /** White text mode for dark or coloured section backgrounds */
  inverted?: boolean;
  className?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = "left",
  inverted = false,
  className = "",
}) => {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {label && (
        <p
          className={`text-[10px] tracking-widest uppercase font-sans mb-3 ${
            inverted ? "text-white/60" : "text-gold"
          }`}
        >
          {label}
        </p>
      )}

      {/* Centered: rule sits between label and title */}
      {centered && (
        <div
          className={`w-16 h-px mx-auto mb-4 ${
            inverted ? "bg-white/40" : "bg-gold"
          }`}
        />
      )}

      <h2
        className={`font-heading font-light text-2xl md:text-3xl leading-tight tracking-wide ${
          inverted ? "text-white" : "text-gold"
        }`}
      >
        {title}
      </h2>

      {/* Left-aligned: rule sits below the title */}
      {!centered && (
        <div
          className={`w-16 h-px mt-3 ${
            inverted ? "bg-white/40" : "bg-gold"
          }`}
        />
      )}

      {subtitle && (
        <p
          className={`mt-2 text-sm md:text-base font-light leading-relaxed ${
            inverted ? "text-white/75" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
