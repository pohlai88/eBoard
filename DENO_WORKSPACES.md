# Deno Workspaces: Monorepo & Multi-App Architecture

## Yes! Deno Workspaces = Monorepo Power ✅

Deno has **native workspace support** - no additional tools needed (unlike Node.js which needs pnpm/yarn/lerna).

---

## Your Exact Use Case: Admin API + Full Website

**Setup:**
```
Axis_eBoard/
├── deno.json                    ← Root workspace config
├── admin-api/                   ← Lightweight Admin (Hono)
│   ├── deno.json               ← Independent config
│   ├── main.ts
│   └── deps.ts
├── main-app/                    ← Full App (Fresh/React)
│   ├── deno.json               ← Independent config
│   ├── main.ts
│   └── deps.ts
└── shared/                      ← Shared code (optional)
    ├── deno.json
    ├── types.ts
    └── utils.ts
```

---

## Root Workspace Config

**deno.json** (at root):
```json
{
  "workspace": ["./admin-api", "./main-app", "./shared"],
  "tasks": {
    "dev:admin": "deno run -A admin-api/main.ts",
    "dev:app": "deno run -A main-app/main.ts",
    "dev:all": "deno task dev:admin & deno task dev:app",
    "fmt": "deno fmt",
    "lint": "deno lint"
  }
}
```

---

## Admin API Setup (Lightweight - Hono)

**admin-api/deno.json:**
```json
{
  "name": "@axis/admin-api",
  "version": "1.0.0",
  "imports": {
    "@hono/hono": "jsr:@hono/hono@^4.11.3",
    "@std/dotenv": "jsr:@std/dotenv@^0.224.0",
    "@shared": "../shared/mod.ts"
  },
  "tasks": {
    "dev": "deno run --allow-net --allow-env --watch main.ts",
    "start": "deno run --allow-net --allow-env main.ts"
  }
}
```

**admin-api/main.ts:**
```typescript
import { Hono } from "@hono/hono";
import { load } from "@std/dotenv";

const env = await load();
const app = new Hono();

// Super lightweight - just admin functions
app.get("/", (c) => c.json({ status: "admin api running" }));

app.get("/dashboard", (c) => c.json({
  users: 1234,
  posts: 5678,
  visits_today: 89
}));

app.post("/users/:id/ban", async (c) => {
  const id = c.req.param("id");
  // Ban logic here
  return c.json({ banned: true, user_id: id });
});

const port = parseInt(env["ADMIN_PORT"] || "3001");
Deno.serve({ port }, app.fetch);
console.log(`✅ Admin API on port ${port}`);
```

**Why Hono for Admin?**
- ✅ Ultra-light (no rendering overhead)
- ✅ Fast API endpoints
- ✅ Minimal dependencies
- ✅ Low resource usage (good for low-traffic admin)
- ✅ Can run on tiny server

---

## Main App Setup (Full-Stack - Fresh)

**main-app/deno.json:**
```json
{
  "name": "@axis/main-app",
  "version": "1.0.0",
  "imports": {
    "fresh": "jsr:@fresh/fresh@^1.6.0",
    "@preact/signals": "jsr:@preact/signals@^1.2.0",
    "@std/dotenv": "jsr:@std/dotenv@^0.224.0",
    "@shared": "../shared/mod.ts"
  },
  "tasks": {
    "dev": "deno run -A --watch main.ts",
    "start": "deno run -A main.ts",
    "build": "deno run -A build.ts"
  }
}
```

**main-app/main.ts:**
```typescript
import { start } from "fresh/server.ts";
import { load } from "@std/dotenv";

const env = await load();

// Full Fresh app with SSR, islands, etc.
await start(import.meta.url, {
  port: parseInt(env["APP_PORT"] || "3000"),
  hostname: "0.0.0.0"
});

console.log(`✅ Main App running`);
```

**Why Fresh for Main App?**
- ✅ Full-stack capabilities
- ✅ Server-side rendering
- ✅ Island architecture (interactive parts)
- ✅ Built-in routing
- ✅ Static file serving
- ✅ Optimized for production

---

## Shared Code (Optional but Recommended)

**shared/deno.json:**
```json
{
  "name": "@axis/shared",
  "version": "1.0.0",
  "exports": "./mod.ts",
  "imports": {
    "zod": "npm:zod@^3.22.0"
  }
}
```

**shared/mod.ts:**
```typescript
// Re-export everything shared
export * from "./types.ts";
export * from "./utils.ts";
export * from "./validation.ts";
```

**shared/types.ts:**
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Post {
  id: string;
  title: string;
  content: string;
}
```

**shared/validation.ts:**
```typescript
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["admin", "user"])
});

export const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(5),
  content: z.string().min(10)
});
```

**Both apps can import shared:**
```typescript
// In admin-api/main.ts
import { User, UserSchema } from "@shared";

// In main-app/main.ts  
import { Post, PostSchema } from "@shared";
```

---

## Independent Deployment ✅

### Option 1: Deploy Separately (Recommended)

**Admin API → Deno Deploy (Edge)**
```bash
cd admin-api
deno deploy  # Deploy just this
```

**Main App → Deno Deploy (or Vercel)**
```bash
cd main-app
deno deploy  # Deploy just this
```

**They have:**
- ✅ Different domains (or subdomains)
- ✅ Independent scaling
- ✅ Separate databases (if needed)
- ✅ Independent CI/CD

**Example:**
```
Admin API: api.admin.example.com (port 3001, minimal resources)
Main App:  www.example.com (port 3000, full infrastructure)
```

### Option 2: Same Server, Different Ports

**Run both locally:**
```bash
# Terminal 1
deno task dev:admin

