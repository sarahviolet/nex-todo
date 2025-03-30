const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  safelist: [
    "bg-pastel-pink",
    "bg-pastel-purple",
    "bg-pastel-violet",
    "bg-pastel-blue",
    "text-pastel-purple",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#f7b5d6',
          purple: '#c9b6f2',
          violet: '#d2c1ff',
          blue: '#b5ccf7',
          light: '#f9f7fc',
        },
      },
    },
  },
  plugins: [],
};

export default config;
