// Shared tokens for usage in TypeScript logic (Islands/Components)
// These reference the CSS variables defined in static/styles.css
export const themeTokens = {
  colors: {
    primary: "var(--color-primary)",
    void: "var(--color-void)",
    gold: "var(--color-gold)",
    obsidian: "var(--color-obsidian)",
    parchment: "var(--color-parchment)",
    ash: "var(--color-ash)",
    ember: "var(--color-ember)",
    charcoal: "var(--color-charcoal)",
  },
  animation: {
    gravitational: "cubic-bezier(0.4, 0, 0.2, 1)",
  }
} as const;
