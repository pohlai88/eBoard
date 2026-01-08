# Component Ecosystem Report

**Date:** January 2026\
**Method:** Deno CLI verification + file inspection\
**Status:** ✅ **VERIFIED** - All components use Preact ecosystem

---

## Answer: Components Built on **Preact Ecosystem**

---

## 1. Verified Component Ecosystem

### Primary Ecosystem: **Preact** (NOT React)

**Evidence from Deno CLI:**

```bash
deno eval "import { h } from 'preact'; ..."
# Result: Preact h function: function ✅
```

**Evidence from deno.json:**

```json
{
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "preact" // ← Preact, not React
  },
  "imports": {
    "preact": "npm:preact@^10.28.2",
    "preact/": "npm:preact@^10.28.2/",
    "@preact/signals": "npm:@preact/signals@^2.5.1"
  }
}
```

**Evidence from Component Files:** All components import from Preact:

- `Button.tsx`: `import type { ComponentChild } from "preact";`
- `Card.tsx`: `import type { ComponentChild } from "preact";`
- `Input.tsx`: `import type { ComponentChild } from "preact";`
- `ThemeProvider.tsx`: `import type { ComponentChild } from "preact";`

---

## 2. Complete Ecosystem Stack

### Framework Layer

```
┌─────────────────────────────────────┐
│  Fresh 2.0 (Deno-native framework) │
│  - Uses Preact for UI               │
│  - Islands architecture             │
│  - Server-side rendering            │
└─────────────────────────────────────┘
```

### UI Library Layer

```
┌─────────────────────────────────────┐
│  Preact 10.28.2                     │
│  - 3KB React alternative            │
│  - Same API as React                │
│  - Faster hydration                 │
│  - Built into Fresh                 │
└─────────────────────────────────────┘
```

### Styling Layer

```
┌─────────────────────────────────────┐
│  Tailwind CSS v4.0.0                │
│  - CSS-first configuration          │
│  - @theme directive                 │
│  - Via @fresh/plugin-tailwind       │
└─────────────────────────────────────┘
```

### State Management Layer

```
┌─────────────────────────────────────┐
│  @preact/signals 2.5.1              │
│  - Reactive state                   │
│  - Built-in to Fresh                │
└─────────────────────────────────────┘
```

---

## 3. Component Architecture

### Component Pattern: **Preact Functional Components**

**Example from Button.tsx:**

```typescript
import type { ComponentChild } from "preact";

export function Button({ ... }: ButtonProps): ComponentChild {
  return <button>...</button>;
}
```

**Key Characteristics:**

