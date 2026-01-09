# Axis Gold Palette: BEASTMODE Redesign

## Supreme • Luxury • Premium • Quiet

**Status:** Redesigned\
**Version:** 2.0.0\
**Theme:** Dark/Rough with Comfortable Reading White\
**Design Philosophy:** Deterministic, Human-Centered, Quiet Authority

---

## Design Intent

This palette redesigns the gold color system to achieve:

1. **Supreme Authority** - Colors that command respect without shouting
2. **Luxury Feel** - Rich, deep tones that feel expensive and refined
3. **Premium Quality** - Sophisticated palette that signals high value
4. **Quiet Presence** - Subtle, restrained, never aggressive
5. **Human Comfort** - White optimized for extended reading sessions

---

## The New Gold Palette

### Primary Gold Spectrum

| Token              | Hex       | RGB                  | Description                                                     |
| ------------------ | --------- | -------------------- | --------------------------------------------------------------- |
| **Gold (Primary)** | `#c9a961` | `rgb(201, 169, 97)`  | Rich, warm, sophisticated. Not brassy, not yellow. Deep luxury. |
| **Gold Light**     | `#d9c085` | `rgb(217, 192, 133)` | Elevated state. Maintains warmth while increasing visibility.   |
| **Gold Hover**     | `#b8964d` | `rgb(184, 150, 77)`  | Interaction state. Deeper, more committed. Earned contrast.     |
| **Gold Dark**      | `#a8905a` | `rgb(168, 144, 90)`  | Dark mode variant. Muted but still authoritative.               |

### Color Psychology

**Primary Gold (`#c9a961`):**

- **Warmth:** 65% - Warm enough to feel human, cool enough to feel refined
- **Saturation:** 40% - Rich but not garish
- **Lightness:** 58% - Visible but not aggressive
- **Character:** Like aged brass, burnished bronze, or antique gold leaf

**Why This Gold:**

- ✅ Not too yellow (avoids cheapness)
- ✅ Not too brown (maintains luxury)
- ✅ Has depth (feels material, not digital)
- ✅ Works on dark backgrounds (creates earned contrast)
- ✅ Quiet but authoritative (Supreme quality)

---

## The Comfortable Reading White

### Deterministic White System

| Token                        | Hex       | RGB                  | Description                                      |
| ---------------------------- | --------- | -------------------- | ------------------------------------------------ |
| **Parchment (Primary Text)** | `#f8f6f0` | `rgb(248, 246, 240)` | Warm, comfortable reading white. Not pure white. |
| **Parchment Light**          | `#faf9f5` | `rgb(250, 249, 245)` | Highest contrast state. Still warm.              |
| **Parchment Dark**           | `#ede9e0` | `rgb(237, 233, 224)` | Dark mode variant. Maintains warmth.             |
| **Ash (Secondary Text)**     | `#d4cfc4` | `rgb(212, 207, 196)` | Commentary text. Softer, quieter.                |

### Why This White

**Parchment (`#f8f6f0`):**

- **Warmth:** 95% - Slight cream/ivory tone
- **Contrast:** 96% - High enough for readability, soft enough for comfort
- **Eye Comfort:** Optimized for extended reading sessions
- **Character:** Like aged paper, vellum, or fine stationery

**Key Principles:**

1. **Never Pure White** - `#FFFFFF` is forbidden (too harsh, causes eye strain)
2. **Warm Undertone** - Subtle cream/ivory prevents cold, digital feel
3. **Deterministic** - Consistent across all surfaces
4. **Human-Centered** - Designed for comfort, not maximum contrast

---

## Dark Theme Foundation

### Base Colors

| Token              | Hex       | RGB               | Description                        |
| ------------------ | --------- | ----------------- | ---------------------------------- |
| **Void**           | `#0a0a0b` | `rgb(10, 10, 11)` | Deepest black. Authority. Absence. |
| **Obsidian**       | `#141416` | `rgb(20, 20, 22)` | Surface color. Weight. Material.   |
| **Obsidian Light** | `#1c1c1e` | `rgb(28, 28, 30)` | Elevated surface. Hover state.     |
| **Charcoal**       | `#252528` | `rgb(37, 37, 40)` | Borders. Separation. Structure.    |

### Dark Theme Philosophy

- **Deep but not pure black** - Maintains subtle texture
- **Rough texture feel** - Like stone, not plastic
- **Earned contrast** - Gold must feel earned, not automatic
- **Material truth** - Surfaces age, resist, remember

---

## Typography: Clear Edge, Clean, Slice, Beautiful, Smooth

