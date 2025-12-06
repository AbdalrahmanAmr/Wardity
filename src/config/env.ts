/**
 * Environment configuration
 * Validates and exports environment variables with type safety
 */

interface EnvConfig {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

function getEnvConfig(): EnvConfig {
  const apiUrl = import.meta.env.VITE_API_URL || "/api";
  const mode = import.meta.env.MODE;

  return {
    apiUrl,
    isDevelopment: mode === "development",
    isProduction: mode === "production",
  };
}

export const env = getEnvConfig();

