module.exports = {
   prefix: 'tw-', // Add this prefix
  important: true, // Optional: makes styles more specific
  corePlugins: {
    preflight: false, // Disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}

