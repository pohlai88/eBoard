# Deno Ecosystem & Compatible Dependencies

## The Deno Ecosystem Overview

Deno has access to **two major package registries** plus direct imports:

### 1. **JSR** (JavaScript Registry) - Native Deno 🎯
- Modern, Deno-optimized packages
- Zero configuration needed
- Built for TypeScript
- Fast, reliable CDN
- **Recommended first choice**

**Usage:**
```bash
deno add jsr:@std/http
deno add jsr:@hono/hono
```

### 2. **NPM Registry** - Node.js Packages ✅
- Millions of existing packages
- Full Node.js ecosystem access
- Compatible via Node compatibility mode
- Works, but heavier

**Usage:**
```bash
deno add npm:express
deno add npm:react
deno add npm:mongoose
```

### 3. **Direct URL Imports** - Any HTTP Source
```typescript
import { serve } from "https://deno.land/std/http/mod.ts";
```

---

## Web Frameworks (Pick One)

### 🏆 **Fresh** (Most Popular - Deno-Native)
Full-stack, like Next.js
```bash
deno run -A -r https://fresh.deno.dev my-app
```
**Features:**
- Island architecture
- Server-side rendering
- Built for Deno
- Zero JavaScript by default

---

### ⚡ **Hono** (Lightweight & Fast)
Tiny web framework, like Express
```bash
deno add jsr:@hono/hono
```
**Features:**
- Ultra-fast routing
- Middleware support
- Works on Edge/Workers
- Very popular

---

### 🛣️ **Oak** (Express-like Middleware)
Classic middleware framework
```bash
deno add jsr:@oak/oak
```
**Features:**
- Express-like API
- Router support
- Middleware ecosystem
- Traditional approach

---

### 🎭 **Aleph.js** (React Framework)
React with Deno
```bash
deno add npm:aleph
```
**Features:**
- React support
- File-based routing
- Hot module replacement
- React ecosystem

---

## Database Clients

### SQL Databases

**PostgreSQL:**
```bash
deno add jsr:@std/postgres
# OR
deno add npm:pg
```

**MySQL:**
```bash
deno add npm:mysql2
deno add npm:mysql
```

**SQLite:**
```bash
deno add jsr:@db/sqlite
```

**MongoDB:**
```bash
deno add npm:mongoose
deno add npm:mongodb
```

**Prisma ORM** (Multi-database):
```bash
deno add npm:@prisma/client
deno add -D npm:prisma
```

**Drizzle ORM** (Type-safe):
```bash
deno add npm:drizzle-orm
deno add npm:drizzle-kit
```

---

## Validation & Parsing

**Zod** (Type-safe validation):
```bash
deno add npm:zod
```

**Joi** (Schema validation):
```bash
deno add npm:joi
```

**Valibot** (Lightweight validation):
```bash
deno add jsr:@valibot/valibot
```

**TypeBox** (JSON Schema):
```bash
deno add npm:@sinclair/typebox
```

---

## Authentication & Security

**JWT Tokens:**
```bash
deno add jsr:@std/jwt
deno add npm:jsonwebtoken
```

**Bcrypt (Password Hashing):**
```bash
deno add npm:bcrypt
```

**CORS Middleware:**
```bash
deno add jsr:@std/http/cors
deno add npm:cors
```

**OAuth2:**
```bash
deno add npm:openid-client
```

---

## API & HTTP Tools

**Fetch API** (Built-in):
```typescript
const response = await fetch("https://api.example.com");
```

**Axios Alternative:**
```bash
deno add npm:axios
deno add npm:undici  # Modern Fetch-based
```

**REST Client Testing:**
```bash
deno add npm:@types/node  # For testing
```

---

## Testing Frameworks

**Native Deno Test** (Built-in):
```bash
deno test
```
No installation needed!

**Vitest** (Fast testing):
```bash
deno add npm:vitest
```

**Jest** (Popular testing):
```bash
deno add npm:jest
```

**Testing Library:**
```bash
deno add npm:@testing-library/react
```

---

## Development Tools

### Linting & Formatting

**Built-in Deno:**
```bash
deno fmt      # Format code
deno lint     # Check issues
```

**ESLint:**
```bash
deno add npm:eslint
```

**Prettier:**
```bash
deno add npm:prettier
```

### Type Checking

**Built-in Deno:**
```bash
deno check   # Type-check
```

---

## Utilities & Libraries

**Lodash** (Utility functions):
```bash
deno add npm:lodash
```

**Date Library:**
```bash
deno add npm:date-fns
deno add npm:dayjs
```

**Environment Variables:**
```bash
deno add jsr:@std/dotenv
deno add npm:dotenv
```

**HTTP Server Utilities:**
```bash
deno add jsr:@std/http
```

**File System Utilities:**
```bash
deno add jsr:@std/fs
```

**Path Utilities:**
```bash
deno add jsr:@std/path
```

**Colors (Terminal Output):**
```bash
deno add jsr:@std/fmt/colors
```

---

## Frontend Frameworks

**React:**
```bash
deno add npm:react npm:react-dom
```

