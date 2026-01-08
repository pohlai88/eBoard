// Validation schemas using Zod
import { z } from "zod";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  created_at: Date;
  updated_at: Date;
}

export const UserSchema: z.ZodType<User> = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["admin", "user", "moderator"]),
  created_at: z.date(),
  updated_at: z.date(),
});

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  status: "draft" | "published" | "archived";
  created_at: Date;
  updated_at: Date;
}

export const PostSchema: z.ZodType<Post> = z.object({
  id: z.string().uuid(),
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  author_id: z.string().uuid(),
  status: z.enum(["draft", "published", "archived"]),
  created_at: z.date(),
  updated_at: z.date(),
});

export interface CreateUser {
  name: string;
  email: string;
  role?: "admin" | "user" | "moderator";
}

export const CreateUserSchema: z.ZodType<CreateUser> = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["admin", "user", "moderator"]).optional(),
});

export interface CreatePost {
  title: string;
  content: string;
  author_id: string;
}

export const CreatePostSchema: z.ZodType<CreatePost> = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  author_id: z.string().uuid(),
});

export interface Settings {
  maintenance_mode: boolean;
  max_upload_size: string;
  api_rate_limit: number;
}

export const SettingsSchema: z.ZodType<Settings> = z.object({
  maintenance_mode: z.boolean(),
  max_upload_size: z.string(),
  api_rate_limit: z.number().min(1),
});

// Explicit exported types (interfaces above) for public API
