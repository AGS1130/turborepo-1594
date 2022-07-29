const withTM = require("next-transpile-modules")([
  "@project/react"
  // "@project/theme"
]);
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = withTM({
  reactStrictMode: true,

  webpack: config => {
    config.plugins.push(new StylelintPlugin());
    return config;
  }
});
