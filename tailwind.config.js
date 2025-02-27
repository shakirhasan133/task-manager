/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Ensure paths are correct
  theme: {
    extend: {
      colors: {
        primary: "#45ac4b", // Main Green
        secondary: "#2f7a34", // Darker Green
        backgroundLight: "#f8fafc", // Light mode background
        backgroundDark: "#1e293b", // Dark mode background
        textPrimary: "#ffffff", // White text
        textSecondary: "#e2e8f0", // Light gray text
      },
    },
  },
  plugins: [require("daisyui")],
};
