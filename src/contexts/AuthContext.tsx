import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/constants/storage";
import { api } from "@/services/api";
import type { ApiResponse } from "@/types";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [storedUser, setStoredUser] = useLocalStorage<User | null>(
    STORAGE_KEYS.USER,
    null,
  );
  const [storedToken, setStoredToken] = useLocalStorage<string | null>(
    STORAGE_KEYS.TOKEN,
    null,
  );
  const [user, setUser] = useState<User | null>(storedUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async (): Promise<void> => {
      if (storedToken && storedUser) {
        try {
          const response = await api.get<ApiResponse<User>>("/auth/me");
          if (!cancelled) {
            setUser(response.data);
            setStoredUser(response.data);
          }
        } catch (error) {
          if (cancelled) return;
          // Only clear auth on a real rejection (401/403).
          // Network errors keep the stored user for offline / UI testing.
          const isAuthError =
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            ((error as { code: number }).code === 401 ||
              (error as { code: number }).code === 403);

          if (isAuthError) {
            setStoredToken(null);
            setStoredUser(null);
            setUser(null);
          } else {
            setUser(storedUser);
          }
        }
      }
      if (!cancelled) setIsLoading(false);
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await api.post<
          ApiResponse<{ user: User; token: string }>,
          { email: string; password: string }
        >("/auth/login", { email, password });

        const { user: userData, token } = response.data;

        setUser(userData);
        setStoredUser(userData);
        setStoredToken(token);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setStoredUser, setStoredToken],
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true);
      try {
        const response = await api.post<
          ApiResponse<{ user: User; token: string }>,
          { email: string; password: string; name: string }
        >("/auth/register", { email, password, name });

        const { user: userData, token } = response.data;

        setUser(userData);
        setStoredUser(userData);
        setStoredToken(token);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setStoredUser, setStoredToken],
  );

  const logout = useCallback(() => {
    setUser(null);
    setStoredUser(null);
    setStoredToken(null);
  }, [setStoredUser, setStoredToken]);

  const updateUser = useCallback(
    async (userData: Partial<User>) => {
      if (user) {
        try {
          const response = await api.patch<ApiResponse<User>, Partial<User>>(
            "/auth/profile",
            userData,
          );
          const updatedUser = response.data;
          setUser(updatedUser);
          setStoredUser(updatedUser);
        } catch (error) {
          // If API call fails, still update locally as fallback
          const updatedUser = { ...user, ...userData };
          setUser(updatedUser);
          setStoredUser(updatedUser);
          throw error;
        }
      }
    },
    [user, setStoredUser],
  );

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
