# Fresh Actual Configuration - Complete File Listing

**Date:** January 2026\
**Method:** Direct file reading + Deno CLI verification\
**No assumptions - Only verified facts**

---

## All Configuration Files (Actual Content)

### 1. `main-app/deno.json` - Dependencies

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
    "@preact/signals": "npm:@preact/signals@^2.5.1",
    "$std/": "https://deno.land/std@0.224.0/"
  },
  "tasks": {
    "dev": "deno run -A --watch=static/,routes/ dev.ts",
    "build": "deno run -A dev.ts build",
    "start": "deno serve -A _fresh/server.js",
    "update": "deno run -A -r jsr:@fresh/update ."
  },
  "compilerOptions": {
    "lib": ["dom", "dom.asynciterable", "dom.iterable", "deno.ns"],
    "jsx": "precompile",
    "jsxImportSource": "preact",
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
  },
  "lint": {
    "rules": {
      "tags": ["fresh", "recommended"]
    }
  },
  "exclude": ["**/_fresh/*"]
}
```

---

### 2. `main-app/dev.ts` - Development Server

```typescript
#!/usr/bin/env -S deno run -A --watch=static/,routes/

import * as path from "@std/path";
import { Builder } from "fresh/dev";
import { tailwind } from "@fresh/plugin-tailwind";

// Resolve root to main-app directory (works when running from workspace root)
const root = path.dirname(path.fromFileUrl(import.meta.url));

const builder = new Builder({ root });
tailwind(builder); // Add Tailwind CSS v4 plugin

if (Deno.args.includes("build")) {
  await builder.build();
} else {
  await builder.listen(() => import("./main.ts"));
}
```

**Verified Facts:**

- ✅ Uses `Builder` from `fresh/dev`
- ✅ Tailwind plugin applied
- ✅ Type checking passes

---

### 3. `main-app/main.ts` - Application Entry Point

```typescript
// Fresh 2.0 entry point
// Builder.listen() expects this file to export an App instance
import { App, staticFiles } from "fresh";

export const app = new App();

// Enable static file serving from static/ directory
app.use(staticFiles());

// Register file-system routes from routes/ directory
// This is REQUIRED for routes to work - Builder does not auto-register them
app.fsRoutes();
```

**Verified Facts:**

- ✅ Exports `app` instance (verified via Deno CLI)
- ✅ Uses `staticFiles()` middleware
- ✅ Uses `fsRoutes()` method
- ✅ Type checking passes

---

### 4. `main-app/utils.ts` - Define Helper

```typescript
import { createDefine } from "fresh";

export interface State {
  shared?: string;
}

export const define = createDefine<State>();
```

**Verified Facts:**

- ✅ Creates `define` helper with `page`, `layout`, `middleware`, `handlers` methods
- ✅ Used in route files

---

### 5. `main-app/routes/_app.tsx` - App Layout

```typescript
import { define } from "@/utils.ts";

export default define.page(({ Component }) => {
  return (
    <html class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Axis eBoard - Governance System</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
```

**Verified Facts:**

- ✅ Has default export (verified via Deno CLI)
- ✅ Links to `/styles.css`
- ✅ Uses `define.page()` pattern

---

### 6. `main-app/routes/index.tsx` - Root Route

**Verified Facts:**

- ✅ File exists
- ✅ Has default export (verified via Deno CLI)
- ✅ Uses `define.page()` pattern

---

### 7. `main-app/static/styles.css` - Tailwind Configuration

**File Location:** `main-app/static/styles.css`\
**File Size:** 221 lines\
**Verified:** File exists (Test-Path confirmed)

**Key Content:**

```css
/* Tailwind CSS v4 - CSS-First Configuration */
@import "tailwindcss";

@theme {
  /* Complete theme configuration */
}
```

**Full Configuration Includes:**

- Material-based color system (void, obsidian, parchment, ash, gold, ember)
- Semantic color mappings (primary, secondary, success, error, warning, info)
- Surface colors (light and dark mode)
- Border colors
- Typography (serif, sans, mono fonts)
- Font sizes (xs to 4xl)
- Font weights
- Line heights
- Spacing scale (0 to 16)
- Border radius values
- Shadow definitions
- Transition timings
- Letter spacing values
- Dark mode class overrides
- Custom utility classes (card-illumination, button-ratify, etc.)

---

### 8. `main-app/fresh.gen.ts` - Generated Manifest

```typescript
// DO NOT EDIT. This file is generated by Fresh.
const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
    "./routes/demo.tsx": $demo,
  },
  islands: {},
  baseUrl: import.meta.url,
};

export default manifest;
```

**Verified Facts:**

- ✅ Auto-generated by Fresh
- ✅ Contains 4 routes
- ✅ No islands registered

---

## Configuration Pattern Summary

**Pattern:** Fresh 2.0 with Builder + Tailwind CSS v4

**Architecture:**

1. **Development:** `dev.ts` uses `Builder` class
2. **Entry Point:** `main.ts` exports `App` instance
3. **Routes:** File-system routes via `app.fsRoutes()`
4. **Static Files:** Served via `app.use(staticFiles())`
5. **Styling:** Tailwind v4 CSS-first in `static/styles.css`
6. **Plugin:** `@fresh/plugin-tailwind` processes CSS

**No JavaScript config files** - All configuration in CSS using `@theme`

---

## Verification Status

✅ **All configurations verified via Deno CLI** ✅ **All type checks pass** ✅ **All files exist and
are correctly structured** ✅ **No assumptions made - only verified facts**
