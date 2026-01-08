// Deno Workspace Health Check
// Comprehensive validation of the entire Deno workspace

import { existsSync } from "@std/fs";
import { join } from "@std/path/join";

interface HealthCheck {
  category: string;
  check: string;
  status: "✅ HEALTHY" | "⚠️ WARNING" | "❌ ISSUE";
  message: string;
  fix?: string;
}

const checks: HealthCheck[] = [];

function addCheck(
  category: string,
  check: string,
  status: "✅ HEALTHY" | "⚠️ WARNING" | "❌ ISSUE",
  message: string,
  fix?: string,
) {
  checks.push({ category, check, status, message, fix });
}

console.log("🏥 Deno Workspace Health Check\n");
console.log("=".repeat(70));

// 1. Deno CLI
try {
  const version = Deno.version.deno;
  addCheck("Runtime", "Deno CLI", "✅ HEALTHY", `Version ${version} installed`);
} catch {
  addCheck("Runtime", "Deno CLI", "❌ ISSUE", "Deno CLI not found");
}

// 2. Workspace Configuration
const denoJsonPath = join(Deno.cwd(), "deno.json");
if (existsSync(denoJsonPath)) {
  try {
    const denoJson = JSON.parse(await Deno.readTextFile(denoJsonPath));
    if (Array.isArray(denoJson.workspace) && denoJson.workspace.length > 0) {
      addCheck(
        "Configuration",
        "Workspace Setup",
        "✅ HEALTHY",
        `${denoJson.workspace.length} workspaces configured`,
      );
    } else {
      addCheck("Configuration", "Workspace Setup", "⚠️ WARNING", "No workspaces defined");
    }
  } catch {
    addCheck("Configuration", "Workspace Setup", "❌ ISSUE", "Cannot read deno.json");
  }
} else {
  addCheck("Configuration", "Workspace Setup", "❌ ISSUE", "deno.json not found");
}

// 3. Workspace Directories
const workspaceDirs = ["admin-api", "main-app", "shared"];
let foundDirs = 0;
for (const dir of workspaceDirs) {
  if (existsSync(join(Deno.cwd(), dir))) {
    foundDirs++;
  }
}

if (foundDirs === workspaceDirs.length) {
  addCheck(
    "Structure",
    "Workspace Directories",
    "✅ HEALTHY",
    `All ${foundDirs} workspaces exist`,
  );
} else {
  addCheck(
    "Structure",
    "Workspace Directories",
    "⚠️ WARNING",
    `Only ${foundDirs}/${workspaceDirs.length} workspaces found`,
  );
}

// 4. LSP Configuration
const settingsPath = join(Deno.cwd(), ".vscode", "settings.json");
if (existsSync(settingsPath)) {
  try {
    const settings = JSON.parse(await Deno.readTextFile(settingsPath));
    if (settings["deno.enable"] === true) {
      addCheck("LSP", "LSP Enabled", "✅ HEALTHY", "deno.enable is true");
    } else {
      addCheck("LSP", "LSP Enabled", "❌ ISSUE", "deno.enable is not true");
    }
  } catch {
    addCheck("LSP", "LSP Configuration", "⚠️ WARNING", "Cannot read settings.json");
  }
} else {
  addCheck("LSP", "LSP Configuration", "⚠️ WARNING", ".vscode/settings.json not found");
}

// 5. Extension Recommendations
const extensionsPath = join(Deno.cwd(), ".vscode", "extensions.json");
if (existsSync(extensionsPath)) {
  try {
    const extensions = JSON.parse(await Deno.readTextFile(extensionsPath));
    if (extensions.recommendations?.includes("denoland.vscode-deno")) {
      addCheck("LSP", "Extension Recommended", "✅ HEALTHY", "Deno extension in recommendations");
    } else {
      addCheck("LSP", "Extension Recommended", "⚠️ WARNING", "Deno extension not recommended");
    }
  } catch {
    addCheck("LSP", "Extension Recommendations", "⚠️ WARNING", "Cannot read extensions.json");
  }
}

// 6. Type Checking (simplified check)
try {
  const checkProcess = new Deno.Command(Deno.execPath(), {
    args: ["check", "--quiet", "shared/utils.ts"],
    stdout: "piped",
    stderr: "piped",
  });
  const { code } = await checkProcess.output();
  if (code === 0) {
    addCheck("Code Quality", "Type Checking", "✅ HEALTHY", "Basic type checking works");
  } else {
    addCheck(
      "Code Quality",
      "Type Checking",
      "⚠️ WARNING",
      "Some type errors detected (check output for details)",
    );
  }
} catch {
  addCheck("Code Quality", "Type Checking", "⚠️ WARNING", "Could not verify type checking");
}

// 7. Tests
try {
  const testProcess = new Deno.Command(Deno.execPath(), {
    args: ["test", "--quiet"],
    stdout: "piped",
    stderr: "piped",
  });
  const { code } = await testProcess.output();
  if (code === 0) {
    addCheck("Code Quality", "Tests", "✅ HEALTHY", "All tests passing");
  } else {
    addCheck("Code Quality", "Tests", "⚠️ WARNING", "Some tests may be failing");
  }
} catch {
  addCheck("Code Quality", "Tests", "⚠️ WARNING", "Could not run tests");
}

// 8. Dependencies Cache
try {
  const cacheProcess = new Deno.Command(Deno.execPath(), {
    args: ["cache", "--quiet", "admin-api/main.ts"],
    stdout: "piped",
    stderr: "piped",
  });
  const { code } = await cacheProcess.output();
  if (code === 0) {
    addCheck("Dependencies", "Cache", "✅ HEALTHY", "Dependencies can be cached");
  } else {
    addCheck("Dependencies", "Cache", "⚠️ WARNING", "Some dependencies may have issues");
  }
} catch {
  addCheck("Dependencies", "Cache", "⚠️ WARNING", "Could not verify dependency cache");
}

// Print Results
console.log("\n📊 Health Check Results:\n");

const categories = [...new Set(checks.map((c) => c.category))];

for (const category of categories) {
  console.log(`\n📁 ${category}:`);
  const categoryChecks = checks.filter((c) => c.category === category);
  for (const check of categoryChecks) {
    console.log(`  ${check.status} ${check.check}`);
    console.log(`     ${check.message}`);
    if (check.fix) {
      console.log(`     💡 Fix: ${check.fix}`);
    }
  }
}

// Summary
const healthy = checks.filter((c) => c.status === "✅ HEALTHY").length;
const warnings = checks.filter((c) => c.status === "⚠️ WARNING").length;
const issues = checks.filter((c) => c.status === "❌ ISSUE").length;

console.log("\n" + "=".repeat(70));
console.log(`\n📈 Summary: ${healthy} healthy, ${warnings} warnings, ${issues} issues\n`);

if (issues === 0 && warnings === 0) {
  console.log("🎉 Workspace is fully healthy!\n");
  Deno.exit(0);
} else if (issues === 0) {
  console.log("✅ Workspace is mostly healthy with some warnings.\n");
  Deno.exit(0);
} else {
  console.log("⚠️ Workspace has issues that should be addressed.\n");
  Deno.exit(1);
}
