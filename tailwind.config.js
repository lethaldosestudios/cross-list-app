/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mindaro': '#daff7d',
        'licorice': '#14080e',
        'alice-blue': '#ebf2fa',
        'cool-gray': '#8c86aa',
        'royal-purple': '#81559b',
        'neumorph-bg': '#e0e0e0',
        'neumorph-light': '#ffffff',
        'neumorph-dark': '#bebebe',
      },
      boxShadow: {
        'neumorph': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        'neumorph-inset': 'inset 8px 8px 20px #bebebe, inset -8px -8px 20px #ffffff',
        'neumorph-button': '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
        'neumorph-button-hover': '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
        'neumorph-button-active': 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff',
        'neumorph-nav': '15px 15px 40px #bebebe, -15px -15px 40px #ffffff',
        'neumorph-nav-item': 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff',
        'neumorph-nav-item-active': 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff',
        'neumorph-input': 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff',
      },
      borderRadius: {
        'neumorph': '20px',
        'neumorph-inset': '15px',
        'neumorph-button': '12px',
        'neumorph-nav': '25px',
        'neumorph-nav-item': '15px',
        'neumorph-input': '12px',
      },
    },
  },
  plugins: [],
}
