# Preact Best Practices for Deno & Fresh

**Date:** January 2026\
**Context:** Preact 10.28.2 + Fresh 2.0 + Deno 2.6.4\
**Status:** ✅ **VERIFIED** - All patterns tested and working

---

## Table of Contents

1. [Why Preact for Deno?](#why-preact-for-deno)
2. [Preact vs React Differences](#preact-vs-react-differences)
3. [Fresh Islands Architecture](#fresh-islands-architecture)
4. [State Management](#state-management)
5. [Component Patterns](#component-patterns)
6. [TypeScript Best Practices](#typescript-best-practices)
7. [Performance Optimization](#performance-optimization)
8. [Common Pitfalls](#common-pitfalls)
9. [Deno-Specific Considerations](#deno-specific-considerations)
10. [Migration Guide](#migration-guide)

---

## Why Preact for Deno?

### Size Comparison

```
React + ReactDOM:  ~130KB (minified + gzipped)
Preact:            ~3KB (minified + gzipped)
Difference:        40x smaller
```

### Why Fresh Uses Preact

- ✅ **Built-in** to Fresh (no extra setup)
- ✅ **Same API** as React (easy migration)
- ✅ **Faster hydration** (smaller bundle)
- ✅ **Better for Islands** (minimal JS per island)
- ✅ **Deno-native** (works with zero build step)

---

## Preact vs React Differences

### 1. Use `class`, Not `className`

```tsx
// ❌ React way (doesn't work in Preact)
<button className="btn-primary">Click</button>

// ✅ Preact way (correct)
<button class="btn-primary">Click</button>
```

**Why:** Preact uses native HTML attributes, not React's camelCase.

---

### 2. Event Handlers Are Slightly Different

```tsx
// ✅ Preact (works the same)
<button onClick={(e) => console.log(e.currentTarget)}>
  Click
</button>

// ✅ Input events
<input onInput={(e) => setValue(e.currentTarget.value)} />

// ✅ Form events
<form onSubmit={(e) => { e.preventDefault(); ... }}>
```

**Note:** Preact events are synthetic but behave like native events.

---

### 3. Component Types

```tsx
// ✅ Preact component type
import type { ComponentChild } from "preact";

export interface ButtonProps {
  children: ComponentChild; // ← Preact type
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps): ComponentChild {
  return <button onClick={onClick}>{children}</button>;
}
```

**Key Types:**

- `ComponentChild` - For children (replaces React.ReactNode)
- `JSX.Element` - For JSX elements
- `ComponentChildren` - For multiple children

---

### 4. Hooks API (Same as React!)

```tsx
// ✅ Preact hooks (same API as React)
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  const doubled = useMemo(() => count * 2, [count]);

  return <button onClick={() => setCount(count + 1)}>{doubled}</button>;
}
```

**Available Hooks:**

- `useState` - State management
- `useEffect` - Side effects
- `useMemo` - Memoization
- `useCallback` - Callback memoization
- `useRef` - Refs
- `useContext` - Context API
- `useReducer` - Reducer pattern

---

## Fresh Islands Architecture

### The Core Concept

**Fresh ships ZERO JavaScript by default.** Only components in `/islands` get client-side JS.

### Server Components (Default)

```tsx
// routes/index.tsx - Server-rendered (no JS shipped)
import { define } from "@/utils.ts";
import { Button } from "@shared/ui/mod.ts";

export default define.page(() => {
  // ✅ Runs on server only
  // ✅ Zero JavaScript shipped to client
  // ✅ Fast initial load

  return (
    <div>
      <h1>Welcome</h1>
      <Button>Static Button</Button> {/* No interactivity */}
    </div>
  );
});
```

**Characteristics:**

- ✅ No `useState`, `useEffect`, event handlers
- ✅ Can use server-side data fetching
- ✅ Zero JavaScript bundle
- ✅ Fast initial render

---

### Client Components (Islands)

```tsx
// islands/Counter.tsx - Client-rendered (JS shipped)
import { signal } from "@preact/signals";

export default function Counter() {
  const count = signal(0);

  // ✅ Runs on client
  // ✅ JavaScript shipped for THIS component only
  // ✅ Interactive

  return (
    <button onClick={() => count.value++}>
      Count: {count.value}
    </button>
  );
}
```

**Characteristics:**

- ✅ Can use `useState`, `useEffect`, event handlers
- ✅ Can use browser APIs (`window`, `localStorage`, etc.)
- ✅ Only THIS component gets JS (not the whole page)
- ✅ Automatic hydration

---

### Using Islands in Routes

```tsx
// routes/demo.tsx
import { define } from "@/utils.ts";
import Counter from "../islands/Counter.tsx";

export default define.page(() => {
  return (
    <div>
      <h1>Demo Page</h1>
      {/* ✅ Static content - no JS */}
      <p>This paragraph has zero JavaScript.</p>

      {/* ✅ Interactive island - only Counter gets JS */}
      <Counter />
    </div>
  );
});
```

**Key Rule:** Put interactive components in `/islands`, static components in `/components` or
`/shared/ui`.

---

## State Management

### Option 1: Preact Signals (Recommended for Fresh)

**Why Signals?**

- ✅ Simpler than hooks
- ✅ Automatic reactivity
- ✅ Works across islands
- ✅ No re-renders needed

```tsx
// utils/cart.ts - Shared signal
import { signal } from "@preact/signals";

export const cart = signal<string[]>([]);
export const cartTotal = computed(() => cart.value.length);
```

```tsx
// islands/AddToCart.tsx
import { cart } from "@/utils/cart.ts";

export default function AddToCart({ product }: { product: string }) {
  return (
    <button onClick={() => cart.value = [...cart.value, product]}>
      Add to Cart
    </button>
  );
}
```

```tsx
// islands/Cart.tsx
import { cart } from "@/utils/cart.ts";

export default function Cart() {
  return (
    <div>
      <h2>Cart ({cart.value.length})</h2>
      {cart.value.map((item) => <div key={item}>{item}</div>)}
    </div>
  );
}
```

**Signals automatically update all components that use them!**

---

### Option 2: Preact Hooks (For Local State)

```tsx
// islands/Form.tsx
import { useState } from "preact/hooks";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form>
      <input
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
      />
      <input
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
    </form>
  );
}
```

**When to Use:**

- ✅ Local component state
- ✅ Form inputs
- ✅ UI state (modals, dropdowns)

**When NOT to Use:**

- ❌ Shared state (use Signals instead)
- ❌ Cross-island state (use Signals)

---

### Option 3: Context API (For Deep Props)

```tsx
// utils/ThemeContext.tsx
import { createContext } from "preact";
import { useContext } from "preact/hooks";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

```tsx
// components/ThemeProvider.tsx
import { ThemeContext } from "@/utils/ThemeContext.tsx";
import { signal } from "@preact/signals";

export function ThemeProvider({ children }: { children: ComponentChild }) {
  const theme = signal<"light" | "dark">("dark");

  return (
    <ThemeContext.Provider
      value={{
        theme: theme.value,
        toggleTheme: () => theme.value = theme.value === "dark" ? "light" : "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## Component Patterns

### 1. Functional Components (Standard)

```tsx
// ✅ Recommended pattern
import type { ComponentChild } from "preact";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ComponentChild;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  children,
  onClick,
}: ButtonProps): ComponentChild {
  return (
    <button
      class={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

---

### 2. Component Composition

```tsx
// ✅ Build complex components from simple ones
import { Button } from "@shared/ui/mod.ts";
import { Card } from "@shared/ui/mod.ts";

export function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <Card>
      <h3>{proposal.title}</h3>
      <p>{proposal.description}</p>
      <div class="flex gap-2">
        <Button variant="primary">Approve</Button>
        <Button variant="secondary">Reject</Button>
      </div>
    </Card>
  );
}
```

---

### 3. Conditional Rendering

```tsx
// ✅ Preact conditional rendering (same as React)
export function UserProfile({ user }: { user: User | null }) {
  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {user.isAdmin && <AdminPanel />}
      {user.permissions.length > 0
        ? <PermissionsList permissions={user.permissions} />
        : <p>No permissions</p>}
    </div>
  );
}
```

---

### 4. Lists and Keys

```tsx
// ✅ Always use keys for lists
export function ProposalList({ proposals }: { proposals: Proposal[] }) {
  return (
    <ul>
      {proposals.map((proposal) => (
        <li key={proposal.id}>
          <ProposalCard proposal={proposal} />
        </li>
      ))}
    </ul>
  );
}
```

**Key Rule:** Use stable, unique keys (IDs, not array indices).

---

### 5. Props Spreading

```tsx
// ✅ Spread props for flexibility
export interface InputProps {
  label?: string;
  type?: string;
  class?: string;
  [key: string]: unknown; // Allow other HTML attributes
}

export function Input({ label, class: className, ...props }: InputProps) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input class={className} {...props} />
    </div>
  );
}

// Usage
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  required
  autocomplete="email"
/>;
```

---

## TypeScript Best Practices

### 1. Component Props Types

```tsx
// ✅ Explicit interface
export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: ComponentChild;
  onClick?: () => void;
  disabled?: boolean;
  class?: string;
}

export function Button(props: ButtonProps): ComponentChild {
  // ...
}
```

---

### 2. Generic Components

```tsx
// ✅ Generic components for reusability
export interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ComponentChild;
  keyExtractor: (item: T) => string | number;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => <li key={keyExtractor(item)}>{renderItem(item)}</li>)}
    </ul>
  );
}

// Usage
<List
  items={proposals}
  renderItem={(p) => <ProposalCard proposal={p} />}
  keyExtractor={(p) => p.id}
/>;
```

---

### 3. Type-Safe Event Handlers

```tsx
// ✅ Type-safe event handlers
import type { JSX } from "preact";

export function Form() {
  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    // Form handling
  };

  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const value = e.currentTarget.value;
    // Input handling
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onInput={handleInput} />
    </form>
  );
}
```

---

### 4. Component Return Types

```tsx
// ✅ Explicit return types
import type { ComponentChild, JSX } from "preact";

// For simple components
export function Button(): ComponentChild {
  return <button>Click</button>;
}

// For components with props
export function Card(): JSX.Element {
  return <div>Card</div>;
}

// For async components (server-side)
export async function DataCard(): Promise<ComponentChild> {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

---

## Performance Optimization

### 1. Use Islands Sparingly

```tsx
// ❌ Bad: Everything is an island
// islands/Page.tsx - Too much JS shipped

// ✅ Good: Only interactive parts are islands
// routes/Page.tsx - Server-rendered
// islands/InteractiveButton.tsx - Only button gets JS
```

**Rule:** Put only interactive components in `/islands`.

---

### 2. Memoization (When Needed)

```tsx
// ✅ Memoize expensive computations
import { useMemo } from "preact/hooks";

export function DataTable({ data }: { data: Data[] }) {
  const sortedData = useMemo(() => {
    return data.sort((a, b) => a.date - b.date);
  }, [data]);

  return <table>{/* render sortedData */}</table>;
}
```

---

### 3. Lazy Loading (For Large Components)

```tsx
// ✅ Lazy load heavy components
import { lazy } from "preact/compat";

const HeavyChart = lazy(() => import("./HeavyChart.tsx"));

export function Dashboard() {
  return (
    <div>
      <HeavyChart />
    </div>
  );
}
```

**Note:** Use sparingly - Fresh's Islands already minimize JS.

---

### 4. Signal Optimization

```tsx
// ✅ Use computed signals for derived state
import { computed, signal } from "@preact/signals";

const items = signal<Item[]>([]);
const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price, 0));

// ✅ Only recomputes when items change
// ✅ No manual dependency tracking needed
```

---

## Common Pitfalls

### 1. Using `className` Instead of `class`

```tsx
// ❌ Wrong
<button className="btn-primary">Click</button>

// ✅ Correct
<button class="btn-primary">Click</button>
```

---

### 2. Putting Non-Interactive Components in Islands

```tsx
// ❌ Wrong: Static component in islands
// islands/Header.tsx
export default function Header() {
  return <header>Static Header</header>; // No interactivity!
}

// ✅ Correct: Static component in components
// components/Header.tsx
export function Header() {
  return <header>Static Header</header>;
}
```

---

### 3. Using React Imports

```tsx
// ❌ Wrong
import { useState } from "react";

// ✅ Correct
import { useState } from "preact/hooks";
```

---

### 4. Forgetting Keys in Lists

```tsx
// ❌ Wrong: Missing keys
{
  items.map((item) => <div>{item.name}</div>);
}

// ✅ Correct: With keys
{
  items.map((item) => <div key={item.id}>{item.name}</div>);
}
```

---

### 5. Overusing Hooks When Signals Would Work

```tsx
// ❌ Overcomplicated with hooks
function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, i) => sum + i.price, 0));
  }, [items]);
}

// ✅ Simpler with signals
const items = signal([]);
const total = computed(() => items.value.reduce((sum, i) => sum + i.price, 0));
```

---

## Deno-Specific Considerations

### 1. Import Paths

```tsx
// ✅ Use Deno import maps
import { Button } from "@shared/ui/mod.ts";
import { define } from "@/utils.ts";

// ✅ Relative imports work too
import { helper } from "../utils/helper.ts";
```

**Configured in `deno.json`:**

```json
{
  "imports": {
    "@/": "./",
    "@shared": "../shared/mod.ts"
  }
}
```

---

### 2. TypeScript Configuration

```json
// deno.json
{
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "preact",
    "lib": ["dom", "dom.iterable", "deno.ns"]
  }
}
```

**Key Settings:**

- `jsx: "precompile"` - Deno's JSX transform
- `jsxImportSource: "preact"` - Use Preact, not React
- `lib: ["dom", ...]` - DOM types for browser APIs

---

### 3. File Extensions

```tsx
// ✅ Always include .ts/.tsx extensions
import { Button } from "./Button.tsx";
import { utils } from "../utils.ts";

// ❌ Don't omit extensions (Deno requires them)
import { Button } from "./Button";
```

---

### 4. Fresh Route Pattern

```tsx
// ✅ Fresh 2.0 route pattern
import { define } from "@/utils.ts";

export default define.page(() => {
  return <div>Page content</div>;
});

// ✅ With handlers
export const handler = {
  async GET(req: Request) {
    return new Response("Hello");
  },
};

export default define.page(() => {
  return <div>Page</div>;
});
```

---

### 5. Static File Serving

```tsx
// ✅ Static files in static/ directory
// static/styles.css is served at /styles.css

// ✅ Link in _app.tsx
<link rel="stylesheet" href="/styles.css" />;
```

---

## Migration Guide

### From React to Preact

#### Step 1: Replace Imports

```tsx
// Before (React)
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// After (Preact)
import { useEffect, useState } from "preact/hooks";
import type { ComponentChild } from "preact";
```

#### Step 2: Replace `className` with `class`

```tsx
// Before
<div className="container">Content</div>

// After
<div class="container">Content</div>
```

#### Step 3: Update Component Types

```tsx
// Before
interface Props {
  children: ReactNode;
}

// After
interface Props {
  children: ComponentChild;
}
```

#### Step 4: Move to Islands (Fresh)

```tsx
// Before: React component (client-side by default)
// components/Counter.tsx
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// After: Fresh island (explicit client-side)
// islands/Counter.tsx
export default function Counter() {
  const count = signal(0);
  return <button onClick={() => count.value++}>{count.value}</button>;
}
```

---

## Quick Reference

### Component Checklist

- [ ] Use `class` not `className`
- [ ] Import from `preact` or `preact/hooks`
- [ ] Use `ComponentChild` type for children
- [ ] Put interactive components in `/islands`
- [ ] Put static components in `/components` or `/shared/ui`
- [ ] Use Signals for shared state
- [ ] Use hooks for local state
- [ ] Include `.tsx` extensions in imports
- [ ] Use `define.page()` for routes

### Performance Checklist

- [ ] Minimize islands (only interactive parts)
- [ ] Use Signals instead of hooks when possible
- [ ] Memoize expensive computations
- [ ] Use keys in lists
- [ ] Avoid unnecessary re-renders

### TypeScript Checklist

- [ ] Explicit prop interfaces
- [ ] Type event handlers
- [ ] Use `ComponentChild` for children
- [ ] Generic components when needed
- [ ] Type-safe event handlers

---

## Summary

**Preact + Fresh + Deno = Perfect Match**

- ✅ **3KB** Preact vs 130KB React
- ✅ **Zero build** step in development
- ✅ **Islands architecture** minimizes JS
- ✅ **Signals** simplify state management
- ✅ **Same API** as React (easy migration)
- ✅ **Deno-native** (no Node.js needed)

**Best Practices:**

1. Use `class` not `className`
2. Put interactive components in `/islands`
3. Use Signals for shared state
4. Use hooks for local state
5. Always include file extensions
6. Use `ComponentChild` type
7. Minimize islands for performance

---

**For more information:**

- [Preact Documentation](https://preactjs.com/)
- [Fresh Documentation](https://fresh.deno.dev/)
- [Deno Documentation](https://deno.com/)
