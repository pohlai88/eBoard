# Styling Strategy Recommendation for Axis eBoard

![CI Status](https://github.com/pohlai88/eBoard/actions/workflows/deno-ci.yml/badge.svg)

## Fresh + Twind + Preact + DRY Components

**Generated:** January 8, 2026\
**Recommendation Level:** HIGHEST CONFIDENCE\
**Based on PRD Analysis:** FRESH_COMPATIBILITY_GUIDE.md + FRONTEND_STYLING_GUIDE.md +
DRY_COMPONENT_PATTERNS.md

---

## TL;DR - Recommended Stack

```typescript
┌─────────────────────────────────────────────┐
│  AXIS eBOARD STYLING STACK                  │
├─────────────────────────────────────────────┤
│ Framework:    Fresh (Deno's official)       │
│ Styling:      Twind v1 (Tailwind-in-JS)     │
│ Components:   Preact (3KB, built-in)        │
│ Architecture: Islands (Zero JS by default)  │
│ UI Library:   Custom DRY Components         │
│ Pattern:      Component-based, No ShadCN    │
└─────────────────────────────────────────────┘

Result: 13KB total (Preact 3KB + Twind 10KB)
vs React19 approach: 130KB + Next.js overhead
```

---

## Why This Stack? (Decision Matrix)

### ✅ Fresh (NOT Next.js, NOT Vite)

| Criteria               | Fresh    | Next.js 15        | Vite              |
| ---------------------- | -------- | ----------------- | ----------------- |
| **Deno-native**        | ✅ YES   | ❌ Node-only      | ❌ Node-only      |
| **Zero build dev**     | ✅ YES   | ❌ Build required | ⚠️ Build required |
| **Built-in SSR**       | ✅ YES   | ✅ Yes (RSC)      | ❌ No (manual)    |
| **Islands by default** | ✅ YES   | ⚠️ Opt-in         | ❌ No             |
| **Built-in styling**   | ✅ Twind | ❌ Separate       | ❌ Separate       |
| **File-based routing** | ✅ YES   | ✅ YES            | ❌ No             |
| **TypeScript native**  | ✅ YES   | ✅ YES            | ✅ YES            |

**Why Fresh wins for Deno projects:**

- Built specifically for Deno ecosystem
- Zero configuration for styling (Twind pre-installed)
- Island architecture by default (vs React's "use client" mental model)
- No build step in development
- Smaller bundle size (10KB vs 300KB+ for Tailwind CDN)

---

### ✅ Twind v1 (NOT Traditional Tailwind v4)

| Feature              | Tailwind v4     | Twind v1           |
| -------------------- | --------------- | ------------------ |
| **Build tool**       | Node.js PostCSS | None (runtime)     |
| **Bundle size**      | 50-100KB        | 10KB               |
| **Setup time**       | 30 minutes      | 0 (pre-configured) |
| **Syntax**           | Same            | Same               |
| **Deno-friendly**    | ❌ No           | ✅ YES             |
| **JIT compilation**  | Manual          | Automatic          |
| **Production-ready** | ✅ YES          | ✅ YES             |

**Why Twind instead of Tailwind v4:**

- Zero configuration (Fresh comes with Twind pre-installed)
- No Node.js build tools required
- Works perfectly with Deno
- On-demand CSS generation (only ship used classes)
- Used in production by Deno Deploy dashboard

**Why NOT UnoCSS?**

- UnoCSS is 3x faster than Tailwind/Twind (irrelevant for eBoard)
- Extra complexity for minimal gain
- Twind is battle-tested and sufficient
- Stick with what's pre-configured in Fresh

---

### ✅ Preact (NOT React)

| Metric                | React                     | Preact             |
| --------------------- | ------------------------- | ------------------ |
| **Bundle size**       | 130KB                     | 3KB                |
| **API compatibility** | -                         | 95%+ (hooks work)  |
| **Fresh integration** | ❌ Fighting the framework | ✅ Built-in        |
| **Signals support**   | ❌ No                     | ✅ @preact/signals |
| **Hydration speed**   | Slow                      | Fast               |

**Why Preact:**

- Fresh is built on Preact, not React
- 40x smaller bundle
- Same hooks API (useState, useEffect, useContext)
- Better for Islands architecture
- Preact Signals simplify state management

**Why NOT React with Fresh:**

- React defeats Fresh's purpose (bundle bloat)
- Incompatibilities with Islands architecture
- Unnecessary complexity
- "We'll use React" is the #1 reason projects fail with Fresh

---

### ✅ Custom DRY Components (NOT ShadCN)

| Approach             | ShadCN           | Custom DRY     |
| -------------------- | ---------------- | -------------- |
| **Built for**        | React + Next.js  | Preact + Fresh |
| **Can adapt**        | ⚠️ Possible      | ✅ Native      |
| **Setup time**       | 2 hours          | 30 minutes     |
| **Dependency bloat** | Radix UI (large) | None           |
| **Tailwind syntax**  | ✅ Full          | ✅ Full        |
| **Type safety**      | ✅ YES           | ✅ YES         |
| **Deno-native**      | ❌ No            | ✅ YES         |

**Why custom DRY components:**

- ShadCN is built for React, requires heavy adaptation
- DRY pattern is simpler: define once, reuse everywhere
- Smaller bundle (no Radix UI dependency)
- 100% control over component behavior
- Perfect for Preact

**DRY Component Example:**

```typescript
// shared/ui/Button.tsx (reusable)
export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: any;
  onClick?: () => void;
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  onClick 
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return (
    <button
      class={`font-semibold rounded-lg transition ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Usage: Import and use everywhere
// No class duplication, single source of truth
<Button variant="primary" size="lg">Save Proposal</Button>
<Button variant="danger">Delete</Button>
```

---

## Islands Architecture vs React Server Components

### Fresh Islands (Recommended)

```typescript
// routes/proposal.tsx - Server component by default
export default function ProposalPage(props: PageProps) {
  // This runs ONLY on the server
  // No JavaScript shipped to client!
  const proposals = await db.getProposals();

  return (
    <div class="space-y-4">
      <h1>Proposals</h1>

      {/* Static content - zero JS */}
      {proposals.map((p) => <ProposalCard key={p.id} proposal={p} />)}

      {/* Islands - only THIS component gets JS shipped */}
      <CreateProposalForm />
    </div>
  );
}

// islands/CreateProposalForm.tsx - Client component (explicit)
export default function CreateProposalForm() {
  const [title, setTitle] = useState("");

  // This component GETS JavaScript shipped
  // But everything else above doesn't!

  return (
    <form>
      <input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}
```

**Why Islands > React Server Components:**

- Simple, explicit opt-in (`islands/` folder)
- No "use client" mental model required
- Clearer separation of concerns
- Easier to understand which code runs where

---

## Twind Configuration Strategy

### Minimal Setup (Start Here)

Fresh comes with Twind pre-configured! You don't need to do anything:

```typescript
// routes/index.tsx - Just write Tailwind classes
export default function Home() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <nav class="flex items-center justify-between p-6 bg-white shadow-lg">
        <h1 class="text-3xl font-bold text-gray-800">Axis eBoard</h1>
      </nav>
    </div>
  );
}

// ✅ It just works! No build step, zero config
```

### Extended Setup (If Needed)

```typescript
// twind.config.ts
import { defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2b6cb0",
          secondary: "#4a5568",
          accent: "#4299e1",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  rules: [
    // Custom utility classes (optional)
    ["btn-primary", "px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"],
  ],
});

