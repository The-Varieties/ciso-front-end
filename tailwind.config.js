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
        'black50': '#80000000'
      },
    },
  },
  plugins: [],
}
