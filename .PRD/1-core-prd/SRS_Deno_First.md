# Software Requirements Specification (SRS)
## Axis eBoard - Deno-First Architecture

**Generated:** 2026-01-08T15:25:14.729Z  
**Principle:** Built-in First, External Dependencies Last

---

## 1. Executive Summary

This SRS prioritizes Deno's built-in capabilities and standard library to minimize external dependencies, reduce complexity, and maximize security.

### Deno-First Philosophy
- ✅ Use native Deno APIs (Deno.serve, Deno KV, Web Crypto)
- ✅ Leverage @std/* standard library
- ✅ TypeScript-native (no build tools needed)
- ⚠️ External dependencies only when absolutely necessary
- 🚫 Avoid npm packages that duplicate Deno functionality

---

## 2. Extracted Features

1. **** - ---------- (APEX_v3_COMPLETE_ARCHITECTURE)
2. **** - **PRD_eBoard_v3.md** (APEX_v3_COMPLETE_ARCHITECTURE)
3. **** - **PRD_v3_STRATEGIC_ENHANCEMENTS.md** (APEX_v3_COMPLETE_ARCHITECTURE)
4. **** - **ORACLE_WHATIF_ENHANCEMENT.md** (APEX_v3_COMPLETE_ARCHITECTURE)
5. **** - --------- (DENO_DOCUMENTATION_ECOSYSTEM)
6. **** - **HTML Output** (DENO_DOCUMENTATION_ECOSYSTEM)
7. **** - **JSON Output** (DENO_DOCUMENTATION_ECOSYSTEM)
8. **** - **Linting** (DENO_DOCUMENTATION_ECOSYSTEM)
9. **** - **Symbol Filtering** (DENO_DOCUMENTATION_ECOSYSTEM)
10. **** - **JSDoc Support** (DENO_DOCUMENTATION_ECOSYSTEM)
11. **** - **Search** (DENO_DOCUMENTATION_ECOSYSTEM)
12. **** - **Categories** (DENO_DOCUMENTATION_ECOSYSTEM)
13. **** - ------ (DENO_DOCUMENTATION_ECOSYSTEM)
14. **** - **deno doc** (DENO_DOCUMENTATION_ECOSYSTEM)
15. **** - **deno fmt** (DENO_DOCUMENTATION_ECOSYSTEM)
16. **** - **deno lint** (DENO_DOCUMENTATION_ECOSYSTEM)
17. **** - **std/fs** (DENO_DOCUMENTATION_ECOSYSTEM)
18. **** - **std/yaml** (DENO_DOCUMENTATION_ECOSYSTEM)
19. **** - **Cliffy** (DENO_DOCUMENTATION_ECOSYSTEM)
20. **** - **Markdown Server** (DENO_DOCUMENTATION_ECOSYSTEM)


... and 125 more features


---

## 3. Technical Requirements by Category

### 3.1 Core Runtime
- **Requirement:** TypeScript-first development
- **Deno Solution:** ✅ Built-in TypeScript compiler
- **External Deps:** None
- **Rationale:** Zero configuration, instant execution

### 3.2 HTTP Server & API
- **Requirement:** RESTful API endpoints
- **Deno Solution:** ✅ `Deno.serve()` + `@std/http`
- **External Deps:** Hono (optional for complex routing)
- **Rationale:** Native performance, Web Standard APIs

### 3.3 Database & Storage
- **Requirement:** User data persistence
- **Deno Solution:** ✅ Deno KV (ACID transactions, replication)
- **External Deps:** PostgreSQL (only if advanced SQL needed)
- **Rationale:** Zero setup, distributed by default

### 3.4 Real-time Communication
- **Requirement:** Live updates, notifications
- **Deno Solution:** ✅ Native WebSocket API
- **External Deps:** None
- **Rationale:** Standard Web API, no Socket.io needed

### 3.5 Authentication & Security
- **Requirement:** User login, sessions, permissions
- **Deno Solution:** ✅ Web Crypto API + Deno KV sessions
- **External Deps:** `djwt` for JWT (if needed)
- **Rationale:** Built-in crypto is production-grade

### 3.6 File Handling
- **Requirement:** Document uploads, images
- **Deno Solution:** ✅ `Deno.readFile/writeFile` + `@std/fs`
- **External Deps:** AWS S3 SDK (for cloud storage)
- **Rationale:** Local files for MVP, cloud for scale

### 3.7 Background Jobs
- **Requirement:** Scheduled tasks, async processing
- **Deno Solution:** ✅ `Deno.cron()` + Deno KV queues
- **External Deps:** None
- **Rationale:** Built-in cron beats any external scheduler

### 3.8 Testing
- **Requirement:** Unit, integration, E2E tests
- **Deno Solution:** ✅ `Deno.test()` + `@std/assert`
- **External Deps:** None
- **Rationale:** No Jest/Mocha needed

---

## 4. Recommended Tech Stack (MVP)

### Runtime & Language
- Deno 2.6.4 (latest stable)
- TypeScript (built-in)

### Backend
- **Framework:** Hono (lightweight) OR native `Deno.serve()`
- **Database:** Deno KV (built-in)
- **Auth:** Web Crypto API + KV sessions
- **WebSocket:** Native WebSocket API

### Frontend
- **Framework:** Fresh (Deno-native, RECOMMENDED) OR Preact
- **Styling:** 
  - **Option 1 (Best):** Twind - Tailwind-in-JS, built into Fresh, zero config
  - **Option 2:** UnoCSS - Atomic CSS, faster than Tailwind
  - **Option 3:** Native CSS Modules - Zero dependencies
  - ❌ **Avoid:** TailwindCSS CDN (300KB runtime overhead)
- **State:** Preact signals (built into Fresh) OR native Web Components
- **Rendering:** Server-side by default (Fresh islands architecture)

### DevOps
- **Testing:** `deno test --coverage`
- **Formatting:** `deno fmt`
- **Linting:** `deno lint`
- **Deployment:** Deno Deploy (zero-config)

---

## 5. External Dependencies (Minimized)

Only use these when built-in alternatives don't exist:

| Need | External Package | Justification |
|------|-----------------|---------------|
| Complex routing | `hono` | Optional, if @std/http insufficient |
| Runtime validation | `zod` | TypeScript can't validate runtime data |
| PostgreSQL | `@db/postgres` | Only if Deno KV limitations hit |
| Email sending | Resend API | No built-in SMTP |
| File uploads (cloud) | AWS S3 SDK | For production scale |

---

## 6. Migration Path

1. **Week 1-2:** MVP with 100% Deno built-ins
2. **Week 3-4:** Add Hono + Zod if complexity increases
3. **Month 2:** Evaluate Deno KV limits, migrate to PostgreSQL if needed
4. **Month 3+:** Add cloud storage (S3) for files

---

## 7. Success Metrics

- **External Dependencies:** < 5 packages
- **Build Time:** 0 seconds (no build step)
- **Cold Start:** < 100ms (Deno Deploy)
- **Type Safety:** 100% TypeScript coverage
- **Test Coverage:** > 80%

---

**Next Step:** Generate Technical Requirements Document (TRD)
