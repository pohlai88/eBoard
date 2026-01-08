#!/usr/bin/env -S deno run -A --watch=static/,routes/

import * as path from "@std/path";
import { Builder } from "fresh/dev";
import { tailwind } from "@fresh/plugin-tailwind";

// Resolve root to main-app directory (works when running from workspace root)
const root = path.dirname(path.fromFileUrl(import.meta.url));

const builder = new Builder({ root });
tailwind(builder); // Add Tailwind CSS v4 plugin

if (Deno.args.includes("build")) {
  await builder.build();
} else {
  await builder.listen(() => import("./main.ts"));
}