// Usage:
<button class="btn-primary">Custom Button</button>
<div class="bg-brand-primary">Branded</div>
```

---

## Component Organization

### Recommended Folder Structure

```
shared/
├── ui/                          # Reusable UI components
│   ├── Button.tsx               # Button (variants, sizes)
│   ├── Card.tsx                 # Card layout
│   ├── Input.tsx                # Form input
│   ├── Modal.tsx                # Modal dialog
│   ├── Navigation.tsx           # Nav bar
│   ├── Dropdown.tsx             # Dropdown menu
│   └── Layout.tsx               # Page layout wrapper
│
├── types/                       # Shared types
│   ├── proposal.ts
│   ├── user.ts
│   └── common.ts
│
└── utils/                       # Shared utilities
    ├── auth.ts                  # Auth functions
    ├── db.ts                    # DB access
    └── formatting.ts            # String/date formatting

main-app/
├── routes/                      # Pages (server-side)
│   ├── index.tsx                # Home
│   ├── proposals/[id].tsx       # Proposal detail
│   └── _layout.tsx              # Root layout
│
└── islands/                     # Interactive components
    ├── CreateProposalForm.tsx   # Form (gets JS)
    ├── ProposalFilter.tsx       # Filters (gets JS)
    └── UserMenu.tsx             # Dropdown (gets JS)
