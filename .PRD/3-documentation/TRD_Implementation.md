# Technical Requirements Document (TRD)
## Axis eBoard - Deno Implementation Guide

**Generated:** 2026-01-08T15:25:14.731Z  
**Priority:** Deno Built-in → @std → JSR → npm (last resort)

---

## 1. Architecture Decision Records (ADR)

### ADR-001: Use Deno KV as Primary Database
- **Status:** Accepted
- **Context:** Need simple, distributed data storage for MVP
- **Decision:** Use Deno KV instead of PostgreSQL/MongoDB
- **Consequences:** 
  - ✅ Zero setup, ACID transactions, free replication
  - ✅ Perfect for user sessions, settings, simple data
  - ⚠️ Limited query capabilities (no joins, complex filters)
  - 🔄 Migration path to PostgreSQL exists if needed

### ADR-002: Native WebSocket over Socket.io
- **Status:** Accepted
- **Context:** Real-time features (chat, notifications)
- **Decision:** Use Deno's native WebSocket API
- **Consequences:**
  - ✅ Zero dependencies, standard Web API
  - ✅ Works with any WebSocket client
  - ⚠️ Manual reconnection logic needed
  - 🔄 Can add library later if needed

### ADR-003: Web Crypto API for Authentication
- **Status:** Accepted
- **Context:** Password hashing, JWT signing
- **Decision:** Use Web Crypto API (crypto.subtle)
- **Consequences:**
  - ✅ Built-in, secure, audited
  - ✅ No bcrypt/jsonwebtoken dependencies
  - ⚠️ Slightly more verbose API
  - 🔄 Can add `djwt` wrapper if team prefers

---

## 2. Capability Mapping


### HTTP Server
**Feature:** HTTP/HTTPS Server

**Built-in Solutions:**
- ✅ Deno.serve() - Native HTTP server
- ✅ Request/Response Web APIs

**Standard Library:**
- 📦 @std/http - Enhanced routing and middleware

**External (if needed):**
- ⚠️ hono - Lightweight web framework (optional)
- ⚠️ oak - Express-like framework

**💡 Recommendation:** Use Deno.serve() for simple APIs, @std/http for routing, Hono for complex apps

---

### WebSocket
**Feature:** Real-time Communication

**Built-in Solutions:**
- ✅ WebSocket API - Native support

**Standard Library:**
- 📦 @std/http/websocket - WebSocket utilities

**External (if needed):**
- ⚠️ socket.io alternative not needed - use native WebSocket

**💡 Recommendation:** Deno's native WebSocket is production-ready. No external deps needed.

---

### Database
**Feature:** Data Persistence

**Built-in Solutions:**
- ✅ Deno KV - Built-in key-value database (ACID, replicated)

**Standard Library:**
- 📦 @std/csv, @std/json - Data format handling

**External (if needed):**
- ⚠️ PostgreSQL - npm:postgres or deno.land/x/postgres
- ⚠️ MongoDB - npm:mongodb
- ⚠️ SQLite - jsr:@db/sqlite

**💡 Recommendation:** START with Deno KV for MVP. Scale to PostgreSQL only if complex queries needed.

---

### Authentication
**Feature:** User Authentication & Authorization

**Built-in Solutions:**
- ✅ Web Crypto API - Password hashing, JWT signing
- ✅ crypto.subtle for encryption

**Standard Library:**
- 📦 @std/encoding/base64 - Token encoding

**External (if needed):**
- ⚠️ djwt - JWT library (jsr:@zaubrik/djwt)
- ⚠️ bcrypt - For legacy compatibility only

**💡 Recommendation:** Use Web Crypto API + Deno KV for session storage. Minimal external deps.

---

### File Storage
**Feature:** File Upload & Storage

**Built-in Solutions:**
- ✅ Deno.readFile, Deno.writeFile - Local storage
- ✅ Deno.stat - File metadata

**Standard Library:**
- 📦 @std/fs - File system utilities
- 📦 @std/path - Path manipulation

**External (if needed):**
- ⚠️ S3 SDK - For cloud storage (npm:@aws-sdk/client-s3)
- ⚠️ MinIO - Self-hosted S3 alternative

**💡 Recommendation:** Local files for MVP. Migrate to S3 for production scale.

---

### Task Queue
**Feature:** Background Jobs & Scheduled Tasks

**Built-in Solutions:**
- ✅ Deno.cron() - Built-in cron scheduler

**Standard Library:**
- (None needed)

**External (if needed):**
- ⚠️ BullMQ alternative: Use Deno KV + Deno.cron()
- ⚠️ Temporal (if complex workflows)

**💡 Recommendation:** Deno.cron() is PERFECT for scheduled tasks. Use Deno KV for job queues.

---

### Email
**Feature:** Email Notifications

**Built-in Solutions:**
- ✅ fetch() - Call email APIs

**Standard Library:**
- (None needed)

**External (if needed):**
- ⚠️ Resend - Modern email API (fetch-based)
- ⚠️ SendGrid - Classic provider
- ⚠️ SMTP client - jsr:@std/smtp (if needed)

**💡 Recommendation:** Use Resend API via fetch(). No heavy SMTP libraries needed.

---

### Validation
**Feature:** Data Validation

**Built-in Solutions:**
- ✅ TypeScript types - Compile-time validation

**Standard Library:**
- (None needed)

**External (if needed):**
- ⚠️ Zod - Runtime validation (npm:zod)
- ⚠️ ArkType - TypeScript-first validator

