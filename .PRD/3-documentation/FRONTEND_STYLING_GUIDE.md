# Frontend Styling Guide - Deno-First Approaches

## How Far Can Deno Go? (Spoiler: ALL THE WAY! 🚀)

**Generated:** ${new Date().toISOString()}\
**Philosophy:** Zero Build Step, Zero npm, Maximum Performance

---

## TL;DR - The Deno Way

```typescript
// ✅ RECOMMENDED: Fresh + Twind with Reusable Components
// components/Button.tsx
import { tw } from "twind";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: any;
  onClick?: () => void;
}

export function Button({ variant = "primary", size = "md", children, onClick }: ButtonProps) {
  // Define reusable style variants
  const baseStyles = "font-semibold rounded-lg transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return (
    <button 
      class={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Usage - DRY! No repeated classes!
<Button variant="primary" size="lg">Save Proposal</Button>
<Button variant="danger">Delete</Button>
<Button variant="secondary" size="sm">Cancel</Button>
```

**That's DRY!** Define once, reuse everywhere. Zero build step, full TypeScript safety.

---

## DRY Patterns - Don't Repeat Yourself! 🔄

### ❌ Problem: Repeating Classes (Anti-Pattern)

```typescript
// DON'T DO THIS - Violates DRY principle
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Confirm</button>
// If you need to change button styling, you update 100+ places! 😱
```

---

## Option 1: Fresh + Twind (⭐ BEST - Zero Config)

### What is Fresh?

- Deno's official full-stack web framework
- **Ships with Twind pre-installed** (Tailwind-in-JS)
- Islands architecture (only ship JS for interactive components)
- Server-side rendering by default
- **Bundle size: ~10KB** (vs Tailwind CDN: 300KB)

### Setup (Literally 2 Commands)

```bash
# Create new Fresh project
deno run -A -r https://fresh.deno.dev my-app
cd my-app

# Start dev server (with hot reload!)
deno task start
```

### Usage Example

```typescript
// routes/index.tsx
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Axis eBoard</title>
      </Head>
      <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <nav class="flex items-center justify-between p-6 bg-white shadow-lg">
          <h1 class="text-3xl font-bold text-gray-800">eBoard</h1>
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Login
          </button>
        </nav>

        <main class="container mx-auto p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cards auto-generate responsive layouts */}
            <Card title="Proposals" count={12} color="blue" />
            <Card title="In Progress" count={5} color="yellow" />
            <Card title="Completed" count={23} color="green" />
          </div>
        </main>
      </div>
    </>
  );
}

interface CardProps {
  title: string;
  count: number;
  color: "blue" | "yellow" | "green";
}

function Card({ title, count, color }: CardProps) {
  const colorClasses = {
    blue: "bg-blue-100 border-blue-500 text-blue-700",
    yellow: "bg-yellow-100 border-yellow-500 text-yellow-700",
    green: "bg-green-100 border-green-500 text-green-700",
  };

  return (
    <div
      class={`p-6 rounded-lg border-l-4 ${
        colorClasses[color]
      } shadow-md hover:shadow-xl transition`}
    >
      <h2 class="text-xl font-semibold mb-2">{title}</h2>
      <p class="text-4xl font-bold">{count}</p>
    </div>
  );
}
```

### Advanced: Custom Twind Config (Optional)

```typescript
// twind.config.ts
import { defineConfig, Preset } from "@twind/core";

export default {
  ...defineConfig({
    theme: {
      extend: {
        colors: {
          brand: {
            primary: "#2b6cb0",
            secondary: "#4a5568",
          },
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "sans-serif"],
        },
      },
    },
  }),
};

// Usage
<div class="bg-brand-primary font-sans">Custom branded component</div>;
```

### Why Twind Wins

- ✅ **10KB** vs Tailwind CDN 300KB
- ✅ **Zero config** out of the box
- ✅ **Production-ready** (used by Deno Deploy dashboard)
- ✅ **Full Tailwind syntax** support
- ✅ **Automatic purging** (unused styles never shipped)
- ✅ **Server-side rendering** (no FOUC - Flash of Unstyled Content)

---

## Option 2: UnoCSS (🚀 Fastest Alternative)

### What is UnoCSS?

- "Instant on-demand atomic CSS engine"
- **3x faster** than Tailwind
- Compatible with Tailwind/Windi syntax
- Deno-friendly (no Node.js needed)

### Setup with Deno

```typescript
// Import UnoCSS runtime (yes, it works in Deno!)
import { createGenerator } from "https://esm.sh/@unocss/core";
import presetUno from "https://esm.sh/@unocss/preset-uno";

const uno = createGenerator({
  presets: [presetUno()],
});

// Generate CSS on-the-fly
const { css } = await uno.generate(`
  <div class="text-blue-500 p-4 rounded-lg">
    Hello UnoCSS!
  </div>
