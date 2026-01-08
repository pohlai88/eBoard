# DRY Component Patterns - Deno/Fresh Best Practices
## Don't Repeat Yourself - Build Once, Use Everywhere

**Generated:** ${new Date().toISOString()}  
**Principle:** Reusable Components > Repeated Classes

---

## The Problem

```typescript
// ❌ ANTI-PATTERN - Repeated Classes Everywhere
export default function Dashboard() {
  return (
    <div>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition">
        Save Proposal
      </button>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition">
        Submit Report
      </button>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition">
        Create Task
      </button>
      {/* 47 more buttons with same classes... 😱 */}
    </div>
  );
}
```

**Problems:**
- Need to update 50+ places to change button style
- Inconsistencies creep in (`bg-blue-500` vs `bg-blue-600`)
- No type safety
- Hard to maintain
- Copy-paste errors

---

## The Solution: Component-Based Architecture

### Level 1: Basic Reusable Component

```typescript
// shared/ui/Button.tsx
export interface ButtonProps {
  children: any;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ✅ Usage - DRY!
import { Button } from "../../shared/ui/Button.tsx";

<Button onClick={handleSave}>Save Proposal</Button>
<Button onClick={handleSubmit}>Submit Report</Button>
<Button onClick={handleCreate}>Create Task</Button>

// Change styling? Update Button.tsx once! ✨
```

### Level 2: Variants & Sizes

```typescript
// shared/ui/Button.tsx
export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  children: any;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
}: ButtonProps) {
  // Base styles shared by all variants
  const base = "font-semibold rounded-lg transition-all duration-200 active:scale-95";

  // Variant-specific styles
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-lg",
  };

  // Size-specific styles
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      class={`${base} ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ✅ Usage - Flexible & DRY!
<Button variant="primary" size="lg">Save Proposal</Button>
<Button variant="danger">Delete Item</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="success">Approve</Button>
```

### Level 3: Full-Featured Component

```typescript
// shared/ui/Button.tsx
export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  iconPosition?: "left" | "right";
  children: any;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  class?: string; // Allow custom overrides
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    iconPosition = "left",
    children,
    onClick,
    type = "button",
    class: customClass = "",
  } = props;

  const base = [
    "font-semibold",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "active:scale-95",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
  ].join(" ");

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
    ghost: "hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const width = fullWidth ? "w-full" : "";
  const className = `${base} ${variants[variant]} ${sizes[size]} ${width} ${customClass}`.trim();

  const Spinner = () => (
    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  return (
    <button
      type={type}
      class={className}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <Spinner />}
      {!loading && icon && iconPosition === "left" && <span class="inline-flex">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === "right" && <span class="inline-flex">{icon}</span>}
    </button>
  );
}

// ✅ Usage - All features available!
import { Button } from "../../shared/ui/Button.tsx";
import { SaveIcon, TrashIcon, CheckIcon } from "../../shared/icons/mod.ts";

<Button 
  variant="primary" 
  size="lg" 
  icon={<SaveIcon />}
  loading={isSaving}
  onClick={handleSave}
>
  Save Proposal
</Button>

<Button 
  variant="danger" 
  icon={<TrashIcon />}
  disabled={!canDelete}
>
  Delete
</Button>

<Button 
  variant="success" 
  fullWidth
  type="submit"
>
  Submit Form
</Button>
```

---

## Complete Component Library Structure

```
Axis_eBoard/
├── shared/
│   ├── ui/
│   │   ├── mod.ts                 # Export all components
│   │   ├── Button.tsx             # ⭐ Reusable button
│   │   ├── Card.tsx               # ⭐ Reusable card
│   │   ├── Input.tsx              # ⭐ Reusable input
│   │   ├── Select.tsx             # ⭐ Reusable select
│   │   ├── Modal.tsx              # ⭐ Reusable modal
│   │   ├── Table.tsx              # ⭐ Reusable table
│   │   ├── Badge.tsx              # ⭐ Reusable badge
│   │   ├── Alert.tsx              # ⭐ Reusable alert
│   │   ├── Tabs.tsx               # ⭐ Reusable tabs
│   │   └── Dropdown.tsx           # ⭐ Reusable dropdown
│   ├── styles/
│   │   ├── design-tokens.ts       # Colors, spacing, etc.
│   │   └── utilities.ts           # Helper functions
│   ├── icons/
│   │   ├── mod.ts                 # Export all icons
│   │   ├── SaveIcon.tsx
│   │   ├── TrashIcon.tsx
│   │   └── CheckIcon.tsx
│   └── hooks/
│       ├── useClickOutside.ts
│       ├── useDebounce.ts
│       └── useLocalStorage.ts
```

### Exporting Components

```typescript
// shared/ui/mod.ts
export { Button } from "./Button.tsx";
export type { ButtonProps } from "./Button.tsx";

export { Card } from "./Card.tsx";
export type { CardProps } from "./Card.tsx";