**Vue:**
```bash
deno add npm:vue
```

**Preact** (Lightweight React alternative):
```bash
deno add npm:preact
```

**Solid.js** (Reactive framework):
```bash
deno add npm:solid-js
```

**Svelte:**
```bash
deno add npm:svelte
```

---

## Monitoring & Logging

**Winston** (Logging):
```bash
deno add npm:winston
```

**Pino** (Fast logging):
```bash
deno add npm:pino
```

**Sentry** (Error tracking):
```bash
deno add npm:@sentry/node
```

---

## Real-Time & WebSocket

**WebSocket** (Built-in):
```typescript
const ws = new WebSocket("ws://localhost:8000");
```

**Socket.io:**
```bash
deno add npm:socket.io
```

**Deno WebSocket:**
```bash
deno add jsr:@std/ws
```

---

## Complete Example Stacks

### 🔥 **Full-Stack Modern App** (Recommended)

```bash
# Framework
deno add jsr:@hono/hono

# Database
deno add jsr:@db/sqlite
deno add npm:drizzle-orm

# Validation
deno add npm:zod

# Authentication
deno add jsr:@std/jwt

# Utilities
deno add jsr:@std/dotenv
deno add npm:date-fns
```

**deno.json:**
```json
{
  "tasks": {
    "dev": "deno run --allow-net --allow-read --allow-write --allow-env main.ts",
    "test": "deno test",
    "fmt": "deno fmt",
    "lint": "deno lint"
  },
  "imports": {
    "@hono/hono": "jsr:@hono/hono@^4.11.3",
    "@db/sqlite": "jsr:@db/sqlite@^0.11.0",
    "drizzle-orm": "npm:drizzle-orm@^0.28.0",
    "drizzle-kit": "npm:drizzle-kit@^0.20.0",
    "zod": "npm:zod@^3.22.0",
    "date-fns": "npm:date-fns@^2.30.0"
  }
}
```

---

### 🎨 **Frontend + Backend Stack**

```bash
# Frontend
deno add npm:react npm:react-dom

# Backend
deno add jsr:@hono/hono
deno add npm:mongodb

# Dev Tools
deno add npm:vite
deno add npm:@vitejs/plugin-react
```

---

### 📱 **API Server Stack**

```bash
# Framework
deno add jsr:@hono/hono

# Database
deno add npm:postgres

# Validation
deno add npm:zod

# Auth
deno add jsr:@std/jwt
deno add npm:bcrypt

# Monitoring
deno add npm:pino
```

---

## How to Discover Packages

### 1. **JSR Search** (Recommended)
Visit: https://jsr.io/search
- Filter by category
- Sort by popularity
- Check documentation
- See examples

### 2. **NPM Registry**
Visit: https://www.npmjs.com/
- Search any package
- Check downloads
- Read reviews

### 3. **Deno Standards Library**
Visit: https://deno.land/std
- Official utilities
- No external dependencies
- Trusted and stable

### 4. **GitHub Search**
Search for "deno" + package name
- See source code
- Check issues
- Read documentation

---

## Best Practices

### ✅ **Prefer JSR over NPM**
```bash
# Good
deno add jsr:@std/http

# Works, but heavier
deno add npm:express
```

### ✅ **Use Import Maps**
```json
{
  "imports": {
    "hono": "jsr:@hono/hono@^4.11.3",
    "zod": "npm:zod@^3.22.0"
  }
}
```

### ✅ **Keep deno.json Clean**
```bash
# Add to deno.json
deno add jsr:@package/name

# Never manually edit version strings
# Let Deno manage it
```

### ✅ **Check Compatibility**
Before adding npm packages:
1. Check if JSR alternative exists
2. Read Deno compatibility notes
3. Test in development first

---

## Quick Reference Table

| Category | Best Choice | Alternative |
|----------|-------------|------------|
| Web Framework | Fresh or Hono | Oak |
| Database ORM | Drizzle | Prisma, Mongoose |
| Validation | Zod | Valibot, TypeBox |
| Testing | Deno native | Vitest, Jest |
| Utilities | @std/ | lodash, date-fns |
| Frontend | React | Vue, Preact, Solid |
| Authentication | @std/jwt | jsonwebtoken |
| HTTP | Built-in fetch | Axios, Undici |
| Environment | @std/dotenv | dotenv |
| Colors | @std/fmt/colors | chalk, picocolors |

---

## Current Project Setup

Your `deno.json`:
```json
{
  "imports": {
    "@std/": "https://deno.land/std@0.224.0/",
    "@hono/hono": "jsr:@hono/hono@^4.11.3"
  }
}
```

**Next steps to expand:**
```bash
# Add database
deno add jsr:@db/sqlite

# Add validation
deno add npm:zod

# Add utilities
deno add jsr:@std/dotenv
```

---

## Start Simple, Expand Later

**Day 1-2:** Basic server (Hono)
**Week 1:** Add database (SQLite)
**Week 2:** Add validation (Zod)
**Week 3+:** Add features as needed

Don't add everything at once - **add dependencies when you need them!**
