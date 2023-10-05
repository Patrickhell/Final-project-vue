/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'bd_btn-shadow': '#d0fff8',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

