import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2f3440',
        accent: '#8B2332',
        background: '#f9f9f9',
      },
      fontFamily: {
        'bank-gothic': ['var(--font-bank-gothic)', 'serif'],
        'telegrafico': ['var(--font-telegrafico)', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(4rem, 12vw, 12rem)',
      },
    },
  },
  plugins: [],
}

export default config
