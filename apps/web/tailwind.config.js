const { dirname, join, resolve } = require("path");
// const plugin = require("@project/theme");
const projectReact = join(dirname(resolve(__dirname)), "../packages/react/src/**/*.tsx");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [projectReact, "./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {},
  variants: {},
  // plugins: [plugin],
  project: {}
};
