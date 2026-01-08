// tools/analyze-prd.ts
/**
 * PRD Analyzer - Extracts requirements and maps to Deno capabilities
 *
 * This tool:
 * 1. Reads all PRD files
 * 2. Extracts features, requirements, and technical needs
 * 3. Maps them to Deno built-in capabilities
 * 4. Identifies external dependencies only when necessary
 * 5. Generates SRS and TRD documents
 *
 * @example
 * ```bash
 * deno task analyze:prd
 * ```
 */

interface Feature {
  name: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  category: string;
}

interface DenoCapability {
  feature: string;
  builtIn: string[];
  stdLib: string[];
  external: string[];
  recommendation: string;
}

interface TechStack {
  runtime: string[];
  database: string[];
  authentication: string[];
  realtime: string[];
  storage: string[];
  api: string[];
  frontend: string[];
}

const DOCS_ROOT = "./.PRD";

/**
 * Deno Built-in Capabilities Matrix
 * Following Deno's philosophy: Security, Simplicity, Standards
 */
const DENO_CAPABILITIES: Record<string, DenoCapability> = {
  "HTTP Server": {
    feature: "HTTP/HTTPS Server",
    builtIn: ["Deno.serve() - Native HTTP server", "Request/Response Web APIs"],
    stdLib: ["@std/http - Enhanced routing and middleware"],
    external: ["hono - Lightweight web framework (optional)", "oak - Express-like framework"],
    recommendation:
      "Use Deno.serve() for simple APIs, @std/http for routing, Hono for complex apps",
  },
  "WebSocket": {
    feature: "Real-time Communication",
    builtIn: ["WebSocket API - Native support"],
    stdLib: ["@std/http/websocket - WebSocket utilities"],
    external: ["socket.io alternative not needed - use native WebSocket"],
    recommendation: "Deno's native WebSocket is production-ready. No external deps needed.",
  },
  "Database": {
    feature: "Data Persistence",
    builtIn: ["Deno KV - Built-in key-value database (ACID, replicated)"],
    stdLib: ["@std/csv, @std/json - Data format handling"],
    external: [
      "PostgreSQL - npm:postgres or deno.land/x/postgres",
      "MongoDB - npm:mongodb",
      "SQLite - jsr:@db/sqlite",
    ],
    recommendation:
      "START with Deno KV for MVP. Scale to PostgreSQL only if complex queries needed.",
  },
  "Authentication": {
    feature: "User Authentication & Authorization",
    builtIn: ["Web Crypto API - Password hashing, JWT signing", "crypto.subtle for encryption"],
    stdLib: ["@std/encoding/base64 - Token encoding"],
    external: [
      "djwt - JWT library (jsr:@zaubrik/djwt)",
      "bcrypt - For legacy compatibility only",
    ],
    recommendation: "Use Web Crypto API + Deno KV for session storage. Minimal external deps.",
  },
  "File Storage": {
    feature: "File Upload & Storage",
    builtIn: ["Deno.readFile, Deno.writeFile - Local storage", "Deno.stat - File metadata"],
    stdLib: ["@std/fs - File system utilities", "@std/path - Path manipulation"],
    external: [
      "S3 SDK - For cloud storage (npm:@aws-sdk/client-s3)",
      "MinIO - Self-hosted S3 alternative",
    ],
    recommendation: "Local files for MVP. Migrate to S3 for production scale.",
  },
  "Task Queue": {
    feature: "Background Jobs & Scheduled Tasks",
    builtIn: ["Deno.cron() - Built-in cron scheduler"],
    stdLib: [],
    external: ["BullMQ alternative: Use Deno KV + Deno.cron()", "Temporal (if complex workflows)"],
    recommendation: "Deno.cron() is PERFECT for scheduled tasks. Use Deno KV for job queues.",
  },
  "Email": {
    feature: "Email Notifications",
    builtIn: ["fetch() - Call email APIs"],
    stdLib: [],
    external: [
      "Resend - Modern email API (fetch-based)",
      "SendGrid - Classic provider",
      "SMTP client - jsr:@std/smtp (if needed)",
    ],
    recommendation: "Use Resend API via fetch(). No heavy SMTP libraries needed.",
  },
  "Validation": {
    feature: "Data Validation",
    builtIn: ["TypeScript types - Compile-time validation"],
    stdLib: [],
    external: ["Zod - Runtime validation (npm:zod)", "ArkType - TypeScript-first validator"],
    recommendation: "TypeScript for structure. Zod for runtime API validation.",
  },
  "Testing": {
    feature: "Testing Framework",
    builtIn: ["Deno.test() - Built-in test runner", "deno test --watch"],
    stdLib: ["@std/assert - Assertion library", "@std/testing - Testing utilities"],
    external: [],
    recommendation: "100% built-in. No Jest/Mocha needed. Use --coverage for reports.",
  },
  "Frontend": {
    feature: "UI Framework",
    builtIn: ["JSX/TSX support - Native", "CSS Modules - Native browser support"],
    stdLib: [],
    external: [
      "Fresh - Deno-native full-stack framework (RECOMMENDED)",
      "  └─ Includes Twind (Tailwind-in-JS) built-in",
      "  └─ Islands architecture (zero JS by default)",
      "  └─ Server-side rendering (SSR) native",
      "Preact - Lightweight React alternative (3KB)",
      "UnoCSS - Instant atomic CSS engine",
      "htmx - HTML-over-the-wire (minimal JS)",
      "❌ Avoid: React (100KB+), TailwindCSS CDN (300KB runtime)",
    ],
    recommendation:
      "FRESH is the Deno way! Includes Twind styling, Preact, SSR, and islands. Zero build config.",
  },
  "CSS Styling": {
    feature: "CSS Framework & Styling",
    builtIn: [
      "CSS Modules - Native support in Deno/Fresh",
      "Inline styles - Standard JSX",
      "CSS-in-JS - Template literals",
    ],
    stdLib: [],
    external: [
      "Twind - Tailwind-in-JS (built into Fresh, ~10KB)",
      "UnoCSS - Faster than Tailwind, on-demand generation",
      "Vanilla Extract - Zero-runtime CSS-in-TS",
      "❌ TailwindCSS traditional - Requires Node.js build",
      "❌ TailwindCSS CDN - 300KB runtime, not production-ready",
    ],
    recommendation:
      "Use Twind with Fresh (zero config). For custom: CSS Modules or UnoCSS. Never use Tailwind CDN.",
  },
};

