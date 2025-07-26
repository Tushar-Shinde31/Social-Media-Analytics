// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}", // 👈 added this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
