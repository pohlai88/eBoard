# PRD v3.0.0 — Comprehensive Updates

**Date:** January 8, 2026  
**Status:** Complete  
**Focus:** Enhanced Pool Table Dashboard + Config Systems + To-Dos Integration

---

## Summary of Additions

This document outlines the 4 major enhancements made to PRD v3.0.0 based on user feedback:

---

## 1. Enhanced Pool Table (Functional Dashboard)

**Location:** [PRD_eBoard_v3.md](PRD_eBoard_v3.md#L124-L160)

**What Changed:**
The Pool Table evolved from a simple list to a **live operational dashboard** with metrics, visual intelligence, and quick actions.

**Key Components Added:**

### 1.1 Dashboard Metrics (Header)
- **Total Pending** — Count of LISTENING proposals
- **Awaiting Your Vote** — Count requiring your approval
- **Avg Decision Time** — Velocity metric (days from LISTENING → APPROVED)
- **This Week's Approvals** — Quick stat
- **At-Risk Proposals** — Count exceeding SLA

### 1.2 Rich Proposal Indicators
- Status badges with color coding (DRAFT, LISTENING, APPROVED, VETOED)
- Priority indicators (HIGH/MEDIUM/LOW)
- SLA countdown (time remaining)
- Avatar stack of approvers + their vote status
- Advanced search & filter (circle, amount range, date, approver)
- Smart sorting (date, amount, approvers remaining, urgency)

### 1.3 Visual Intelligence
- 🔴 Red warning if proposal approaching deadline
- 🔔 Pulse animation if you're mentioned in comments
- ✅ Green checkmark if all approvers voted
- 🔍 Faded text if proposal is archived

### 1.4 Quick Actions (Hover State)
- **Vote** → Approve/Veto buttons appear
- **Tag** → @mention colleagues
- **Create To-Do** → Link this proposal to a task
- **Reassign** (admin only) → Move to different approver
- **Open** → Full proposal view

### 1.5 Inline Interactions
- **Bulk Actions:** Shift-click multiple proposals to batch-archive or batch-reassign
- **Drag-to-Organize:** Managers can reorder proposals (personal view only)
- **Instant Response:** <200ms tab switch between proposals

---

## 2. Global Config (The Sovereign's Law)

**Location:** [PRD_eBoard_v3.md](PRD_eBoard_v3.md#L216-L271)

**What Changed:**
Added a comprehensive **enterprise-wide configuration system** for CEO/Admins to set non-negotiable governance rules.

**Configurable Areas:**

### 2.1 Approval Rules
```typescript
approval_threshold: {
  capex_requires_board_vote: number;    // e.g., $500k
  hiring_requires_cfo_approval: boolean;
  budget_expansion_auto_escalate: boolean;
}
```
**Use Case:** CEO can enforce "Any hire >$100k requires CTO sign-off"

### 2.2 Data Retention & Compliance
```typescript
archive_after_days: number;        // e.g., 365 days
soft_delete_enabled: boolean;      // Never hard-delete
audit_trail_immutable: boolean;    // ALWAYS true
```
**Use Case:** Ensure proposals stay in system for compliance audits

### 2.3 Security & Encryption
```typescript
eyes_only_encryption_required: boolean;
mandatory_2fa: boolean;
session_timeout_minutes: number;
```
**Use Case:** CEO can enforce mandatory 2FA for all users or optional

### 2.4 Notifications
```typescript
mention_alert_enabled: boolean;
email_digest_frequency: "realtime" | "daily" | "weekly";
slack_integration_enabled: boolean;
```
**Use Case:** CEO can disable Slack integration if organization bans it

### 2.5 ERP Vector Configuration
```typescript
vector_refresh_interval_minutes: number;     // e.g., 5 min
vector_cache_stale_after_hours: number;     // e.g., 24 hours
sap_api_enabled: boolean;
stripe_api_enabled: boolean;
```
**Use Case:** CEO can set how often live budget data refreshes

### 2.6 UI/UX Defaults
```typescript
default_sort_by: "date_created" | "amount" | "urgency";
show_risk_scores: boolean;
show_approver_avatars: boolean;
theme: "light" | "dark" | "system";
```
**Use Case:** CEO ensures all managers see proposals sorted by urgency by default

**Key Features:**
- ✅ Changes apply immediately to all active sessions (WebSocket broadcast)
- ✅ Every edit logged in Chronos (who changed what, when, why)
- ✅ Immutable law principle: retroactive changes don't affect approved decisions
- ✅ Accessed via `/routes/admin/settings.tsx`

---

## 3. User Config (The Manager's Preference)

**Location:** [PRD_eBoard_v3.md](PRD_eBoard_v3.md#L273-L328)

**What Changed:**
Added **personal preference system** so managers customize their own view without affecting others.

**Configurable Areas:**

### 3.1 Display Preferences
```typescript
theme: "light" | "dark" | "system";
default_view: "pool_table" | "kanban" | "calendar"; // Phase 2
cards_per_page: number;  // 10, 20, 50
compact_mode: boolean;   // Minimize whitespace
```
**Use Case:** Each manager can have their own theme preference

### 3.2 Notification Settings
```typescript
email_notifications: boolean;
mention_alerts: "instant" | "digest" | "silent";
approval_reminders: boolean;
digest_frequency: "daily" | "weekly";
```
**Use Case:** Some managers want instant alerts, others prefer daily digest

### 3.3 Decision Context
```typescript
show_future_vector: boolean;      // Show budget impact?
show_past_versions: boolean;      // Show proposal history?
auto_collapse_comments: boolean;  // Hide comment thread by default?
```
**Use Case:** CFO wants to see budget impact; CMO doesn't care

### 3.4 To-Do Integration (NEW)
```typescript
link_to_dos_on_approval: boolean;     // Auto-create to-do when I approve?
to_do_default_assignee: string | null;  // Who to assign to-dos to
to_do_default_due_days: number;       // e.g., 7 days after approval
show_to_do_panel: boolean;            // Show linked to-dos in right drawer?
```
**Use Case:** Manager auto-creates to-dos for their team when they approve

### 3.5 Filter Defaults
```typescript
filter_by_circle: string[];          // Which circles to show
filter_by_status: string[];          // DRAFT, LISTENING, APPROVED, VETOED
hide_archived: boolean;
only_awaiting_my_vote: boolean;      // Show only proposals I need to approve
```
**Use Case:** CTO only wants to see proposals awaiting their vote

### 3.6 Proposal Stencil Defaults
```typescript
favorite_stencils: string[];  // Quick-access templates
stencil_defaults: {           // Auto-fill fields
  hiring_request_v2: { department: "Engineering" }
}
```
**Use Case:** Manager auto-fills their department when creating proposals

**Key Features:**
- ✅ Only the manager can edit their own config
- ✅ Stored in `user_configs` table (indexed for <50ms lookup)
- ✅ Changes apply instantly to current session
- ✅ Never shared with other users
- ✅ Accessed via `/routes/settings/preferences.tsx`

---

## 4. Lite To-Dos App Integration (The Compass)

**Location:** [PRD_eBoard_v3.md](PRD_eBoard_v3.md#L686-L789)

**What Changed:**
Added **integrated to-do system** to convert approvals into executable actions, making the system more "decisive."

**Core Philosophy:**
"Approve" = "Approve + Define What Happens Next"

**Feature Set:**

### 4.1 Quick To-Do Creation (From Approval)

When clicking APPROVE:

```
┌─────────────────────────────────┐
│ APPROVE + CREATE TO-DO?         │
├─────────────────────────────────┤
│ Task: [Senior Engineer Onboard] │
│ Assignee: [CTO]                 │
│ Due Date: [+7 days from now]    │
│ Priority: [High | Normal | Low] │
│ Linked To: <proposal_id>        │
│                                 │
│ [Create To-Do] [Skip]           │
└─────────────────────────────────┘
```

**Benefits:**
- No context switch (approve + action in one flow)
- Pre-filled with proposal summary
- Optional (can skip if not needed)
- To-do immutably linked to proposal

### 4.2 Linked To-Dos Tab (Right Drawer)

**New Tab 4 in right panel:**
- Shows all to-dos created from this proposal
- Quick link to create new to-do
- Display status + assignee
- Inline actions: mark done, reassign, comment, delete (soft)

**Example UI:**
```
Proposal: "Hire Senior Engineer"

To-Dos:
├─ ✅ Post job on LinkedIn (Marketing, due 2026-01-15)
├─ ⏳ Brief team on new hire (CTO, due 2026-01-20)
└─ ⏳ Prepare onboarding materials (HR, due 2026-01-25)

[+ Create To-Do]
```

### 4.3 To-Do Management Page

**Location:** Navigation → "My To-Dos"

**Features:**
- List view of all to-dos assigned to me
- Filter by: status, priority, due date, linked proposal
- Bulk actions: mark multiple as done, bulk reassign
- <500ms load time (WebSocket updates for real-time)

### 4.4 Database Schema

```typescript
todos table:
├─ id: uuid
├─ linked_proposal_id: uuid (nullable)
├─ title: string
├─ description: string
├─ assignee_id: uuid
├─ created_by: uuid
├─ status: "pending" | "done" | "archived"
├─ priority: "high" | "normal" | "low"
├─ due_date: timestamp
├─ created_at: timestamp
└─ updated_at: timestamp
```

### 4.5 Why This Makes Decisions More Decisive

| Benefit | Outcome |
|---------|---------|
| **Execution Clarity** | "Approve" no longer means "let it happen passively." It means "approve + define what happens next." |
| **Accountability** | Unbroken chain: Proposal → Approval → Action → Completion (all auditable) |
| **Velocity Tracking** | Chronos tracks when to-dos complete, enabling "time-to-execution" metrics |
| **Reduced Friction** | No more "I approved it, now how do I tell the team?" moments |
| **Audit Trail** | Every to-do linked to approval decision = forensic completeness |

### 4.6 Notifications

- **When assigned:** Instant SSE + optional email
- **When due:** 1-day reminder
- **When overdue:** Daily reminder
- **When marked done:** Notify creator + proposal viewers

### 4.7 Pool Table Integration

- **Badge:** Proposal shows "3 linked to-dos" indicator
- **Quick Create:** Hover → "+ Create To-Do" button
- **Completion Status:** Warning if proposal approved but to-dos still pending

### 4.8 Roadmap

**Phase 1 (MVP):**
- Simple list + checkboxes
- Due date picker
- Basic assignee dropdown

**Phase 2 (Expansion):**
- Kanban board view
- Bulk actions
- Slack workflow integration
- Recurring to-dos
- Calendar view

---

## Architectural Impact

### Directory Structure Additions

```
/canon
├─ /codex
│  ├─ global-config.ts    (NEW)
│  ├─ user-config.ts      (NEW)
│  └─ types.ts
│
/routes
├─ /admin
│  └─ settings.tsx        (NEW) — Global Config editor
├─ /settings
│  └─ preferences.tsx     (NEW) — User Config editor
└─ /todos                 (NEW)
   ├─ index.tsx           — My To-Dos list
   └─ [id].tsx            — To-Do detail

/islands
├─ ConfigForm.tsx         (NEW) — Global Config UI
├─ PreferencesForm.tsx    (NEW) — User Config UI
├─ ToDoItem.tsx           (NEW) — To-Do checkbox/actions
└─ QuickTodoModal.tsx     (NEW) — Inline to-do creator
```

### Database Additions

```sql
-- Global configuration
CREATE TABLE global_configs (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_by UUID,
  updated_at TIMESTAMP
);

-- User preferences
CREATE TABLE user_configs (
  user_id UUID PRIMARY KEY,
  config JSONB,
  updated_at TIMESTAMP
);

-- To-do tasks
CREATE TABLE todos (
  id UUID PRIMARY KEY,
  linked_proposal_id UUID,
  title TEXT,
  description TEXT,
  assignee_id UUID,
  created_by UUID,
  status TEXT,
  priority TEXT,
  due_date TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### API Additions

```
GET  /api/admin/global-config        — Fetch global config (admin only)
POST /api/admin/global-config        — Update global config (admin only)

GET  /api/settings/user-config       — Fetch my preferences
POST /api/settings/user-config       — Update my preferences

GET  /api/todos                      — List my to-dos
POST /api/todos                      — Create new to-do
PATCH /api/todos/:id                 — Update to-do
DELETE /api/todos/:id                — Archive to-do (soft delete)
GET  /api/proposals/:id/todos        — Get to-dos linked to proposal
POST /api/proposals/:id/todos        — Create to-do from proposal
```

---

## Implementation Checklist

### Phase 1 Priority (MVP)
- [ ] Pool Table dashboard with metrics + quick actions
- [ ] Global Config system with core parameters (approval thresholds, security)
- [ ] User Config with display + notification preferences
- [ ] To-Do creation from approval flow
- [ ] To-Do list page with basic filtering
- [ ] Linked To-Dos tab in right drawer

### Phase 2 Priority (Post-Launch)
- [ ] Advanced filters (Kanban view, calendar)
- [ ] Bulk to-do actions
- [ ] Slack integration for to-dos
- [ ] Vector caching configuration (ERP sync timing)
- [ ] Theme customization (light/dark mode)

### Phase 3 (Advanced)
- [ ] Recurring to-dos
- [ ] Team to-do views (manager oversight)
- [ ] To-do automation rules (auto-create based on proposal type)
- [ ] Advanced analytics (time-to-execution metrics)

---

## Configuration Examples

### Example 1: Strict Governance (Fortune 500 Bank)

**Global Config:**
```typescript
{
  approval_threshold: {
    capex_requires_board_vote: 250000,
    hiring_requires_cfo_approval: true,
    budget_expansion_auto_escalate: true
  },
  mandatory_2fa: true,
  eyes_only_encryption_required: true,
  archive_after_days: 2555,  // 7 years (compliance)
  email_digest_frequency: "daily",
  vector_refresh_interval_minutes: 60
}
```

### Example 2: Agile Tech Startup

**Global Config:**
```typescript
{
  approval_threshold: {
    capex_requires_board_vote: 500000,
    hiring_requires_cfo_approval: false,
    budget_expansion_auto_escalate: false
  },
  mandatory_2fa: false,
  eyes_only_encryption_required: false,
  archive_after_days: 365,
  email_digest_frequency: "realtime",
  vector_refresh_interval_minutes: 5
}
```

### Example 3: CTO's User Config

**User Config:**
```typescript
{
  default_view: "pool_table",
  only_awaiting_my_vote: true,
  show_future_vector: true,
  show_past_versions: true,
  link_to_dos_on_approval: true,
  to_do_default_assignee: "team-lead@company.com",
  to_do_default_due_days: 7,
  filter_by_circle: ["Engineering", "Product"],
  favorite_stencils: ["hiring_request_v2", "capex_request_v1"]
}
```

---

## Key Metrics Enabled

### Pool Table Dashboard
- ⏱️ **Decision Velocity:** Avg days from LISTENING → APPROVED
- 📊 **Approval Rate:** % of proposals approved vs. vetoed
- ⚠️ **SLA Compliance:** % of proposals approved on time
- 🎯 **Your Workload:** Count of approvals awaiting your vote

### To-Do Integration
- ⚡ **Execution Velocity:** Days from approval → to-do completion
- 📈 **To-Do Completion Rate:** % of linked to-dos marked done
- 🔄 **Cycle Time:** Average time from proposal → all linked to-dos done
- ⏰ **Overdue Rate:** % of to-dos overdue vs. on-time

---

## Security & Privacy

### Global Config
- ✅ Only CEO/Admin with Admin Hat can edit
- ✅ All changes logged in Chronos (immutable audit trail)
- ✅ Changes broadcast to active sessions (WebSocket)
- ✅ Versioning support (rollback if needed)

### User Config
- ✅ Only user can edit their own config
- ✅ Stored in encrypted database column
- ✅ Never shared with other users
- ✅ Deleted when user is offboarded

### To-Dos
- ✅ Linked to-dos show only if you have proposal access
- ✅ Soft-delete only (never hard-delete)
- ✅ All to-do changes logged in Chronos
- ✅ Respects circle-based permissions

---

## Testing Strategy

### Pool Table Dashboard
```gherkin
Scenario: Dashboard metrics update in real-time
  Given I am viewing the Pool Table
  When another manager approves a proposal
  Then my "Avg Decision Time" updates without page refresh
```

### Global Config
```gherkin
Scenario: CEO changes approval threshold
  Given I am an Admin editing Global Config
  When I change "capex_requires_board_vote" to $1M
  Then all active sessions receive the update
  And new proposals >$1M require board vote
  And existing approved proposals <$1M are unaffected
```

### User Config
```gherkin
Scenario: Manager customizes email frequency
  Given I am in Preferences
  When I set "mention_alerts" to "digest"
  Then I receive one daily email instead of instant alerts
  And my setting persists across login sessions
```

### To-Dos
```gherkin
Scenario: Create to-do from approval
  Given I am approving a proposal
  When I click "APPROVE + CREATE TO-DO"
  Then a modal appears with proposal summary pre-filled
  And the created to-do is linked to the proposal
  And the assignee receives an instant alert
```

---

## Migration Path (From v2 to v3)

### Data Preservation
- ✅ All existing proposals remain unchanged
- ✅ All existing approvals remain unchanged
- ✅ Thanos audit trail extends (no deletions)

### New Data
- 🆕 Create default `global_configs` row with conservative defaults
- 🆕 Create `user_configs` row for each user with UI defaults
- 🆕 Create empty `todos` table (ready for Phase 1)

### User Education
- 📘 In-app tour: "New! Check out the Pool Table dashboard"
- 📘 In-app tour: "New! Create to-dos from approvals"
- 📘 Email: "Your preferences are now customizable"

---

## Conclusion

PRD v3.0.0 is now **production-ready** with:

✅ **Enhanced Pool Table** as a functional, real-time dashboard  
✅ **Global Config** for CEO/Admin governance  
✅ **User Config** for manager personalization  
✅ **Lite To-Dos** integrated to make decisions executable  

These 4 features transform The Apex from a "governance tool" into a **"decision + execution platform."**

---

*Updated: January 8, 2026*  
*Version: 3.0.0 Complete*
