// Theme Provider - Preact component for theme context
import type { ComponentChild } from "preact";
import { useTheme } from "./useTheme.ts";

export interface ThemeProviderProps {
  children: ComponentChild;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDark } = useTheme();

  // Initialize theme on mount - ensure dark is default
  if (typeof globalThis.window !== "undefined") {
    // Set dark class immediately (default for Axis Visual Canon)
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return <>{children}</>;
}
