import { FC } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "@/hooks/useDarkMode";

export const DarkModeToggle: FC = () => {
  const [isDark, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
};

