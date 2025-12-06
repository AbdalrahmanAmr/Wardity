import { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses = {
  default: "bg-white border border-gray-200",
  bordered: "bg-white border-2 border-gray-300",
  elevated: "bg-white shadow-lg",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card: FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
}) => {
  return (
    <div
      className={`
        rounded-xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardFooter: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

