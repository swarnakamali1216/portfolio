import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ink: {
          DEFAULT: '#0C1A2E',
          mid:     '#1E3A5F',
          soft:    '#4A6B8A',
          muted:   '#8BA4BC',
          faint:   '#C8D8E8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft:    '#F8FBFF',
          muted:   '#F0F6FF',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-grotesk)', 'monospace'],
      },
      animation: {
        'fade-up':     'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':     'fadeIn 0.5s ease both',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':     'shimmer 3s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 2s ease-in-out infinite',
        'spin-slow':   'spin 20s linear infinite',
        'marquee':     'marquee 25s linear infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideRight:{ from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 0 0 rgba(14,165,233,0.3)' }, '50%': { boxShadow: '0 0 0 10px rgba(14,165,233,0)' } },
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      backgroundImage: {
        'gradient-sky':   'linear-gradient(135deg, #0EA5E9, #0284C7)',
        'gradient-sky-r': 'linear-gradient(135deg, #0369A1, #0EA5E9)',
        'noise':          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'sky-sm': '0 2px 12px rgba(14,165,233,0.15)',
        'sky-md': '0 4px 24px rgba(14,165,233,0.25)',
        'sky-lg': '0 8px 40px rgba(14,165,233,0.35)',
        'card':   '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(14,165,233,0.06)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(14,165,233,0.12)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
}
export default config
