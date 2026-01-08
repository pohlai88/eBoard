# Product Requirements Document: The Apex

## Project Sovereign (Executive Board Management System)

---

### Metadata

| Field | Details |
|-------|---------|
| **Version** | 2.0.0 (The Sovereign Standard) |
| **Status** | Immutable / Ratified |
| **Architectural Standard** | NexusCanon V4.0.0 (The Olympian: Deno + Postgres) |
| **Base Metaphor** | "The Ticket" (Support System Elevation) → "The Boardroom" |
| **Topology** | Many-to-One (Many Managers → One Sovereign) |

---

## 1. Executive Summary & Philosophy

### The Apex is a High-Frequency Decision Engine

It replaces the legal fragility of WhatsApp and the slowness of Email with a forensic System of Record.

### The DNA

We acknowledge that at its core, this is a **Customer Support Ticketing System**. It relies on the battle-tested mechanics of Creation, Queueing, SLA, and Resolution.

### The Elevation

We strip away the "Helpdesk" veneer and replace it with "The Boardroom."

| Term | Maps To |
|------|---------|
| The Customer | The Sovereign (CEO) |
| The Agent | The Council (C-Suite/Managers) |
| The Ticket | The Proposal |
| The Resolution | The Veto / Approval |

### The Prime Directive

The System must allow the Sovereign to make high-impact decisions in seconds ("Zero Latency") using a **Dual-Screen Strategy**:
- **The Left Eye** scans the Proposal (The "Pool Table")
- **The Right Eye** scans the Impact (The "Thanos Trace")

---

## 2. The Functional Weapons (Core Dynamics)

### Weapon 1: The Living Schema (The Codex)

**Mantra:** Metadata → Manifest → Schema.

**The Mechanism:** The system is governed by a "Hot-Swappable" Schema defined in `manifest.json`. No code deploys are required to change a field.

