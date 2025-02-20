/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Blue
        secondary: "#64748B", // Slate
        accent: "#22C55E", // Green
        danger: "#EF4444", // Red
        backgroundLight: "#F8FAFC", // Light Background
        backgroundDark: "#1E293B", // Dark Background
      },
    },
  },
  plugins: [],
};
