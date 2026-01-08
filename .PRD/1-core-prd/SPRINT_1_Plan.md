# Sprint Planning - Axis eBoard MVP

## Sprint 1: Foundation & Shared Library (Week 1-2)

**Goal:** Build reusable shared library with Deno-native utilities

---

## Sprint Backlog

### Epic 1: Project Setup

- [ ] **Task 1.1:** Initialize Deno workspace structure
  - Create `shared/`, `main-app/`, `admin-api/` folders
  - Configure `deno.json` with workspace and tasks
  - Set up import maps
  - **Estimate:** 2 hours
  - **Owner:** Dev Lead

- [ ] **Task 1.2:** Configure development environment
  - Set up VS Code with Deno extension
  - Configure formatting and linting
  - Create dev scripts in `deno.json`
  - **Estimate:** 1 hour
  - **Owner:** Dev Lead

---

### Epic 2: Shared Library - Authentication Module

**🎯 REUSABLE COMPONENT - This will be used by all future projects!**

- [ ] **Task 2.1:** Create `shared/auth.ts` with Web Crypto utilities
  - `hashPassword(password: string): Promise<string>`
  - `verifyPassword(password: string, hash: string): Promise<boolean>`
  - `generateSalt(): Uint8Array`
  - **Estimate:** 3 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐ (100% reusable)

- [ ] **Task 2.2:** Create JWT utilities (optional, using Web Crypto)
  - `createJWT(payload: object, secret: CryptoKey): Promise<string>`
  - `verifyJWT(token: string, secret: CryptoKey): Promise<object>`
  - **Estimate:** 4 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐

- [ ] **Task 2.3:** Write comprehensive tests for auth module
  - Unit tests for all functions
  - Security tests (timing attacks, etc.)
  - **Estimate:** 2 hours
  - **Owner:** Backend Dev

---

### Epic 3: Shared Library - Database Module (Deno KV)

**🎯 REUSABLE COMPONENT**

- [ ] **Task 3.1:** Create `shared/db.ts` with KV abstractions
  - Generic CRUD functions
  - `create<T>(key: string[], data: T): Promise<T>`
  - `get<T>(key: string[]): Promise<T | null>`
  - `update<T>(key: string[], data: Partial<T>): Promise<T>`
  - `delete(key: string[]): Promise<void>`
  - **Estimate:** 4 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐

- [ ] **Task 3.2:** Add indexing and query helpers
  - `list<T>(prefix: string[]): AsyncGenerator<T>`
  - `count(prefix: string[]): Promise<number>`
  - **Estimate:** 3 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐

- [ ] **Task 3.3:** Write tests for DB module
  - CRUD operations
  - Atomic transactions
  - **Estimate:** 2 hours
  - **Owner:** Backend Dev

---

### Epic 4: Shared Library - WebSocket Module

**🎯 REUSABLE COMPONENT**

- [ ] **Task 4.1:** Create `shared/websocket.ts` utilities
  - `upgradeWebSocket(req: Request): WebSocket`
  - `broadcastToAll(clients: Set<WebSocket>, msg: string)`
  - `broadcastToRoom(room: string, msg: string)`
  - **Estimate:** 3 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐

- [ ] **Task 4.2:** Add connection management
  - Client registry
  - Auto-reconnect handling
  - Heartbeat/ping-pong
  - **Estimate:** 3 hours
  - **Owner:** Backend Dev

---

### Epic 5: Shared Library - Validation Module

**🎯 REUSABLE COMPONENT**

- [ ] **Task 5.1:** Set up Zod for runtime validation
  - Add `npm:zod` dependency
  - Create `shared/validation.ts`
  - **Estimate:** 1 hour
  - **Owner:** Backend Dev

- [ ] **Task 5.2:** Create common validation schemas
  - Email, password, username validators
  - Request body validators
  - **Estimate:** 2 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐

---

### Epic 6: Documentation

- [ ] **Task 6.1:** Document shared library API
  - JSDoc comments for all exports
  - Usage examples
  - **Estimate:** 2 hours
  - **Owner:** Dev Lead

- [ ] **Task 6.2:** Create `shared/README.md`
  - Installation instructions
  - API reference
  - Code examples
  - **Estimate:** 1 hour
  - **Owner:** Dev Lead

---

## Sprint Metrics

- **Total Story Points:** 21
- **Total Hours:** 33 hours
- **Sprint Duration:** 2 weeks
- **Team Capacity:** 40 hours/week × 2 devs = 80 hours
- **Buffer:** 47 hours for learning, blockers, code review

---

## Definition of Done (DoD)

- [ ] Code written and reviewed
- [ ] Unit tests passing (>80% coverage)
- [ ] JSDoc documentation added
- [ ] Formatted with `deno fmt`
- [ ] Linted with `deno lint`
- [ ] Exported in `shared/mod.ts`
- [ ] Usage example added to docs
- [ ] No external dependencies (except approved list)

---

## Reusability Checklist

For each shared module, ensure:

- [ ] **Generic:** Works for any project, not just eBoard
- [ ] **Typed:** Full TypeScript support
- [ ] **Tested:** Comprehensive test coverage
- [ ] **Documented:** Clear API docs and examples
- [ ] **Exported:** Available via `shared/mod.ts`
- [ ] **Versioned:** Semantic versioning if published to JSR

---

## Future Sprints Preview

### Sprint 2: Main App - User Management (Week 3-4)

- Use `shared/auth.ts` for signup/login
- Use `shared/db.ts` for user CRUD
- Build user profile API

### Sprint 3: Main App - Real-time Features (Week 5-6)

- Use `shared/websocket.ts` for live updates
- Notifications system
- Activity feeds

### Sprint 4: Admin Dashboard (Week 7-8)

- Reuse ALL shared modules
- Admin-specific features
- Analytics

---

**Tools for Sprint Management:**

- **Deno-based:** Create custom issue tracker in Deno KV
- **External (if needed):** GitHub Projects, Linear, Notion
- **Recommendation:** Start with markdown checklists, scale to tools later

---

**Next Step:** Start building `shared/auth.ts`!
