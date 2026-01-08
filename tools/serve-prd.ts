// tools/serve-prd.ts
/**
 * Serves PRD documentation locally with enhanced HTML rendering.
 * Features:
 * - GFM (GitHub Flavored Markdown) support via 'marked'
 * - Mermaid JS Diagram support
 * - Syntax Highlighting via Highlight.js
 * - Auto-generated Table of Contents
 * - Dynamic file listing (no hardcoding)
 * * @example
 * ```bash
 * deno task docs:serve
 * ```
 */

import { serveDir } from "@std/http/file-server";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { gfmHeadingId } from "marked-gfm-heading-id";

const PORT = 3000;
const DOCS_ROOT = "./.PRD"; // Change this if your docs are elsewhere

// Configure Marked with Highlighting and IDs
const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);
marked.use(gfmHeadingId());

/**
 * Generates the HTML wrapper with robust styling and scripts
 */
function wrapHtml(
  title: string,
  content: string,
  tocHtml: string,
  fileList: Array<{ name: string; path: string }> = [],
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>&#x1F4DA;</text></svg>">
  <!-- Changed to a softer light theme -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown-light.min.css">
  
  <style>
    :root {
      --sidebar-width: 250px;
      --left-nav-width: 240px;
      --content-max-width: 900px;
      --header-height: 60px;
      --primary-color: #2b6cb0; /* Softer blue */
      --primary-hover: #2c5282; /* Darker blue for hover */
      --text-primary: #2d3748; /* Dark gray instead of black */
      --text-secondary: #4a5568; /* Medium gray */
      --text-muted: #718096; /* Light gray for less important text */
      --bg-primary: #ffffff;
      --bg-secondary: #f7fafc; /* Very light blue-gray */
      --bg-tertiary: #edf2f7; /* Slightly darker for contrast */
      --border-light: #e2e8f0; /* Soft border color */
      --border-medium: #cbd5e0; /* Medium border */
      --accent-color: #4299e1; /* Bright accent for highlights */
      --code-bg: #f8f9fa; /* Light gray for code blocks */
      --radius-sm: 6px;
      --radius-md: 8px;
      --radius-lg: 12px;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :root {
        --primary-color: #63b3ed;
        --primary-hover: #90cdf4;
        --text-primary: #e2e8f0;
        --text-secondary: #cbd5e0;
        --text-muted: #a0aec0;
        --bg-primary: #1a202c;
        --bg-secondary: #2d3748;
        --bg-tertiary: #4a5568;
        --border-light: #4a5568;
        --border-medium: #718096;
        --accent-color: #63b3ed;
        --code-bg: #2d3748;
      }
      .markdown-body {
        color-scheme: dark;
        color: var(--text-primary);
      }
    }

    body {
      background-color: var(--bg-secondary);
      margin: 0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: var(--text-primary);
      padding-top: var(--header-height);
    }

    /* Improve text rendering */
    * {
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Layout Grid */
    .layout {
      display: flex;
      justify-content: center;
      gap: 2rem;
      padding: 0;
      max-width: 100%;
      margin: 0 auto;
      width: 100%;
      flex: 1;
    }

    /* Left Document Navigator */
    .doc-nav {
      width: var(--left-nav-width);
      position: fixed;
      left: 0;
      top: var(--header-height);
      height: calc(100vh - var(--header-height));
      background-color: var(--bg-primary);
      border-right: 1px solid var(--border-light);
      overflow-y: auto;
      padding: 1.5rem 1rem;
      scrollbar-width: thin;
      z-index: 100;
    }

    .doc-nav::-webkit-scrollbar {
      width: 6px;
    }

    .doc-nav::-webkit-scrollbar-thumb {
      background-color: var(--border-medium);
      border-radius: 3px;
    }

    .doc-nav h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin: 0 0 1rem 0;
      padding: 0 0.5rem;
      font-weight: 600;
    }

    .doc-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .doc-nav li {
      margin-bottom: 0.25rem;
    }

    .doc-nav a {
      display: block;
      padding: 0.5rem 0.75rem;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      transition: all 0.2s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .doc-nav a:hover {
      background-color: var(--bg-secondary);
      color: var(--primary-color);
    }

    .doc-nav a.active {
      background-color: var(--primary-color);
      color: white;
      font-weight: 500;
    }

    /* Main content wrapper with offset for left nav */
    .content-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
      gap: 3rem;
      padding: 2rem;
      margin-left: var(--left-nav-width);
      max-width: calc(100% - var(--left-nav-width));
    }

    /* Main Content Area */
    .markdown-body {
      flex: 1;
      max-width: var(--content-max-width);
      padding: 2rem 3rem;
      background-color: var(--bg-primary);
      border-radius: var(--radius-lg);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      margin: 1rem 0;
    }

    /* Improve typography in markdown body */
    .markdown-body h1, 
    .markdown-body h2, 
    .markdown-body h3, 
    .markdown-body h4 {
      color: var(--text-primary);
      font-weight: 600;
      line-height: 1.3;
      margin-top: 2em;
      margin-bottom: 0.8em;
    }

    .markdown-body h1 {
      border-bottom: 2px solid var(--border-light);
      padding-bottom: 0.3em;
    }

    .markdown-body h2 {
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 0.3em;
    }

    .markdown-body p {
      margin-bottom: 1.2em;
      color: var(--text-secondary);
    }

    .markdown-body ul, .markdown-body ol {
      padding-left: 2em;
      margin-bottom: 1.2em;
    }

    .markdown-body li {
      margin-bottom: 0.5em;
      color: var(--text-secondary);
    }

    .markdown-body code:not(pre code) {
      background-color: var(--code-bg);
      padding: 0.2em 0.4em;
      border-radius: var(--radius-sm);
      font-size: 0.9em;
      color: var(--text-primary);
      border: 1px solid var(--border-light);
    }

    .markdown-body pre {
      background-color: var(--code-bg);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      padding: 1.2em;
      overflow-x: auto;
    }

    .markdown-body blockquote {
      border-left: 4px solid var(--primary-color);
      background-color: var(--bg-secondary);
      padding: 1em 1.5em;
      margin: 1.5em 0;
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      color: var(--text-secondary);
    }

    .markdown-body table {
      border-collapse: collapse;
      width: 100%;
      margin: 1.5em 0;
    }

    .markdown-body th {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      font-weight: 600;
    }

    .markdown-body th,
    .markdown-body td {
      border: 1px solid var(--border-light);
      padding: 0.75em;
    }

    /* Sticky Sidebar TOC */
    .toc-sidebar {
      width: var(--sidebar-width);
      position: sticky;
      top: 2rem;
      height: calc(100vh - 4rem);
      overflow-y: auto;
      font-size: 0.9rem;
      border-left: 2px solid var(--border-light);
      padding-left: 1.5rem;
      display: none; /* Hidden on mobile */
      scrollbar-width: thin;
    }

    .toc-sidebar::-webkit-scrollbar {
      width: 6px;
    }

    .toc-sidebar::-webkit-scrollbar-thumb {
      background-color: var(--border-medium);
      border-radius: 3px;
    }

    @media (min-width: 1100px) {
      .toc-sidebar { display: block; }
    }

    .toc-sidebar h3 {
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-top: 0;
      margin-bottom: 1.5em;
      font-weight: 600;
    }

    .toc-sidebar ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .toc-sidebar li {
      margin-bottom: 0.8rem;
      position: relative;
    }

    .toc-sidebar li::before {
      content: "";
      position: absolute;
      left: -1.5rem;
      top: 0.5em;
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--border-light);
      border-radius: 50%;
    }

    .toc-sidebar a {
      color: var(--text-secondary);
      text-decoration: none;
      display: block;
      line-height: 1.5;
      transition: all 0.2s ease;
      padding: 0.2em 0;
    }

    .toc-sidebar a:hover {
      color: var(--primary-color);
      padding-left: 0.5em;
    }

    .toc-sidebar a.active {
      color: var(--primary-color);
      font-weight: 500;
    }

    /* Header Nav */
    .nav-header {
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-light);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--header-height);
      z-index: 1000;
    }

    .back-link {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5em 1em;
      border-radius: var(--radius-sm);
      transition: all 0.2s ease;
    }

    .back-link:hover {
      background-color: var(--bg-secondary);
      text-decoration: none;
    }

    .nav-header span.separator {
      margin: 0 1rem;
      color: var(--border-medium);
    }

    .nav-header .title {
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 600;
    }

    .nav-header .logo {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    /* Mermaid Diagram Styling */
    .mermaid {
      display: flex;
      justify-content: center;
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      margin: 2rem 0;
      border: 1px solid var(--border-light);
    }

    /* Copy Button for Code Blocks */
    .code-container {
      position: relative;
      margin: 1.5em 0;
    }

    .copy-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid var(--border-medium);
      color: var(--text-secondary);
      padding: 0.4em 0.8em;
      font-size: 0.75rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s ease;
      font-weight: 500;
      backdrop-filter: blur(4px);
    }

    .copy-btn:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    pre:hover .copy-btn {
      opacity: 1;
    }

    /* Links in content */
    .markdown-body a {
      color: var(--primary-color);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.2s ease;
    }

    .markdown-body a:hover {
      border-bottom: 1px solid var(--primary-color);
    }

    /* Horizontal rule */
    .markdown-body hr {
      border: none;
      border-top: 1px solid var(--border-light);
      margin: 2em 0;
    }

    /* Responsive adjustments */
    @media (max-width: 1100px) {
      .toc-sidebar {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .doc-nav {
        display: none;
      }

      .content-wrapper {
        margin-left: 0;
        max-width: 100%;
        padding: 1rem;
      }
      
      .layout {
        flex-direction: column;
        padding: 0;
        gap: 1rem;
      }
      
      .markdown-body {
        padding: 1.5rem;
        margin: 0;
        border-radius: 0;
      }
    }

    /* Focus styles for accessibility */
    *:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <div class="nav-header">
    <a href="/" class="back-link">
      <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"></path></svg>
      Docs
    </a>
    <span class="separator">|</span>
    <span class="logo">📘</span>
    <span class="title">${title}</span>
  </div>

  ${
    fileList.length > 0
      ? `
  <nav class="doc-nav">
    <h3>Documentation</h3>
    <ul>
      ${
        fileList.map((f) =>
          `<li><a href="${f.path}" ${f.name === title ? 'class="active"' : ""}>${
            f.name.replace(".md", "")
          }</a></li>`
        ).join("")
      }
    </ul>
  </nav>
  `
      : ""
  }

  <div class="layout">
    <div class="content-wrapper">
      <article class="markdown-body">
        ${content}
      </article>
      
      <aside class="toc-sidebar">
        <h3>On this page</h3>
        ${tocHtml}
      </aside>
    </div>
  </div>

  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'default',
      themeVariables: {
        primaryColor: '#edf2f7',
        primaryTextColor: '#2d3748',
        primaryBorderColor: '#cbd5e0',
        lineColor: '#4a5568',
        secondaryColor: '#f7fafc',
        tertiaryColor: '#ffffff'
      }
    });
  </script>

  <script>
    // Highlight current section in TOC
    function updateActiveTocLink() {
      const headers = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3');
      const tocLinks = document.querySelectorAll('.toc-sidebar a');
      
      let currentActive = null;
      
      headers.forEach((header, index) => {
        const rect = header.getBoundingClientRect();
        if (rect.top <= 100) {
          currentActive = header.id;
        }
      });
      
      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (currentActive && link.getAttribute('href') === '#' + currentActive) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', updateActiveTocLink);
    document.addEventListener('DOMContentLoaded', updateActiveTocLink);
    
    // Copy button functionality
    document.querySelectorAll('pre').forEach(pre => {
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      
      const container = document.createElement('div');
      container.className = 'code-container';
      pre.parentNode.insertBefore(container, pre);
      container.appendChild(pre);
      container.appendChild(btn);
      
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code').innerText;
        navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        btn.style.background = '#38a169';
        btn.style.color = 'white';
        btn.style.borderColor = '#38a169';
        
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      });
    });
  </script>
