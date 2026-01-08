import { assertEquals, assertThrows } from "@std/assert";
import {
  type CreatePost,
  CreatePostSchema,
  type CreateUser,
  CreateUserSchema,
  type Post,
  PostSchema,
  type Settings,
  SettingsSchema,
  type User,
  UserSchema,
} from "./validation.ts";

Deno.test("UserSchema parses valid user", () => {
  const u: User = {
    id: crypto.randomUUID(),
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  };
  const parsed = UserSchema.parse(u);
  assertEquals(parsed.email, "alice@example.com");
});

Deno.test("UserSchema rejects invalid email", () => {
  const u: Record<string, unknown> = {
    id: crypto.randomUUID(),
    name: "Bob",
    email: "not-an-email",
    role: "user",
    created_at: new Date(),
    updated_at: new Date(),
  };
  assertThrows(() => UserSchema.parse(u));
});

Deno.test("PostSchema parses valid post", () => {
  const p: Post = {
    id: crypto.randomUUID(),
    title: "Hello World",
    content: "This is content.",
    author_id: crypto.randomUUID(),
    status: "draft",
    created_at: new Date(),
    updated_at: new Date(),
  };
  const parsed = PostSchema.parse(p);
  assertEquals(parsed.title, "Hello World");
});

Deno.test("CreateUserSchema parses minimal payload", () => {
  const cu: CreateUser = { name: "Eve", email: "eve@example.com" };
  const parsed = CreateUserSchema.parse(cu);
  assertEquals(parsed.name, "Eve");
});

Deno.test("CreatePostSchema requires fields", () => {
  const cp: CreatePost = {
    title: "Title",
    content: "This is body.",
    author_id: crypto.randomUUID(),
  };
  const parsed = CreatePostSchema.parse(cp);
  assertEquals(parsed.title, "Title");
});

Deno.test("SettingsSchema parses configuration", () => {
  const s: Settings = {
    maintenance_mode: false,
    max_upload_size: "10MB",
    api_rate_limit: 100,
  };
  const parsed = SettingsSchema.parse(s);
  assertEquals(parsed.api_rate_limit, 100);
});
