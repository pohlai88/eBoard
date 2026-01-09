import { define } from "@/utils.ts";
import { ThemeProvider } from "@shared/ui/mod.ts";
import { Head } from "fresh/runtime";

/**
 * ELITE NEXUSCANON - The Apex
 * ===========================
 * Prototype7 canonical design using Tailwind theme.
 */
export default define.page(() => {
  return (
    <ThemeProvider>
      <Head>
        <title>The Apex — Governance System</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Main Container */}
      <div class="min-h-screen flex items-center justify-center p-8">
        <div class="max-w-4xl w-full">
          {/* HEADER */}
          <header class="mb-24">
            {/* System Status */}
            <div class="flex items-center gap-3 mb-6 opacity-90">
              <div class="w-[22px] h-[1px] bg-gold opacity-50"></div>
              <span class="font-mono text-gold text-[0.6rem] tracking-widest uppercase">
                System Online
              </span>
            </div>

            {/* Title - Inter Light 300, -3% Tracking */}
            <h1 class="font-sans font-light text-7xl leading-none tracking-apex text-signal mb-2">
              The Apex
              <span class="block font-light bg-divergence text-transparent bg-clip-text">
                Governance.
              </span>
            </h1>

            {/* Subtitle */}
            <p class="font-sans text-sm text-ash mt-8 max-w-lg leading-relaxed opacity-60">
              Forensic typography enabled. Inter Light (300) with -3% tracking.
              Signal White degrading into the void. This is the inevitable divergence.
            </p>
          </header>

          {/* CARDS GRID */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 01: Physics */}
            <div class="card-nexus group">
              <div class="font-mono text-[0.65rem] tracking-widest text-gold mb-8 opacity-80 uppercase">
                01 • Physics
              </div>
              <h3 class="font-sans font-medium text-xl tracking-apex text-parchment mb-3">
                Visual Engineering
              </h3>
              <p class="font-sans font-light text-ash text-sm leading-relaxed mb-10 opacity-80">
                The organic serif is removed. The header is now pure signal.
                The gradient fade implies a structure dissolving into data.
              </p>
              <a href="/demo" class="btn-nexus">
                View Specs →
              </a>
            </div>

            {/* Card 02: Data */}
            <div class="card-nexus group">
              <div class="font-mono text-[0.65rem] tracking-widest text-gold mb-8 opacity-80 uppercase">
                02 • Data
              </div>
              <h3 class="font-sans font-medium text-xl tracking-apex text-parchment mb-3">
                Forensic Layout
              </h3>
              <p class="font-sans font-light text-ash text-sm leading-relaxed mb-10 opacity-80">
                Data remains in JetBrains Mono, providing mechanical contrast
                to the smooth, aerodynamic Inter header.
              </p>
              <a href="#" class="btn-nexus">
                Inspect Grid →
              </a>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
});