</body>
</html>`;
}

/**
 * Renders a single markdown file
 */
async function renderMarkdown(
  mdPath: string,
  fileList: Array<{ name: string; path: string }> = [],
): Promise<string> {
  const rawContent = await Deno.readTextFile(mdPath);

  // Pre-process for Mermaid (convert code blocks to div.mermaid)
  // We use a specific regex to catch ```mermaid blocks and turn them into <div class="mermaid">
  const mermaidProcessed = rawContent.replace(
    /^```mermaid\s*([\s\S]*?)\s*```$/gm,
    '<div class="mermaid">$1</div>',
  );

  const parsedContent = await marked.parse(mermaidProcessed);

  // Extract TOC from the parsed HTML (this matches the actual IDs generated by marked-gfm-heading-id)
  const toc: string[] = [];
  const headerRegex = /<h([1-3])[^>]*id="([^"]+)"[^>]*>(.+?)<\/h\1>/g;
  let match;

  while ((match = headerRegex.exec(parsedContent)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, ""); // Strip any HTML tags from header text
    const padding = (level - 1) * 10;
    toc.push(`<li style="padding-left: ${padding}px"><a href="#${id}">${text}</a></li>`);
  }

  const tocHtml = toc.length > 0 ? `<ul>${toc.join("")}</ul>` : "<p>No headers</p>";
  const fileName = mdPath.split("/").pop() || "Doc";

  return wrapHtml(fileName, parsedContent, tocHtml, fileList);
}

