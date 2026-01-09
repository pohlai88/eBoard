import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ===============================
         COLOR — ABSOLUTE LAW
      =============================== */
      colors: {
        /* VOID & MATTER */
        void: "#0a0a0b",          // Absolute background
        obsidian: "#141416",      // Matte surface
        border: "#252528",        // Structural separation

        /* LIGHT */
        parchment: "#F8F5F0",     // Reading white
        signal: "#FDFDFC",        // Header-only white
        ash: "#9ca3af",           // Secondary / subdued

        /* GOLD */
        gold: {
          DEFAULT: "#c9a961",     // Ratified gold
          soft: "rgba(201,169,97,0.35)",
        },
      },

      /* ===============================
         TYPOGRAPHY PHYSICS (MEASURED)
      =============================== */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        apex: "-0.03em",          // H1 / H2 only
      },

      /* ===============================
         MOTION PHYSICS
      =============================== */
      transitionTimingFunction: {
        gravity: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      
      /* ===============================
         VISUAL ENGINEERING
      =============================== */
      backgroundImage: {
        divergence: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 100%)",
      }
    },
  },
} satisfies Config;
