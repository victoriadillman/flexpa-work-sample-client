/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lime-green': 'rgb(179, 252, 134)',
        'tea-green': 'rgb(231, 254, 215)'
      }
    },
  },
  plugins: [],
}