`);

console.log(css); // Outputs: .text-blue-500{color:#3b82f6;} etc.
```

### With Fresh

```typescript
// routes/_middleware.ts
import { createGenerator } from "@unocss/core";
import presetUno from "@unocss/preset-uno";

const uno = createGenerator({ presets: [presetUno()] });

export async function handler(req: Request, ctx: any) {
  const resp = await ctx.next();

  // Inject UnoCSS on every page
  if (resp.headers.get("content-type")?.includes("text/html")) {
    const html = await resp.text();
    const { css } = await uno.generate(html);

    const injected = html.replace(
      "</head>",
      `<style>${css}</style></head>`,
    );

    return new Response(injected, { headers: resp.headers });
  }

  return resp;
}
```

---

## Option 3: CSS Modules (📦 Zero Dependencies)

### Native Deno Support

```typescript
// components/Button.module.css
.button {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.button:hover {
  transform: scale(1.05);
}

.primary {
  composes: button;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

```typescript
// components/Button.tsx
import styles from "./Button.module.css" assert { type: "css" };

export function Button({ variant = "button", children }: any) {
  return (
    <button class={styles[variant]}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary">Click Me</Button>;
```

### Why CSS Modules?

- ✅ **Zero dependencies**
- ✅ **Scoped styles** (no conflicts)
- ✅ **TypeScript support**
- ✅ **Works everywhere** (Deno, browsers, Fresh)

---

## Option 4: Vanilla Extract (🎨 Type-Safe CSS)

### Zero-Runtime CSS-in-TypeScript

```typescript
// styles.css.ts
import { style } from "@vanilla-extract/css";

export const card = style({
  padding: "1.5rem",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",

  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
  },

  // Responsive
  "@media": {
    "(min-width: 768px)": {
      padding: "2rem",
    },
  },
});

export const title = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
});
```

```typescript
// Component.tsx
import * as styles from "./styles.css.ts";

export function Card() {
  return (
    <div class={styles.card}>
      <h2 class={styles.title}>Fully Type-Safe Styles!</h2>
    </div>
  );
}
```

### Benefits

- ✅ **Full TypeScript** autocomplete for CSS
- ✅ **Zero runtime** (CSS extracted at build time)
- ✅ **Type-safe themes** and variants
- ✅ Works with Deno via ESM imports

---

## Option 5: htmx + Plain CSS (🎯 Minimal JS)

### The "No Framework" Approach

```html
<!-- Pure HTML with htmx for interactivity -->
<div class="card" hx-get="/api/stats" hx-trigger="load" hx-swap="innerHTML">
  Loading...
</div>

