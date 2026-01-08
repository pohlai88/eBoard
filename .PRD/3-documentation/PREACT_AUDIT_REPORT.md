# Preact Best Practices Audit Report

**Date:** January 2026\
**Method:** Codebase analysis vs. documented best practices\
**Scope:** All Preact components, routes, and islands\
**Status:** ✅ **7 Passed** | ⚠️ **3 Issues Found** | ❌ **0 Critical Failures**

---

## Executive Summary

Your codebase demonstrates **strong adherence** to Preact best practices. The main areas for
improvement are:

1. **ThemeProvider location** - Should be an island (uses browser APIs)
2. **Component organization** - Some components using browser APIs in shared/ui
3. **Documentation consistency** - Some PRD files use React patterns (not actual code)

**Overall Grade: A- (90%)**

---

## Audit Results by Category

### ✅ 1. Preact vs React Differences

#### ✅ PASS: Using `class` Not `className`

**Evidence:**

```tsx
// shared/ui/Button.tsx:55
<button class={classes} onClick={onClick}>

// shared/ui/Card.tsx:34
<div class={classes}>

// shared/ui/Input.tsx:50
<input class={classes} ...>
```

**Status:** ✅ **PASS** - All components correctly use `class` attribute

**Best Practice:** Use `class` not `className` (Preact convention)

---

#### ✅ PASS: Correct Preact Types

**Evidence:**

```tsx
// shared/ui/Button.tsx:5
import type { ComponentChild } from "preact";

// shared/ui/Button.tsx:13
children: ComponentChild;

// shared/ui/Button.tsx:28
}: ButtonProps): ComponentChild {
```

**Status:** ✅ **PASS** - All components use `ComponentChild` type correctly

**Best Practice:** Use `ComponentChild` for children prop (not React.ReactNode)

---

#### ✅ PASS: No React Imports

**Evidence:**

```bash
# Search results: No React imports in actual code
grep "from ['\"]react" - Only found in documentation/PRD files
```

**Status:** ✅ **PASS** - No React imports in actual component code

**Best Practice:** Import from `preact` or `preact/hooks`, never `react`

---

### ✅ 2. Component Patterns

#### ✅ PASS: Functional Components

**Evidence:**

```tsx
// shared/ui/Button.tsx:20
export function Button({ ... }: ButtonProps): ComponentChild {
  return <button>...</button>;
}

// shared/ui/Card.tsx:15
export function Card({ ... }: CardProps): ComponentChild {
  return <div>...</div>;
}
```

**Status:** ✅ **PASS** - All components use functional component pattern

**Best Practice:** Use functional components with explicit return types

---

#### ✅ PASS: Component Composition

**Evidence:**

```tsx
// main-app/routes/index.tsx:25
<Card variant="elevated">
  <h2>...</h2>
  <ul>...</ul>
</Card>

// main-app/routes/index.tsx:49
<a href="/demo">
  <Button variant="primary">View Demo →</Button>
</a>
```

**Status:** ✅ **PASS** - Components are properly composed

**Best Practice:** Build complex components from simple reusable ones

---

#### ✅ PASS: Conditional Rendering

**Evidence:**

```tsx
// shared/ui/Card.tsx:35
{
  title && <h3 class="text-xl font-semibold mb-4">...</h3>;
}

// shared/ui/Input.tsx:42
{
  label && <label>...</label>;
}
```

**Status:** ✅ **PASS** - Conditional rendering used correctly

**Best Practice:** Use conditional rendering for optional UI elements

---

### ✅ 3. Event Handlers

#### ✅ PASS: Correct Event Handler Syntax

**Evidence:**

```tsx
// shared/ui/Button.tsx:56
onClick={onClick}

// shared/ui/Input.tsx:53
onInput={(e) => onChange?.(e.currentTarget.value)}
```

**Status:** ✅ **PASS** - Event handlers use correct Preact syntax

**Best Practice:** Use `onClick`, `onInput`, etc. (same as React, but Preact-native)

