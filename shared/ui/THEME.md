# Axis Visual Canon Theme System

**Status:** Ratified\
**Version:** 1.0.0\
**Derived From:**
[Axis Visual Canon Official Design System](../../.PRD/2-architecture/Axis_visual_canon_official_design_system.md)\
**Framework:** Tailwind CSS v4 (CSS-First Configuration)

---

## Executive Preamble

This theme system implements the **Axis Visual Canon**—a jurisdictional surface specification that
governs how Axis is seen, felt, and trusted by humans.

> **To ensure every interaction communicates authority, restraint, and human dignity.**

This is not a branding guide. This is not UI polish.\
This is a **governance tool** for visual design.

---

## Part I — Foundational Philosophy

### 1.1 Jurisdiction, Not Product

Axis is not a product that invites engagement.\
Axis is a system that _permits action_.

**The Three Laws:**

- The interface **waits**.
- The interface **resists**.
- The interface **remembers**.

### 1.2 Material Truth (Anti-Plastic Doctrine)

Plastic surfaces feel cheap because they:

- Reflect light uniformly
- Carry no memory
- Do not resist interaction

**Axis surfaces behave like material:**

- **Wood** (grain)
- **Stone** (weight)
- **Parchment** (absorption)

> **If a surface does not age, it does not deserve authority.**

### 1.3 Light as Language

Humans perceive meaning through _change in light over time_, not static color.

**Axis uses:**

- Conditional illumination
- Slow transitions
- Earned contrast

**Light indicates:**

- **Awareness** (hover)
- **Intent** (press)
- **Commitment** (seal)

---

## Part II — Material-Based Color System

### 2.1 Core Material Palette

Color in Axis represents **material states**, not UI states.

| Token         | Hex       | Meaning             |
| ------------- | --------- | ------------------- |
| **Void**      | `#0E0E0F` | Absence / Authority |
| **Obsidian**  | `#161618` | Surface / Weight    |
| **Parchment** | `#E9E3D2` | Knowledge           |
| **Ash**       | `#CFC8B8` | Commentary          |
| **Gold**      | `#B8A56A` | Ratified Authority  |
| **Ember**     | `#8C6A2F` | Consequence         |

### 2.2 CSS Custom Properties

All material colors are defined in `main-app/static/styles.css`:

```css
@theme {
  --color-void: #0e0e0f;
  --color-obsidian: #161618;
  --color-parchment: #e9e3d2;
  --color-ash: #cfc8b8;
  --color-gold: #b8a56a;
  --color-ember: #8c6a2f;
}
```

### 2.3 Semantic Mappings

Material colors map to semantic roles:

- **Primary** → `--color-gold` (Ratified Authority)
- **Surface** → `--color-parchment` (Knowledge)
- **On-Surface** → `--color-void` (Authority Text)
- **Border** → `--color-ash` (Commentary)
- **Focus** → `--color-gold` (Authority)
- **Error** → `--color-ember` (Consequence)

### 2.4 Anti-Pure White Rule

**Pure white (`#FFFFFF`) is FORBIDDEN.**

Text must use a _living neutral spectrum_:

- **Parchment** (primary text)
- **Ash** (secondary text)
- **Gold** (emphasis)

This preserves emotional calm and reading endurance.

---

## Part III — Typography Doctrine

### 3.1 Editorial Authority

Headings must feel **written, not rendered**.

**Requirements:**

- Serif only
- High contrast strokes
- Generous spacing

**Recommended Fonts:**

- `Cormorant Garamond` (primary)
- `Playfair Display` (alternative)

```css
.heading-editorial {
  font-family: var(--font-family-serif);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
}
```

### 3.2 Forensic Data

All numeric or immutable data must be **monospaced**.

**Purpose:**

- Eliminate ambiguity
- Signal permanence

**Recommended Font:**

- `JetBrains Mono`

```css
.data-forensic {
  font-family: var(--font-family-mono);
  letter-spacing: var(--tracking-normal);
}
```

### 3.3 Font Families (CSS Variables)

```css
--font-family-serif: "Cormorant Garamond", "Playfair Display", "Georgia", serif;
--font-family-mono: "JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", monospace;
--font-family-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

---

## Part IV — Motion Physics

### 4.1 Gravitational Time

Axis motion obeys **gravitational time**, not UI speed.

**Rules:**

- ❌ No bounce
- ❌ No snap
- ❌ No elastic easing

**Recommended Durations:**

- **Hover**: 700–1200ms
- **Commitment**: 1618ms (Golden Ratio)

### 4.2 Transition Variables

```css
--transition-hover: 1200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-commitment: 1618ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-illumination: 1000ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage:**

```css
.card-illumination {
  transition: border-color var(--transition-illumination);
}
```

> **Motion communicates consequence.**

---

## Part V — Interaction Law

### 5.1 Card vs Button

