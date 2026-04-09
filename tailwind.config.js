/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        heading: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["Jost", "DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        // Wardity Rose Theme
        primary: {
          DEFAULT: "#D02046",
          50: "#FFF0F3",
          100: "#FFE0E6",
          200: "#F8C3CD",
          300: "#F499AB",
          400: "#E85A78",
          500: "#D02046",
          600: "#A61435",
          700: "#8A1029",
          800: "#6E0D21",
          900: "#520A19",
        },
        rose: {
          light: "#FFF0F3",
          pale: "#F8C3CD",
          DEFAULT: "#D02046",
          dark: "#A61435",
        },
        // Luxury accent palette
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E8D5B0",
          dark: "#A07C42",
        },
        champagne: "#F5ECD7",
        charcoal: "#1C1C1E",
        cream: "#FAF7F2",
        success: "#28a745",
        wardity: {
          bg: "#FAF7F2",
          card: "#FFFFFF",
          text: "#333333",
          accent: "#D02046",
          gold: "#C9A96E",
          // Dark mode colors
          "bg-dark": "#1a1a1a",
          "card-dark": "#2d2d2d",
          "text-dark": "#e5e5e5",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "slide-left": "slideLeft 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        wardity: {
          primary: "#D02046",
          "primary-content": "#ffffff",
          secondary: "#F8C3CD",
          "secondary-content": "#333333",
          accent: "#D02046",
          neutral: "#333333",
          "base-100": "#FFFFFF",
          "base-200": "#FAF7F2",
          "base-300": "#F5ECD7",
          info: "#3b82f6",
          success: "#28a745",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      "light",
    ],
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
  },
};