- ✅ Uses Preact types (`ComponentChild`)
- ✅ Returns JSX (compiled by Deno's precompile transform)
- ✅ Uses `class` attribute (Preact convention, not `className`)
- ✅ Uses `onClick` handlers (Preact event system)

---

## 4. Why Preact, Not React?

### Size Comparison

```
React + ReactDOM:  ~130KB (minified)
Preact:            ~3KB (minified)
Difference:        40x smaller
```

### Fresh Framework Choice

- Fresh is built **specifically for Preact**
- Preact is **built-in** to Fresh
- React would require additional setup and defeat Fresh's purpose

### Compatibility

- ✅ Most React code works in Preact
- ✅ Same JSX syntax
- ✅ Same hooks API (`useState`, `useEffect`, etc.)
- ✅ Same component patterns

---

## 5. Verified Component Files

### Location: `shared/ui/`

| Component           | Ecosystem | Type Import                    | Status      |
| ------------------- | --------- | ------------------------------ | ----------- |
| `Button.tsx`        | Preact    | `ComponentChild` from "preact" | ✅ Verified |
| `Card.tsx`          | Preact    | `ComponentChild` from "preact" | ✅ Verified |
| `Input.tsx`         | Preact    | `ComponentChild` from "preact" | ✅ Verified |
| `ThemeProvider.tsx` | Preact    | `ComponentChild` from "preact" | ✅ Verified |

**All components use Preact ecosystem.**

---

## 6. JSX Configuration

### Deno Compiler Options (Verified)

```json
{
  "compilerOptions": {
    "jsx": "precompile", // Deno's JSX transform
    "jsxImportSource": "preact", // ← Preact, not React
    "jsxPrecompileSkipElements": [
      "a",
      "img",
      "source",
      "body",
      "html",
      "head",
      "title",
      "meta",
      "script",
      "link",
      "style",
      "base",
      "noscript",
      "template"
    ]
  }
}
```

**What This Means:**

- JSX is transformed at compile time (not runtime)
- JSX uses Preact's `h()` function
- HTML elements are optimized (skipped from Preact transform)

---

## 7. Styling Ecosystem

### Tailwind CSS v4 (CSS-First)

- **Configuration:** `static/styles.css`
- **Method:** `@import "tailwindcss"` + `@theme` directive
- **Plugin:** `@fresh/plugin-tailwind@^1.0.0`
- **No JavaScript config** - Pure CSS approach

### Component Styling Pattern

```typescript
// Components use Tailwind classes directly
const classes = `px-4 py-2 bg-[var(--color-primary)]`;
return <button class={classes}>...</button>;
```

**Not using:**

- ❌ CSS-in-JS (styled-components, emotion)
- ❌ CSS Modules
- ❌ React-specific styling libraries

---

## 8. State Management Ecosystem

### Preact Signals (Built-in)

```typescript
import { signal } from "@preact/signals";

// Reactive state
const count = signal(0);
count.value++; // Automatically updates UI
```

**Available:**

- ✅ `@preact/signals` - Reactive state
- ✅ `preact/hooks` - useState, useEffect, etc.
- ✅ `preact/compat` - React compatibility layer (if needed)

---

## 9. Component Export Pattern

### `shared/ui/mod.ts`

```typescript
// All components exported from single module
export { Button } from "./Button.tsx";
export { Card } from "./Card.tsx";
export { Input } from "./Input.tsx";
export { ThemeProvider } from "./ThemeProvider.tsx";
```

**Usage in routes:**

```typescript
import { Button, Card } from "@shared/ui/mod.ts";
```

---

## 10. Ecosystem Summary Table

| Layer          | Technology     | Version | Purpose                       |
| -------------- | -------------- | ------- | ----------------------------- |
| **Runtime**    | Deno           | 2.6.4   | JavaScript/TypeScript runtime |
| **Framework**  | Fresh          | 2.0.0   | Full-stack web framework      |
| **UI Library** | Preact         | 10.28.2 | Component library (3KB)       |
| **Styling**    | Tailwind CSS   | 4.0.0   | Utility-first CSS             |
| **State**      | Preact Signals | 2.5.1   | Reactive state management     |
| **Build**      | Deno (native)  | -       | Zero build step               |

---

## 11. What This Means for Development

### ✅ You Can Use:

- Preact hooks (`useState`, `useEffect`, `useMemo`, etc.)
- Preact signals for reactive state
- Preact component patterns
- JSX syntax (same as React)
- Tailwind CSS classes
- TypeScript with full type safety

### ❌ You Cannot Use:

- React-specific libraries (without Preact compat)
- React hooks from `react` package (use `preact/hooks` instead)
- React context API (use Preact context or signals)
- React-specific patterns (portals, error boundaries need Preact equivalents)

### ⚠️ Compatible But Different:

- `className` → `class` (Preact uses `class`)
- Some React libraries work via `preact/compat`
- React DevTools don't work (use Preact DevTools)

---

## 12. Verification Status

✅ **All components verified to use Preact ecosystem** ✅ **No React dependencies found** ✅ **JSX
configured for Preact** ✅ **Styling uses Tailwind CSS v4** ✅ **State management uses Preact
Signals**

---

## Conclusion

**Components are built on the Preact ecosystem**, not React.

- **Framework:** Fresh 2.0 (Preact-based)
- **UI Library:** Preact 10.28.2
- **Styling:** Tailwind CSS v4.0.0
- **State:** Preact Signals 2.5.1
- **Runtime:** Deno 2.6.4

This is the **official Fresh stack** - lightweight, fast, and Deno-native.
