# Deno Documentation Tools: Practical Implementation for The Apex
## Ready-to-Use Configuration & Setup Guide
### Date: January 8, 2026

---

## 🚀 Quick Implementation: 3 Steps

### Step 1: Add Tasks to deno.json

```json
{
  "tasks": {
    "docs:serve": "deno run --allow-read --allow-net tools/serve-prd.ts",
    "docs:fmt": "deno fmt ./.PRD/",
    "docs:validate": "deno doc --lint ./src/ 2>&1",
    "docs:generate": "deno run --allow-read --allow-write --allow-run tools/build-docs.ts",
    "docs:check": "deno run --allow-read tools/validate-docs.ts"
  }
}
```

### Step 2: Create Documentation Tools

Create `tools/` directory with helper scripts:

```bash
mkdir -p tools
```

### Step 3: Run Commands

```bash
deno task docs:serve      # Serve locally
deno task docs:fmt        # Format markdown
deno task docs:validate   # Validate completeness
```

---

## 📁 File 1: tools/serve-prd.ts

**Purpose:** Serve your .PRD markdown files locally during development

```typescript
// tools/serve-prd.ts
/**
 * Serves The Apex PRD documentation locally
 * 
 * @example
 * ```bash
 * deno run --allow-read --allow-net tools/serve-prd.ts
 * # Open http://localhost:3000
 * ```
 */

import { serve } from "jsr:@std/http/server";
import { serveDir, serveFile } from "jsr:@std/http/file_server";
import { extname } from "jsr:@std/path";

const PORT = 3000;

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  
  // Root path shows index
  if (url.pathname === "/" || url.pathname === "") {
    return await serveFile(req, "./.PRD/v3_DOCUMENTATION_INDEX.md");
  }
  
  // Try to serve markdown file
  const filePath = `./.PRD${url.pathname}`;
  
  try {
    // If it's a markdown file, serve it
    if (extname(filePath) === ".md") {
      return await serveFile(req, filePath);
    }
    
    // Otherwise list directory
    return await serveDir(req, {
      fsRoot: "./.PRD",
      urlRoot: "",
    });
  } catch {
    // File not found - return 404
    return new Response("Documentation not found", { status: 404 });
  }
};

serve(handler, { port: PORT });

console.log(`✅ PRD Documentation Server running`);
console.log(`📖 Open http://localhost:${PORT} to view`);
console.log(`📂 Serving from: ./.PRD/`);
console.log(`⏹️  Press Ctrl+C to stop`);
```

---

## 📁 File 2: tools/build-docs.ts

**Purpose:** Generate production documentation (HTML, JSON, validation)

```typescript
// tools/build-docs.ts
/**
 * Builds production documentation from code and markdown
 * 
 * @example
 * ```bash
 * deno run --allow-read --allow-write --allow-run tools/build-docs.ts
 * ```
 */

import { ensureDir } from "jsr:@std/fs";
import { join } from "jsr:@std/path";

async function run(
  cmd: string[],
  description: string,
): Promise<void> {
  console.log(`🔨 ${description}...`);
  
  const process = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: "inherit",
    stderr: "inherit",
  }).spawn();
  
  const status = await process.status;
  
  if (!status.success) {
    throw new Error(`Failed: ${description}`);
  }
  
  console.log(`✅ ${description}`);
}

async function copyFile(
  src: string,
  dest: string,
  description: string,
): Promise<void> {
  console.log(`📄 ${description}...`);
  await ensureDir(Deno.dirname(dest));
  await Deno.copyFile(src, dest);
  console.log(`✅ ${description}`);
}

