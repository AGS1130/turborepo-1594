/**
 * Theme Library
 */
const blur = require("./plugin/config/blur");
const border = require("./plugin/config/border");
const colors = require("./plugin/config/colors");
const screens = require("./plugin/config/screens");
const shadows = require("./plugin/config/shadows");
const transition = require("./plugin/config/transition");
const typography = require("./plugin/config/typography");
const zIndex = require("./plugin/config/z-index");

const responsiveRegex = require("./plugin/lib/responsiveRegex");

module.exports = {
  content: [{ raw: "" }],
  safelist: responsiveRegex,
  theme: {
    blur: blur,
    borderRadius: border.borderRadius,
    borderWidth: border.borderWidth,
    colors: colors,
    screens: screens,
    shadows: shadows,
    transitionDelay: transition.transitionDelay,
    transitionDuration: transition.transitionDuration,
    transitionProperty: transition.transitionProperty,
    transitionTimingFunction: transition.transitionTimingFunction,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    letterSpacing: typography.letterSpacing,
    lineHeight: typography.lineHeight,
    zIndex: zIndex
  }
};
