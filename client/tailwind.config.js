const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        'primary': '#000080',
        'accent': '#FDF44D',
        'black50': '#80000000',
        'card-green': '#4BE16C',
        'card-yellow': '#FDF44D',
        'card-red': '#FF2929',
        'card-blue': '#7C7CFA',
        'pinky-red': '#F1356D',
        'pink': '#DDD',
      },
    },
  },
  plugins: [],
}
