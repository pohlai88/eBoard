# PRD v3.0.0 — Quick Reference Guide

**4 Major Enhancements + Configuration Examples**

---

## 1️⃣ POOL TABLE DASHBOARD (Enhanced)

### What It Shows
```
┌─────────────────────────────────────────────────────────────┐
│ DASHBOARD METRICS (Top)                                     │
│ Total Pending: 12 | Awaiting Your Vote: 3 | Avg Time: 2d   │
├─────────────────────────────────────────────────────────────┤
│ PROPOSAL LIST (Sortable, Filterable)                        │
├─────────────────────────────────────────────────────────────┤
│ 🔴 [LISTENING] Hire Senior Engineer | $250k | 2 days left   │
│    Priority: HIGH | ✅ CTO approved | ⏳ CFO pending      │
│    👤 Avatar stack of approvers...                          │
│    [Vote ▼] [Comment] [+ To-Do] [⋯ More]                   │
├─────────────────────────────────────────────────────────────┤
│ 🟢 [APPROVED] Budget Expansion Q1 | $500k | All signed ✓    │
│    Priority: MEDIUM | 3 linked to-dos | 2/3 completed      │
├─────────────────────────────────────────────────────────────┤
│ 🟡 [DRAFT] Marketing Expansion | $100k | Created 6h ago     │
│    Priority: NORMAL | 1 comment | Need review from CMO     │
└─────────────────────────────────────────────────────────────┘
```

### Filters & Sort
- **Filter:** Circle, Status, Amount Range, Date, Approver
- **Sort:** Date, Amount, Approvers Remaining, Urgency
- **Search:** Free-text on proposal title

### Quick Actions
| Action | Trigger | Result |
|--------|---------|--------|
| Vote | Hover → button | Approve/Veto inline |
| Comment | Hover → button | Opens BoardDialog tab |
| Create To-Do | Hover → button | Quick modal appears |
| Reassign | Admin hover | Change approver |

---

## 2️⃣ GLOBAL CONFIG (The Sovereign's Law)

### Who Can Change?
- ✅ **CEO (Sovereign)** — Full access
- ✅ **Admin with Admin Hat** — Full access
- ❌ **Managers/Council** — Read-only view

### What Can Be Set?
```
APPROVAL RULES
├─ capex_requires_board_vote: $500k
├─ hiring_requires_cfo_approval: true
└─ budget_expansion_auto_escalate: true

DATA RETENTION
├─ archive_after_days: 365
├─ soft_delete_enabled: false  (ALWAYS)
└─ audit_trail_immutable: true (ALWAYS)

SECURITY
├─ eyes_only_encryption_required: false
├─ mandatory_2fa: false
└─ session_timeout_minutes: 480

NOTIFICATIONS
├─ mention_alert_enabled: true
├─ email_digest_frequency: "realtime"
└─ slack_integration_enabled: true

ERP VECTORS
├─ vector_refresh_interval: 5 minutes
├─ vector_cache_stale_after: 24 hours
├─ sap_api_enabled: true
└─ stripe_api_enabled: false

UI/UX DEFAULTS
├─ default_sort_by: "date_created"
├─ show_risk_scores: true
├─ show_approver_avatars: true
└─ theme: "light"
```

### Where to Configure
📍 **Admin console** → `/routes/admin/settings.tsx`

### What Happens When CEO Changes Config?
1. ✏️ Change is made in admin console
2. 📝 Logged in Chronos (6W1H audit)
3. 📡 Broadcast to all active sessions (WebSocket)
4. ⚡ Takes effect immediately
5. 📜 Cannot retroactively affect approved decisions

---

## 3️⃣ USER CONFIG (The Manager's Preference)

### Who Can Change?
- ✅ **Only yourself** — Your own preferences
- ❌ **Other users** — Cannot see/change yours
- ❌ **Admin** — Cannot override personal preferences

