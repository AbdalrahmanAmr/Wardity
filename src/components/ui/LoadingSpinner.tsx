import { FC } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-3",
  lg: "w-12 h-12 border-4",
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export const PageLoadingSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

