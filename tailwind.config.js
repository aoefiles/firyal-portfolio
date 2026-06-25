/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'], // Menggunakan font Poppins
      },
      colors: {
        'primary': 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'bg-dark': 'var(--bg-dark)',
        'bg-card': 'var(--bg-card)',
        'bg-nav': 'var(--bg-nav)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        'border-color': 'var(--border-color)',
      },
      backgroundImage: {
        'hero-gradient': 'var(--hero-bg)',
      }
    },
  },
  plugins: [],
};