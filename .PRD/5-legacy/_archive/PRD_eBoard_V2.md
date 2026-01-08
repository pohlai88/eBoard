This is a full conversion of the **Project Sovereign (The Apex)** concepts into the **SaaS Starter
Standard**.

This document translates the "Sovereign" metaphors into actionable engineering requirements while
strictly adhering to the "Olympian" architectural standards (Deno + Postgres) and the "CRUD-S-AP"
doctrine defined in your source file.

---

# PRD: The Apex (Executive Board Management System)

| Document Details           |                                      |
| -------------------------- | ------------------------------------ |
| **Version**                | 2.1.0 (Translation to SaaS Standard) |
| **Status**                 | **Approved for Engineering**         |
| **Architectural Standard** | NexusCanon V4.0.0 (Deno + Postgres)  |
| **Product Core**           | High-Frequency Decision Engine       |

---

## 1. Executive Summary

**The Apex** is a high-frequency decision engine designed to replace the legal fragility of WhatsApp
and the latency of email for Executive Boards. Current C-Suite decision-making is fragmented across
informal channels, lacking forensic audit trails and immediate context.

Our solution transforms the standard "Helpdesk" ticketing model into a "Boardroom" experience. It
consolidates proposals, impact analysis, and voting into a single "Zero Latency" view. By utilizing
a **Dual-Screen Strategy** (Proposal vs. Impact) and **Optimistic UI** (The Golden Thumb), we enable
the CEO (The Sovereign) to make high-impact decisions in seconds with full cryptographic
accountability.

**Business Impact:**

- **Speed:** Reduces decision latency from days (email chains) to seconds.
- **Compliance:** Provides an immutable "Thanos Trace" (audit log) for all fiscal and strategic
  decisions.
- **Security:** Eliminates "Shadow IT" (WhatsApp approvals) by offering a secure, encrypted channel.

---

## 2. User Personas

### 1. The Sovereign (Primary User / CEO)

- **Role:** Chief Executive Officer or Board Chair.
- **Goals:** Make rapid decisions without getting bogged down in administrative noise. Requires
  immediate visibility into the financial/strategic impact of a "Yes" vote.
- **Pain Points:** "Inbox Zero" anxiety, burying high-risk decisions in email threads, lack of
  context when approving mobile messages.
- **Key Behavior:** Scans proposals rapidly; relies on the "Right Eye" (Impact Dashboard) to verify
  risk before clicking "Approve."

### 2. The Council (Manager / C-Suite)

- **Role:** CTO, CFO, CMO, Regional Heads.
- **Goals:** Get proposals approved quickly to unblock their teams.
- **Pain Points:** Ambiguous rejection reasons, waiting for the next physical board meeting to get
  sign-off.
- **Key Behavior:** Uses "Codex Stencils" (templates) to submit standardized proposals; tags other
  council members (@CFO) to build consensus.

---

## 3. Strategic Goals

1. **Achieve "Zero Latency" UX:**

- **Goal:** The "Thanos Trace" (Impact Dashboard) must render within <200ms of selecting a proposal.
- **Metric:** Average Time-to-Interaction (TTI) on the Right Panel.

2. **Enforce 100% Forensic Accountability:**

- **Goal:** Every decision must generate a "6W1H" signature (Who, What, Where, When, Why, How, How
  Much).
- **Metric:** Zero "Orphaned Decisions" (decisions made without a linked database record).

3. **Eliminate Unstructured Input:**

- **Goal:** 100% of proposals must be generated via "Codex Stencils" (JSON Schema).
- **Metric:** Free-text input on proposal bodies reduced to 0%.

---

## 4. Scope & Features

### Phase 1: MVP (The Sovereign Standard)

- **The Pool Table (Left Panel):** List view of active proposals with status filters.
- **The Thanos Trace (Right Panel):** Real-time audit log showing Past (Versions), Present
  (Viewers), and Future (Predicted Impact).
- **The Golden Thumb:** Floating Action Button (FAB) for Approve/Veto with optimistic UI "Watermark"
  stamping.
- **The Living Schema:** Dynamic form generation based on `manifest.json`.
- **The Vault:** Client-side encryption for attachments ("Eyes Only").

### Phase 2: Post-Launch (The Vector Expansion)

- **ERP Integration (The Vectors):** Live connection to SAP/Oracle for real-time budget lookup.
- **The Admin Hat:** UI for delegating system configuration rights to specific Council members.

### Out of Scope

- External public-facing portals.
- Native mobile apps (MVP is Deno Fresh Web/PWA).

---

## 5. User Stories

| ID       | Persona       | Story                                                                      | Acceptance Criteria                                                                                       |
| -------- | ------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **US-1** | The Sovereign | As a CEO, I want to see the risk of a proposal without opening it fully.   | Clicking a list item updates the "Thanos Trace" panel instantly with risk score and budget impact.        |
| **US-2** | The Council   | As a Manager, I want to submit a budget request using a standard template. | User selects "Budget Expansion" stencil; form validates against `manifest.json` schema before submission. |
| **US-3** | The Sovereign | As a CEO, I want to approve a document and see it "Signed" immediately.    | Pressing "Approve" shows a visual "SIGNED" stamp instantly (Optimistic UI) before server confirmation.    |
| **US-4** | The Council   | As a CFO, I want to be alerted if I am mentioned in a proposal discussion. | Tagging @CFO triggers a haptic/visual alert in the "BoardDialog" stream.                                  |

