/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/customer/**/*.{js,jsx,ts,tsx}",
    "./src/Pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightPink: '#FDF6F6', // Add your custom color here
      },
    },
  },  
  plugins: [],
}