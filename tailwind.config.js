/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter, sans-serif"]
      },
      container: {
        padding: "2rem",
        center: true
      },
      boxShadow: {
        button: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: []
};