/**
 * Scans the DOCS_ROOT for markdown files dynamically
 */
async function getFileList() {
  const files = [];
  try {
    for await (const dirEntry of Deno.readDir(DOCS_ROOT)) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
        // Try to get file stats for size
        const stat = await Deno.stat(`${DOCS_ROOT}/${dirEntry.name}`);
        files.push({
          name: dirEntry.name,
          size: (stat.size / 1024).toFixed(1) + " KB",
          path: `/${dirEntry.name}`,
        });
      }
    }
  } catch (e) {
    const error = e as Error;
    console.error(`Error reading ${DOCS_ROOT}:`, error.message);
    return [];
  }
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // 1. ROOT: Show Dynamic Index
  if (url.pathname === "/" || url.pathname === "") {
    const files = await getFileList();

    const fileCards = files.map((f) => `
      <div class="doc-card">
        <div class="icon">📄</div>
        <div class="info">
          <a href="${f.path}">${f.name}</a>
          <div class="meta">${f.size}</div>
        </div>
        <div class="arrow">→</div>
      </div>
    `).join("");

    const html = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Documentation Index</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>&#x1F4DA;</text></svg>">
      <style>
        body { font-family: -apple-system, system-ui, sans-serif; background: #f6f8fa; padding: 2rem; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #24292f; border-bottom: 1px solid #d0d7de; padding-bottom: 1rem; }
        .doc-grid { display: grid; gap: 1rem; margin-top: 2rem; }
        .doc-card { 
          background: white; padding: 1rem; border-radius: 6px; 
          border: 1px solid #d0d7de; display: flex; align-items: center; 
          transition: all 0.2s; text-decoration: none;
        }
        .doc-card:hover { border-color: #0969da; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transform: translateY(-2px); }
        .icon { font-size: 1.5rem; margin-right: 1rem; }
        .info { flex: 1; }
        .info a { font-weight: 600; color: #0969da; text-decoration: none; font-size: 1.1rem; }
        .info a::before { content: ''; position: absolute; inset: 0; } /* Make whole card clickable */
        .doc-card { position: relative; }
        .meta { color: #57606a; font-size: 0.85rem; margin-top: 0.25rem; }
        .arrow { color: #d0d7de; font-weight: bold; }
        .empty-state { text-align: center; color: #57606a; padding: 2rem; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>&#x1F4DA; Documentation Hub</h1>
        ${
      files.length === 0
        ? `<div class="empty-state">No .md files found in ${DOCS_ROOT}</div>`
        : `<div class="doc-grid">${fileCards}</div>`
    }
      </div>
    </body>
    </html>`;

    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }

  // 2. MARKDOWN: Render as HTML
  if (url.pathname.endsWith(".md")) {
    // Decode URI component to handle spaces in filenames
    const decodedPath = decodeURIComponent(url.pathname);
    const filePath = `${DOCS_ROOT}${decodedPath}`;

    try {
      const files = await getFileList();
      const html = await renderMarkdown(filePath, files);
      return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
    } catch (error) {
      console.error(error);
      return new Response(`File not found: ${filePath}`, { status: 404 });
    }
  }

  // 3. ASSETS: Serve raw files (images, etc)
  return serveDir(req, {
    fsRoot: DOCS_ROOT,
    urlRoot: "",
    showDirListing: true,
  });
};

console.log(`✅ PRD Documentation Server v2.0`);
console.log(`📂 Watching: ${DOCS_ROOT}`);
console.log(`🚀 http://localhost:${PORT}`);

Deno.serve({ port: PORT }, handler);
