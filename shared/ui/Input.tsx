// DRY Input Component
// From: .PRD/3-documentation/DRY_COMPONENT_PATTERNS.md
// Enhanced with Tailwind CSS v3.4 brand tokens

import type { ComponentChild } from "preact";

export interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "date";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  class?: string;
}

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  class: className,
}: InputProps): ComponentChild {
  const base =
    "w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-[var(--color-surface)]";

  // Using semantic tokens from @theme directive
  const states = error
    ? "border-[var(--color-border-error)] focus:ring-[var(--color-error)]"
    : "border-[var(--color-border)] focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]";

  const classes = `${base} ${states} ${className || ""}`;

  return (
    <div class="mb-4">
      {label && (
        <label class="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
          {label}
          {required && <span class="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        class={classes}
        placeholder={placeholder}
        value={value}
        onInput={(e) => onChange?.(e.currentTarget.value)}
        required={required}
        disabled={disabled}
      />
      {error && <p class="mt-1 text-sm text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
