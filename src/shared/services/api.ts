import type { ApiError, ApiResponse } from "@/shared/types";
import { env } from "@/shared/config";
import { STORAGE_KEYS } from "@/shared/constants/storage";

const BASE_URL = env.apiUrl;

/**
 * Get stored authentication token
 */
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as string;
  } catch {
    return raw;
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        code: response.status,
        message: errorData.message || `Request failed with status ${response.status}`,
        details: errorData.errors,
      } as ApiError;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw {
        code: 0,
        message: "Network error. Please check your connection.",
      } as ApiError;
    }
    throw error;
  }
}

/**
 * API methods
 */
export const api = {
  get: <T>(url: string): Promise<T> => fetchWithErrorHandling<T>(url),

  post: <T, D = unknown>(url: string, data: D): Promise<T> =>
    fetchWithErrorHandling<T>(url, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T, D = unknown>(url: string, data: D): Promise<T> =>
    fetchWithErrorHandling<T>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T, D = unknown>(url: string, data: D): Promise<T> =>
    fetchWithErrorHandling<T>(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(url: string): Promise<T> =>
    fetchWithErrorHandling<T>(url, {
      method: "DELETE",
    }),
};

/**
 * Helper to create typed API response
 */
export function createApiResponse<T>(data: T, message = "Success"): ApiResponse<T> {
  return {
    data,
    message,
    status: 200,
  };
}

