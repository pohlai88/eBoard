# Fresh Framework Compatibility Guide
## Tailwind v4, ShadCN, Preact vs React - The Complete Truth

**Generated:** ${new Date().toISOString()}  
**Last Updated:** January 2026

---

## TL;DR - What Works with Fresh?

| Technology | Compatible? | Notes |
|------------|------------|-------|
| **Tailwind v4** | ✅ YES | Via Twind v1 (Tailwind-in-JS) |
| **Preact** | ✅ YES | **Built-in!** Fresh uses Preact by default |
| **React** | ⚠️ Possible | Can use React, but defeats Fresh's purpose |
| **ShadCN** | ❌ Not Direct | Built for React/Next.js, need Preact alternatives |
| **Twind** | ✅ YES | **Recommended!** Tailwind syntax, zero build |
| **UnoCSS** | ✅ YES | Alternative to Tailwind |
| **Preact Signals** | ✅ YES | Built-in state management |

---

## Fresh + Preact (The Default & Best Choice)

### What is Fresh?

Fresh is Deno's **full-stack web framework** that:
- Uses **Preact** (3KB React alternative)
- Ships **zero JavaScript by default** (Islands architecture)
- Has **Twind built-in** (Tailwind-in-JS)
- Requires **zero build step** in development
- Supports **Server-Side Rendering (SSR)** by default

### Why Preact, Not React?

```typescript
// Size comparison
React + ReactDOM: ~130KB (minified)
Preact: ~3KB (minified)

// Fresh choice: Preact
// Why? 40x smaller, same API, faster hydration
```

### Compatibility: Preact vs React

```typescript
// ✅ Most React code works in Preact
import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

// React code (works in Preact):
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Better Preact way (using signals):
import { signal } from "@preact/signals";

function Counter() {
  const count = signal(0);
  
  // Signals auto-track dependencies, no useEffect needed!
  return (
    <button onClick={() => count.value++}>
      Count: {count.value}
    </button>
  );
}
```

---

## Fresh + Tailwind v4 (Via Twind)

### The Problem with Traditional Tailwind v4

```bash
# Traditional Tailwind v4 requires:
npm install tailwindcss@next
npx tailwindcss init
# Configure PostCSS, build pipeline, etc.
npx tailwindcss -i input.css -o output.css --watch

# ❌ Problems:
# - Requires Node.js build tools
# - NOT Deno-friendly
# - Conflicts with "zero build step" philosophy
```

### The Fresh Solution: Twind v1

**Twind = Tailwind-in-JS** (no build step!)

```typescript
// Fresh projects have Twind pre-configured!
// Just use Tailwind classes directly:

export default function HomePage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <nav class="flex items-center justify-between p-6 bg-white shadow-lg">
        <h1 class="text-3xl font-bold text-gray-800">Axis eBoard</h1>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Login
        </button>
      </nav>
      
      <main class="container mx-auto p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 class="text-xl font-semibold mb-2">Proposals</h2>
            <p class="text-4xl font-bold text-blue-500">42</p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ✅ It just works! No config, no build step!
```

### Twind vs Tailwind v4 Comparison

| Feature | Tailwind v4 | Twind v1 (Fresh) |
|---------|-------------|------------------|
| **Syntax** | Tailwind classes | Tailwind classes |
| **Build Step** | ❌ Required | ✅ None |
| **Bundle Size** | ~50KB (after purge) | ~10KB (on-demand) |
| **Setup** | Complex (Node.js) | ✅ Pre-configured |
| **JIT Mode** | Yes | ✅ Yes (built-in) |
| **Custom Config** | tailwind.config.js | twind.config.ts |
| **Deno Compatible** | ❌ No | ✅ Yes |
| **Production Ready** | ✅ Yes | ✅ Yes |

### Custom Twind Configuration

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
  // Custom utilities
  rules: [
    // Add custom classes if needed
    ["btn-primary", "px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition"],
  ],
});

// Usage:
<button class="btn-primary">Custom Button</button>
<div class="bg-brand-primary">Branded color</div>
```

---

## Fresh + ShadCN (The Challenge)

### What is ShadCN?

ShadCN is a **component collection** built for:
- React (not Preact)
- Next.js
- Tailwind CSS
- Radix UI primitives

### ❌ Why ShadCN Doesn't Work Directly with Fresh

```typescript
// ShadCN components use React-specific APIs:
import * as React from "react"           // ❌ Fresh uses Preact
import { Slot } from "@radix-ui/react-slot"  // ❌ Radix UI is React-only
import { cva } from "class-variance-authority" // ✅ This works
import { cn } from "@/lib/utils"           // ✅ This works

