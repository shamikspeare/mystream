import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softgreen: "#CFFFE2",
        mint: "#A2D5C6",
        surface: "#F6F6F6",
        darkbg: "#000000",
      },
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
        noto: ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui], // ✅ Make sure there's a comma here
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#CFFFE2", // softgreen
          secondary: "#A2D5C6", // mint
          accent: "#F6F6F6", // surface
          neutral: "#000000", // black
          "base-100": "#000000",
          "base-content": "#FFFFFF",
        },
      },
    ],
  },
};

export default config;
