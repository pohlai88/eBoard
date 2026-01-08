# Deno Package Quick Reference

## 🎯 Use This When You Need...

### Web Framework?

```bash
deno add jsr:@hono/hono          # Ultra-light, fast (RECOMMENDED)
deno add jsr:@fresh/fresh        # Full-stack, Next.js-like
deno add jsr:@oak/oak            # Express-style middleware
```

### Database?

```bash
deno add jsr:@db/sqlite          # SQLite - simplest (RECOMMENDED)
deno add npm:mongoose            # MongoDB with ORM
deno add npm:drizzle-orm         # Type-safe ORM for SQL
deno add npm:postgres            # PostgreSQL native
```

### Validation?

```bash
deno add npm:zod                 # Type-safe validation (RECOMMENDED)
deno add jsr:@valibot/valibot   # Lightweight alternative
deno add npm:joi                 # Schema validation
```

### Authentication?

```bash
deno add jsr:@std/jwt            # JWT tokens (RECOMMENDED)
deno add npm:bcrypt              # Password hashing
```

### Testing?

```bash
deno test                         # Built-in (RECOMMENDED)
deno add npm:vitest              # Fast testing framework
```

### Utilities?

```bash
deno add jsr:@std/dotenv         # Environment variables (RECOMMENDED)
deno add npm:date-fns            # Date manipulation
deno add npm:lodash              # Utility functions
```

### Frontend?

```bash
deno add npm:react npm:react-dom # React
deno add npm:vue                 # Vue
deno add npm:preact              # Lightweight React
```

### Logging?

```bash
deno add npm:pino                # Fast logging (RECOMMENDED)
deno add npm:winston             # Full-featured logging
```

---

## One-Command Setups

### Minimal API Server

```bash
deno add jsr:@hono/hono jsr:@std/dotenv
```

### Full-Stack App

```bash
deno add jsr:@hono/hono jsr:@db/sqlite npm:zod npm:drizzle-orm jsr:@std/dotenv
```

### Real-Time App

```bash
deno add jsr:@hono/hono npm:socket.io jsr:@std/jwt
```

### React Frontend + Backend

```bash
deno add npm:react npm:react-dom npm:vite jsr:@hono/hono npm:zod
```

---

## Registry Comparison

| Registry | Best For          | Examples                       |
| -------- | ----------------- | ------------------------------ |
| **JSR**  | Deno-native, fast | @std/*, @hono/hono, @db/sqlite |
| **NPM**  | Node.js packages  | mongoose, express, react       |
| **URL**  | Direct imports    | https://deno.land/std/...      |

**Rule:** Try JSR first, use NPM for what JSR doesn't have.

---

## Adding Packages (Simple Workflow)

```bash
# 1. Identify what you need
# Example: "I need a database"

# 2. Search JSR first
# https://jsr.io/search?q=database

# 3. Add with one command
deno add jsr:@db/sqlite

# 4. It's in deno.json automatically
# 5. Import and use!
```

---

## Example: Build a Todo API

```bash
# 1. Framework
deno add jsr:@hono/hono

# 2. Database
deno add jsr:@db/sqlite

# 3. Validation
deno add npm:zod

# 4. Environment
deno add jsr:@std/dotenv
```

**Result:** Production-ready todo API in seconds!

---

## Resources

- **JSR Registry:** https://jsr.io
- **NPM Registry:** https://www.npmjs.com
- **Deno Docs:** https://docs.deno.com
- **Standard Library:** https://deno.land/std

---

## Pro Tips

✅ Keep imports minimal - add only what you use ✅ Check @std/ first before looking at NPM ✅ Read
JSR package documentation ✅ Test in development before production ✅ Use `deno lock.json` for
reproducible builds