export { Input } from "./Input.tsx";
export type { InputProps } from "./Input.tsx";

export { Modal } from "./Modal.tsx";
export type { ModalProps } from "./Modal.tsx";

export { Badge } from "./Badge.tsx";
export { Alert } from "./Alert.tsx";
export { Table } from "./Table.tsx";
export { Tabs } from "./Tabs.tsx";
export { Dropdown } from "./Dropdown.tsx";

// Usage in any file
import { Button, Card, Input, Modal } from "../../shared/ui/mod.ts";
```

---

## Example: Card Component

```typescript
// shared/ui/Card.tsx
export interface CardProps {
  children: any;
  variant?: "default" | "bordered" | "elevated" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  class?: string;
}

export function Card({
  children,
  variant = "default",
  padding = "md",
  hoverable = false,
  class: customClass = "",
}: CardProps) {
  const base = "rounded-xl transition-all duration-300";

  const variants = {
    default: "bg-white shadow-md",
    bordered: "bg-white border-2 border-gray-200",
    elevated: "bg-white shadow-xl",
    gradient: "bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hover = hoverable ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer" : "";

  const className = `${base} ${variants[variant]} ${paddings[padding]} ${hover} ${customClass}`.trim();

  return <div class={className}>{children}</div>;
}

export interface CardHeaderProps {
  children: any;
  class?: string;
}

export function CardHeader({ children, class: customClass = "" }: CardHeaderProps) {
  return (
    <div class={`pb-4 border-b border-gray-200 ${customClass}`.trim()}>
      {children}
    </div>
  );
}

export interface CardBodyProps {
  children: any;
  class?: string;
}

export function CardBody({ children, class: customClass = "" }: CardBodyProps) {
  return <div class={`py-4 ${customClass}`.trim()}>{children}</div>;
}

export interface CardFooterProps {
  children: any;
  class?: string;
}

export function CardFooter({ children, class: customClass = "" }: CardFooterProps) {
  return (
    <div class={`pt-4 border-t border-gray-200 ${customClass}`.trim()}>
      {children}
    </div>
  );
}

// ✅ Usage
import { Card, CardHeader, CardBody, CardFooter } from "../../shared/ui/mod.ts";
import { Button } from "../../shared/ui/mod.ts";

<Card variant="elevated" hoverable>
  <CardHeader>
    <h2 class="text-xl font-bold">Proposal #1234</h2>
  </CardHeader>
  <CardBody>
    <p>This is a sample proposal that demonstrates the card component...</p>
  </CardBody>
  <CardFooter>
    <div class="flex justify-end gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Approve</Button>
    </div>
  </CardFooter>
</Card>
```

---

## Example: Input Component

```typescript
// shared/ui/Input.tsx
export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: any;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  class?: string;
}