**Cards** illuminate knowledge.\
**Buttons** ratify decisions.

**They must never behave the same.**

### 5.2 Cards (Illumination)

**Behavior:**

- Dim at rest
- Light descends on hover
- Borders warm before content

**Implementation:**

```css
.card-illumination {
  background-color: var(--color-obsidian);
  border: 1px solid var(--color-border-charcoal);
  transition:
    border-color var(--transition-illumination),
    background-color var(--transition-illumination);
}

.card-illumination:hover {
  border-color: var(--color-gold);
  background-color: var(--color-obsidian-light);
}
```

### 5.3 Buttons (Selection)

**Behavior:**

- Quiet visibility at rest
- Resistance before activation
- Time-based confirmation

**Implementation:**

```css
.button-ratify {
  border: 1px solid var(--color-gold);
  background-color: transparent;
  color: var(--color-gold);
  padding: 1.25rem 4rem;
  font-family: var(--font-family-mono);
  letter-spacing: var(--tracking-decree);
  transition: background-color var(--transition-commitment), color var(--transition-commitment);
}

.button-ratify:hover {
  background-color: var(--color-gold);
  color: var(--color-void);
}
```

> **A decision must be felt before it is executed.**

---

## Part VI — Using the Theme System

### 6.1 CSS-First Configuration

Theme tokens are defined in `main-app/static/styles.css` using Tailwind CSS v4's `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-void: #0e0e0f;
  --color-gold: #b8a56a;
  /* ... more tokens */
}
```

### 6.2 Component Usage

**Cards (Illumination):**

```tsx
<div class="card-illumination p-6">
  <h2 class="heading-editorial text-2xl mb-4">Knowledge</h2>
  <p class="text-ash">Content that illuminates understanding.</p>
</div>;
```

**Buttons (Ratification):**

```tsx
<button class="button-ratify uppercase">
  SIGN
</button>;
```

**Forensic Data:**

```tsx
<span class="data-forensic">$1,234.56</span>;
```

### 6.3 Semantic Tailwind Classes

Use semantic classes that reference CSS custom properties:

```tsx
// ✅ Correct - Material-based
<div class="bg-[var(--color-parchment)] text-[var(--color-void)]">
  Content
</div>

// ❌ Wrong - Hardcoded color
<div class="bg-white text-black">
  Content
</div>
```

---

## Part VII — Dark Mode

### 7.1 Material Inversion

Dark mode inverts material surfaces:

- **Light Mode**: Parchment surface, Void text
- **Dark Mode**: Obsidian surface, Parchment text

### 7.2 Implementation

```css
.dark {
  --color-surface: var(--color-obsidian);
  --color-on-surface: var(--color-parchment);
  /* ... */
}
```

### 7.3 Theme Provider

```tsx
import { ThemeProvider, useTheme } from "@shared/ui/mod.ts";

<ThemeProvider>
  <YourApp />
</ThemeProvider>;
```

---

## Part VIII — Enforcement Rules

### 8.1 Non-Canonical Violations

Any UI that:

- Uses pure white (`#FFFFFF`)
- Treats buttons like cards
- Optimizes speed over weight
- Uses decorative color
- Animates for delight

Is **Non-Canonical**.

### 8.2 Application Guidelines

**Do:**

- Respect silence
- Use space as authority
- Let the system wait

**Do Not:**

- Add decorative color
- Animate for delight
- Explain what competence assumes

---

## Part IX — Technical Reference

### 9.1 Available CSS Variables

#### Material Colors

- `--color-void`
- `--color-obsidian`
- `--color-parchment`
- `--color-ash`
- `--color-gold`
- `--color-ember`

#### Typography

- `--font-family-serif`
- `--font-family-mono`
- `--font-family-sans`
- `--tracking-tight`, `--tracking-normal`, `--tracking-wide`, `--tracking-decree`

#### Motion

- `--transition-hover` (1200ms)
- `--transition-commitment` (1618ms)
- `--transition-illumination` (1000ms)

### 9.2 Utility Classes

- `.card-illumination` - Card with illumination behavior
- `.button-ratify` - Button with ratification behavior
- `.heading-editorial` - Serif heading with editorial authority
- `.data-forensic` - Monospace data display
- `.text-parchment` - Parchment text color
- `.text-ash` - Ash text color
- `.text-gold` - Gold text color

---

## Part X — Closing Statement

Axis does not compete for attention.\
Axis earns trust.

> **Restraint is the highest form of power.**

This document is binding.

---

## Resources

- [Axis Visual Canon Official Design System](../../.PRD/2-architecture/Axis_visual_canon_official_design_system.md)
- [NexusCanon Constitution](../../.PRD/2-architecture/NexusCanon_Constitution.md)
- [NexusCanon Olympian Implementation](../../.PRD/2-architecture/NexusCanon_Olympian.md)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Fresh Framework Documentation](https://fresh.deno.dev)
