/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'bd_primary-color': '#00c3a5',
        'bd_secondary-color': '#ccf3ed',
        'bd_sponsorships-color': '#a809a8e6',
        'bd_btn-shadow': '#d0fff8',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
}

