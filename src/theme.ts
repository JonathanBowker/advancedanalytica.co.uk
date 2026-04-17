// src/theme.ts
// Lexington-inspired: clarity-first, typography-led, neutral surfaces, single accent.

export const theme = {
  brand: {
    name: "Advanced Analytica",
    tagline: "Make Brand Operable",
  },

  // Semantic color roles (use these, not random hex codes in components)
  colors: {
    // Brand kit tokens (hex) - single source for the website theme.
    ink: "#0B0E14",
    paper: "#F6F7F8",
    // Used for <body> background to create separation from white surfaces.
    background: "#F6F7F8",
    // Card / surface background.
    surface: "#FFFFFF",
    slate: "#0B0E14",
    steel: "#2B3445",
    fog: "#E3E6EB",

    accent: "#3B82F6",
    // NOTE: we currently map "accentDeep" to accent in ThemeVars. Keep a separate token here for future use.
    accentDeep: "#1E3A8A",
    info: "#0E7490",
    warning: "#B45309",

    // Additional states (not in the provided list, but required by the codebase)
    success: "#16A34A",
    danger: "#DC2626",

    // Strand palette
    strandOrange: "#FF8C69",
    strandPurple: "#8B17FF",
    strandBlue: "#174AFF",
    strandGreen: "#DDF952",

    // Optional neutrals used in a few places
    mist: "#BFC5CF"
  },

  typography: {
    // Matches the live jonnybowker.com typography stack.
    fontSans:
      'Archivo, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
    fontDisplay:
      'Archivo, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
    fontMono:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    // Keep mastheads aligned with the rest of the imported Jonny Bowker style.
    fontMasthead:
      'Archivo, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',

    // Used for MDX/prose readability
    contentWidth: "72ch",
  },

  radii: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
  },

  shadows: {
    // Lexington-style: subtle, not material-heavy
    soft: "0 10px 30px rgba(2, 8, 23, 0.06)",
    card: "0 8px 24px rgba(2, 8, 23, 0.06)",
  },

  layout: {
    container: "1100px",
    gutter: "1.25rem",
    sectionY: "5rem",
  },
};

export type Theme = typeof theme;