**The Configurator:**
- **Global Config (The Sovereign's Law):** System-wide constraints (e.g., "Max Capex without Board Vote", "Data Retention")
- **Personal Config (The User's Preference):** Theme, Notification Density, "Left/Right Handed" Mode

**The Stencils (Templates):** Managers cannot free-write. They must use Codex Stencils (e.g., "Hiring Request", "Budget Expansion"). This standardizes the "Input" so the CEO can speed-read.

---

### Weapon 2: The Thanos Trace (The Right Drawer)

**Mantra:** The Strategy Layer. Past-Present-Future.

**The Behavior:** A persistent Right Drawer that is ALWAYS AVAILABLE.

**The Flow:** 
1. The CEO clicks a Proposal on the Left (Pool Table)
2. The Right Drawer instantly updates to show the Thanos Trace
3. The CEO does not need to open the full Proposal details to see the risk

**The Tri-Vector Strategy:**
- **Vector 1: Past (The Forensic)** — "Manager X submitted this 2 hours ago. 3 Versions exist."
- **Vector 2: Present (The Pulse)** — "CFO is currently viewing this." (Real-time Presence)
- **Vector 3: Future (The Prediction)** — "Approval impacts Q3 Marketing Budget by 12%." (Calculated via The Codex logic)

---

### Weapon 3: The BoardDialog (The Listening Layer)

**Mantra:** The Pool Table Visibility.

**The Premise:** The Council is already "at the table." If a Manager is in the Circle, they have implicit read access.

**@Tagging (The Listening Bell):**
- **Logic:** Tagging does NOT grant permission (they already have it). Tagging demands Attention.
- **Behavior:** @CFO triggers a "Haptic Alert" for the CFO, pulling them into the room.

**Modes:**
- **The Open Floor:** General comments visible to the Circle
- **Sovereign Consultation:** CEO explicitly asks one person. The rest of the table sees the question but cannot answer.
- **The Whisper:** Encrypted side-bar

---

### Weapon 4: The Hierarchy (Circles & Overlays)

**Mantra:** Many Circles, One Sovereign.

**The Structure:** Infinite nested or parallel groups (e.g., "Global C-Suite", "SEA Region", "Project Alpha").

**The Overlay (The Admin Hat):**
- The "Admin" is not a separate user
- It is a Capability Hat the CEO places on a Manager
- **Scenario:** CEO grants "System Admin" to the CTO. The CTO remains a Council Member but gains access to The Living Schema Config.

---

### Weapon 5: The Vault (Cryptographic Privacy)

**Mantra:** Eyes Only.

**The Private Toggle:** A switch on every attachment.

**The Logic:** If enabled, the file is encrypted client-side. Only the Author and The Sovereign hold the keys. Even the CTO (with the Admin Hat) cannot decrypt it.

---

### Weapon 6: The Vectors (Integration Ports)

**Mantra:** Sanitize the Foreign.

**Function:** Connects the Proposal to live ERP data.

**Behavior:** When a Manager selects "Vendor: Acme Corp," The Vector fetches the live "YTD Spend" from SAP and displays it in the Thanos Trace (Future Vector).

---

## 3. The Haptic Surface (UI/UX)

**Architecture:** Deno Fresh (Islands). **Constraint:** Zero Page Jumps.

### A. The Split-Brain Viewport

The user never leaves the single screen.

**Left Panel (60% - The Pool Table):**
- Displays the Active List or Active Proposal
- Contains the Form Data and Attachments

**Right Panel (40% - The Strategy):**
- **Tab 1:** Thanos Trace (Default) — The P-P-F Impact Dashboard
- **Tab 2:** BoardDialog — The Chat/Consultation stream

**Interaction:** Scanning the list on the Left automatically updates the Right Panel.

### B. The Floating Approval (The Golden Thumb)

**Design:** A Floating Action Cluster (FAB) located in the bottom-right "Thumb Zone."

**Actions:** APPROVE, VETO, CONSULT

**The Watermark Engine:**
- **Trigger:** CEO presses "Approve"
- **Client-Side Effect:** The UI instantly overlays a "SIGNED BY SOVEREIGN" stamp on the document preview and locks the screen (Haptic Feedback)
- **Server-Side Effect:** The Loom commits the transaction and burns the cryptographic seal

---

## 4. The Data Doctrine: CRUD-S-AP

We mandate CRUD-S-AP on The Loom (Postgres).

| Operation | NexusCanon Definition |
|-----------|----------------------|
| **Create** | Intent. Structured via Codex Stencils. |
| **Read** | Materialized. Zero-latency fetch via The Prism. |
| **Update** | Context-Aware. Updates are patches. |
| **Delete** | Soft. Nothing is deleted; it is "Archived." |
| **Search** | Semantic. Vector search across Decisions. |
| **Audit** | The Thanos Trace. Forensic 6W1H signature. |
| **Predict** | The Future Vector. Calculating impact before write. |

---

## 5. The Engineering Standards (The Olympian)

### The Stack

- **Runtime:** Deno (Secure by default)
- **Database:** PostgreSQL (ACID Compliance)
- **ORM:** drizzle-orm (Deno compatible)

### The Schema Concept (TypeScript/Postgres)

```typescript
// 1. THE HIERARCHY (Circles)
interface Circle {
  id: uuid;
  name: string; // "Global C-Suite"
  sovereign_id: uuid; // The Owner (CEO)
  members: User[]; // The Council
}

// 2. THE PROPOSAL (The Ticket)
interface Proposal {
  id: uuid;
  circle_id: uuid;
  stencil_id: string; // "Capex_Form_V1"
  status: 'DRAFT' | 'LISTENING' | 'APPROVED' | 'VETOED';
  
  // The Data (Living Schema)
  content: jsonb; 

  // Weapon 6: The Vectors (Cached External Data)
  vector_data: {
    erp_budget_impact: number;
    vendor_risk_score: number;
  };
}

// 3. THE THANOS TRACE (Audit Strategy)
interface ThanosEvent {
  id: uuid;
  proposal_id: uuid;
  actor_id: uuid;
  
  // The Tri-Vector
  vector: 'PAST' | 'PRESENT' | 'FUTURE';
  
  // The Payload
  action: string; // "APPROVED_WITH_WATERMARK"
  impact_snapshot: jsonb; // The "Future" prediction at that moment
  timestamp: Date;
}

// 4. THE SYSTEM (Config)
interface SystemConfig {
  scope: 'GLOBAL' | 'USER';
  key: string;
  value: any;
  updated_by: uuid; // Admin Hat ID
}
```

---

## 6. Acceptance Criteria (The Veto Checklist)

- ✅ **The Listening Test:** If I tag @CFO, do they receive an alert without needing new permissions?

- ✅ **The Drawer Test:** Can the CEO click through 5 proposals on the Left, and see the Thanos Trace update on the Right instantly, without opening the proposal details?

- ✅ **The Watermark Test:** Does the "Approved" stamp appear instantly (optimistically) when the Golden Thumb is pressed?

- ✅ **The Hierarchy Test:** Can the CEO give the "Admin Hat" to a Manager to change the logo?

- ✅ **The Security Test:** Are "Eyes Only" files unreadable by the Admin?

---

## Ratification

**Ratified by:** The NexusCanon Council

> This is the Single Source of Truth for Project Sovereign.
>
> **The Apex is the Law.**
>
> **The Boardroom Endures.**

---

*Last Updated: January 8, 2026*
