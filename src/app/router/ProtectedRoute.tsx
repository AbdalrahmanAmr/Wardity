import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { PageLoadingSpinner } from "@/shared/components/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoadingSpinner />;
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};