```

**Key Principle:**

- `routes/` = Pages (server-rendered, zero JS)
- `islands/` = Interactive components (JS shipped)
- `shared/ui/` = Reusable components (used by both)

---

## Implementation Checklist

### Phase 1: Foundation (Week 1)

- [ ] Confirm Fresh project structure is correct
- [ ] Verify Twind is working with default config
- [ ] Create `shared/ui/Button.tsx` (first component)
- [ ] Create `shared/ui/Card.tsx` (second component)
- [ ] Test with `routes/index.tsx`

### Phase 2: Core Components (Week 2)

- [ ] Input field component with variants
- [ ] Form wrapper (handles validation)
- [ ] Modal dialog component
- [ ] Navigation bar component
- [ ] Layout wrapper component

### Phase 3: Pages (Week 3)

- [ ] Dashboard page with cards
- [ ] Proposal list page
- [ ] Proposal detail page
- [ ] Create proposal form (island)

### Phase 4: Polish (Week 4)

- [ ] Custom Twind config (brand colors)
- [ ] Responsive design testing
- [ ] Accessibility audit
- [ ] Performance optimization

---

## What NOT to Do

### ❌ Don't Use These

| Technology                  | Why Not                        | Use Instead               |
| --------------------------- | ------------------------------ | ------------------------- |
| **ShadCN**                  | React-only, needs adaptation   | Custom DRY components     |
| **React**                   | Defeats Fresh purpose, bloat   | Preact (built-in)         |
| **Traditional Tailwind v4** | Needs Node.js build            | Twind (pre-configured)    |
| **styled-components**       | Runtime CSS-in-JS overhead     | Tailwind classes          |
| **CSS Modules**             | No design system               | Twind + shared components |
| **Bootstrap**               | Bloated, not Tailwind-friendly | Twind                     |
| **Material-UI**             | Huge bundle, React-only        | Custom components         |

### ⚠️ Be Careful With These

| Technology                | Caution                | When Safe                 |
| ------------------------- | ---------------------- | ------------------------- |
| **External npm packages** | Non-Deno packages      | Only JSR packages         |
| **React libraries**       | Won't work with Preact | Only if Preact-compatible |
| **CSS frameworks**        | Require build step     | Runtime-only options      |
| **Design systems**        | Usually React-focused  | Create your own (easy!)   |

---

## Pro Tips & Gotchas

### Tip 1: Component Composition

```typescript
// ✅ Good: Build larger components from smaller ones
function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <Card>
      <h3 class="text-xl font-bold">{proposal.title}</h3>
      <p class="text-gray-600">{proposal.description}</p>
      <div class="flex gap-2 mt-4">
        <Button variant="primary">Edit</Button>
        <Button variant="secondary">View</Button>
      </div>
    </Card>
  );
}
```

### Tip 2: Responsive Design with Twind

```typescript
// ✅ Mobile-first approach
class="p-4 md:p-6 lg:p-8 text-sm md:text-base lg:text-lg"

// Grid that stacks on mobile
class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Conditional Tailwind (avoid!)
// ❌ class={isActive ? "text-blue-500" : "text-gray-500"}
// ✅ Better: Use components or CSS variables
```

### Tip 3: Dark Mode (Optional but Easy)

```typescript
// twind.config.ts - Add dark mode
export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: "class", // Enable dark mode
  // ...
});

// Usage:
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Automatic dark mode!
</div>;
```

### Gotcha 1: Class Merging

```typescript
// ❌ Wrong: These classes don't merge!
function Badge({ color }: { color: string }) {
  const base = "px-3 py-1 rounded-full text-sm font-bold";
  return <span class={`${base} bg-${color}-500`}>Badge</span>;
  // ❌ bg-${color}-500 won't work! Twind needs complete class name
}

// ✅ Right: Use a variant map
function Badge({ color }: { color: "blue" | "red" | "green" }) {
  const colors = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
  };
  return <span class={`px-3 py-1 rounded-full text-sm font-bold ${colors[color]}`}>Badge</span>;
}
```

### Gotcha 2: Preact Signals vs useState

```typescript
// ✅ Modern Preact way (cleaner)
import { signal } from "@preact/signals";

function Counter() {
  const count = signal(0);
  return <button onClick={() => count.value++}>Count: {count.value}</button>;
  // No useEffect needed! Signals auto-track dependencies
}

// ⚠️ React-style way (still works)
import { useState } from "preact/hooks";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
  // Works, but Signals are more efficient for Fresh
}
```

---

## Comparison: Before vs After

### Before (No Strategy)

```typescript
// ❌ Anti-pattern: Repeated classes
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>

// Result: 50+ buttons, 100+ class instances to update
// Maintenance nightmare! 😱
```

### After (With Strategy)

```typescript
// ✅ DRY approach: Component-based
<Button variant="primary">Save</Button>
<Button variant="primary">Submit</Button>
<Button variant="primary">Create</Button>

// Result: Change Button.tsx once, all 50+ buttons update
// Maintainable! ✨
```

---

## Summary: Why This Stack?

| Metric                    | Fresh + Twind + Preact               |
| ------------------------- | ------------------------------------ |
| **Bundle size**           | 13KB (Preact 3KB + Twind 10KB)       |
| **Build step**            | 0 (zero in dev)                      |
| **Type safety**           | ✅ Full TypeScript                   |
| **Deno-native**           | ✅ YES                               |
| **Learning curve**        | Low (simple Islands model)           |
| **Component reusability** | High (DRY patterns)                  |
| **Production-ready**      | ✅ Used by Deno Deploy               |
| **Performance**           | Excellent (Islands, auto-purged CSS) |
| **Maintenance**           | Easy (centralized components)        |

---

## Next Steps

1. **Read**: Review [DRY_COMPONENT_PATTERNS.md](./3-documentation/DRY_COMPONENT_PATTERNS.md) for
   detailed examples
2. **Setup**: Configure Fresh project with workspace structure
3. **Create**: Build first 5 components (Button, Card, Input, Modal, Navigation)
4. **Test**: Create test pages using those components
5. **Scale**: Build remaining pages following the same pattern

**Confidence Level**: ⭐⭐⭐⭐⭐ (HIGHEST) **Recommendation**: **ADOPT THIS STACK - 100% aligned
with PRD**