### What Can Be Customized?
```
DISPLAY
├─ theme: "light" | "dark" | "system"
├─ default_view: "pool_table" | "kanban" | "calendar"
├─ cards_per_page: 10 | 20 | 50
└─ compact_mode: true | false

NOTIFICATIONS
├─ email_notifications: true | false
├─ mention_alerts: "instant" | "digest" | "silent"
├─ approval_reminders: true | false
└─ digest_frequency: "daily" | "weekly"

DECISION CONTEXT
├─ show_future_vector: true | false
├─ show_past_versions: true | false
└─ auto_collapse_comments: true | false

TO-DO INTEGRATION ⭐ NEW
├─ link_to_dos_on_approval: true | false
├─ to_do_default_assignee: "user@company.com"
├─ to_do_default_due_days: 7
└─ show_to_do_panel: true | false

FILTERS
├─ filter_by_circle: ["Engineering", "Product"]
├─ filter_by_status: ["LISTENING", "DRAFT"]
├─ hide_archived: true | false
└─ only_awaiting_my_vote: true | false

STENCIL DEFAULTS
├─ favorite_stencils: ["hiring_request_v2", "capex_request_v1"]
└─ stencil_defaults:
    ├─ hiring_request_v2.department = "Engineering"
    └─ capex_request_v1.cost_center = "1234"
```

### Where to Configure
📍 **Personal settings** → `/routes/settings/preferences.tsx`

### What Happens When You Change Preferences?
1. ✏️ Change is made in settings
2. 💾 Stored in `user_configs` table (indexed for <50ms lookup)
3. ⚡ Takes effect instantly
4. 🔒 Never shared with other users
5. 📝 Not logged in Chronos (personal, not forensic)

---

## 4️⃣ LITE TO-DOS APP (The Compass) ⭐ NEW

### Quick To-Do Creation Flow

```
Manager clicks APPROVE button
           ↓
"APPROVE + CREATE TO-DO?" modal appears
           ↓
┌─────────────────────────────────┐
│ Task: [Hire Senior Engineer]    │ ← Auto-filled
│ Assignee: [Dropdown]            │ ← Can use default
│ Due Date: [7 days from now]     │ ← Can use default
│ Priority: [High|Normal|Low]     │ ← Manual choice
│ Linked To: <proposal_id>        │ ← Immutable
│                                 │
│ [Create To-Do] [Skip]           │
└─────────────────────────────────┘
           ↓
To-do created & linked to proposal
           ↓
Assignee gets instant SSE alert + email (respects config)
```

### To-Do Dashboard Tab

**Location:** Right panel, **Tab 4** (when proposal is selected)

```
Proposal: "Hire Senior Engineer"

Linked To-Dos:
├─ ✅ Post job on LinkedIn
│  └─ Assigned to: Marketing | Due: 2026-01-15 | Status: Done
│
├─ ⏳ Brief team on new hire
│  └─ Assigned to: CTO | Due: 2026-01-20 | Status: Pending
│  └─ [Edit] [Reassign] [Close] [Comment]
│
└─ ⏳ Prepare onboarding materials
   └─ Assigned to: HR | Due: 2026-01-25 | Status: Pending

[+ Create To-Do] [View All]
```

### My To-Dos Page

**Location:** Navigation → "My To-Dos"

```
Showing: 15 to-dos assigned to you

Filter by: [Status ▼] [Priority ▼] [Due Date ▼] [Linked Proposal ▼]
Sort by: [Due Date ▼]

TO-DOS
├─ OVERDUE (2)
│  ├─ ❌ Post job on LinkedIn [5 days late] Linked: Hiring
│  └─ ❌ Send welcome email [2 days late] No proposal
│
├─ DUE THIS WEEK (5)
│  ├─ Brief team on new hire [2026-01-20] Linked: Hiring
│  ├─ Allocate budget [2026-01-21] Linked: Budget
│  └─ ...
│
└─ DUE LATER (8)
   ├─ ✅ Implement new feature [2026-02-15] Linked: Product
   └─ ...

Bulk Actions: [Mark Done] [Reassign] [Delete]
```

### Why It Makes Decisions "Decisive"

| Before | After |
|--------|-------|
| "I approved it" | "I approved it + defined what happens next" |
| No follow-up mechanism | Clear action chain: Approve → Task → Done |
| "How do I tell the team?" | Task assigned instantly with due date |
| Approval is the end | Approval is the beginning of execution |