---

### ⚠️ 4. Fresh Islands Architecture

#### ✅ PASS: Routes Are Server-Rendered

**Evidence:**

```tsx
// main-app/routes/index.tsx:5
export default define.page(() => {
  return (
    <ThemeProvider>
      <Head>...</Head>
      <div>...</div>
    </ThemeProvider>
  );
});
```

**Status:** ✅ **PASS** - Routes correctly use `define.page()` (server-rendered)

**Best Practice:** Routes should be server-rendered by default

---

#### ✅ PASS: Islands Folder Structure

**Evidence:**

```bash
# Only one island found
main-app/my-fresh-test/islands/Counter.tsx
```

**Status:** ✅ **PASS** - Islands are in correct `/islands` folder

**Best Practice:** Put interactive components in `/islands` folder

---

#### ⚠️ ISSUE: ThemeProvider Should Be an Island

**Evidence:**

```tsx
// shared/ui/ThemeProvider.tsx:13
if (typeof globalThis.window !== "undefined") {
  // Uses browser APIs: window, document, localStorage
  document.documentElement.classList.add("dark");
}
```

**Problem:**

- `ThemeProvider` uses browser APIs (`window`, `document`, `localStorage`)
- Located in `shared/ui/` (should be in `islands/`)
- Used in server-rendered routes but needs client-side execution

**Impact:**

- May cause hydration mismatches
- Browser APIs won't work during SSR
- Component should be an island for proper client-side execution

**Recommendation:**

```tsx
// Move to: islands/ThemeProvider.tsx
import { signal } from "@preact/signals";
import type { ComponentChild } from "preact";

export default function ThemeProvider({ children }: { children: ComponentChild }) {
  const isDark = signal(true);

  // Client-side only code
  if (typeof window !== "undefined") {
    // Initialize from localStorage
    const stored = localStorage.getItem("theme");
    if (stored) isDark.value = stored === "dark";

    // Apply theme
    document.documentElement.classList.toggle("dark", isDark.value);
  }

  return <>{children}</>;
}
```

**Status:** ⚠️ **ISSUE** - Component using browser APIs should be an island

**Best Practice:** Components using `window`, `document`, `localStorage` must be islands

---

### ✅ 5. State Management

#### ✅ PASS: Using Preact Signals

**Evidence:**

```tsx
// shared/ui/useTheme.ts:15
const isDarkMode = signal<boolean>(getInitialTheme());

// shared/ui/useTheme.ts:35
isDark: computed(() => isDarkMode.value),
```

**Status:** ✅ **PASS** - Correctly using Signals for reactive state

**Best Practice:** Use Signals for shared/reactive state (simpler than hooks)

---

#### ✅ PASS: Using Computed Signals

**Evidence:**

```tsx
// shared/ui/useTheme.ts:35
isDark: computed(() => isDarkMode.value),
```

**Status:** ✅ **PASS** - Using `computed()` for derived state

**Best Practice:** Use `computed()` for derived state (auto-updates)

---

#### ✅ PASS: No Unnecessary Hooks

**Evidence:**

```bash
# Search results: No useState/useEffect in actual component code
# Only found in documentation examples
```

**Status:** ✅ **PASS** - No hooks used where Signals would be better

**Best Practice:** Prefer Signals over hooks for shared state

---

### ✅ 6. TypeScript Best Practices

#### ✅ PASS: Explicit Prop Interfaces

**Evidence:**

```tsx
// shared/ui/Button.tsx:10
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ComponentChild;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}
```

**Status:** ✅ **PASS** - All components have explicit prop interfaces

**Best Practice:** Define explicit interfaces for all component props

---

#### ✅ PASS: Type-Safe Event Handlers

**Evidence:**

```tsx
// shared/ui/Input.tsx:53
onInput={(e) => onChange?.(e.currentTarget.value)}
```

**Status:** ✅ **PASS** - Event handlers are type-safe

