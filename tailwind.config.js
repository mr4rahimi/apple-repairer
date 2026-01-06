/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx,vue,svelte}"
  ],
  theme: {
    extend: {
     fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
