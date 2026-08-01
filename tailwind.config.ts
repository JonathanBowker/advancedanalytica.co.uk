import type { Config } from 'tailwindcss';
import { theme } from './src/theme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    fontFamily: {
      display: [theme.typography.fontDisplay, 'system-ui', 'sans-serif'],
      sans: [theme.typography.fontSans, 'system-ui', 'sans-serif'],
      mono: [theme.typography.fontMono, 'ui-monospace', 'SFMono-Regular']
    },
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        paper: 'var(--color-paper)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        slate: 'var(--color-slate)',
        steel: 'var(--color-steel)',
        fog: 'var(--color-fog)',
        accent: 'var(--color-accent)',
        accentDeep: 'var(--color-accent-deep)',
        strandPurple: 'var(--color-strand-purple)',
        strandTeal: 'var(--color-strand-teal)',
        strandBlue: 'var(--color-strand-blue)',
        strandGreen: 'var(--color-strand-green)',
        signal: 'var(--color-signal)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)'
      },
      borderRadius: {
        sm: theme.radii.sm,
        md: theme.radii.md,
        lg: theme.radii.lg,
        xl: theme.radii.xl,
        '2xl': theme.radii['2xl']
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        outline: 'var(--shadow-outline)'
      },
      letterSpacing: {
        tight: '-0.012em'
      }
    }
  }
} satisfies Config;