### Notifications

| Event | Notification |
|-------|--------------|
| **Assigned** | Instant SSE + email (respects config) |
| **Due Tomorrow** | 1-day reminder |
| **Overdue** | Daily reminder until done |
| **Marked Done** | Notify creator + proposal viewers |

### To-Do Database Schema

```sql
CREATE TABLE todos (
  id UUID PRIMARY KEY,
  linked_proposal_id UUID,              -- Can be NULL
  title TEXT NOT NULL,                  -- "Post job on LinkedIn"
  description TEXT,
  assignee_id UUID NOT NULL,            -- Who does it?
  created_by UUID NOT NULL,             -- Who created it?
  status TEXT NOT NULL,                 -- "pending" | "done" | "archived"
  priority TEXT,                        -- "high" | "normal" | "low"
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints for To-Dos

```
GET  /api/todos                         -- My to-dos
POST /api/todos                         -- Create new
PATCH /api/todos/:id                    -- Update status/assignee/due date
DELETE /api/todos/:id                   -- Soft-delete (archive)

GET  /api/proposals/:id/todos           -- Todos linked to proposal
POST /api/proposals/:id/todos           -- Create from approval
```

### Roadmap

**Phase 1 (MVP):** List + Checkboxes + Due Date  
**Phase 2:** Kanban board, Slack integration, recurring  
**Phase 3:** Team to-do views, automation rules, analytics

---

## CONFIGURATION EXAMPLES

### Example 1: Conservative (Banks/Finance)

```typescript
// Global Config (CEO sets)
{
  approval_threshold: { capex_requires_board_vote: 250000 },
  hiring_requires_cfo_approval: true,
  mandatory_2fa: true,
  eyes_only_encryption_required: true,
  archive_after_days: 2555,  // 7 years
  vector_refresh_interval: 60  // Once per hour
}

// User Config (Each manager customizes)
{
  only_awaiting_my_vote: true,
  show_future_vector: true,
  email_digest_frequency: "daily",
  to_do_default_due_days: 14  // 2 weeks
}
```

### Example 2: Agile (Tech Startup)

```typescript
// Global Config (CEO sets)
{
  approval_threshold: { capex_requires_board_vote: 500000 },
  hiring_requires_cfo_approval: false,
  mandatory_2fa: false,
  eyes_only_encryption_required: false,
  archive_after_days: 365,
  vector_refresh_interval: 5  // Every 5 minutes
}

// User Config (Each manager customizes)
{
  default_view: "pool_table",
  theme: "dark",
  mention_alerts: "instant",
  link_to_dos_on_approval: true,
  to_do_default_assignee: "team-lead@company.com"
}
```

---

## KEY METRICS

### Pool Table Dashboard
- 📊 **Decision Velocity:** Avg days from LISTENING → APPROVED
- ✅ **Approval Rate:** % Approved vs. Vetoed
- ⏱️ **SLA Compliance:** % On-Time
- 📈 **Workload:** Proposals awaiting your vote

### To-Dos
- ⚡ **Execution Velocity:** Days from approval → to-do completion
- 📈 **Completion Rate:** % of linked to-dos marked done
- 🔄 **Cycle Time:** Proposal → All to-dos complete
- ⏰ **Overdue Rate:** % late vs. on-time

---

## SUMMARY TABLE

| Feature | Who | Where | Scope |
|---------|-----|-------|-------|
| **Pool Table Dashboard** | All users | Left panel | View proposals + metrics + quick actions |
| **Global Config** | CEO/Admin | `/routes/admin/settings.tsx` | Enterprise-wide non-negotiable rules |
| **User Config** | Each manager | `/routes/settings/preferences.tsx` | Personal display + notification preferences |
| **To-Dos** | All users | Tab 4 + `/todos` page | Create/track execution tasks linked to approvals |

---

*Quick Reference for PRD v3.0.0*  
*See PRD_eBoard_v3.md for full details*  
*Updated: January 8, 2026*