# Terminal 2
deno task dev:app
```

**Both running:**
- Admin API: http://localhost:3001
- Main App: http://localhost:3000

### Option 3: Docker Compose (Production)

```dockerfile
# Dockerfile.admin
FROM denoland/deno:latest
WORKDIR /app
COPY admin-api /app
CMD ["deno", "run", "--allow-net", "--allow-env", "main.ts"]
```

```dockerfile
# Dockerfile.main
FROM denoland/deno:latest
WORKDIR /app
COPY main-app /app
CMD ["deno", "run", "-A", "main.ts"]
```

**docker-compose.yml:**
```yaml
version: "3"
services:
  admin-api:
    build:
      context: .
      dockerfile: Dockerfile.admin
    ports:
      - "3001:3001"
    environment:
      ADMIN_PORT: 3001

  main-app:
    build:
      context: .
      dockerfile: Dockerfile.main
    ports:
      - "3000:3000"
    environment:
      APP_PORT: 3000
    depends_on:
      - admin-api
```

**Deploy with:**
```bash
docker-compose up -d
```

---

## Key Advantages of This Setup

| Aspect | Benefit |
|--------|---------|
| **Code Organization** | Clear separation of concerns |
| **Scaling** | Scale admin separately (minimal) |
| **Technology** | Use right tool for each job |
| **Deployment** | Independent CI/CD pipelines |
| **Resource Usage** | Admin doesn't waste resources on rendering |
| **Development** | Teams can work independently |
| **Shared Code** | DRY principle with shared types |
| **No Tech Debt** | Each part optimized for its purpose |

---

## Important: Shared Dependencies

**Root deno.lock.json covers all workspaces:**
```bash
# Regenerate lock file (includes all workspaces)
deno cache --lock=deno.lock --lock-write admin-api/deno.json main-app/deno.json

# Check all
deno lint
deno fmt
```

All workspace dependencies are tracked in **one lock file** at root!

---

## Real-World Architecture

```
axis-eboard/
├── README.md
├── deno.json                    ← Workspace root
├── deno.lock                    ← Single lock for all
│
├── admin-api/                   ← Lightweight API
│   ├── deno.json
│   ├── main.ts                  ← Hono server
│   ├── routes/
│   │   ├── users.ts
│   │   ├── dashboard.ts
│   │   └── settings.ts
│   ├── db.ts                    ← SQLite connection
│   └── .env                     ← Admin-specific env
│
├── main-app/                    ← Full-stack app
│   ├── deno.json
│   ├── main.ts                  ← Fresh server
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── blog/
│   │   └── api/
│   ├── islands/
│   │   ├── Counter.tsx
│   │   └── Header.tsx
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── Footer.tsx
│   └── .env                     ← App-specific env
│
├── shared/                      ← Shared code
│   ├── deno.json
│   ├── mod.ts
│   ├── types.ts                 ← User, Post types
│   ├── validation.ts            ← Zod schemas
│   ├── utils/
│   │   ├── api.ts               ← Fetch utilities
│   │   └── format.ts            ← Formatting
│   └── db/
│       ├── schema.ts            ← DB schema
│       └── queries.ts           ← Shared queries
│
└── docs/
    ├── ARCHITECTURE.md
    ├── DEPLOYMENT.md
    └── SETUP.md
```

---

## Deployment Strategy

**Admin API (Lightweight):**
```bash
# Option A: Deno Deploy Edge (free tier is fine)
# Option B: Cheap VPS ($2-5/month)
# Option C: Included in main app server

# Scale: Handles 100-1000 requests/day easily
```

**Main App (Full-stack):**
```bash
# Option A: Deno Deploy Pro (if you need edge)
# Option B: Standard VPS ($10-50/month)
# Option C: Traditional hosting (they support Node, but Deno better!)

# Scale: Production-grade infrastructure
```

---

## Zero Tech Debt Approach

✅ **Use right tool for job**
- Admin = Hono (minimal overhead)
- App = Fresh (full capabilities)

✅ **Share types, not code**
- Central type definitions
- No duplication
- Validation in one place

✅ **Independent scaling**
- Admin doesn't scale based on app traffic
- Can run admin on edge network (very cheap)
- App scales independently

✅ **Clear separation**
- Admin engineers can optimize for speed
- App engineers can optimize for UX
- No stepping on each other's toes

✅ **Easy to change**
- Swap admin framework later if needed
- Upgrade app separately
- No monolithic lock-in

---

## Example Commands

```bash
# Root level
deno task fmt                   # Format all workspaces
deno task lint                  # Lint all workspaces
deno task dev:admin            # Just admin
deno task dev:app              # Just app
deno task dev:all              # Both simultaneously

# Individual workspace
cd admin-api
deno task dev                  # Dev admin only
deno deploy                    # Deploy admin only

cd ../main-app
deno task dev                  # Dev app only
deno deploy                    # Deploy app only
```

---

## This Solves Your "No Tech Debt" Concern

**Your exact scenario:**

✅ Admin API is lightweight (Hono) → Stays fast, minimal resources
✅ Main app is full-featured (Fresh) → Rich UX, proper SSR
✅ Completely separate → Can evolve independently
✅ Shared types → No duplication
✅ Deploy individually → Pay only for what you use
✅ No "BS rendering" on admin → Just JSON APIs
✅ HTTPS on main app → Vercel/custom domain
✅ Can scale differently → Admin on edge (cheap), app on standard (powerful)

**You're not compromising either application for the other!**

---

## Bottom Line

**Yes, Deno workspaces = monorepo = perfect for your use case!**

You get:
- 🎯 Right tool for each job
- 📦 Single lock file (no version conflicts)
- 🚀 Independent deployment
- 💰 Independent scaling (save money on admin)
- ✨ Zero tech debt (each part optimized)
- 🔄 Shared code without duplication

**Start with this structure and you'll never regret it!**
