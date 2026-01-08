// Real-World Example: Simple Web API Server
// This is like building with Express.js in Node!

import { Hono } from "@hono/hono";

const app = new Hono();

// In-memory data (like a simple database)
let todos = [
  { id: 1, task: "Learn Deno", done: false },
  { id: 2, task: "Build an API", done: false },
];

// Routes (Like Express routes!)
app.get("/", (c) => {
  return c.json({
    message: "Welcome to Deno API!",
    endpoints: {
      "GET /": "This message",
      "GET /todos": "Get all todos",
      "POST /todos": "Create new todo",
      "GET /hello/:name": "Greet someone",
    },
  });
});

// Get all todos
app.get("/todos", (c) => {
  return c.json({ todos });
});

// Create new todo
app.post("/todos", async (c) => {
  const body = await c.req.json();
  const newTodo = {
    id: todos.length + 1,
    task: body.task,
    done: false,
  };
  todos.push(newTodo);
  return c.json({ created: true, todo: newTodo });
});

// Dynamic route
app.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.json({ message: `Hello, ${name}!` });
});

// Start server
const port = 3000;
console.log(`🚀 Server running at http://localhost:${port}`);
console.log(`📝 Try: http://localhost:${port}/todos`);
console.log(`👋 Try: http://localhost:${port}/hello/YourName`);

Deno.serve({ port }, app.fetch);
