# Deno LSP Validation Guide

This guide helps you verify that Deno LSP (Language Server Protocol) is always active in Cursor.

## Quick Validation

Run this command to validate LSP configuration:

```bash
deno task validate:lsp
```

This will check:

- ✅ Deno CLI installation
- ✅ Configuration files
- ✅ LSP settings
- ✅ Extension recommendations
- ✅ Workspace structure

## Visual Indicator File

Open `lsp-indicator.ts` in Cursor to verify LSP features are working:

**Expected LSP Features:**

1. **Hover Information** - Hover over code to see type information
2. **Auto-completion** - Type `app.` and see method suggestions
3. **Go-to-Definition** - Ctrl+Click (Cmd+Click) on imports
4. **Error Detection** - Type errors show red squiggles
5. **CodeLens** - Reference counts above functions
6. **Inlay Hints** - Parameter types shown inline

## Status Bar Indicator

When LSP is active, you should see:

- **"Deno"** in the bottom status bar when a `.ts` file is open
- Click it to see LSP status and options

## Output Panel

To check LSP activity:

1. Open **View → Output** (or `Ctrl+Shift+U`)
2. Select **"Deno Language Server"** from the dropdown
3. You should see LSP activity and no errors

## Manual Verification Steps

1. **Open a TypeScript file** (e.g., `admin-api/main.ts`)
2. **Hover over code** - Should show type information
3. **Type `Deno.`** - Should show autocomplete suggestions
4. **Ctrl+Click on imports** - Should navigate to definitions
5. **Check for CodeLens** - Reference counts above functions
6. **Look for inlay hints** - Types shown inline

## Troubleshooting

If LSP doesn't appear active:

1. **Reload Cursor:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P`)
   - Type "Reload Window"
   - Select "Developer: Reload Window"

2. **Check Extension:**
   - Press `Ctrl+Shift+X` to open Extensions
   - Search for "Deno"
   - Ensure `denoland.vscode-deno` is enabled

3. **Verify Settings:**
   - Check `.vscode/settings.json`
   - Ensure `deno.enable: true` is set

4. **Run Validation:**
   ```bash
   deno task validate:lsp
   ```

## Configuration Files

- **`.vscode/settings.json`** - LSP configuration
- **`deno.json`** - Deno workspace configuration
- **`.vscode/extensions.json`** - Extension recommendations

## Always-On Validation

The validation script can be run anytime to check LSP status:

```bash
# Quick check
deno task validate:lsp

# Or via VS Code task
Ctrl+Shift+P → "Tasks: Run Task" → "deno: validate:lsp"
```

## Files Created

- **`tools/validate-lsp.ts`** - Validation script
- **`lsp-indicator.ts`** - Visual test file for LSP features
- **`LSP_VALIDATION.md`** - This guide

---

**Remember:** LSP should start automatically when you open a Deno TypeScript file if the extension
is enabled and `deno.enable: true` is set in settings.
