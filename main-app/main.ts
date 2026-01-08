// Main App - Placeholder for Full-Stack Application
// You can replace this with Fresh, Hono, or any other framework

import { load } from "@std/dotenv";

const env = await load();

console.log(`✅ Main App ready!`);
console.log(`📌 Port: ${env["APP_PORT"] || "3000"}`);
console.log(`📝 Ready to add Fresh, Hono, Oak, or any framework`);
console.log(`\n📚 Use shared types from @shared/`);
console.log(`   import { User, Post } from "@shared";`);
