// Deno LSP Validation Script
// Run this to verify Deno LSP is active and working correctly

import { existsSync } from "@std/fs";
import { join } from "@std/path/join";

interface ValidationResult {
  check: string;
  status: "✅ PASS" | "❌ FAIL" | "⚠️ WARN";
  message: string;
}

const results: ValidationResult[] = [];

function addResult(check: string, status: "✅ PASS" | "❌ FAIL" | "⚠️ WARN", message: string) {
  results.push({ check, status, message });
}

console.log("🔍 Deno LSP Validation Check\n");
console.log("=".repeat(60));

// 1. Check Deno CLI is available
try {
  const denoVersion = Deno.version.deno;
  addResult(
    "Deno CLI",
    "✅ PASS",
    `Version ${denoVersion} installed`,
  );
} catch {
  addResult("Deno CLI", "❌ FAIL", "Deno CLI not found");
}

// 2. Check deno.json exists
const denoJsonPath = join(Deno.cwd(), "deno.json");
if (existsSync(denoJsonPath)) {
  addResult("deno.json", "✅ PASS", "Configuration file found");
} else {
  addResult("deno.json", "❌ FAIL", "Configuration file missing");
}

// 3. Check .vscode/settings.json
const settingsPath = join(Deno.cwd(), ".vscode", "settings.json");
if (existsSync(settingsPath)) {
  try {
    const settingsContent = await Deno.readTextFile(settingsPath);
    const settings = JSON.parse(settingsContent);

    if (settings["deno.enable"] === true) {
      addResult("LSP Enabled", "✅ PASS", "deno.enable is set to true");
    } else {
      addResult("LSP Enabled", "❌ FAIL", "deno.enable is not set to true");
    }

    if (settings["deno.lint"] === true) {
      addResult("LSP Linting", "✅ PASS", "deno.lint is enabled");
    } else {
      addResult("LSP Linting", "⚠️ WARN", "deno.lint is not enabled");
    }

    if (settings["deno.config"]) {
      addResult("LSP Config", "✅ PASS", `Config path: ${settings["deno.config"]}`);
    } else {
      addResult("LSP Config", "⚠️ WARN", "deno.config not specified");
    }
  } catch (error) {
    addResult("Settings File", "❌ FAIL", `Cannot read settings: ${error.message}`);
  }
} else {
  addResult("Settings File", "❌ FAIL", ".vscode/settings.json not found");
}

// 4. Check extension is recommended
const extensionsPath = join(Deno.cwd(), ".vscode", "extensions.json");
if (existsSync(extensionsPath)) {
  try {
    const extensionsContent = await Deno.readTextFile(extensionsPath);
    const extensions = JSON.parse(extensionsContent);

    if (extensions.recommendations?.includes("denoland.vscode-deno")) {
      addResult("Extension Recommended", "✅ PASS", "Deno extension in recommendations");
    } else {
      addResult("Extension Recommended", "⚠️ WARN", "Deno extension not in recommendations");
    }
  } catch {
    addResult("Extensions File", "⚠️ WARN", "Cannot read extensions.json");
  }
} else {
  addResult("Extensions File", "⚠️ WARN", ".vscode/extensions.json not found");
}

// 5. Test type checking capability
try {
  const testCode = `
import { Hono } from "@hono/hono";
const app = new Hono();
export { app };
`;

  // Try to type-check a simple file
  const tempFile = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tempFile, testCode);

  const checkProcess = new Deno.Command(Deno.execPath(), {
    args: ["check", tempFile],
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await checkProcess.output();
  await Deno.remove(tempFile);

  if (code === 0) {
    addResult("Type Checking", "✅ PASS", "Deno type checking works");
  } else {
    addResult("Type Checking", "⚠️ WARN", "Type checking may have issues");
  }
} catch (error) {
  addResult("Type Checking", "❌ FAIL", `Error: ${error.message}`);
}

// 6. Check workspace structure
const workspaceDirs = ["admin-api", "main-app", "shared"];
let workspaceCount = 0;
for (const dir of workspaceDirs) {
  const dirPath = join(Deno.cwd(), dir);
  if (existsSync(dirPath)) {
    workspaceCount++;
  }
}

if (workspaceCount === workspaceDirs.length) {
  addResult("Workspace Structure", "✅ PASS", `All ${workspaceCount} workspaces found`);
} else {
  addResult(
    "Workspace Structure",
    "⚠️ WARN",
    `Only ${workspaceCount}/${workspaceDirs.length} workspaces found`,
  );
}

// Print results
console.log("\n📊 Validation Results:\n");

let passCount = 0;
let failCount = 0;
let warnCount = 0;

for (const result of results) {
  console.log(`${result.status} ${result.check}`);
  console.log(`   ${result.message}\n`);

  if (result.status === "✅ PASS") passCount++;
  else if (result.status === "❌ FAIL") failCount++;
  else if (result.status === "⚠️ WARN") warnCount++;
}

console.log("=".repeat(60));
console.log(`\n📈 Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed\n`);

if (failCount === 0) {
  console.log("✅ Deno LSP should be active in Cursor!");
  console.log("\n💡 To verify LSP is running:");
  console.log("   1. Open a .ts file in Cursor");
  console.log("   2. Hover over code to see type information");
  console.log("   3. Check bottom status bar for 'Deno' indicator");
  console.log("   4. Try Ctrl+Click (Cmd+Click) on imports for go-to-definition");
  console.log("   5. Check Output panel → 'Deno Language Server' for activity\n");
  Deno.exit(0);
} else {
  console.log("❌ Some checks failed. Please fix the issues above.\n");
  Deno.exit(1);
}