// ShadCN Button.tsx (React):
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### ✅ Solution: Build Preact Equivalents

```typescript
// components/ui/Button.tsx (Preact version for Fresh)
import { forwardRef } from "preact/compat";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentChildren } from "preact";

// ✅ CVA works the same in Preact!
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof buttonVariants> {
  children?: ComponentChildren;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ class: className, variant, size, ...props }, ref) => {
    return (
      <button
        class={buttonVariants({ variant, size, class: className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// ✅ Usage - Same API as ShadCN!
import { Button } from "../components/ui/Button.tsx";

<Button variant="default">Click me</Button>
<Button variant="destructive" size="lg">Delete</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

### Preact Component Library Alternatives to ShadCN

| Need | ShadCN (React) | Preact Alternative |
|------|----------------|-------------------|
| **UI Components** | ShadCN/UI | Build with CVA (shown above) |
| **Headless UI** | Radix UI | **Headless UI for Preact** (WIP) or build custom |
| **Icons** | Lucide React | **Preact Icons** or SVG components |
| **Forms** | React Hook Form | **Preact Signals** + custom validation |
| **Styling** | Tailwind v3 | **Twind** (built into Fresh) |
| **Animations** | Framer Motion | **CSS transitions** or **Motion One** |

---

## Complete Working Example: Fresh + Twind + CVA

### Step 1: Install Dependencies

```bash
# Create Fresh project
deno run -A -r https://fresh.deno.dev axis-eboard
cd axis-eboard

# Add CVA for variant-based styling (ShadCN approach)
echo '{
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@1.6.1/",
    "preact": "https://esm.sh/preact@10.19.2",
    "preact/": "https://esm.sh/preact@10.19.2/",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.2.1",
    "class-variance-authority": "https://esm.sh/class-variance-authority@0.7.0",
    "clsx": "https://esm.sh/clsx@2.0.0",
    "tailwind-merge": "https://esm.sh/tailwind-merge@2.2.0"
  }
}' > deno.json
```

### Step 2: Create Utility Functions

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Same utility as ShadCN uses
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 3: Build ShadCN-Style Components

```typescript
// components/ui/Card.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentChildren } from "preact";
import { cn } from "../../lib/utils.ts";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        outline: "border-2 border-gray-300",
        ghost: "border-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children?: ComponentChildren;
}

export function Card({ class: className, variant, ...props }: CardProps) {
  return (
    <div class={cn(cardVariants({ variant }), className)} {...props} />
  );
}

export function CardHeader({
  class: className,
  ...props
}: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  );
}

