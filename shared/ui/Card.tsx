// DRY Card Component
// From: .PRD/3-documentation/DRY_COMPONENT_PATTERNS.md
// Enhanced with Tailwind CSS v4 semantic theme tokens

import type { ComponentChild } from "preact";

export interface CardProps {
  title?: string;
  children: ComponentChild;
  footer?: ComponentChild;
  variant?: "default" | "bordered" | "elevated";
  class?: string;
}

export function Card({
  title,
  children,
  footer,
  variant = "default",
  class: className,
}: CardProps): ComponentChild {
  const base = "rounded-lg p-6";

  // Using Tailwind classes
  const variants = {
    default: "bg-obsidian",
    bordered: "bg-obsidian border-2 border-charcoal",
    elevated: "bg-obsidian shadow-lg",
  };

  const classes = `${base} ${variants[variant]} ${className || ""}`;

  return (
    <div class={classes}>
      {title && (
        <h3 class="text-xl font-semibold mb-4 text-parchment">
          {title}
        </h3>
      )}
      <div class="text-ash">{children}</div>
      {footer && (
        <div class="mt-4 pt-4 border-t border-charcoal">
          {footer}
        </div>
      )}
    </div>
  );
}
