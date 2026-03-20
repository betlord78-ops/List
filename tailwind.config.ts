import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07111f',
        panel: '#0b1728',
        panel2: '#10213a',
        line: '#1e3356',
        brand: '#2ea5ff',
        brand2: '#71e4ff',
        muted: '#8ea6c9',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(46,165,255,.15), 0 12px 35px rgba(19,49,94,.35)',
      },
      backgroundImage: {
        'hero-grad': 'radial-gradient(circle at top, rgba(46,165,255,0.15), transparent 35%), linear-gradient(180deg, #091324 0%, #07111f 100%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