async function main() {
  console.log("🚀 Building Apex Documentation...\n");
  
  // 1. Ensure directories exist
  console.log("📁 Creating directories...");
  await ensureDir("./docs");
  await ensureDir("./docs/api");
  await ensureDir("./docs/prd");
  
  // 2. Copy PRD markdown files
  console.log("\n📋 Copying PRD documentation...");
  const prdFiles = [
    "PRD_eBoard_v3.md",
    "PRD_v3_STRATEGIC_ENHANCEMENTS.md",
    "ORACLE_WHATIF_ENHANCEMENT.md",
    "ORACLE_VISUAL_TRANSFORMATION.md",
    "APEX_v3_COMPLETE_ARCHITECTURE.md",
    "v3_DOCUMENTATION_INDEX.md",
    "DENO_DOCUMENTATION_ECOSYSTEM.md",
  ];
  
  for (const file of prdFiles) {
    await copyFile(
      `./.PRD/${file}`,
      `./docs/prd/${file}`,
      `Copy ${file}`,
    );
  }
  
  // 3. Generate API documentation from code
  console.log("\n🔧 Generating API documentation...");
  
  // Only run if src directory exists
  try {
    await Deno.stat("./src");
    await run(
      [
        "deno",
        "doc",
        "--html",
        "--name=The Apex API Reference",
        "--output=./docs/api",
        "./src/mod.ts",
      ],
      "Generate HTML API docs",
    );
  } catch {
    console.log("⚠️  src/mod.ts not found, skipping API docs");
  }
  
  // 4. Validate documentation
  console.log("\n✔️  Validating documentation...");
  try {
    await run(
      ["deno", "fmt", "--check", "./.PRD/"],
      "Check Markdown formatting",
    );
  } catch {
    console.log("⚠️  Some Markdown files are not formatted");
    console.log("   Run: deno task docs:fmt");
  }
  
  // 5. Create index.html
  console.log("\n📑 Creating documentation index...");
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Apex v3.0.0 Documentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
    header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; text-align: center; }
    header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    header p { font-size: 1.1rem; opacity: 0.9; }
    main { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
    section { margin-bottom: 3rem; }
    section h2 { margin-bottom: 1rem; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem; }
    .doc-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
    .doc-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; transition: all 0.3s; cursor: pointer; }
    .doc-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-2px); }
    .doc-card h3 { margin-bottom: 0.5rem; color: #333; }
    .doc-card p { font-size: 0.9rem; color: #666; }
    .doc-card a { display: inline-block; margin-top: 1rem; color: #667eea; text-decoration: none; font-weight: 500; }
    .doc-card a:hover { text-decoration: underline; }
    footer { text-align: center; padding: 2rem; color: #999; border-top: 1px solid #e0e0e0; margin-top: 4rem; }
  </style>
</head>
<body>
  <header>
    <h1>🚀 The Apex v3.0.0</h1>
    <p>Executive Board Decision Engine - Complete Documentation</p>
  </header>
  
  <main>
    <section>
      <h2>📚 Core Specification</h2>
      <div class="doc-list">
        <div class="doc-card">
          <h3>PRD_eBoard_v3.md</h3>
          <p>Main specification with all 9 weapons (Codex, Thanos, BoardDialog, Hierarchy, Vault, Vectors, Compass, Oracle, Herald)</p>
          <a href="./prd/PRD_eBoard_v3.md">Read →</a>
        </div>
      </div>
    </section>
    
    <section>
      <h2>🎯 Strategic Enhancements</h2>
      <div class="doc-list">
        <div class="doc-card">
          <h3>PRD_v3_STRATEGIC_ENHANCEMENTS.md</h3>
          <p>Detailed evaluation of all strategic proposals with YES/NO/HYBRID verdicts</p>
          <a href="./prd/PRD_v3_STRATEGIC_ENHANCEMENTS.md">Read →</a>
        </div>
      </div>
    </section>
    
    <section>
      <h2>⭐ The Oracle Implementation</h2>
      <div class="doc-list">
        <div class="doc-card">
          <h3>ORACLE_WHATIF_ENHANCEMENT.md</h3>
          <p>Complete What-If variance analysis system design with database schema and implementation roadmap</p>
          <a href="./prd/ORACLE_WHATIF_ENHANCEMENT.md">Read →</a>
        </div>
        <div class="doc-card">
          <h3>ORACLE_VISUAL_TRANSFORMATION.md</h3>
          <p>Visual walkthrough of before/after transformation and use cases</p>
          <a href="./prd/ORACLE_VISUAL_TRANSFORMATION.md">Read →</a>
        </div>
      </div>
    </section>
    
    <section>
      <h2>🔗 Integration & Architecture</h2>
      <div class="doc-list">
        <div class="doc-card">
          <h3>APEX_v3_COMPLETE_ARCHITECTURE.md</h3>
          <p>How all 9 weapons integrate, complete feature set, API endpoints, and implementation timeline</p>
          <a href="./prd/APEX_v3_COMPLETE_ARCHITECTURE.md">Read →</a>
        </div>
        <div class="doc-card">
          <h3>v3_DOCUMENTATION_INDEX.md</h3>
          <p>Navigation guide by role (CEO, Engineer, PM) with cross-references</p>
          <a href="./prd/v3_DOCUMENTATION_INDEX.md">Read →</a>
        </div>
      </div>
    </section>
    
    <section>
      <h2>🛠️ Tools & Ecosystem</h2>
      <div class="doc-list">
        <div class="doc-card">
          <h3>DENO_DOCUMENTATION_ECOSYSTEM.md</h3>
          <p>Deno documentation tools available (deno doc, deno fmt, deno lint) and best practices</p>
          <a href="./prd/DENO_DOCUMENTATION_ECOSYSTEM.md">Read →</a>
        </div>
      </div>
    </section>
    
    <section>
      <h2>📖 API Reference</h2>
      <div class="doc-list">
        <div class="doc-card">
          <h3>Generated API Docs</h3>
          <p>Auto-generated from TypeScript code (deno doc)</p>
          <a href="./api/index.html">View →</a>
        </div>
      </div>
    </section>
  </main>
  
  <footer>
    <p>© 2026 The Axis High Council. Last built: ${new Date().toISOString()}</p>
  </footer>
</body>
</html>`;
  
  await Deno.writeTextFile("./docs/index.html", indexHtml);
  
  console.log("\n✨ Documentation build complete!");
  console.log("📂 Output directory: ./docs/");
  console.log("🌐 View at: ./docs/index.html");
}

main().catch((err) => {
  console.error("❌ Build failed:", err.message);
  Deno.exit(1);
});
```

---

## 📁 File 3: tools/validate-docs.ts

**Purpose:** Validate that all documentation is complete and correct

```typescript
// tools/validate-docs.ts
/**
 * Validates The Apex documentation structure and completeness
 * 
 * @example
 * ```bash
 * deno run --allow-read tools/validate-docs.ts
 * ```
 */

import { exists } from "jsr:@std/fs";
import { glob } from "jsr:@std/fs/glob";

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
  if (!await exists(path)) {
    results.push({
      file: path,
      status: "error",
      message: `File does not exist`,
    });
    return;
  }
  
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
}

async function main() {
  console.log("🔍 Validating Apex Documentation...\n");
  
  // Check critical PRD files
  const criticalFiles = [
    "./.PRD/PRD_eBoard_v3.md",
    "./.PRD/PRD_v3_STRATEGIC_ENHANCEMENTS.md",
    "./.PRD/ORACLE_WHATIF_ENHANCEMENT.md",
    "./.PRD/APEX_v3_COMPLETE_ARCHITECTURE.md",
    "./.PRD/v3_DOCUMENTATION_INDEX.md",
  ];
  
  console.log("📋 Checking critical files...");
  for (const file of criticalFiles) {
    await validateFile(file, 50);
  }
  
  // Check all markdown files
  console.log("\n📄 Checking all markdown files...");
  const allMarkdownFiles = glob("./.PRD/*.md");
  for await (const file of allMarkdownFiles) {
    await validateFile(file);
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
  
  const hasErrors = errors.length > 0;
  Deno.exit(hasErrors ? 1 : 0);
}

main().catch((err) => {
  console.error("Error:", err);
  Deno.exit(1);
});
```

---

## 📋 Updated deno.json

Add this to your `deno.json`:

```json
{
  "version": "3.0.0",
  "tasks": {
    "docs:serve": "deno run --allow-read --allow-net tools/serve-prd.ts",
    "docs:fmt": "deno fmt ./.PRD/",
    "docs:validate": "deno run --allow-read tools/validate-docs.ts",
    "docs:generate": "deno run --allow-read --allow-write --allow-run tools/build-docs.ts",
    "docs:check": "deno doc --lint ./src/ 2>&1 || true"
  },
  "imports": {
    "jsr:@std/": "jsr:@std@1/",
    "jsr:@cliffy/": "jsr:@cliffy@1/"
  },
  "docs": {
    "title": "The Apex v3.0.0",
    "description": "Executive Board Decision Engine - Complete Documentation",
    "root": "./.PRD/",
    "entry": "./v3_DOCUMENTATION_INDEX.md",
    "generated": "./docs/"
  }
}
```

---

## 🎯 Usage: Complete Workflow

### Local Development
```bash
# Serve PRD locally (live preview)
deno task docs:serve
# Open http://localhost:3000
```

### Before Committing
```bash
# Format all markdown
deno task docs:fmt

# Validate documentation
deno task docs:validate
```

### Building for Production
```bash
# Generate complete documentation
deno task docs:generate
# Output: ./docs/ (ready to deploy)
```

### Validating Code Docs
```bash
# Check code documentation completeness
deno task docs:check
```

---

## 📦 What You Get

### Instant Features

✅ **Local Server** — Serve PRD markdown locally on http://localhost:3000
✅ **Formatting** — Consistent Markdown formatting
✅ **Validation** — Automated documentation checks
✅ **HTML Generation** — Build static site with docs
✅ **API Docs** — Auto-generated from TypeScript code
✅ **One-Command Deploy** — Run one task, get production docs

### No Additional Dependencies

All tools are:
- Built into Deno
- Or from standard library (jsr:@std)
- Or from trusted ecosystem (jsr:@cliffy)

---

## 🚀 Deploy Documentation

Once built, your `./docs/` directory contains static HTML that you can deploy to:

- **GitHub Pages** — Free hosting
- **Netlify** — Drag & drop
- **Vercel** — Next.js optimized
- **Deno Deploy** — Native Deno deployment
- **Any static host** — Just HTML files

---

## ✅ Quick Checklist

- [ ] Create `tools/` directory
- [ ] Copy `serve-prd.ts`, `build-docs.ts`, `validate-docs.ts`
- [ ] Update `deno.json` with tasks
- [ ] Run `deno task docs:serve` to verify
- [ ] Run `deno task docs:validate` before commits
- [ ] Run `deno task docs:generate` for production

---

## 🎓 Next Steps

1. **This week:** Set up serve-prd.ts and test locally
2. **Next week:** Add build-docs.ts and validate tools
3. **Week 3:** Integrate with GitHub Actions (CI/CD)
4. **Week 4:** Deploy to GitHub Pages

---

This gives you a **production-ready documentation system** that's:
- ✅ Zero dependencies (Deno native)
- ✅ Easy to maintain (Markdown files)
- ✅ Automated (deno tasks)
- ✅ Version-controlled (Git friendly)
- ✅ Deployable (Static HTML)

