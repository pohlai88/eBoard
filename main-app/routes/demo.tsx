import { define } from "@/utils.ts";
import { Button, Card, Input } from "@shared/ui/mod.ts";
import { Head } from "fresh/runtime";

export default define.page(() => {
  return (
    <>
      <Head>
        <title>Component Demo - Axis eBoard</title>
      </Head>
      <div class="min-h-screen bg-obsidian py-8">
        <div class="max-w-7xl mx-auto px-4">
          <header class="mb-8">
            <h1 class="text-4xl font-bold text-parchment font-serif">
              🎨 Reusable Components Demo
            </h1>
            <p class="text-ash mt-2">
              Zero repeated classes • DRY pattern • Full Tailwind CSS approach
            </p>
          </header>

          <div class="space-y-8">
            {/* Button Variants */}
            <Card title="Button Component" variant="elevated">
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-ash mb-2">Variants:</p>
                  <div class="flex gap-3 flex-wrap">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="primary" disabled>Disabled</Button>
                  </div>
                </div>

                <div>
                  <p class="text-sm text-gray-600 mb-2">Sizes:</p>
                  <div class="flex gap-3 items-center flex-wrap">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card Variants */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Default Card" variant="default">
                <p>Simple white background</p>
              </Card>

              <Card title="Bordered Card" variant="bordered">
                <p>With visible border</p>
              </Card>

              <Card
                title="Elevated Card"
                variant="elevated"
                footer={<Button variant="primary" size="sm">Action</Button>}
              >
                <p>With shadow and footer</p>
              </Card>
            </div>

            {/* Input Component */}
            <Card title="Input Component" variant="elevated">
              <div class="max-w-md space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                />
                <Input
                  label="Error Example"
                  type="text"
                  error="This field is required"
                />
                <Input
                  label="Disabled"
                  type="text"
                  disabled
                  value="Cannot edit"
                />
              </div>
            </Card>

            {/* Zero Config Notice */}
            <Card variant="bordered">
              <div class="bg-obsidian-light border-l-4 border-gold p-4">
                <h3 class="font-semibold text-parchment">✅ Zero Configuration</h3>
                <ul class="mt-2 space-y-1 text-ash text-sm">
                  <li>✅ No package.json needed</li>
                  <li>✅ No webpack/vite config</li>
                  <li>✅ Full Tailwind CSS v3.4 approach</li>
                  <li>✅ No build step in development</li>
                  <li>✅ Just Deno + Fresh + Tailwind CSS + Preact</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
});
