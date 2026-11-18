/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./campus_connect.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        'editorial-mono': ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        'editorial-sans': ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border, 240 3.7% 15.9%))',
      },
    },
  },
  plugins: [],
}
