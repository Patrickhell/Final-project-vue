/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,vue,js,ts,jsx,tsx}',
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
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
}

