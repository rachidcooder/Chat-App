/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
    colors: {
      "titleC": '#8b5cf6',
      "backgr": '#a5b4fc',
      "gray700": "#334155",
      "transparent": 'transparent',
      "current": 'currentColor',
      'white': '#ffffff',
      "sideBarBg": '#3e3c61',
      "navBarBg": '#2e1065',
      "borders": '#a78bfa',
      "gray500": "#64748b",
      "gray100": '#f1f5f9',
      "gray300": '#cbd5e1',
      "hoverChats": "#565974"
    },

  },
  plugins: [require('tailwind-scrollbar'),],
}

