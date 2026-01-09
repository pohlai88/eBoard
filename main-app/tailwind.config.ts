import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * ELITE NEXUSCANON CONFIGURATION
 * ==============================
 * Branding-focused Tailwind configuration.
 * Colors, Fonts, Physics - The Absolute Law.
 *
 * Fresh Framework: Routes/Islands patterns preserved.
 * Reference: Prototype7 canonical design.
 */
export default {
  // ============================================
  // CONTENT PATHS (Fresh Requirement)
  // ============================================
  content: [
    "./routes/**/*.{ts,tsx}",
    "./islands/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../shared/**/*.{ts,tsx}",
  ],

  // ============================================
  // THEME: ELITE NEXUSCANON BRANDING
  // ============================================
  theme: {
    extend: {
      /* ===============================
         COLOR — ABSOLUTE LAW
      =============================== */
      colors: {
        // VOID & MATTER
        void: "#0a0a0b",
        obsidian: "#141416",
        border: "#252528",

        // LIGHT
        parchment: "#F8F5F0",
        signal: "#FDFDFC",
        ash: "#9ca3af",

        // GOLD SPECTRUM
        gold: {
          DEFAULT: "#c9a961",
          soft: "rgba(201,169,97,0.35)",
        },
      },

      /* ===============================
         TYPOGRAPHY PHYSICS
      =============================== */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        apex: "-0.03em",
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
        divergence: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0.4) 100%)",
      },
    },
  },

  // ============================================
  // PLUGINS (Optional Components)
  // ============================================
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".status-line": {
          width: "22px",
          height: "1px",
          backgroundColor: "#c9a961",
          opacity: "0.5",
        },
        ".card-nexus": {
          backgroundColor: "#141416",
          border: "1px solid #252528",
          padding: "2rem",
          borderRadius: "4px",
          transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "#c9a961",
            backgroundColor: "#161619",
            transform: "translateY(-2px)",
          },
        },
        ".btn-nexus": {
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#c9a961",
          textDecoration: "none",
          paddingBottom: "4px",
          borderBottom: "1px solid rgba(201,169,97,0.35)",
          transition: "all 300ms ease",
          "&:hover": {
            borderBottomColor: "#c9a961",
            color: "#F8F5F0",
          },
        },
      });
    }),
  ],
} satisfies Config;