export function Input(props: InputProps) {
  const {
    type = "text",
    value,
    placeholder,
    label,
    error,
    disabled = false,
    required = false,
    fullWidth = false,
    size = "md",
    icon,
    onInput,
    onChange,
    class: customClass = "",
  } = props;

  const baseInput = [
    "border",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "disabled:bg-gray-100",
    "disabled:cursor-not-allowed",
  ].join(" ");

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const borderColor = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  const width = fullWidth ? "w-full" : "";
  const iconPadding = icon ? "pl-10" : "";

  const inputClass = `${baseInput} ${sizes[size]} ${borderColor} ${width} ${iconPadding} ${customClass}`.trim();

  return (
    <div class={fullWidth ? "w-full" : ""}>
      {label && (
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span class="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div class="relative">
        {icon && (
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          class={inputClass}
          onInput={(e) => onInput?.((e.target as HTMLInputElement).value)}
          onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
        />
      </div>

      {error && (
        <p class="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// ✅ Usage
import { Input } from "../../shared/ui/mod.ts";
import { EmailIcon, LockIcon } from "../../shared/icons/mod.ts";

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  icon={<EmailIcon />}
  required
  fullWidth
  value={email}
  onInput={setEmail}
  error={emailError}
/>

<Input
  label="Password"
  type="password"
  icon={<LockIcon />}
  required
  fullWidth
/>
```

---

## Design Tokens (Central Configuration)

```typescript
// shared/styles/design-tokens.ts
export const colors = {
  // Brand colors
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main brand color
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  
  // Semantic colors
  success: {
    light: "#d1fae5",
    DEFAULT: "#10b981",
    dark: "#047857",
  },
  
  warning: {
    light: "#fef3c7",
    DEFAULT: "#f59e0b",
    dark: "#d97706",
  },
  
  danger: {
    light: "#fee2e2",
    DEFAULT: "#ef4444",
    dark: "#dc2626",
  },
  
  // Neutral colors
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",  // 4px
  2: "0.5rem",   // 8px
  3: "0.75rem",  // 12px
  4: "1rem",     // 16px
  5: "1.25rem",  // 20px
  6: "1.5rem",   // 24px
  8: "2rem",     // 32px
  10: "2.5rem",  // 40px
  12: "3rem",    // 48px
  16: "4rem",    // 64px
  20: "5rem",    // 80px
} as const;

export const borderRadius = {
  none: "0",
  sm: "0.125rem",   // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem",   // 6px
  lg: "0.5rem",     // 8px
  xl: "0.75rem",    // 12px
  "2xl": "1rem",    // 16px
  "3xl": "1.5rem",  // 24px
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",
} as const;

export const fontSizes = {
  xs: "0.75rem",    // 12px
  sm: "0.875rem",   // 14px
  base: "1rem",     // 16px
  lg: "1.125rem",   // 18px
  xl: "1.25rem",    // 20px
  "2xl": "1.5rem",  // 24px
  "3xl": "1.875rem",// 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem",    // 48px
} as const;

// Usage in components
import { colors, spacing, borderRadius, shadows } from "../../shared/styles/design-tokens.ts";

const buttonStyle = {
  backgroundColor: colors.primary[500],
  padding: `${spacing[2]} ${spacing[4]}`,
  borderRadius: borderRadius.lg,
  boxShadow: shadows.lg,
};
```

---

## Real-World Example: Login Form

```typescript
// routes/login.tsx
import { Button } from "../../shared/ui/Button.tsx";
import { Input } from "../../shared/ui/Input.tsx";
import { Card } from "../../shared/ui/Card.tsx";
import { Alert } from "../../shared/ui/Alert.tsx";
import { EmailIcon, LockIcon } from "../../shared/icons/mod.ts";
import { signal } from "@preact/signals";

export default function LoginPage() {
  const email = signal("");
  const password = signal("");
  const error = signal("");
  const loading = signal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      error.value = "Invalid email or password";
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card variant="elevated" padding="lg" class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p class="text-gray-600 mt-2">Sign in to continue to Axis eBoard</p>
        </div>

        {error.value && (
          <Alert variant="danger" class="mb-6">
            {error.value}
          </Alert>
        )}

        <form onSubmit={handleSubmit} class="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={<EmailIcon />}
            required
            fullWidth
            value={email.value}
            onInput={(val) => (email.value = val)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<LockIcon />}
            required
            fullWidth
            value={password.value}
            onInput={(val) => (password.value = val)}
          />

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded" />
              <span class="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="/forgot-password" class="text-sm text-blue-500 hover:text-blue-600">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading.value}
          >
            Sign In
          </Button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" class="text-blue-500 hover:text-blue-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
```

**Result:**
- ✅ **Zero repeated classes** - All styling is in reusable components
- ✅ **Type-safe** - Full TypeScript autocomplete
- ✅ **Consistent** - Same look & feel across app
- ✅ **Maintainable** - Change Button.tsx, updates everywhere
- ✅ **Clean code** - Logic separated from styling

---

## Benefits Summary

### Component-Based Approach

| Aspect | Repeated Classes | Reusable Components |
|--------|-----------------|---------------------|
| **Maintainability** | ❌ Update 100+ places | ✅ Update 1 file |
| **Consistency** | ❌ Manual enforcement | ✅ Automatic |
| **Type Safety** | ❌ None | ✅ Full TypeScript |
| **Bundle Size** | ⚠️ Repeated strings | ✅ Optimized |
| **Testability** | ❌ Hard to test | ✅ Unit testable |
| **Reusability** | ❌ Copy-paste | ✅ Import |
| **Learning Curve** | ✅ Easy to start | ⚠️ Initial setup |

---

## Recommendation for Axis eBoard

### Phase 1: Setup Component Library (Week 1)
```bash
# Create structure
mkdir -p shared/ui shared/styles shared/icons shared/hooks

# Build core components
- Button (primary, secondary, danger, success)
- Input (text, email, password, with validation)
- Card (for proposals, tasks, etc.)
- Modal (for confirmations, forms)
- Table (for data display)
- Badge (for status indicators)
- Alert (for notifications)
```

### Phase 2: Use Everywhere (Week 2+)
```typescript
// Every route/component imports from shared
import { Button, Card, Input, Modal } from "../../shared/ui/mod.ts";

// Never repeat classes again!
<Button variant="primary">Consistent everywhere!</Button>
```

### Phase 3: Extend as Needed
```typescript
// Add custom variants
const customButton = `${buttonStyles.base} bg-gradient-to-r from-purple-500 to-pink-500`;

// Or extend existing components
<Button variant="primary" class="custom-override">
  Extended Button
</Button>
```

---

## Conclusion

**DON'T:**
```typescript
<button class="px-4 py-2 bg-blue-500...">Button 1</button>
<button class="px-4 py-2 bg-blue-500...">Button 2</button>
<button class="px-4 py-2 bg-blue-500...">Button 3</button>
```

**DO:**
```typescript
<Button>Button 1</Button>
<Button>Button 2</Button>
<Button>Button 3</Button>
```

**Result:** Same output, 100x better code! 🚀
