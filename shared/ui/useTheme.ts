// Theme Hook - Using Preact Signals (Deno-native, no npm dependencies)
import { computed, signal } from "@preact/signals";

// Initialize theme from localStorage or default to dark (Axis Visual Canon default)
function getInitialTheme(): boolean {
  if (typeof globalThis.window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    // Default to dark mode (Obsidian surface) for Axis Visual Canon
    return true;
  }
  return true; // Default to dark mode
}

const isDarkMode = signal<boolean>(getInitialTheme());

export function useTheme() {
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    if (typeof globalThis.window !== "undefined") {
      localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDarkMode.value);
    }
  };

  const setTheme = (dark: boolean) => {
    isDarkMode.value = dark;
    if (typeof globalThis.window !== "undefined") {
      localStorage.setItem("theme", dark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", dark);
    }
  };

  return {
    isDark: computed(() => isDarkMode.value),
    toggleTheme,
    setTheme,
  };
}
