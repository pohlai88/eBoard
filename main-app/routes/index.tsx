import { define } from "@/utils.ts";
import { Button, Card, ThemeProvider } from "@shared/ui/mod.ts";
import { Head } from "fresh/runtime";

export default define.page(() => {
  return (
    <ThemeProvider>
      <Head>
        <title>Axis eBoard - The Apex</title>
      </Head>
      <div class="min-h-screen bg-[var(--color-obsidian)] text-[var(--color-parchment)]">
        <div class="max-w-7xl mx-auto px-4 py-8">
          <header class="mb-8">
            <h1
              class="text-4xl font-bold text-[var(--color-parchment)]"
              style="font-family: 'Cormorant Garamond', serif;"
            >
              🎯 The Apex - Governance System
            </h1>
            <p class="text-[var(--color-ash)] mt-2">
              Zero Configuration • Fresh + Tailwind CSS v4 + Preact
            </p>
          </header>

          <Card variant="elevated">
            <h2 class="text-2xl font-semibold mb-4 text-[var(--color-parchment)]">
              ✅ Fresh Setup Complete
            </h2>
            <ul class="space-y-2 text-[var(--color-ash)]">
              <li>✅ Fresh framework initialized</li>
              <li>✅ Preact included (3KB)</li>
              <li>✅ Tailwind CSS v4 configured (CSS-first)</li>
              <li>✅ Theme system with semantic tokens</li>
              <li>✅ Dark mode support (default)</li>
              <li>✅ File-based routing ready</li>
              <li>✅ Reusable UI components created</li>
            </ul>
          </Card>

          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="bordered">
              <h3 class="font-semibold text-[var(--color-gold)] mb-2">
                View Component Demo
              </h3>
              <p class="text-[var(--color-ash)] text-sm mb-4">
                See all reusable components in action
              </p>
              <a href="/demo">
                <Button variant="primary">View Demo →</Button>
              </a>
            </Card>

            <Card variant="bordered">
              <h3 class="font-semibold text-[var(--color-gold)] mb-2">
                No Config Needed
              </h3>
              <p class="text-[var(--color-ash)] text-sm mb-4">
                No package.json, no webpack, no babel - just Deno
              </p>
              <Button variant="success" disabled>Running Fresh 🚀</Button>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
});
