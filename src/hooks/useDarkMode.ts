import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

type Theme = "light" | "dark";

/**
 * Custom hook to manage dark mode state
 * Persists theme preference in localStorage and applies it to the document
 * @returns Tuple of [isDark, toggleTheme, setTheme]
 */
export function useDarkMode(): [boolean, () => void, (theme: Theme) => void] {
  const [theme, setTheme] = useLocalStorage<Theme>("wardity-theme", "light");
  const isDark = theme === "dark";

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  // Toggle between light and dark
  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Set specific theme
  const setThemeValue = (newTheme: Theme): void => {
    setTheme(newTheme);
  };

  return [isDark, toggleTheme, setThemeValue];
}

