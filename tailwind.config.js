/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
  "./node_modules/flowbite/**/*.js"
  ],
  
  theme: {
    extend: {
      backgroundColor: {
        'D2E0E9': '#D2E0E9',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
