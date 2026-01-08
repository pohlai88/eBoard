// Validation schemas using Zod
import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    role: z.enum(["admin", "user", "moderator"]),
    created_at: z.date(),
    updated_at: z.date(),
});

export const PostSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(5).max(200),
    content: z.string().min(10),
    author_id: z.string().uuid(),
    status: z.enum(["draft", "published", "archived"]),
    created_at: z.date(),
    updated_at: z.date(),
});

export const CreateUserSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    role: z.enum(["admin", "user", "moderator"]).optional(),
});

export const CreatePostSchema = z.object({
    title: z.string().min(5).max(200),
    content: z.string().min(10),
    author_id: z.string().uuid(),
});

export const SettingsSchema = z.object({
    maintenance_mode: z.boolean(),
    max_upload_size: z.string(),
    api_rate_limit: z.number().min(1),
});

// Type inference
export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