/**
 * Analyze PRD files and extract features
 */
async function analyzePRDs(): Promise<Feature[]> {
  const features: Feature[] = [];
  const files: string[] = [];

  for await (const entry of Deno.readDir(DOCS_ROOT)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      files.push(`${DOCS_ROOT}/${entry.name}`);
    }
  }

  console.log(`📄 Found ${files.length} PRD files\n`);

  for (const filePath of files) {
    const content = await Deno.readTextFile(filePath);
    const fileName = filePath.split("/").pop() || "";

    // Extract features from tables (simple heuristic)
    const tableMatches = content.matchAll(/\|\s*(.+?)\s*\|/g);
    for (const match of tableMatches) {
      const row = match[1].split("|").map((s) => s.trim());
      if (row.length >= 2 && !row[0].includes("-") && row[0] !== "#") {
        // Heuristic: detect feature rows
        features.push({
          name: row[0],
          description: row[1] || "",
          priority: "Medium",
          category: fileName.replace(".md", ""),
        });
      }
    }
  }

  return features;
}

/**
 * Generate Software Requirements Specification (SRS)
 */
async function generateSRS(features: Feature[]) {
  const srs = `# Software Requirements Specification (SRS)
## Axis eBoard - Deno-First Architecture

**Generated:** ${new Date().toISOString()}  
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

${
    features.slice(0, 20).map((f, i) =>
      `${i + 1}. **${f.name}** - ${f.description} (${f.category})`
    ).join("\n")
  }

${features.length > 20 ? `\n... and ${features.length - 20} more features\n` : ""}

---

## 3. Technical Requirements by Category

### 3.1 Core Runtime
- **Requirement:** TypeScript-first development
- **Deno Solution:** ✅ Built-in TypeScript compiler
- **External Deps:** None
- **Rationale:** Zero configuration, instant execution

### 3.2 HTTP Server & API
- **Requirement:** RESTful API endpoints
- **Deno Solution:** ✅ \`Deno.serve()\` + \`@std/http\`
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
- **External Deps:** \`djwt\` for JWT (if needed)
- **Rationale:** Built-in crypto is production-grade

### 3.6 File Handling
- **Requirement:** Document uploads, images
- **Deno Solution:** ✅ \`Deno.readFile/writeFile\` + \`@std/fs\`
- **External Deps:** AWS S3 SDK (for cloud storage)
- **Rationale:** Local files for MVP, cloud for scale

### 3.7 Background Jobs
- **Requirement:** Scheduled tasks, async processing
- **Deno Solution:** ✅ \`Deno.cron()\` + Deno KV queues
- **External Deps:** None
- **Rationale:** Built-in cron beats any external scheduler

### 3.8 Testing
- **Requirement:** Unit, integration, E2E tests
- **Deno Solution:** ✅ \`Deno.test()\` + \`@std/assert\`
- **External Deps:** None
- **Rationale:** No Jest/Mocha needed

---

## 4. Recommended Tech Stack (MVP)

### Runtime & Language
- Deno ${Deno.version.deno} (latest stable)
- TypeScript (built-in)

### Backend
- **Framework:** Hono (lightweight) OR native \`Deno.serve()\`
- **Database:** Deno KV (built-in)
- **Auth:** Web Crypto API + KV sessions
- **WebSocket:** Native WebSocket API

### Frontend
- **Framework:** Fresh (Deno-native) OR Preact
- **Styling:** TailwindCSS via CDN (no build step)
- **State:** Preact signals OR native Web Components

### DevOps
- **Testing:** \`deno test --coverage\`
- **Formatting:** \`deno fmt\`
- **Linting:** \`deno lint\`
- **Deployment:** Deno Deploy (zero-config)

---

## 5. External Dependencies (Minimized)

Only use these when built-in alternatives don't exist:

| Need | External Package | Justification |
|------|-----------------|---------------|
| Complex routing | \`hono\` | Optional, if @std/http insufficient |
| Runtime validation | \`zod\` | TypeScript can't validate runtime data |
| PostgreSQL | \`@db/postgres\` | Only if Deno KV limitations hit |
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
`;

  await Deno.writeTextFile(`${DOCS_ROOT}/SRS_Deno_First.md`, srs);
  console.log("✅ Generated SRS_Deno_First.md\n");
}

