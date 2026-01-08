---
name: Reusable UI Component Foundation with Tailwind CSS v4 (Fresh 2.0 Official)
overview: ""
todos: []
---

# Reusable UI Component Foundation with Tailwind CSS v4 (Fresh 2.0 Official)

## Official Fresh 2.0 + Tailwind CSS v4 Setup

**Following:**

[Fresh Official Documentation](https://fresh.deno.dev/docs/advanced/builder#tailwindcss)

**Key Points:**

- Use `@fresh/plugin-tailwind` (official Fresh plugin for Tailwind v4)
- CSS-first configuration with `@import "tailwindcss"` and `@theme` directive
- Configure in `dev.ts` (not `fresh.config.ts` for Fresh 2.0)
- Prefer Deno's built-in ecosystem (JSR/@std/*) over npm packages

## Current Status Assessment

**Fresh 2.0 Status:**

- Using `jsr:@fresh/core@^2.0.0` (JSR registry - 100% Deno compatible)
- Preact 10.28.2 configured with JSX precompile
- **Current issue:** Codebase still references deprecated Twind - needs

migration to Tailwind CSS v4

**Existing Components:**

- `shared/ui/Button.tsx` - Basic implementation with hardcoded colors
- `shared/ui/Card.tsx` - Basic implementation with hardcoded colors
- `shared/ui/Input.tsx` - Basic implementation with hardcoded colors

## Implementation Plan

### Phase 1: Install and Configure Tailwind CSS v4 (Fresh 2.0 Official)

**Files to Update:**

- `main-app/deno.json` - Add `nodeModulesDir: "manual"` and Tailwind plugin
- `main-app/dev.ts` - Add Tailwind plugin configuration
- Remove `main-app/fresh.config.ts` (if exists, Fresh 2.0 uses `dev.ts`)
- Remove `main-app/twind.config.ts` (deprecated)
- Create `main-app/static/styles.css` - Tailwind CSS v4 import

**Official Fresh 2.0 Setup:**

```json
// main-app/deno.json
{
  "name": "@axis/main-app",
  "nodeModulesDir": "manual", // Required for Tailwind plugin
  "imports": {
    "@fresh/plugin-tailwind": "jsr:@fresh/plugin-tailwind@^1.0.0"
  }
}
```

```typescript
// main-app/dev.ts
import { Builder } from "fresh/dev";
import { tailwind } from "@fresh/plugin-tailwind";

const builder = new Builder({ root: import.meta.dirname });
tailwind(builder); // Add Tailwind plugin

if (Deno.args.includes("build")) {
  await builder.build();
} else {
  await builder.listen(() => import("./main.ts"));
}
```

```css
/* main-app/static/styles.css - Tailwind CSS v4 */
@import "tailwindcss";
```

**Import CSS in `routes/_app.tsx`:**

```typescript
// main-app/routes/_app.tsx
import { define } from "@/utils.ts";
import "../static/styles.css"; // Import Tailwind CSS

export default define.page(({ Component }) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Axis eBoard - Governance System</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
```

### Phase 2: Create Theme System Using Tailwind CSS v4 CSS-First Configuration

**New Files to Create:**

- `main-app/static/styles.css` - Enhanced with `@theme` directive
- `shared/ui/theme.ts` - TypeScript theme token types (for type safety in

components)

**Tailwind CSS v4 Theme Configuration (CSS-First):**

```css
/* main-app/static/styles.css */
@import "tailwindcss";

@theme {
  /* Semantic Color Tokens - Light Mode */
  --color-primary: #2196f3;
  --color-primary-hover: #1976d2;
  --color-primary-light: #64b5f6;
  --color-on-primary: #ffffff;

  --color-secondary: #4caf50;
  --color-secondary-hover: #388e3c;
  --color-on-secondary: #ffffff;

  --color-success: #4caf50;
  --color-success-hover: #388e3c;
  --color-error: #f44336;
  --color-error-hover: #d32f2f;
  --color-warning: #ff9800;
  --color-warning-hover: #f57c00;
  --color-info: #2196f3;
  --color-info-hover: #1976d2;

  /* Surface Colors */
  --color-surface: #ffffff;
  --color-surface-variant: #f5f5f5;
  --color-on-surface: #212121;
  --color-on-surface-variant: #757575;

  /* Border Colors */
  --color-border: #e0e0e0;
  --color-border-focus: #2196f3;
  --color-border-error: #f44336;

  /* Dark Mode Colors */
  --color-primary-dark: #64b5f6;
  --color-primary-hover-dark: #42a5f5;
  --color-on-primary-dark: #000000;

  --color-surface-dark: #121212;
  --color-surface-variant-dark: #1e1e1e;
  --color-on-surface-dark: #ffffff;
  --color-on-surface-variant-dark: #b0b0b0;

  --color-border-dark: #333333;
  --color-border-focus-dark: #64b5f6;

  /* Typography Scale */
  --font-family-sans:
    system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-family-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;

  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing Scale */
  --spacing-0: 0;
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-8: 2rem; /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem; /* 48px */
  --spacing-16: 4rem; /* 64px */

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem; /* 2px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem; /* 8px */
  --radius-xl: 0.75rem; /* 12px */
  --radius-2xl: 1rem; /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Class-based Dark Mode */
.dark {
  --color-primary: var(--color-primary-dark);
  --color-primary-hover: var(--color-primary-hover-dark);
  --color-on-primary: var(--color-on-primary-dark);

  --color-surface: var(--color-surface-dark);
  --color-surface-variant: var(--color-surface-variant-dark);
  --color-on-surface: var(--color-on-surface-dark);
  --color-on-surface-variant: var(--color-on-surface-variant-dark);

  --color-border: var(--color-border-dark);
  --color-border-focus: var(--color-border-focus-dark);
}
```

**TypeScript Theme Tokens (for component type safety):**

```typescript
// shared/ui/theme.ts
export const themeTokens = {
  colors: {
    primary: "var(--color-primary)",
    "primary-hover": "var(--color-primary-hover)",
    "on-primary": "var(--color-on-primary)",
    secondary: "var(--color-secondary)",
    "secondary-hover": "var(--color-secondary-hover)",
    "on-secondary": "var(--color-on-secondary)",
    success: "var(--color-success)",
    error: "var(--color-error)",
    warning: "var(--color-warning)",
    info: "var(--color-info)",
    surface: "var(--color-surface)",
    "surface-variant": "var(--color-surface-variant)",
    "on-surface": "var(--color-on-surface)",
    border: "var(--color-border)",
    "border-focus": "var(--color-border-focus)",
    "border-error": "var(--color-border-error)",
  },
  typography: {
    fontFamily: {
      sans: "var(--font-family-sans)",
      mono: "var(--font-family-mono)",
    },
    fontSize: {
      xs: "var(--font-size-xs)",
      sm: "var(--font-size-sm)",
      base: "var(--font-size-base)",
      lg: "var(--font-size-lg)",
      xl: "var(--font-size-xl)",
      "2xl": "var(--font-size-2xl)",
      "3xl": "var(--font-size-3xl)",
      "4xl": "var(--font-size-4xl)",
    },
    fontWeight: {
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
      bold: "var(--font-weight-bold)",
    },
  },
} as const;
```

### Phase 3: Create Theme Provider/Context (Using Preact Signals)

**New Files to Create:**

- `shared/ui/ThemeProvider.tsx` - Preact component for theme context
- `shared/ui/useTheme.ts` - Hook for accessing theme in components

**Using Deno's Built-in Capabilities:**

- Preact Signals (already installed via Fresh)
- localStorage (Web API, built into Deno)
- No npm dependencies needed

```typescript
// shared/ui/useTheme.ts
import { computed, signal } from "@preact/signals";

const isDarkMode = signal<boolean>(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
});

export function useTheme() {
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDarkMode.value);
    }
  };

  const setTheme = (dark: boolean) => {
    isDarkMode.value = dark;
    if (typeof window !== "undefined") {
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
```

```typescript
// shared/ui/ThemeProvider.tsx
import type { ComponentChild } from "preact";
import { useTheme } from "./useTheme.ts";

export interface ThemeProviderProps {
  children: ComponentChild;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDark } = useTheme();

  // Initialize theme on mount
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", isDark.value);
  }

  return <>{children}</>;
}
```

### Phase 4: Enhance Components with Semantic Tailwind v4 Classes

**Files to Update:**

- `shared/ui/Button.tsx` - Use semantic classes from `@theme` variables
- `shared/ui/Card.tsx` - Use semantic tokens
- `shared/ui/Input.tsx` - Use semantic tokens

**Component Example (Following DRY Pattern from PRD):**

```typescript
// shared/ui/Button.tsx - Using Tailwind v4 semantic tokens
import type { ComponentChild } from "preact";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ComponentChild;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  type = "button",
  class: className,
}: ButtonProps): ComponentChild {
  const base = "font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  // Using semantic tokens from @theme directive
  const variants = {
    primary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] shadow-lg",
    secondary: "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-on-secondary)] shadow-lg",
    danger: "bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] text-white shadow-lg",
    success: "bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-white shadow-lg",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
```
