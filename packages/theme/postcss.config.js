module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: "default"
    },
    "postcss-import": {},
    "postcss-nested": {
      bubble: ["screen"]
    },
    tailwindcss: {
      config: "./tailwind.config.js"
    }
  }
};
