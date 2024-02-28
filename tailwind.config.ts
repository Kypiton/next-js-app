import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        '100': '400px',
      },
      padding: {
        '30': '120px',
        '15': '60px',
      },
      maxWidth: {
        '46': '182px',
        '38': '150px',
      },
      margin: {
        '7.5': '30px',
        '9.5': '37px',
      }
    },
  },
  plugins: [],
};
export default config;


