# Deno Workspace - Your Lego Architecture 🧱

## ✅ Workspace Created!

```
Axis_eBoard/                    ← ROOT (Coordinator)
├── deno.json                   ← Workspace definition
├── deno.lock                   ← Single lock file
│
├── admin-api/                  ← Hono API
│   ├── deno.json
│   ├── main.ts                 ← Ultra-light admin API
│   └── (add routes here)
│
├── main-app/                   ← Your main application
│   ├── deno.json
│   ├── main.ts                 ← Placeholder (ready for Fresh/your choice)
│   └── (add your framework here)
│
├── shared/                     ← Shared code
│   ├── deno.json
│   ├── mod.ts                  ← Exports everything
│   ├── types.ts                ← User, Post, Dashboard types
│   ├── validation.ts           ← Zod schemas
│   └── utils.ts                ← Shared functions
│
└── (documentation files)
```

---

## 🚀 How to Run

### Run Admin API Only
```bash
deno task dev:admin
# or
cd admin-api && deno task dev
```
Runs on **http://localhost:3001**

### Run Main App Only
```bash
deno task dev:app
# or
cd main-app && deno task dev
```
Runs on **http://localhost:3000**

### Run Both (in separate terminals)
```bash
# Terminal 1
deno task dev:admin

# Terminal 2
deno task dev:app
```

### Format All Workspaces
```bash
deno fmt
```

### Lint All Workspaces
```bash
deno lint
```

### Test All Workspaces
```bash
deno test
```

---

## 📦 Workspace Structure

### Root `deno.json` (Coordinator)
```json
{
  "workspace": ["./admin-api", "./main-app", "./shared"],
  "tasks": {
    "dev:admin": "deno run ... admin-api/main.ts",
    "dev:app": "deno run ... main-app/main.ts",
    "fmt": "deno fmt",
    "lint": "deno lint"
  }
}
```

### Admin API `deno.json`
```json
{
  "name": "@axis/admin-api",
  "exports": "./main.ts",
  "imports": {
    "@hono/hono": "jsr:@hono/hono@^4.11.3"
  }
}
```

### Main App `deno.json`
```json
{
  "name": "@axis/main-app",
  "exports": "./main.ts",
  "imports": {}
}
```

### Shared `deno.json`
```json
{
  "name": "@axis/shared",
  "exports": "./mod.ts",
  "imports": {
    "zod": "npm:zod@^3.22.0"
  }
}
```

---

## 📝 What's in Each Workspace

### `admin-api/main.ts` - Hono Server
```typescript
import { Hono } from "@hono/hono";

const app = new Hono();

// Lightweight endpoints
app.get("/", (c) => c.json({ status: "admin api running" }));
app.get("/dashboard", (c) => c.json({ users: 1234 }));
app.post("/users/:id/ban", (c) => c.json({ banned: true }));

Deno.serve({ port: 3001 }, app.fetch);
```

**Features:**
- ✅ Ultra-fast (Hono is tiny)
- ✅ No rendering overhead
- ✅ Perfect for admin APIs
- ✅ Low resource usage
- ✅ Port 3001

---

### `main-app/main.ts` - Your Main App
Currently a placeholder. Ready for:
- Fresh (Full-stack framework like Next.js)
- Hono (if you prefer lightweight)
- Oak (Express-style)
- Your custom framework

Add your framework and code here!

---

### `shared/` - Shared Code

**types.ts** - Interfaces
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
}

export interface Post {
  id: string;
  title: string;
  content: string;
}
```

**validation.ts** - Zod Schemas
```typescript
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email()
});
```

**utils.ts** - Helper Functions
```typescript
export function generateId(): string { ... }
export function createApiResponse<T>(...) { ... }
```

**Both workspaces import from shared:**
```typescript
import { User, UserSchema, generateId } from "@shared";
```

---

## 🔄 Workflow

### 1. Develop Locally
```bash
# Terminal 1 - Admin API
deno task dev:admin
# See changes instantly at http://localhost:3001

# Terminal 2 - Main App
deno task dev:app
# See changes instantly at http://localhost:3000
```

### 2. Add Features to Shared
Edit `shared/types.ts`, `shared/validation.ts`, etc.
Both apps automatically see the updates!

### 3. Format & Lint Everything
```bash
deno fmt    # Formats all files
deno lint   # Checks all files
```

### 4. Deploy Independently
```bash
# Deploy admin-api
cd admin-api && deno deploy

# Deploy main-app separately
cd main-app && deno deploy
```

---

## 💡 Key Points

✅ **Zero coupling** - Apps are completely independent
✅ **Shared code** - No duplication via `@shared`
✅ **Single lock file** - No version conflicts
✅ **Independent scaling** - Admin on cheap tier, app on powerful tier
✅ **Separate CI/CD** - Deploy independently
✅ **Clear separation** - Easy to understand structure
✅ **Right tool for job** - Hono for admin, Fresh/anything for main app

---

## 🛠️ Next Steps

### Add Framework to Main App
```bash
# Option 1: Fresh (Full-stack, like Next.js)
cd main-app && deno add jsr:@fresh/fresh

# Option 2: Stay with lightweight Hono
cd main-app && deno add jsr:@hono/hono

# Option 3: Try Oak
cd main-app && deno add jsr:@oak/oak
```

### Add More Features
```bash
# Add database to admin-api
cd admin-api && deno add jsr:@db/sqlite

# Add React to main-app
cd main-app && deno add npm:react npm:react-dom

# Both can use shared validation
cd main-app && deno run main.ts  # Automatically sees @shared
```

### Create More Workspaces
Want a separate analytics app? Mobile API? Blog?
```bash
# Just add to root deno.json
{
  "workspace": ["./admin-api", "./main-app", "./shared", "./analytics", "./blog"]
}
```

---

## Test It Now!

### Test Admin API
```bash
deno task dev:admin
# Open new terminal/browser
curl http://localhost:3001
curl http://localhost:3001/dashboard
```

### Test Shared Types
The admin-api already imports from `@shared`!

### Test Everything Formatting
```bash
deno fmt
deno lint
```

---

## This is Your Production-Ready Architecture! 🎉

You now have:
- ✅ Proper monorepo structure
- ✅ Lightweight admin API (Hono)
- ✅ Ready-to-extend main app
- ✅ Shared code repository
- ✅ Type-safe across apps (Zod schemas)
- ✅ Independent deployment capability
- ✅ Zero tech debt approach

**No frameworks fighting. No bloat. Just clean, modular code.**

Start building! 🚀
