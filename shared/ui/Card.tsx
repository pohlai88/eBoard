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

  // Using semantic tokens from @theme directive
  const variants = {
    default: "bg-[var(--color-surface)]",
    bordered: "bg-[var(--color-surface)] border-2 border-[var(--color-border)]",
    elevated: "bg-[var(--color-surface)] shadow-lg",
  };

  const classes = `${base} ${variants[variant]} ${className || ""}`;

  return (
    <div class={classes}>
      {title && (
        <h3 class="text-xl font-semibold mb-4 text-[var(--color-on-surface)]">
          {title}
        </h3>
      )}
      <div class="text-[var(--color-on-surface-variant)]">{children}</div>
      {footer && (
        <div class="mt-4 pt-4 border-t border-[var(--color-border)]">
          {footer}
        </div>
      )}
    </div>
  );
}
