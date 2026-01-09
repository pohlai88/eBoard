// DRY Button Component - Build Once, Use Everywhere
// From: .PRD/3-documentation/DRY_COMPONENT_PATTERNS.md
// Enhanced with Tailwind CSS v4 semantic theme tokens

import type { ComponentChild } from "preact";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ComponentChild;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  type = "button",
  class: className,
}: ButtonProps): ComponentChild {
  // Base styles shared by all variants
  const base =
    "font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant-specific styles using Tailwind classes
  const variants = {
    primary: "bg-gold hover:bg-gold-hover text-void shadow-lg",
    secondary: "bg-ash hover:bg-ash/80 text-void shadow-lg",
    danger: "bg-ember hover:bg-ember/90 text-parchment shadow-lg",
    success: "bg-gold-light hover:bg-gold text-void shadow-lg",
  };

  // Size-specific styles
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className || ""}`;

  return (
    <button
      type={type}
      class={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