**💡 Recommendation:** TypeScript for structure. Zod for runtime API validation.

---

### Testing
**Feature:** Testing Framework

**Built-in Solutions:**
- ✅ Deno.test() - Built-in test runner
- ✅ deno test --watch

**Standard Library:**
- 📦 @std/assert - Assertion library
- 📦 @std/testing - Testing utilities

**External (if needed):**


**💡 Recommendation:** 100% built-in. No Jest/Mocha needed. Use --coverage for reports.

---

### Frontend
**Feature:** UI Framework

**Built-in Solutions:**
- ✅ JSX/TSX support - Native

**Standard Library:**
- (None needed)

**External (if needed):**
- ⚠️ Fresh - Deno-native full-stack framework (RECOMMENDED)
- ⚠️ React - npm:react (if needed)
- ⚠️ Preact - Lighter alternative
- ⚠️ htmx - HTML-over-the-wire

**💡 Recommendation:** Fresh for full-stack. Preact for SPA. htmx for simplicity.


---

## 3. Project Structure (Deno Workspace)

```
Axis_eBoard/
├── deno.json                 # Workspace + tasks
├── shared/                   # Reusable library (YOUR GOAL!)
│   ├── deno.json
│   ├── mod.ts               # Public API exports
│   ├── auth.ts              # Auth utilities (Web Crypto)
│   ├── db.ts                # Deno KV helpers
│   ├── websocket.ts         # WebSocket utilities
│   ├── validation.ts        # Zod schemas (if used)
│   └── types.ts             # Shared TypeScript types
├── main-app/                # Main application
│   ├── deno.json
│   ├── main.ts              # Entry point (Deno.serve)
│   ├── routes/              # API routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── websocket.ts
│   ├── middleware/          # Auth, logging, etc.
│   └── models/              # Data models (KV schemas)
├── admin-api/               # Admin dashboard API
│   └── main.ts
└── .PRD/                    # Documentation
    ├── SRS_Deno_First.md    # This document
    └── TRD_Implementation.md
```

---

## 4. Shared Library Design (Reusable Modules)

### Goal: Build once, use everywhere

```typescript
// shared/mod.ts - Public API
export * from "./auth.ts";
export * from "./db.ts";
export * from "./websocket.ts";
export * from "./types.ts";

// Usage in main-app/main.ts:
import { hashPassword, verifyPassword } from "../shared/mod.ts";
import { createUser, getUser } from "../shared/db.ts";
```

### Reusable Modules to Build:

1. **shared/auth.ts** - Web Crypto utilities
   - `hashPassword(password: string): Promise<string>`
   - `verifyPassword(password: string, hash: string): Promise<boolean>`
   - `createJWT(payload: object, secret: string): Promise<string>`
   - `verifyJWT(token: string, secret: string): Promise<object>`

2. **shared/db.ts** - Deno KV abstractions
   - `createUser(data: User): Promise<User>`
   - `getUser(id: string): Promise<User | null>`
   - `updateUser(id: string, data: Partial<User>): Promise<User>`
   - `deleteUser(id: string): Promise<void>`

3. **shared/websocket.ts** - WebSocket helpers
   - `broadcastMessage(clients: Set<WebSocket>, msg: string)`
   - `handleConnection(req: Request): WebSocket`

4. **shared/validation.ts** - Input validation
   - Zod schemas for API requests
   - Type guards and validators

---

## 5. Development Workflow

### Phase 1: Setup (Day 1)
```bash
# Initialize workspace
deno init

# Add tasks to deno.json
deno task dev:app        # Run main app
deno task dev:admin      # Run admin API
deno task test           # Run tests
deno task fmt            # Format code
```

### Phase 2: Build Shared Library (Week 1)
- Create `shared/` modules
- Write tests for each utility
- Document exports in `mod.ts`

### Phase 3: Build Features (Week 2-4)
- Import from `shared/`
- Focus on business logic
- No reinventing wheels

---

## 6. Testing Strategy

```typescript
// shared/auth_test.ts
import { assertEquals } from "@std/assert";
import { hashPassword, verifyPassword } from "./auth.ts";

Deno.test("hashPassword creates valid hash", async () => {
  const hash = await hashPassword("secret123");
  assertEquals(typeof hash, "string");
  assertEquals(hash.length > 0, true);
});

Deno.test("verifyPassword validates correct password", async () => {
  const hash = await hashPassword("secret123");
  const valid = await verifyPassword("secret123", hash);
  assertEquals(valid, true);
});
```

Run with:
```bash
deno test --coverage=coverage/
deno coverage coverage/ --lcov > coverage.lcov
```

---

## 7. Deployment (Deno Deploy)

```bash
# Install Deno Deploy CLI
deno install -Arf jsr:@deno/deployctl

# Deploy
deployctl deploy --project=axis-eboard main-app/main.ts
```

**Benefits:**
- Zero configuration
- Auto-scaling
- Global edge deployment
- Free tier: 100k requests/day

---

## 8. Migration Checklist

- [ ] Set up Deno workspace structure
- [ ] Create `shared/` library with core utilities
- [ ] Implement auth with Web Crypto API
- [ ] Set up Deno KV database
- [ ] Build native WebSocket server
- [ ] Write tests with `Deno.test()`
- [ ] Deploy to Deno Deploy
- [ ] Monitor and optimize

---

**Next Step:** Sprint Planning & Task Breakdown