/**
 * Generate Technical Requirements Document (TRD)
 */
async function generateTRD() {
  const trd = `# Technical Requirements Document (TRD)
## Axis eBoard - Deno Implementation Guide

**Generated:** ${new Date().toISOString()}  
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
  - 🔄 Can add \`djwt\` wrapper if team prefers

---

## 2. Capability Mapping

${
    Object.entries(DENO_CAPABILITIES).map(([key, cap]) => `
### ${key}
**Feature:** ${cap.feature}

**Built-in Solutions:**
${cap.builtIn.map((s) => `- ✅ ${s}`).join("\n")}

**Standard Library:**
${cap.stdLib.length > 0 ? cap.stdLib.map((s) => `- 📦 ${s}`).join("\n") : "- (None needed)"}

**External (if needed):**
${cap.external.map((s) => `- ⚠️ ${s}`).join("\n")}

**💡 Recommendation:** ${cap.recommendation}
`).join("\n---\n")
  }

---

## 3. Project Structure (Deno Workspace)

\`\`\`
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
\`\`\`

---

## 4. Shared Library Design (Reusable Modules)

### Goal: Build once, use everywhere

\`\`\`typescript
// shared/mod.ts - Public API
export * from "./auth.ts";
export * from "./db.ts";
export * from "./websocket.ts";
export * from "./types.ts";

// Usage in main-app/main.ts:
import { hashPassword, verifyPassword } from "../shared/mod.ts";
import { createUser, getUser } from "../shared/db.ts";
\`\`\`

### Reusable Modules to Build:

1. **shared/auth.ts** - Web Crypto utilities
   - \`hashPassword(password: string): Promise<string>\`
   - \`verifyPassword(password: string, hash: string): Promise<boolean>\`
   - \`createJWT(payload: object, secret: string): Promise<string>\`
   - \`verifyJWT(token: string, secret: string): Promise<object>\`

2. **shared/db.ts** - Deno KV abstractions
   - \`createUser(data: User): Promise<User>\`
   - \`getUser(id: string): Promise<User | null>\`
   - \`updateUser(id: string, data: Partial<User>): Promise<User>\`
   - \`deleteUser(id: string): Promise<void>\`

3. **shared/websocket.ts** - WebSocket helpers
   - \`broadcastMessage(clients: Set<WebSocket>, msg: string)\`
   - \`handleConnection(req: Request): WebSocket\`

4. **shared/validation.ts** - Input validation
   - Zod schemas for API requests
   - Type guards and validators

---

## 5. Development Workflow

### Phase 1: Setup (Day 1)
\`\`\`bash
# Initialize workspace
deno init

# Add tasks to deno.json
deno task dev:app        # Run main app
deno task dev:admin      # Run admin API
deno task test           # Run tests
deno task fmt            # Format code
\`\`\`

### Phase 2: Build Shared Library (Week 1)
- Create \`shared/\` modules
- Write tests for each utility
- Document exports in \`mod.ts\`

### Phase 3: Build Features (Week 2-4)
- Import from \`shared/\`
- Focus on business logic
- No reinventing wheels

---

## 6. Testing Strategy

\`\`\`typescript
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
\`\`\`

Run with:
\`\`\`bash
deno test --coverage=coverage/
deno coverage coverage/ --lcov > coverage.lcov
\`\`\`

---

## 7. Deployment (Deno Deploy)

\`\`\`bash
# Install Deno Deploy CLI
deno install -Arf jsr:@deno/deployctl

# Deploy
deployctl deploy --project=axis-eboard main-app/main.ts
\`\`\`

**Benefits:**
- Zero configuration
- Auto-scaling
- Global edge deployment
- Free tier: 100k requests/day

---

## 8. Migration Checklist

- [ ] Set up Deno workspace structure
- [ ] Create \`shared/\` library with core utilities
- [ ] Implement auth with Web Crypto API
- [ ] Set up Deno KV database
- [ ] Build native WebSocket server
- [ ] Write tests with \`Deno.test()\`
- [ ] Deploy to Deno Deploy
- [ ] Monitor and optimize

---

**Next Step:** Sprint Planning & Task Breakdown
`;

  await Deno.writeTextFile(`${DOCS_ROOT}/TRD_Implementation.md`, trd);
  console.log("✅ Generated TRD_Implementation.md\n");
}

