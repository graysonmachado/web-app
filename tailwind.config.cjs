module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        fg: "#e8e8ec",
        muted: "#6b6b80",
        accent: "#00d4aa",
        ring: "#0a0a10",
        surface: "#12121a",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}