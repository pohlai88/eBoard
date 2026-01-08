import { assertEquals, assertMatch } from "@std/assert";
import {
  type ApiResponse,
  createApiResponse,
  formatDate,
  generateId,
  getCurrentTimestamp,
  logRequest,
} from "./utils.ts";

Deno.test("generateId returns a UUID", () => {
  const id = generateId();
  // Simple UUID v4 pattern check
  assertMatch(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
});

Deno.test("formatDate returns ISO string", () => {
  const d = new Date("2025-01-01T00:00:00.000Z");
  const s = formatDate(d);
  assertEquals(s, "2025-01-01T00:00:00.000Z");
});

Deno.test("getCurrentTimestamp returns Date", () => {
  const ts = getCurrentTimestamp();
  assertEquals(ts instanceof Date, true);
});

Deno.test("createApiResponse returns typed object", () => {
  const resp: ApiResponse<{ x: number }> = createApiResponse(true, { x: 1 });
  assertEquals(resp.success, true);
  assertEquals(resp.data?.x, 1);
  assertEquals(resp.error, undefined);
  assertEquals(resp.timestamp instanceof Date, true);
});

Deno.test("logRequest does not throw", () => {
  logRequest("GET", "/health");
  assertEquals(true, true);
});
