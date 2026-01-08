// tools/cleanup-docs.ts
/**
 * Documentation cleanup following Deno's minimalist philosophy
 *
 * Rule: One version. One source. Zero duplication.
 *
 * @example
 * ```bash
 * deno task docs:cleanup
 * ```
 */

import { ensureDir } from "@std/fs";

// Files to archive (legacy versions)
const LEGACY_FILES = [
  ".PRD/PRD_eBoard_V1.md",
  ".PRD/PRD_eBoard_V2.md",
];

// Files to remove (duplicates - content exists in main docs)
const DUPLICATE_FILES = [
  ".PRD/ORACLE_UPGRADE_SUMMARY.md",
  ".PRD/ORACLE_VISUAL_TRANSFORMATION.md",
  ".PRD/PRD_v3_DELIVERY_SUMMARY.md",
  ".PRD/PRD_v3_QUICK_REFERENCE.md",
  ".PRD/PRD_v3_UPDATES.md",
  ".PRD/MERGE_AUDIT_REPORT.md",
  ".PRD/PRD_v3_DOCUMENT_INDEX.md",
];

// Essential files to keep (current version only)
const ESSENTIAL_FILES = [
  "PRD_eBoard_v3.md",
  "v3_DOCUMENTATION_INDEX.md",
  "APEX_v3_COMPLETE_ARCHITECTURE.md",
  "PRD_v3_STRATEGIC_ENHANCEMENTS.md",
  "ORACLE_WHATIF_ENHANCEMENT.md",
  "NexusCanon_Constitution.md",
  "NexusCanon_Olympian.md",
  "DENO_DOCUMENTATION_ECOSYSTEM.md",
  "DENO_DOCUMENTATION_IMPLEMENTATION.md",
];

async function archiveFile(path: string): Promise<void> {
  try {
    const archiveDir = ".PRD/_archive";
    await ensureDir(archiveDir);

    const fileName = path.split("/").pop();
    const dest = `${archiveDir}/${fileName}`;

    await Deno.rename(path, dest);
    console.log(`📦 Archived: ${fileName}`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log(`⏭️  Skipped (not found): ${path}`);
    } else {
      throw error;
    }
  }
}

async function removeFile(path: string): Promise<void> {
  try {
    await Deno.remove(path);
    const fileName = path.split("/").pop();
    console.log(`🗑️  Removed: ${fileName}`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log(`⏭️  Skipped (not found): ${path}`);
    } else {
      throw error;
    }
  }
}

async function verifyEssentialFiles(): Promise<void> {
  console.log("\n📋 Verifying essential files...");
  let allPresent = true;

  for (const file of ESSENTIAL_FILES) {
    try {
      await Deno.stat(`.PRD/${file}`);
      console.log(`✅ ${file}`);
    } catch {
      console.log(`❌ MISSING: ${file}`);
      allPresent = false;
    }
  }

  if (!allPresent) {
    throw new Error("Some essential files are missing!");
  }
}

async function updateGitignore(): Promise<void> {
  const gitignorePath = ".gitignore";
  let content = "";

  try {
    content = await Deno.readTextFile(gitignorePath);
  } catch {
    // File doesn't exist, will create
  }

  if (!content.includes(".PRD/_archive")) {
    content += "\n# Archived documentation\n.PRD/_archive/\n";
    await Deno.writeTextFile(gitignorePath, content);
    console.log("✅ Updated .gitignore");
  }
}

async function main() {
  console.log("🧹 Deno Documentation Cleanup");
  console.log("━".repeat(60));
  console.log("Philosophy: One version. One source. Zero duplication.\n");

  // Step 1: Archive legacy versions
  console.log("📦 Archiving legacy versions...");
  for (const file of LEGACY_FILES) {
    await archiveFile(file);
  }

  // Step 2: Remove duplicates
  console.log("\n🗑️  Removing duplicate content...");
  for (const file of DUPLICATE_FILES) {
    await removeFile(file);
  }

  // Step 3: Verify essential files remain
  await verifyEssentialFiles();

  // Step 4: Update .gitignore
  console.log("\n📝 Updating .gitignore...");
  await updateGitignore();

  // Summary
  console.log("\n" + "━".repeat(60));
  console.log("✨ Cleanup Complete!");
  console.log(`📦 Archived: ${LEGACY_FILES.length} legacy files`);
  console.log(`🗑️  Removed: ${DUPLICATE_FILES.length} duplicate files`);
  console.log(`✅ Kept: ${ESSENTIAL_FILES.length} essential files`);
  console.log("\n📖 View docs: deno task docs:serve");
  console.log("✅ Validate: deno task docs:validate");
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("❌ Cleanup failed:", err.message);
    Deno.exit(1);
  });
}