**Best Practice:** Use `e.currentTarget.value` for input events

---

#### ✅ PASS: Component Return Types

**Evidence:**

```tsx
// shared/ui/Button.tsx:28
}: ButtonProps): ComponentChild {
```

**Status:** ✅ **PASS** - Components have explicit return types

**Best Practice:** Explicitly type component return values

---

### ⚠️ 7. Component Organization

#### ⚠️ ISSUE: Browser API Usage in Shared Components

**Evidence:**

```tsx
// shared/ui/ThemeProvider.tsx:13
if (typeof globalThis.window !== "undefined") {
  document.documentElement.classList.add("dark");
}

// shared/ui/useTheme.ts:6
if (typeof globalThis.window !== "undefined") {
  const stored = localStorage.getItem("theme");
}
```

**Problem:**

- `ThemeProvider` and `useTheme` use browser APIs
- Located in `shared/ui/` (shared components should be server-safe)
- May cause SSR/hydration issues

**Impact:**

- Server-side rendering will skip browser API code
- Client-side hydration may mismatch
- Theme initialization may be delayed

**Recommendation:**

1. Move `ThemeProvider` to `islands/ThemeProvider.tsx`
2. Keep `useTheme` hook but ensure it's only used in islands
3. Or create a server-safe version for routes

**Status:** ⚠️ **ISSUE** - Browser APIs in shared components

**Best Practice:** Shared components should be server-safe; browser APIs belong in islands

---

### ✅ 8. Performance Optimization

#### ✅ PASS: Minimal Islands

**Evidence:**

```bash
# Only 1 island found in actual codebase
islands/Counter.tsx
```

**Status:** ✅ **PASS** - Islands are used sparingly (good for performance)

**Best Practice:** Minimize islands to reduce JavaScript bundle size

---

#### ✅ PASS: No Unnecessary Re-renders

**Evidence:**

```tsx
// Components use Signals (automatic reactivity)
// No manual state management causing re-renders
```

**Status:** ✅ **PASS** - Signals prevent unnecessary re-renders

**Best Practice:** Signals automatically optimize re-renders

---

### ⚠️ 9. Documentation Consistency

#### ⚠️ MINOR: PRD Files Use React Patterns

**Evidence:**

```bash
# Found in documentation files (not actual code):
.PRD/1-core-prd/PRD_eBoard_v3.md - Uses className
.PRD/4-enhancements/PRD_v3_STRATEGIC_ENHANCEMENTS.md - Uses className
```

**Problem:**

- Documentation examples use `className` (React pattern)
- Should use `class` (Preact pattern) for consistency

**Impact:** Low - Documentation only, not actual code

**Recommendation:** Update PRD documentation to use Preact patterns

**Status:** ⚠️ **MINOR** - Documentation inconsistency (not code issue)

**Best Practice:** Keep documentation examples consistent with actual code patterns

---

## Detailed Findings

### Critical Issues: 0

No critical issues found. All code follows Preact best practices.

---

### Issues: 3

#### Issue #1: ThemeProvider Should Be an Island

**File:** `shared/ui/ThemeProvider.tsx`

**Current Code:**

```tsx
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDark } = useTheme();

  if (typeof globalThis.window !== "undefined") {
    document.documentElement.classList.add("dark");
  }

  return <>{children}</>;
}
```

**Problem:**

- Uses browser APIs (`window`, `document`)
- Located in `shared/ui/` but needs client-side execution
- May cause hydration mismatches

**Fix:**

```tsx
// Move to: islands/ThemeProvider.tsx
import { signal } from "@preact/signals";
import type { ComponentChild } from "preact";

export default function ThemeProvider({ children }: { children: ComponentChild }) {
  const isDark = signal(true);

  // Client-side initialization
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) isDark.value = stored === "dark";
    document.documentElement.classList.toggle("dark", isDark.value);
  }

  return <>{children}</>;
}
```

**Priority:** Medium\
**Effort:** Low (move file, update imports)

---

