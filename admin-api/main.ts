// Admin API - Lightweight Hono Server
// Ultra-fast API for admin functions only

import { Hono } from "@hono/hono";
import { load } from "@std/dotenv";

const env = await load();
const app = new Hono();

// Health check
app.get("/", (c) => {
    return c.json({
        status: "admin api running",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
});

// Dashboard stats (example)
app.get("/dashboard", (c) => {
    return c.json({
        users: 1234,
        posts: 5678,
        visits_today: 89,
        last_updated: new Date().toISOString(),
    });
});

// User management endpoints
app.get("/users", (c) => {
    return c.json({ users: [] });
});

app.post("/users/:id/ban", async (c) => {
    const id = c.req.param("id");
    // Ban logic here
    return c.json({ banned: true, user_id: id });
});

// Settings
app.get("/settings", (c) => {
    return c.json({
        maintenance_mode: false,
        max_upload_size: "100MB",
    });
});

app.put("/settings", async (c) => {
    const body = await c.req.json();
    return c.json({ updated: true, settings: body });
});

// Start server
const port = parseInt(env["ADMIN_PORT"] || "3001");
console.log(`✅ Admin API running on http://localhost:${port}`);
console.log(`📝 Available endpoints:`);
console.log(`   GET  /              - Health check`);
console.log(`   GET  /dashboard     - Dashboard stats`);
console.log(`   GET  /users         - List users`);
console.log(`   POST /users/:id/ban - Ban user`);
console.log(`   GET  /settings      - Get settings`);
console.log(`   PUT  /settings      - Update settings`);

Deno.serve({ port }, app.fetch);