/**
 * Generate Sprint Planning Template
 */
async function generateSprintPlan() {
  const sprint = `# Sprint Planning - Axis eBoard MVP
## Sprint 1: Foundation & Shared Library (Week 1-2)

**Goal:** Build reusable shared library with Deno-native utilities

---

## Sprint Backlog

### Epic 1: Project Setup
- [ ] **Task 1.1:** Initialize Deno workspace structure
  - Create \`shared/\`, \`main-app/\`, \`admin-api/\` folders
  - Configure \`deno.json\` with workspace and tasks
  - Set up import maps
  - **Estimate:** 2 hours
  - **Owner:** Dev Lead

- [ ] **Task 1.2:** Configure development environment
  - Set up VS Code with Deno extension
  - Configure formatting and linting
  - Create dev scripts in \`deno.json\`
  - **Estimate:** 1 hour
  - **Owner:** Dev Lead

---

### Epic 2: Shared Library - Authentication Module
**🎯 REUSABLE COMPONENT - This will be used by all future projects!**

- [ ] **Task 2.1:** Create \`shared/auth.ts\` with Web Crypto utilities
  - \`hashPassword(password: string): Promise<string>\`
  - \`verifyPassword(password: string, hash: string): Promise<boolean>\`
  - \`generateSalt(): Uint8Array\`
  - **Estimate:** 3 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐ (100% reusable)

- [ ] **Task 2.2:** Create JWT utilities (optional, using Web Crypto)
  - \`createJWT(payload: object, secret: CryptoKey): Promise<string>\`
  - \`verifyJWT(token: string, secret: CryptoKey): Promise<object>\`
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

- [ ] **Task 3.1:** Create \`shared/db.ts\` with KV abstractions
  - Generic CRUD functions
  - \`create<T>(key: string[], data: T): Promise<T>\`
  - \`get<T>(key: string[]): Promise<T | null>\`
  - \`update<T>(key: string[], data: Partial<T>): Promise<T>\`
  - \`delete(key: string[]): Promise<void>\`
  - **Estimate:** 4 hours
  - **Owner:** Backend Dev
  - **Reusability:** ⭐⭐⭐⭐⭐

- [ ] **Task 3.2:** Add indexing and query helpers
  - \`list<T>(prefix: string[]): AsyncGenerator<T>\`
  - \`count(prefix: string[]): Promise<number>\`
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

- [ ] **Task 4.1:** Create \`shared/websocket.ts\` utilities
  - \`upgradeWebSocket(req: Request): WebSocket\`
  - \`broadcastToAll(clients: Set<WebSocket>, msg: string)\`
  - \`broadcastToRoom(room: string, msg: string)\`
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
  - Add \`npm:zod\` dependency
  - Create \`shared/validation.ts\`
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

- [ ] **Task 6.2:** Create \`shared/README.md\`
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
- [ ] Formatted with \`deno fmt\`
- [ ] Linted with \`deno lint\`
- [ ] Exported in \`shared/mod.ts\`
- [ ] Usage example added to docs
- [ ] No external dependencies (except approved list)

---

## Reusability Checklist

For each shared module, ensure:
- [ ] **Generic:** Works for any project, not just eBoard
- [ ] **Typed:** Full TypeScript support
- [ ] **Tested:** Comprehensive test coverage
- [ ] **Documented:** Clear API docs and examples
- [ ] **Exported:** Available via \`shared/mod.ts\`
- [ ] **Versioned:** Semantic versioning if published to JSR

---

## Future Sprints Preview

### Sprint 2: Main App - User Management (Week 3-4)
- Use \`shared/auth.ts\` for signup/login
- Use \`shared/db.ts\` for user CRUD
- Build user profile API

### Sprint 3: Main App - Real-time Features (Week 5-6)
- Use \`shared/websocket.ts\` for live updates
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

**Next Step:** Start building \`shared/auth.ts\`!
`;

  await Deno.writeTextFile(`${DOCS_ROOT}/SPRINT_1_Plan.md`, sprint);
  console.log("✅ Generated SPRINT_1_Plan.md\n");
}

/**
 * Main execution
 */
async function main() {
  console.log("🔍 Axis eBoard - PRD Analysis & Technical Planning\n");
  console.log("📊 Analyzing PRD files...\n");

  const features = await analyzePRDs();
  console.log(`✅ Extracted ${features.length} features\n`);

  console.log("📝 Generating SRS (Software Requirements Specification)...");
  await generateSRS(features);

  console.log("📝 Generating TRD (Technical Requirements Document)...");
  await generateTRD();

  console.log("📝 Generating Sprint 1 Plan...");
  await generateSprintPlan();

  console.log("\n✅ Complete! Generated documents:");
  console.log("   - .PRD/SRS_Deno_First.md");
  console.log("   - .PRD/TRD_Implementation.md");
  console.log("   - .PRD/SPRINT_1_Plan.md");
  console.log("\n🎯 Next Steps:");
  console.log("   1. Review generated documents");
  console.log("   2. Start Sprint 1: Build shared library");
  console.log("   3. Run: deno task dev:app");
}

if (import.meta.main) {
  main();
}