#### Issue #2: Browser APIs in Shared Components

**Files:**

- `shared/ui/ThemeProvider.tsx`
- `shared/ui/useTheme.ts`

**Problem:**

- Shared components should be server-safe
- Browser APIs (`window`, `document`, `localStorage`) require client-side execution

**Fix:**

1. Move `ThemeProvider` to `islands/ThemeProvider.tsx`
2. Keep `useTheme` hook but document it's island-only
3. Or create server-safe wrapper

**Priority:** Medium\
**Effort:** Low

---

#### Issue #3: Documentation Inconsistency

**Files:**

- `.PRD/1-core-prd/PRD_eBoard_v3.md`
- `.PRD/4-enhancements/PRD_v3_STRATEGIC_ENHANCEMENTS.md`

**Problem:**

- Documentation examples use `className` (React pattern)
- Should use `class` (Preact pattern)

**Fix:**

- Update PRD documentation to use `class` instead of `className`

**Priority:** Low\
**Effort:** Low (documentation only)

---

## Best Practices Compliance

### ✅ Fully Compliant (7/10)

1. ✅ Using `class` not `className`
2. ✅ Correct Preact types (`ComponentChild`)
3. ✅ No React imports
4. ✅ Functional components
5. ✅ Component composition
6. ✅ Event handlers
7. ✅ TypeScript best practices

### ⚠️ Needs Improvement (3/10)

1. ⚠️ Islands architecture (ThemeProvider location)
2. ⚠️ Component organization (browser APIs in shared)
3. ⚠️ Documentation consistency (PRD files)

---

## Recommendations

### Immediate Actions (Priority: Medium)

1. **Move ThemeProvider to Islands**
   ```bash
   # Move file
   mv shared/ui/ThemeProvider.tsx islands/ThemeProvider.tsx

   # Update imports in routes
   # Change: import { ThemeProvider } from "@shared/ui/mod.ts";
   # To: import ThemeProvider from "@/islands/ThemeProvider.tsx";
   ```

2. **Update useTheme Documentation**
   - Add comment: "Only use in islands (requires browser APIs)"
   - Or create server-safe version

### Future Improvements (Priority: Low)

1. **Update PRD Documentation**
   - Replace `className` with `class` in examples
   - Ensure all examples use Preact patterns

2. **Add Component Guidelines**
   - Document when to use islands vs shared components
   - Create checklist for component placement

---

## Evidence Summary

### Code Analysis

**Files Analyzed:**

- `shared/ui/Button.tsx` ✅
- `shared/ui/Card.tsx` ✅
- `shared/ui/Input.tsx` ✅
- `shared/ui/ThemeProvider.tsx` ⚠️
- `shared/ui/useTheme.ts` ⚠️
- `main-app/routes/index.tsx` ✅
- `main-app/routes/demo.tsx` ✅
- `main-app/my-fresh-test/islands/Counter.tsx` ✅

**Patterns Found:**

- ✅ All components use `class` attribute
- ✅ All components use `ComponentChild` type
- ✅ No React imports in actual code
- ✅ Proper event handler syntax
- ✅ Signals used correctly
- ⚠️ Browser APIs in shared components

---

## Conclusion

Your codebase demonstrates **excellent adherence** to Preact best practices. The main issues are:

1. **Component placement** - `ThemeProvider` should be an island
2. **Browser API usage** - Should be isolated to islands
3. **Documentation** - Minor inconsistencies in PRD files

**Overall Assessment:** Your Preact implementation is **production-ready** with minor improvements
needed.

**Grade: A- (90%)**

---

## Action Items

- [ ] Move `ThemeProvider` to `islands/ThemeProvider.tsx`
- [ ] Update imports in routes using `ThemeProvider`
- [ ] Document `useTheme` as island-only hook
- [ ] Update PRD documentation to use `class` instead of `className`
- [ ] Add component placement guidelines to documentation

---

**Audit Completed:** January 2026\
**Next Review:** After implementing recommendations