<style>
  .card {
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

<script src="https://unpkg.com/htmx.org@1.9.10"></script>
```

### With Deno Server

```typescript
// server.ts
Deno.serve((req) => {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/styles.css">
          <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        </head>
        <body>
          <div hx-get="/api/users" hx-trigger="load">Loading...</div>
        </body>
      </html>
    `,
      { headers: { "content-type": "text/html" } },
    );
  }

  if (url.pathname === "/api/users") {
    return new Response(`
      <ul>
        <li>User 1</li>
        <li>User 2</li>
      </ul>
    `);
  }

  return new Response("Not found", { status: 404 });
});
```

---

## Performance Comparison

| Solution                | Bundle Size | Runtime Cost | Build Step     | Deno-Native  |
| ----------------------- | ----------- | ------------ | -------------- | ------------ |
| **Fresh + Twind** ⭐    | 10KB        | Minimal      | ✅ None        | ✅ Yes       |
| **UnoCSS**              | 8KB         | Minimal      | ✅ None        | ✅ Yes       |
| **CSS Modules**         | 0KB         | Zero         | ✅ None        | ✅ Yes       |
| **Vanilla Extract**     | 0KB         | Zero         | ⚠️ Optional    | ✅ Yes       |
| **htmx + CSS**          | 14KB (htmx) | Zero         | ✅ None        | ✅ Yes       |
| Tailwind CDN ❌         | **300KB**   | **High**     | ✅ None        | ⚠️ Not ideal |
| Tailwind Traditional ❌ | 50KB        | Zero         | ❌ **Node.js** | ❌ No        |

---

## Real-World Example: Dashboard Card Component

### Fresh + Twind (Recommended)

```typescript
// islands/StatsCard.tsx
import { signal } from "@preact/signals";

interface Props {
  title: string;
  initialValue: number;
}

export default function StatsCard({ title, initialValue }: Props) {
  const count = signal(initialValue);

  return (
    <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div class="relative z-10">
        <h3 class="text-white/80 text-sm font-medium uppercase tracking-wider">
          {title}
        </h3>
        <p class="mt-2 text-4xl font-bold text-white">
          {count.value}
        </p>
        <button
          onClick={() => count.value++}
          class="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition"
        >
          Increment
        </button>
      </div>

      {/* Animated background effect */}
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </div>
  );
}
```

### Usage

```typescript
// routes/index.tsx
import StatsCard from "../islands/StatsCard.tsx";

export default function Dashboard() {
  return (
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          Dashboard
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Active Proposals" initialValue={42} />
          <StatsCard title="Completed Tasks" initialValue={128} />
          <StatsCard title="Team Members" initialValue={15} />
        </div>
      </div>
    </div>
  );
}
```

**Result:**

- ✅ Interactive islands (only StatsCard has JS)
- ✅ Server-rendered by default (instant FCP)
- ✅ Hot reload in dev
- ✅ Zero build configuration
- ✅ Production-ready

---

## Deployment

### Deno Deploy (Zero Config)

```bash
# Deploy directly from GitHub
deployctl deploy --project=axis-eboard --prod

# Or from local
deno run -A https://deno.land/x/deploy/deployctl.ts deploy --project=axis-eboard main.ts
```

**Features:**

- Global edge network (35+ regions)
- Automatic HTTPS
- Environment variables
- Free tier: 100k requests/day
- **No Docker, no build step, no CI/CD config**

---

## Migration Guide: From Traditional to Deno

### Before (Node.js + Tailwind)

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "webpack": "^5.0.0",
    "babel": "^7.0.0"
  },
  "scripts": {
    "build": "webpack build && tailwindcss -i input.css -o output.css",
    "dev": "webpack serve"
  }
}
```

**Problems:**

- 500MB `node_modules`
- 30+ dependencies
- Complex build chain
- 10+ config files

### After (Deno + Fresh)

```bash
deno run -A -r https://fresh.deno.dev my-app
cd my-app
deno task start
```

**Benefits:**

- **Zero** `node_modules`
- **Zero** config files
- **Zero** build step in dev
- **~10MB** total project size

---

## Recommendations by Project Type

### 1. **Full-Stack App (eBoard, Dashboard)**

→ **Fresh + Twind** (⭐ Best choice)

- Reasoning: Complete solution, SSR, islands, styling all-in-one

### 2. **Static Site / Blog**

→ **Fresh + CSS Modules** or **Lume** (Deno's static site generator)

- Reasoning: Simple, fast, no runtime JS needed

### 3. **Admin Panel / Internal Tool**

→ **htmx + Plain CSS**

- Reasoning: Minimal JS, server-driven, easy to maintain

### 4. **Design System / Component Library**

→ **Vanilla Extract**

- Reasoning: Type-safe, reusable, zero runtime

### 5. **Maximum Performance Critical**

→ **UnoCSS + Preact**

- Reasoning: Smallest bundle, fastest rendering

---

## The Verdict: How Far Can Deno Go?

### ✅ Deno Can 100% Replace Node.js for Frontend

**Evidence:**

1. **Fresh framework** = Next.js for Deno (better DX)
2. **Twind** = Tailwind without build step
3. **Deno Deploy** = Vercel but simpler
4. **JSX/TSX native** = No babel needed
5. **Import maps** = No bundler needed (dev)
6. **esbuild integration** = Fast production builds (when needed)

**What Deno Does BETTER:**

- Zero config
- TypeScript by default
- Web standards (fetch, Response, Request)
- Permission system (security)
- Single executable (no `package.json` hell)

**What Deno Lacks (Currently):**

- ~~Large ecosystem~~ (Solved: npm: imports work)
- ~~Complex state management~~ (Solved: Preact signals)
- ~~CSS-in-JS~~ (Solved: Twind, Vanilla Extract)

### 🎯 Bottom Line

**For Axis eBoard:**

```bash
# This is literally all you need:
deno run -A -r https://fresh.deno.dev axis-eboard
cd axis-eboard
deno task start

# You now have:
# ✅ TypeScript
# ✅ SSR
# ✅ Tailwind (via Twind)
# ✅ Hot reload
# ✅ Zero config
# ✅ Production-ready
```

**Deno has achieved feature parity with Node.js for web development, with significantly better
developer experience.**

---

## Next Steps

1. **Try Fresh:**
   ```bash
   deno run -A -r https://fresh.deno.dev test-app
   ```

2. **Experiment with Twind:**
   - Edit `routes/index.tsx`
   - Add Tailwind classes
   - See instant updates

3. **Compare bundle sizes:**
   ```bash
   deno task build
   # Check _fresh/static/ folder
   ```

4. **Deploy to edge:**
   ```bash
   deployctl deploy --project=test
   ```

5. **Report back:**
   - Share findings
   - Identify gaps (if any)
   - Refine SRS/TRD docs

---

**Conclusion:** Deno + Fresh + Twind = **Zero Compromise Frontend Stack**

No Node.js. No npm. No webpack. No babel. No postcss.\
Just TypeScript, Web Standards, and Pure Speed. 🚀
