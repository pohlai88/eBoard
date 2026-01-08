# Complete Tailwind CSS v4 Configuration for Deno & Fresh

**Version:** Tailwind CSS v4.0.0\
**Framework:** Fresh 2.0\
**Runtime:** Deno 2.x\
**Last Updated:** January 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration Files](#configuration-files)
4. [CSS-First Setup](#css-first-setup)
5. [Theme Configuration](#theme-configuration)
6. [Integration with Fresh](#integration-with-fresh)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Migration from Twind](#migration-from-twind)

---

## Overview

Tailwind CSS v4 introduces a **CSS-first configuration** approach that eliminates the need for
JavaScript config files. This is perfect for Deno & Fresh projects because:

- ✅ **No build step required** - CSS is processed at runtime
- ✅ **Zero JavaScript config** - Everything is in CSS using `@theme`
- ✅ **Native Deno support** - Works with Fresh's official plugin
- ✅ **Type-safe** - CSS variables are available in TypeScript
- ✅ **Smaller bundle** - Only includes used styles

### Key Differences from v3

| Feature       | Tailwind v3            | Tailwind v4             |
| ------------- | ---------------------- | ----------------------- |
| Config File   | `tailwind.config.js`   | `@theme` in CSS         |
| Import        | `@tailwind` directives | `@import "tailwindcss"` |
| Customization | JavaScript object      | CSS custom properties   |
| Build Step    | Required (PostCSS)     | Optional (CSS-first)    |
| Deno Support  | ❌ Requires Node.js    | ✅ Native support       |

---

## Installation

### Step 1: Install Dependencies

Add to `main-app/deno.json`:

```json
{
  "imports": {
    "@fresh/plugin-tailwind": "jsr:@fresh/plugin-tailwind@^1.0.0",
    "tailwindcss": "npm:tailwindcss@^4.0.0"
  }
}
```

**Important:** Use JSR for Fresh plugins (Deno-native), npm for Tailwind CSS itself.

### Step 2: Verify Installation

```bash
deno task dev
```

If Tailwind is working, you should see no errors and styles should apply.

---

## Configuration Files

### 1. `main-app/deno.json`

Complete configuration example:

```json
{
  "name": "@axis/main-app",
  "version": "1.0.0",
  "exports": "./main.ts",
  "imports": {
    "@/": "./",
    "@shared": "../shared/mod.ts",
    "@shared/": "../shared/",
    "@std/path": "jsr:@std/path@^1.0.0",
    "fresh": "jsr:@fresh/core@^2.0.0",
    "fresh/dev": "jsr:@fresh/core@^2.0.0/dev",
    "fresh/runtime": "jsr:@fresh/core@^2.0.0/runtime",
    "@fresh/plugin-tailwind": "jsr:@fresh/plugin-tailwind@^1.0.0",
    "tailwindcss": "npm:tailwindcss@^4.0.0",
    "preact": "npm:preact@^10.28.2",
    "preact/": "npm:preact@^10.28.2/",
    "@preact/signals": "npm:@preact/signals@^2.5.1"
  },
  "tasks": {
    "dev": "deno run -A --watch=static/,routes/ dev.ts",
    "build": "deno run -A dev.ts build",
    "start": "deno serve -A _fresh/server.js"
  },
  "compilerOptions": {
    "lib": ["dom", "dom.asynciterable", "dom.iterable", "deno.ns"],
    "jsx": "precompile",
    "jsxImportSource": "preact"
  }
}
```

**Key Points:**

- Use `jsr:@fresh/plugin-tailwind@^1.0.0` (JSR registry)
- Use `npm:tailwindcss@^4.0.0` (npm registry)
- No `nodeModulesDir` required (Fresh 2.0 handles this automatically)

### 2. `main-app/dev.ts`

Fresh 2.0 uses `dev.ts` instead of `fresh.config.ts`:

```typescript
#!/usr/bin/env -S deno run -A --watch=static/,routes/

import * as path from "@std/path";
import { Builder } from "fresh/dev";
import { tailwind } from "@fresh/plugin-tailwind";

// Resolve root to main-app directory
const root = path.dirname(path.fromFileUrl(import.meta.url));

const builder = new Builder({ root });
tailwind(builder); // Add Tailwind CSS v4 plugin

if (Deno.args.includes("build")) {
  await builder.build();
} else {
  await builder.listen(() => import("./main.ts"));
}
```

**Key Points:**

- Import `Builder` from `fresh/dev`
- Import `tailwind` from `@fresh/plugin-tailwind`
- Call `tailwind(builder)` before building/listening
- No additional configuration needed

### 3. `main-app/routes/_app.tsx`

Import your CSS file in the app layout:

```typescript
import { define } from "@/utils.ts";

export default define.page(({ Component }) => {
  return (
    <html class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your App</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
```

**Key Points:**

- Link to `/styles.css` (served from `static/` directory)
- CSS is processed automatically by the Tailwind plugin
- No manual build step required

---

## CSS-First Setup

### Basic Setup: `main-app/static/styles.css`

The minimal setup requires only one line:

```css
@import "tailwindcss";
```

This imports all Tailwind utilities. That's it! No config file needed.

### Why CSS-First?

1. **Simpler** - No JavaScript config to maintain
2. **Faster** - CSS is processed directly
3. **Type-safe** - CSS variables work with TypeScript
4. **Flexible** - Easy to customize with `@theme`

---

## Theme Configuration

### Using `@theme` Directive

Tailwind v4 uses the `@theme` directive to define custom design tokens:

```css
@import "tailwindcss";

@theme {
  /* Custom Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-secondary: #10b981;

  /* Custom Fonts */
  --font-family-serif: "Georgia", serif;
  --font-family-mono: "JetBrains Mono", monospace;

  /* Custom Spacing */
  --spacing-xs: 0.5rem;
  --spacing-xl: 2rem;

  /* Custom Border Radius */
  --radius-custom: 0.75rem;
}
```

### Complete Theme Example

Here's a production-ready theme configuration:

```css
@import "tailwindcss";

@theme {
  /* ============================================
     COLOR SYSTEM
     ============================================ */

  /* Primary Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #1e40af;
  --color-on-primary: #ffffff;

  /* Secondary Colors */
  --color-secondary: #10b981;
  --color-secondary-hover: #059669;
  --color-on-secondary: #ffffff;

  /* Semantic Colors */
  --color-success: #10b981;
  --color-success-hover: #059669;
  --color-error: #ef4444;
  --color-error-hover: #dc2626;
  --color-warning: #f59e0b;
  --color-warning-hover: #d97706;
  --color-info: #3b82f6;
  --color-info-hover: #2563eb;

  /* Surface Colors */
  --color-surface: #ffffff;
  --color-surface-variant: #f9fafb;
  --color-on-surface: #111827;
  --color-on-surface-variant: #6b7280;

  /* Border Colors */
  --color-border: #e5e7eb;
  --color-border-focus: #3b82f6;
  --color-border-error: #ef4444;

  /* Dark Mode Colors */
  --color-primary-dark: #60a5fa;
  --color-primary-hover-dark: #3b82f6;
  --color-on-primary-dark: #000000;

  --color-surface-dark: #111827;
  --color-surface-variant-dark: #1f2937;
  --color-on-surface-dark: #f9fafb;
  --color-on-surface-variant-dark: #d1d5db;

  --color-border-dark: #374151;
  --color-border-focus-dark: #60a5fa;

  /* ============================================
     TYPOGRAPHY
     ============================================ */

  --font-family-sans:
    system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-family-serif: "Georgia", "Times New Roman", serif;
  --font-family-mono: "JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", Consolas, monospace;

  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */
  --font-size-5xl: 3rem; /* 48px */

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;

  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;

  /* ============================================
     SPACING SCALE
     ============================================ */

  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0\.5: 0.125rem; /* 2px */
  --spacing-1: 0.25rem; /* 4px */
  --spacing-1\.5: 0.375rem; /* 6px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-2\.5: 0.625rem; /* 10px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-3\.5: 0.875rem; /* 14px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-7: 1.75rem; /* 28px */
  --spacing-8: 2rem; /* 32px */
  --spacing-9: 2.25rem; /* 36px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-11: 2.75rem; /* 44px */
  --spacing-12: 3rem; /* 48px */
  --spacing-14: 3.5rem; /* 56px */
  --spacing-16: 4rem; /* 64px */
  --spacing-20: 5rem; /* 80px */
  --spacing-24: 6rem; /* 96px */
  --spacing-28: 7rem; /* 112px */
  --spacing-32: 8rem; /* 128px */

  /* ============================================
     BORDER RADIUS
     ============================================ */

  --radius-none: 0;
  --radius-sm: 0.125rem; /* 2px */
  --radius-base: 0.25rem; /* 4px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem; /* 8px */
  --radius-xl: 0.75rem; /* 12px */
  --radius-2xl: 1rem; /* 16px */
  --radius-3xl: 1.5rem; /* 24px */
  --radius-full: 9999px;

  /* ============================================
     SHADOWS
     ============================================ */

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --shadow-none: none;

  /* ============================================
     TRANSITIONS & ANIMATIONS
     ============================================ */

  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ============================================
   DARK MODE
   ============================================ */

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

### Using Theme Variables in Components

Access theme variables using Tailwind's arbitrary value syntax:

```tsx
// Using CSS variables from @theme
<div class="bg-[var(--color-primary)] text-[var(--color-on-primary)]">
  Primary Button
</div>

// Using standard Tailwind classes (automatically uses theme)
<div class="bg-primary text-on-primary">
  Primary Button
</div>

// Custom spacing
<div class="p-[var(--spacing-xl)]">
  Custom Padding
</div>
```

---

## Integration with Fresh

### File Structure

```
main-app/
├── deno.json          # Dependencies
├── dev.ts            # Fresh builder + Tailwind plugin
├── main.ts           # Fresh entry point
├── routes/
│   ├── _app.tsx      # App layout (imports styles.css)
│   └── index.tsx     # Your pages
└── static/
    └── styles.css    # Tailwind CSS + @theme
```

### How It Works

1. **Development:** `deno task dev` starts Fresh dev server
2. **Plugin Processing:** `@fresh/plugin-tailwind` processes `styles.css`
3. **CSS Generation:** Tailwind generates utility classes on-demand
4. **Serving:** Fresh serves processed CSS at `/styles.css`

### Build Process

```bash
# Development (watch mode)
deno task dev

# Production build
deno task build

# Start production server
deno task start
```

The Tailwind plugin automatically:

- Processes `@import "tailwindcss"`
- Generates utility classes
- Minifies CSS in production
- Handles hot reloading in development

---

## Usage Examples

### Basic Utility Classes

```tsx
export default function HomePage() {
  return (
    <div class="min-h-screen bg-[var(--color-surface)]">
      <header class="p-4 border-b border-[var(--color-border)]">
        <h1 class="text-2xl font-bold text-[var(--color-on-surface)]">
          Welcome
        </h1>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-[var(--color-surface-variant)] p-6 rounded-lg">
            Card Content
          </div>
        </div>
      </main>
    </div>
  );
}
```

### Using Theme Variables

```tsx
// Primary button using theme variables
<button class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)] px-4 py-2 rounded-lg transition-colors">
  Click Me
</button>

// Custom spacing
<div class="p-[var(--spacing-xl)] m-[var(--spacing-lg)]">
  Custom Spacing
</div>

// Custom fonts
<h1 class="font-serif text-[var(--font-size-4xl)]">
  Serif Heading
</h1>
```

### Dark Mode

```tsx
// Toggle dark mode
export default function ThemeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <button onClick={toggleDark} class="p-2 rounded">
      Toggle Theme
    </button>
  );
}