---

## 6. Technical Requirements (The Olympian)

**Stack:**

- **Runtime:** Deno (Strict Requirement: Secure by Default).
- **Frontend:** Deno Fresh (Islands Architecture) for zero-page-jump UX.
- **Database:** PostgreSQL (ACID Compliance mandated).
- **ORM:** Drizzle-ORM.

**Performance Constraints:**

- **Zero Page Jumps:** The application must function as a Single Page Application (SPA) feel using
  Island hydration.
- **Optimistic UI:** "The Watermark" must appear within 16ms (1 frame) of user interaction.

**Security:**

- **The Vault:** Files marked "Eyes Only" must be encrypted client-side using AES-GCM. Keys are
  never stored in plain text on the server.

---

## 7. API Specifications (The Data Doctrine)

Following the **CRUD-S-AP** doctrine.

### **Proposals (The Ticket)**

- `POST /api/v1/proposals`
- **Purpose:** Create Intent via Codex Stencils.
- **Body:** `{ circle_id: UUID, stencil_id: string, content: JSONB }`

- `GET /api/v1/proposals`
- **Purpose:** Read Materialized view (The Pool Table).
- **Params:** `?status=LISTENING&circle_id=UUID`

- `PATCH /api/v1/proposals/:id`
- **Purpose:** Context-Aware Update (Vote/Comment).
- **Body:** `{ action: 'APPROVE' | 'VETO', signature: string }`

### **The Thanos Trace (Audit)**

- `GET /api/v1/trace/:proposal_id`
- **Purpose:** Fetch the Tri-Vector (Past/Present/Future) data.
- **Response:**

```json
{
  "past": { "versions": 3, "last_edit": "2026-01-08T12:00:00Z" },
  "present": { "viewers": ["user_id_cfo"] },
  "future": { "budget_impact": 12.5, "risk_score": "HIGH" }
}
```

---

## 8. Database Schema (The Loom)

Based on the provided TypeScript definitions:

1. **Table: Circles (Hierarchy)**

- `id` (UUID, PK)
- `name` (VARCHAR)
- `sovereign_id` (UUID, FK -> Users)

2. **Table: Proposals**

- `id` (UUID, PK)
- `circle_id` (UUID, FK -> Circles)
- `stencil_id` (VARCHAR) - _Links to manifest.json definition_
- `status` (ENUM: DRAFT, LISTENING, APPROVED, VETOED)
- `content` (JSONB) - _The flexible data payload_
- `vector_cache` (JSONB) - _Cached ERP data (Weapon 6)_

3. **Table: Thanos_Events (Audit)**

- `id` (UUID, PK)
- `proposal_id` (UUID, FK -> Proposals)
- `actor_id` (UUID, FK -> Users)
- `vector_type` (ENUM: PAST, PRESENT, FUTURE)
- `payload` (JSONB) - _Snapshot of the impact at decision time_

---

## 9. Analytics Plan

**North Star Metric:** **Decision Velocity** (Time from "Listening" status to "Approved/Vetoed").

**Dashboards (Internal):**

1. **The Pulse:** Active viewers per proposal (Real-time).
2. **The Bottleneck:** Average time a proposal sits in "Listening" state per Council Member.
3. **Vector Accuracy:** Comparison of "Predicted Impact" (Future Vector) vs. "Actual ERP Spend"
   (Post-decision).

---

## 10. Risk Assessment

| Risk                                                                     | Likelihood | Impact   | Mitigation                                                                                             |
| ------------------------------------------------------------------------ | ---------- | -------- | ------------------------------------------------------------------------------------------------------ |
| **Schema Fragility:** Editing `manifest.json` breaks existing proposals. | Medium     | High     | Implement "Schema Versioning" in DB; old proposals render using old schema snapshots.                  |
| **Key Loss:** Sovereign loses private key for "Eyes Only" files.         | Low        | Critical | Implement a "Shamir's Secret Sharing" recovery protocol requiring 3 Council members to restore access. |
| **ERP Latency:** Vector lookup slows down the UI.                        | High       | Medium   | Fetch ERP data asynchronously; display cached "Stale" data immediately while refreshing background.    |

---

## 11. Test Strategy

1. **The Listening Test (Integration):**

- **Action:** User A creates a comment tagging User B.
- **Success:** User B receives a payload via WebSocket/SSE within 3 seconds.

2. **The Watermark Test (E2E):**

- **Action:** Click "Approve".
- **Success:** UI locks immediately; DB transaction commits successfully; Audit log records the
  exact timestamp.

3. **The Drawer Test (UX/Performance):**

- **Action:** Rapidly click 5 different proposals.
- **Success:** Right drawer updates content for each click without race conditions or lag.

---

## 12. Release Planning

- **Alpha (Sprint 1-2):** Internal deployment to "Project Alpha" circle. Core CRUD, Codex Stencils,
  and Thanos Trace (Past/Present only).
- **Beta (Sprint 3-4):** Rollout to "SEA Region". Enable "Future Vector" (ERP mockups) and
  BoardDialog.
- **V1.0 Launch (The Sovereign Standard):** Full global C-Suite rollout. "Eyes Only" encryption
  enabled. Hardened Deno runtime.

---
