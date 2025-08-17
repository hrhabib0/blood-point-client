/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E53935",
        background: "#FFFFFF",
        text: "#1F2937",
      },
    },
  },
  plugins: [],
}
