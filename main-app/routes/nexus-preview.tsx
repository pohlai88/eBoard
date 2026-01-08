// NexusCanon Landing Page Preview
// Demonstrates understanding of Axis Visual Canon & NexusCanon Constitution
import { define } from "@/utils.ts";

export default define.page(() => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Axis eBoard — NexusCanon Preview</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="bg-[var(--color-parchment)] text-[var(--color-void)] min-h-screen">
        {/* Hero Section - Authority & Restraint */}
        <section class="min-h-screen flex flex-col items-center justify-center px-8 py-16">
          <div class="max-w-4xl mx-auto text-center space-y-12">
            {/* Editorial Heading - Written, Not Rendered */}
            <h1
              class="heading-editorial text-6xl md:text-7xl font-bold mb-8"
              style="font-family: 'Cormorant Garamond', serif; letter-spacing: -0.02em;"
            >
              Axis eBoard
            </h1>

            {/* Subheading - Spoken White (Parchment) */}
            <p
              class="text-2xl md:text-3xl text-[var(--color-ash)] font-serif mb-16"
              style="font-family: 'Cormorant Garamond', serif;"
            >
              The System of Record
              <br />
              <span class="text-[var(--color-gold)]">for Modern Governance</span>
            </p>

            {/* Ratification Button - Time-Based Confirmation */}
            <button
              class="button-ratify uppercase text-lg font-mono tracking-[0.1em]"
              style="font-family: 'JetBrains Mono', monospace; transition: background-color 1618ms cubic-bezier(0.4, 0, 0.2, 1), color 1618ms cubic-bezier(0.4, 0, 0.2, 1);"
            >
              Enter System
            </button>
          </div>
        </section>

        {/* Knowledge Cards - Illumination */}
        <section class="py-24 px-8 bg-[var(--color-parchment-light)]">
          <div class="max-w-6xl mx-auto">
            <h2
              class="heading-editorial text-4xl mb-16 text-center"
              style="font-family: 'Cormorant Garamond', serif;"
            >
              The Three Domains
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: The Codex */}
              <div
                class="card-illumination p-8 rounded-none border border-[#2A2A2C] bg-[var(--color-obsidian)]"
                style="transition: border-color 1000ms cubic-bezier(0.4, 0, 0.2, 1), background-color 1000ms cubic-bezier(0.4, 0, 0.2, 1);"
              >
                <h3
                  class="heading-editorial text-2xl mb-4 text-[var(--color-parchment)]"
                  style="font-family: 'Cormorant Garamond', serif;"
                >
                  The Codex
                </h3>
                <p class="text-[var(--color-ash)] leading-relaxed mb-6">
                  The Semantic Master. Separates the Why from the How. Business
                  rules exist as living law, not code.
                </p>
                {/* Forensic Data */}
                <div class="mt-6 pt-6 border-t border-[#2A2A2C]">
                  <span
                    class="data-forensic text-sm text-[var(--color-gold)]"
                    style="font-family: 'JetBrains Mono', monospace;"
                  >
                    Rules: 1,247
                  </span>
                </div>
              </div>

              {/* Card 2: The Loom */}
              <div
                class="card-illumination p-8 rounded-none border border-[#2A2A2C] bg-[var(--color-obsidian)]"
                style="transition: border-color 1000ms cubic-bezier(0.4, 0, 0.2, 1), background-color 1000ms cubic-bezier(0.4, 0, 0.2, 1);"
              >
                <h3
                  class="heading-editorial text-2xl mb-4 text-[var(--color-parchment)]"
                  style="font-family: 'Cormorant Garamond', serif;"
                >
                  The Loom
                </h3>
                <p class="text-[var(--color-ash)] leading-relaxed mb-6">
                  Safety over Speed. The domain of High Friction and ACID
                  transactions. Weaves Atomic Truth.
                </p>
                <div class="mt-6 pt-6 border-t border-[#2A2A2C]">
                  <span
                    class="data-forensic text-sm text-[var(--color-gold)]"
                    style="font-family: 'JetBrains Mono', monospace;"
                  >
                    Latency: &lt;200ms
                  </span>
                </div>
              </div>

              {/* Card 3: The Cobalt */}
              <div
                class="card-illumination p-8 rounded-none border border-[#2A2A2C] bg-[var(--color-obsidian)]"
                style="transition: border-color 1000ms cubic-bezier(0.4, 0, 0.2, 1), background-color 1000ms cubic-bezier(0.4, 0, 0.2, 1);"
              >
                <h3
                  class="heading-editorial text-2xl mb-4 text-[var(--color-parchment)]"
                  style="font-family: 'Cormorant Garamond', serif;"
                >
                  The Cobalt
                </h3>
                <p class="text-[var(--color-ash)] leading-relaxed mb-6">
                  Sensorial Excellence. The Haptic Surface. Adheres to Golden
                  Ratio Timing (1.618s).
                </p>
                <div class="mt-6 pt-6 border-t border-[#2A2A2C]">
                  <span
                    class="data-forensic text-sm text-[var(--color-gold)]"
                    style="font-family: 'JetBrains Mono', monospace;"
                  >
                    Response: &lt;350ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Material Truth Section */}
        <section class="py-24 px-8 bg-[var(--color-parchment)]">
          <div class="max-w-4xl mx-auto text-center space-y-12">
            <h2
              class="heading-editorial text-5xl mb-8"
              style="font-family: 'Cormorant Garamond', serif;"
            >
              Material Truth
            </h2>
            <p
              class="text-xl text-[var(--color-ash)] leading-relaxed max-w-2xl mx-auto"
              style="font-family: 'Cormorant Garamond', serif;"
            >
              Axis surfaces behave like material: Wood (grain), Stone (weight),
              Parchment (absorption). If a surface does not age, it does not
              deserve authority.
            </p>

            {/* Ratification Buttons - Different States */}
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
              <button
                class="button-ratify uppercase text-base font-mono tracking-[0.1em]"
                style="font-family: 'JetBrains Mono', monospace; transition: background-color 1618ms cubic-bezier(0.4, 0, 0.2, 1), color 1618ms cubic-bezier(0.4, 0, 0.2, 1);"
              >
                Ratify
              </button>
              <button
                class="button-ratify uppercase text-base font-mono tracking-[0.1em] opacity-50 cursor-not-allowed"
                style="font-family: 'JetBrains Mono', monospace;"
              >
                Pending
              </button>
            </div>
          </div>
        </section>

        {/* Light as Language - Interactive Demo */}
        <section class="py-24 px-8 bg-[var(--color-obsidian)]">
          <div class="max-w-4xl mx-auto text-center">
            <h2
              class="heading-editorial text-5xl mb-8 text-[var(--color-parchment)]"
              style="font-family: 'Cormorant Garamond', serif;"
            >
              Light as Language
            </h2>
            <p class="text-[var(--color-ash)] text-lg mb-12 max-w-2xl mx-auto">
              Humans perceive meaning through change in light over time, not
              static color. Light indicates Awareness (hover), Intent (press),
              Commitment (seal).
            </p>

            {/* Interactive Illumination Card */}
            <div
              class="card-illumination p-12 max-w-md mx-auto border border-[#2A2A2C] bg-[var(--color-obsidian)]"
              style="transition: border-color 1000ms cubic-bezier(0.4, 0, 0.2, 1), background-color 1000ms cubic-bezier(0.4, 0, 0.2, 1);"
            >
              <p class="text-[var(--color-ash)] text-sm mb-4">
                Hover to witness illumination
              </p>
              <div
                class="data-forensic text-3xl text-[var(--color-gold)]"
                style="font-family: 'JetBrains Mono', monospace;"
              >
                1.618s
              </div>
              <p class="text-[var(--color-ash)] text-xs mt-4">
                Golden Ratio Timing
              </p>
            </div>
          </div>
        </section>

        {/* Closing Statement - Restraint */}
        <section class="py-32 px-8 bg-[var(--color-parchment)]">
          <div class="max-w-3xl mx-auto text-center">
            <blockquote
              class="heading-editorial text-4xl md:text-5xl text-[var(--color-void)] leading-tight"
              style="font-family: 'Cormorant Garamond', serif;"
            >
              "Restraint is the highest form of power."
            </blockquote>
            <p class="text-[var(--color-ash)] mt-8 text-lg">
              Axis does not compete for attention. Axis earns trust.
            </p>
          </div>
        </section>

        {/* Footer - Minimal Authority */}
        <footer class="py-12 px-8 border-t border-[var(--color-ash)] bg-[var(--color-parchment-light)]">
          <div class="max-w-6xl mx-auto text-center">
            <p
              class="data-forensic text-sm text-[var(--color-ash)]"
              style="font-family: 'JetBrains Mono', monospace;"
            >
              NexusCanon v4.0.0 • Axis Visual Canon v1.0.0
            </p>
          </div>
        </footer>

        {/* Inline Styles for Hover Effects */}
        <style>
          {`
            .card-illumination:hover {
              border-color: var(--color-gold) !important;
              background-color: #1E1E20 !important;
            }
            
            .button-ratify:hover {
              background-color: var(--color-gold) !important;
              color: var(--color-void) !important;
            }
            
            .button-ratify {
              border: 1px solid var(--color-gold);
              background-color: transparent;
              color: var(--color-gold);
              padding: 1.25rem 4rem;
            }
          `}
        </style>
      </body>
    </html>
  );
});