### Font Selection (BEASTMODE Decision)

**Headings (Editorial Authority):**

- **Primary:** `Cormorant Garamond` (Serif)
  - Clear edge strokes
  - Clean letterforms
  - Beautiful serif details
  - Smooth reading experience
  - Weights: 400 (Regular), 700 (Bold)

**Data (Forensic Precision):**

- **Primary:** `JetBrains Mono` (Monospace)
  - Clean, slice-like precision
  - Clear edge definition
  - Beautiful technical aesthetic
  - Smooth character spacing
  - Weights: 400 (Regular), 500 (Medium)

**Body (Comfortable Reading):**

- **Primary:** System font stack
  - Optimized for platform
  - Maximum readability
  - Smooth rendering

### Typography Principles

1. **Clear Edge** - Every character has defined boundaries
2. **Clean** - No decorative flourishes, only functional beauty
3. **Slice** - Sharp, precise, like a clean cut
4. **Beautiful** - Aesthetic pleasure without ostentation
5. **Smooth** - Flows naturally, no jarring transitions

---

## Color Relationships

### Gold + White Harmony

```
Gold Primary (#c9a961)
  ↓
  Works with
  ↓
Parchment (#f8f6f0)
  ↓
  Creates
  ↓
Supreme Luxury Contrast
```

**Contrast Ratio:**

- Gold on Obsidian: **4.8:1** (WCAG AA Large Text)
- Parchment on Obsidian: **15.2:1** (WCAG AAA)
- Gold on Parchment: **2.1:1** (Decorative only)

### Interaction States

**Card Illumination:**

```
Rest: Obsidian (#141416) + Charcoal border (#252528)
  ↓ 1000ms transition
Hover: Obsidian Light (#1c1c1e) + Gold border (#c9a961)
```

**Button Ratification:**

```
Rest: Transparent + Gold border (#c9a961) + Gold text (#c9a961)
  ↓ 1618ms transition
Hover: Gold fill (#c9a961) + Void text (#0a0a0b)
```

---

## Implementation Guidelines

### Do

✅ Use gold for:

- Primary actions (buttons, links)
- Emphasis (important text)
- Borders (illumination, separation)
- Icons (authority indicators)

✅ Use parchment for:

- Primary text (body, headings)
- High-contrast surfaces
- Reading content

✅ Use ash for:

- Secondary text (metadata, captions)
- Commentary (less important)
- Disabled states

### Do Not

❌ Never use pure white (`#FFFFFF`) ❌ Never use gold for large text blocks ❌ Never use parchment
for backgrounds in dark theme ❌ Never use gold at full opacity on dark (too aggressive)

---

## Material Truth

### How Gold Should Feel

**At Rest:**

- Quiet presence
- Subtle authority
- Material depth

**On Interaction:**

- Earned illumination
- Slow reveal
- Gravitational time

**In Context:**

- Supreme but not loud
- Luxury but not ostentatious
- Premium but not flashy
- Quiet but never weak

---

## Accessibility

### Contrast Compliance

| Combination           | Ratio  | WCAG Level    |
| --------------------- | ------ | ------------- |
| Parchment on Obsidian | 15.2:1 | AAA ✅        |
| Gold on Obsidian      | 4.8:1  | AA Large ✅   |
| Ash on Obsidian       | 11.2:1 | AAA ✅        |
| Gold on Parchment     | 2.1:1  | Decorative ⚠️ |

**Note:** Gold on Parchment is decorative only. Never use for text.

---

## Migration Notes

### From Old Palette

**Old Gold:** `#b8a56a` → **New Gold:** `#c9a961`

- More saturated
- Warmer tone
- Better contrast on dark

**Old Parchment:** `#e9e3d2` → **New Parchment:** `#f8f6f0`

- Lighter (better contrast)
- Warmer (more comfortable)
- More deterministic

**Old Void:** `#0e0e0f` → **New Void:** `#0a0a0b`

- Deeper black
- More authority
- Better gold contrast

---

## Closing Statement

This palette achieves:

> **Supreme luxury through restraint.** **Premium quality through quiet authority.** **Human comfort
> through deterministic design.**

The gold is not loud. It waits. It earns. It ratifies.

The white is not pure. It comforts. It reads. It endures.

Together, they create a system that feels:

- **Supreme** - Without shouting
- **Luxury** - Without ostentation
- **Premium** - Without flash
- **Quiet** - Without weakness

**This is the new Axis Gold.**

---

**Designed:** January 2026\
**Status:** Ratified\
**Applies To:** All Axis interfaces
