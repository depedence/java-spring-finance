module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3f6ff",
          100: "#e6eeff",
          500: "#4361ff",
        },
        glass: "rgba(255,255,255,0.06)"
      },
      backdropBlur: {
        xs: "2px"
      }
    },
  },
  plugins: [],
}
