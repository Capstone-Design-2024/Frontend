/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Ubuntu", "Open Sans", "sans-serif"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
    extend: {},
  },
  variants: {
    extend: {
      rotate: ["group-hover"],
      transform: ["group-hover"],
    },
  },
  plugins: [require("flowbite/plugin")],
});