// Using dark mode classes
<div class="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)]">
  Adapts to theme
</div>
```

### Responsive Design

```tsx
<div class="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
  p-4
">
  Responsive Grid
</div>;
```

### Component with Variants

```tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  children: preact.ComponentChildren;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)]",
    secondary:
      "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-on-secondary)]",
    danger: "bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] text-white",
  };

  return (
    <button class={`px-4 py-2 rounded-lg transition-colors ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

---

## Best Practices

### 1. Use Semantic Color Names

✅ **Good:**

```css
--color-primary: #3b82f6;
--color-surface: #ffffff;
--color-on-surface: #111827;
```

❌ **Bad:**

```css
--color-blue-500: #3b82f6;
--color-white: #ffffff;
--color-gray-900: #111827;
```

### 2. Organize Theme by Category

```css
@theme {
  /* Colors */
  --color-primary: ...;

  /* Typography */
  --font-family-sans: ...;

  /* Spacing */
  --spacing-4: ...;
}
```

### 3. Use CSS Variables for Dynamic Values

```tsx
// ✅ Good: Theme-aware
<div class="bg-[var(--color-surface)] text-[var(--color-on-surface)]">

// ❌ Bad: Hardcoded
<div class="bg-white text-black">
```

### 4. Leverage Dark Mode Variables

```css
/* Define both light and dark variants */
--color-surface: #ffffff;
--color-surface-dark: #111827;

/* Use in dark mode class */
.dark {
  --color-surface: var(--color-surface-dark);
}
```

### 5. Keep Custom Classes Minimal

Prefer Tailwind utilities over custom CSS:

```tsx
// ✅ Good: Tailwind utilities
<div class="flex items-center justify-between p-4 rounded-lg shadow-md">

// ❌ Bad: Custom class for everything
<div class="my-custom-card">
```

### 6. Use TypeScript for Component Props

```typescript
// Define theme-aware component props
interface CardProps {
  variant?: "elevated" | "outlined" | "filled";
  padding?: "sm" | "md" | "lg";
}

export function Card({ variant = "elevated", padding = "md" }: CardProps) {
  const variantClasses = {
    elevated: "shadow-lg bg-[var(--color-surface)]",
    outlined: "border border-[var(--color-border)] bg-transparent",
    filled: "bg-[var(--color-surface-variant)]",
  };

  const paddingClasses = {
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div class={`rounded-lg ${variantClasses[variant]} ${paddingClasses[padding]}`}>
      {/* Content */}
    </div>
  );
}
```

---

## Troubleshooting

### Issue: Styles Not Applying

**Symptoms:** Tailwind classes don't work

**Solutions:**

1. **Check CSS import in `_app.tsx`:**
   ```tsx
   <link rel="stylesheet" href="/styles.css" />;
   ```

2. **Verify plugin in `dev.ts`:**
   ```typescript
   tailwind(builder); // Must be called
   ```

3. **Check file location:**
   - CSS must be in `static/styles.css`
   - Must start with `@import "tailwindcss"`

4. **Restart dev server:**
   ```bash
   deno task dev
   ```

### Issue: CSS Variables Not Working

**Symptoms:** `var(--color-primary)` doesn't apply

**Solutions:**

1. **Check `@theme` syntax:**
   ```css
   @theme {
     --color-primary: #3b82f6; /* ✅ Correct */
   }
   ```

2. **Use arbitrary value syntax:**
   ```tsx
   <div class="bg-[var(--color-primary)]"> /* ✅ Correct */
   ```

3. **Verify variable name:**
   - Must start with `--color-`, `--font-`, `--spacing-`, etc.
   - Use kebab-case

### Issue: Dark Mode Not Working

**Symptoms:** Dark mode classes don't apply

**Solutions:**

1. **Add `dark` class to `<html>`:**
   ```tsx
   <html class="dark">
   ```

2. **Define dark mode variables:**
   ```css
   .dark {
     --color-surface: var(--color-surface-dark);
   }
   ```

3. **Use dark mode variants:**
   ```tsx
   <div class="bg-white dark:bg-gray-900">
   ```

### Issue: Build Fails

**Symptoms:** `deno task build` fails

**Solutions:**

1. **Check Deno version:**
   ```bash
   deno --version # Should be 2.x
   ```

2. **Verify dependencies:**
   ```bash
   deno check dev.ts
   ```

3. **Clear cache:**
   ```bash
   rm -rf _fresh node_modules
   deno cache --reload dev.ts
   ```

### Issue: TypeScript Errors

**Symptoms:** Type errors with CSS variables

**Solutions:**

1. **Use type assertions:**
   ```typescript
   const color = "var(--color-primary)" as string;
   ```

2. **Create type definitions:**
   ```typescript
   type ThemeColor =
     | "var(--color-primary)"
     | "var(--color-secondary)";
   ```

---

## Migration from Twind

### Key Differences

| Twind (v1)        | Tailwind v4    |
| ----------------- | -------------- |
| JavaScript config | CSS `@theme`   |
| Runtime CSS-in-JS | CSS-first      |
| `twind.config.ts` | `styles.css`   |
| `tw` function     | Direct classes |

### Migration Steps

1. **Remove Twind:**
   ```json
   // Remove from deno.json
   // "twind": "..."
   ```

2. **Install Tailwind v4:**
   ```json
   {
     "imports": {
       "@fresh/plugin-tailwind": "jsr:@fresh/plugin-tailwind@^1.0.0",
       "tailwindcss": "npm:tailwindcss@^4.0.0"
     }
   }
   ```

3. **Update `dev.ts`:**
   ```typescript
   // Remove: import { twind } from "fresh/plugins/twind.ts";
   // Add:
   import { tailwind } from "@fresh/plugin-tailwind";
   tailwind(builder);
   ```

4. **Create `styles.css`:**
   ```css
   @import "tailwindcss";

   @theme {
     /* Migrate theme from twind.config.ts */
   }
   ```

5. **Update Components:**
   ```tsx
   // Before (Twind)
   import { tw } from "twind";
   <div class={tw`bg-blue-500 p-4`}>

   // After (Tailwind v4)
   <div class="bg-[var(--color-primary)] p-4">
   ```

6. **Remove Twind Config:**
   ```bash
   rm twind.config.ts
   ```

### Theme Migration Example

**Before (Twind):**

```typescript
// twind.config.ts
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
      },
    },
  },
});
```

**After (Tailwind v4):**

```css
/* styles.css */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
}
```

---

## Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Fresh Framework Documentation](https://fresh.deno.dev/docs)
- [Fresh Tailwind Plugin (JSR)](https://jsr.io/@fresh/plugin-tailwind)
- [Deno Documentation](https://deno.com/docs)

---

## Summary

Tailwind CSS v4 with Deno & Fresh provides:

✅ **Zero-config setup** - Just `@import "tailwindcss"`\
✅ **CSS-first approach** - No JavaScript config files\
✅ **Native Deno support** - Works out of the box\
✅ **Type-safe theming** - CSS variables with TypeScript\
✅ **Small bundle size** - Only includes used styles\
✅ **Fast development** - Hot reloading built-in

This configuration is production-ready and follows Fresh 2.0 best practices.
