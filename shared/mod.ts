// Shared module - Re-export all shared code
// Export types first (base definitions)
export * from "./types.ts";

// Export utilities
export * from "./utils.ts";

// Export validation schemas (types are already exported from types.ts)
export {
  UserSchema,
  PostSchema,
  CreateUserSchema,
  CreatePostSchema,
  SettingsSchema,
  type CreateUser,
  type CreatePost,
} from "./validation.ts";

// Export UI components
export * from "./ui/mod.ts";
