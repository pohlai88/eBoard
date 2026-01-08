// tools/validate-docs.ts
/**
 * Validates The Apex documentation structure and completeness
 *
 * @example
 * ```bash
 * deno task docs:validate
 * ```
 */

interface ValidationResult {
  file: string;
  status: "ok" | "warning" | "error";
  message: string;
}

const results: ValidationResult[] = [];

async function validateFile(
  path: string,
  minLines: number = 10,
): Promise<void> {
  try {
    const content = await Deno.readTextFile(path);
    const lines = content.split("\n").length;

    if (lines < minLines) {
      results.push({
        file: path,
        status: "warning",
        message: `File is too short (${lines} lines, expected >= ${minLines})`,
      });
      return;
    }

    // Check for required headers
    const hasHeaders = content.includes("#");
    if (!hasHeaders) {
      results.push({
        file: path,
        status: "warning",
        message: `File has no headers (no # found)`,
      });
      return;
    }

    results.push({
      file: path,
      status: "ok",
      message: `Valid (${lines} lines)`,
    });
  } catch (error) {
    const err = error as Error;
    results.push({
      file: path,
      status: "error",
      message: `File does not exist: ${err.message}`,
    });
  }
}

async function main() {
  console.log("🔍 Validating Apex Documentation...\n");

  // Check critical PRD files
  const criticalFiles = [
    "./.PRD/1-core-prd/PRD_eBoard_v3.md",
    "./.PRD/1-core-prd/v3_DOCUMENTATION_INDEX.md",
    "./.PRD/1-core-prd/APEX_v3_COMPLETE_ARCHITECTURE.md",
    "./.PRD/1-core-prd/PRD_v3_STRATEGIC_ENHANCEMENTS.md",
    "./.PRD/1-core-prd/ORACLE_WHATIF_ENHANCEMENT.md",
    "./.PRD/2-architecture/NexusCanon_Constitution.md",
    "./.PRD/2-architecture/NexusCanon_Olympian.md",
  ];

  console.log("📋 Checking critical files...");
  for (const file of criticalFiles) {
    await validateFile(file, 50);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  const errors = results.filter((r) => r.status === "error");
  const warnings = results.filter((r) => r.status === "warning");
  const ok = results.filter((r) => r.status === "ok");

  console.log(`\n✅ Valid: ${ok.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`❌ Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log("\n🚨 Errors:");
    for (const result of errors) {
      console.log(`  ❌ ${result.file}: ${result.message}`);
    }
  }

  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    for (const result of warnings) {
      console.log(`  ⚠️  ${result.file}: ${result.message}`);
    }
  }

  if (ok.length > 0) {
    console.log("\n✅ Valid files:");
    for (const result of ok) {
      console.log(`  ✅ ${result.file}: ${result.message}`);
    }
  }

  const hasErrors = errors.length > 0;
  Deno.exit(hasErrors ? 1 : 0);
}

main().catch((err) => {
  console.error("Error:", err);
  Deno.exit(1);
});