export function CardTitle({
  class: className,
  ...props
}: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      class={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function CardContent({
  class: className,
  ...props
}: JSX.HTMLAttributes<HTMLDivElement>) {
  return <div class={cn("p-6 pt-0", className)} {...props} />;
}

// ✅ Usage - Identical to ShadCN!
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card.tsx";
import { Button } from "../components/ui/Button.tsx";

<Card>
  <CardHeader>
    <CardTitle>Proposal Details</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This is a proposal card with ShadCN-style API!</p>
    <Button variant="default" class="mt-4">Approve</Button>
  </CardContent>
</Card>
```

### Step 4: Complete Dashboard Example

```typescript
// routes/dashboard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card.tsx";
import { Button } from "../components/ui/Button.tsx";
import { signal } from "@preact/signals";

export default function Dashboard() {
  const stats = signal([
    { title: "Total Proposals", value: 42, change: "+12%" },
    { title: "Active Tasks", value: 18, change: "+4%" },
    { title: "Completed", value: 127, change: "+23%" },
  ]);

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <header class="bg-white border-b border-gray-200">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Button variant="default">
              <PlusIcon class="mr-2 h-4 w-4" />
              New Proposal
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main class="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div class="grid gap-6 md:grid-cols-3 mb-8">
          {stats.value.map((stat) => (
            <Card>
              <CardHeader>
                <CardTitle class="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="text-3xl font-bold">{stat.value}</div>
                <p class="text-sm text-green-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <ActivityItem
                title="Proposal #1234 approved"
                time="2 hours ago"
                user="John Doe"
              />
              <ActivityItem
                title="New task created"
                time="4 hours ago"
                user="Jane Smith"
              />
              <ActivityItem
                title="Report submitted"
                time="1 day ago"
                user="Bob Johnson"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function ActivityItem({ title, time, user }: any) {
  return (
    <div class="flex items-start gap-4 pb-4 border-b last:border-0">
      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
        <span class="text-blue-600 font-semibold">{user[0]}</span>
      </div>
      <div class="flex-1">
        <p class="font-medium text-gray-900">{title}</p>
        <p class="text-sm text-gray-500">{user} · {time}</p>
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
  );
}
```

---

## React in Fresh (Possible but Not Recommended)

### Can You Use React in Fresh?

```typescript
// ⚠️ YES, but you lose Fresh's benefits:
import { render } from "https://esm.sh/react-dom@18";
import React from "https://esm.sh/react@18";

// Problems:
// 1. Bundle size: +130KB (vs 3KB Preact)
// 2. Islands don't work optimally
// 3. Defeats Fresh's purpose
// 4. Hydration is slower

// If you need React, use Next.js instead!
```

### When to Use React vs Preact

| Use Case | Choose |
|----------|--------|
| **New Deno project** | ✅ **Preact (Fresh)** |
| **Existing React codebase** | Migrate to Preact OR use Next.js |
| **Need specific React library** | Check for Preact alternative first |
| **Team knows only React** | ✅ Preact API is 95% compatible, easy to learn |
| **Bundle size matters** | ✅ **Preact** (40x smaller) |
| **Deno-native project** | ✅ **Preact (Fresh)** |

---

## Migration Path: ShadCN Components to Fresh

### Strategy 1: Port ShadCN Components to Preact

```typescript
// 1. Copy ShadCN component
// 2. Replace React imports with Preact
// 3. Replace Radix UI with custom implementation
// 4. Keep CVA logic (it works!)

// Example: Badge component
// Before (ShadCN/React):
import * as React from "react"
import { cva } from "class-variance-authority"

// After (Fresh/Preact):
import { cva } from "class-variance-authority";
import { ComponentChildren } from "preact";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: ComponentChildren;
}

export function Badge({ class: className, variant, ...props }: BadgeProps) {
  return (
    <div class={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// ✅ Works identically in Fresh!
<Badge variant="default">New</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>
```

### Strategy 2: Use Preact Component Libraries

```typescript
// Instead of ShadCN, use:

// 1. Preact Material Components
import { Button } from "https://esm.sh/@preact/material-components";

// 2. Build your own with CVA (recommended)
// See examples above - full control, lightweight

// 3. Use headless component pattern
// Build behavior, style with Twind
```

---

## Recommendation for Axis eBoard

### ✅ Recommended Stack

```
Framework:  Fresh (Deno-native)
UI Library: Preact (built-in, 3KB)
Styling:    Twind (built-in Tailwind-in-JS)
Components: Custom (CVA + Twind) - ShadCN approach
State:      Preact Signals (built-in)
Icons:      SVG components or Preact Icons
Forms:      Custom validation with signals
```

### 🏗️ Build Process

```bash
# Week 1: Setup component library
mkdir -p components/ui
# Create Button, Card, Input, Badge with CVA

# Week 2: Build features using components
import { Button, Card } from "../components/ui/mod.ts";

# Week 3: No build step, just deploy
deployctl deploy --project=axis-eboard
```

### ❌ Don't Do This

```typescript
// Don't fight the framework:
❌ Install React in Fresh
❌ Try to force ShadCN React components
❌ Use traditional Tailwind v4 with Node.js

// Do this instead:
✅ Use Preact (built-in)
✅ Use Twind (built-in)
✅ Port ShadCN patterns (CVA approach)
```

---

## Summary Table

| Question | Answer |
|----------|--------|
| **Fresh + Tailwind v4?** | ✅ Via **Twind** (Tailwind-in-JS, zero config) |
| **Fresh + ShadCN?** | ⚠️ Port to Preact using **CVA patterns** (shown above) |
| **Fresh + React?** | ❌ Possible but defeats Fresh's purpose. Use Preact! |
| **Fresh + Preact?** | ✅ **Built-in!** This IS Fresh |
| **ShadCN alternative?** | ✅ Build custom components with **CVA + Twind** |
| **Best approach?** | ✅ Fresh + Twind + Custom CVA components |

---

## Next Steps

1. **Try Fresh:**
   ```bash
   deno run -A -r https://fresh.deno.dev test-app
   cd test-app
   deno task start
   ```

2. **Add CVA for variants:**
   ```bash
   # Add to import map in deno.json
   "class-variance-authority": "https://esm.sh/class-variance-authority@0.7.0"
   ```

3. **Build components:**
   - Start with Button, Card, Input
   - Use CVA for variants
   - Style with Twind classes
   - Export from components/ui/mod.ts

4. **Deploy:**
   ```bash
   deployctl deploy --project=axis-eboard
   ```

---

**Conclusion:** 

Fresh + Twind + Preact + CVA = **ShadCN-level developer experience** with **zero build step** and **Deno-native** workflow! 🚀

No need for React or traditional Tailwind. The Deno way is simpler and better!
