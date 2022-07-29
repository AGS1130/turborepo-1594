const pkg = require("../package.json");

/**
 * Theme Dependencies
 */
const chalk = require("chalk");
const plugin = require("tailwindcss/plugin");
const postcssJS = require("postcss-js");
const postCSSPrefixer = require("./lib");

/**
 * Theme Library
 */
const blur = require("./config/blur");
const border = require("./config/border");
const colors = require("./config/colors");
const screens = require("./config/screens");
const shadows = require("./config/shadows");
const transition = require("./config/transition");
const typography = require("./config/typography");
const zIndex = require("./config/z-index");

/**
 * PostCSS Builds
 */
const base = require("../dist/base");
const components = require("../dist/components");
const layouts = require("../dist/layouts");
const utilities = require("../dist/utilities");
const vendors = require("../dist/vendors");

const main = ({ addBase, addComponents, addUtilities, config }) => {
  const useLogs = config("project.logs") || true;
  const useBase = config("project.base") || true;
  const useComponents = config("project.components") || true; // Down the road, maybe make it array so devs can select which components to use
  const useLayouts = config("project.layouts") || true;
  const useUtils = config("project.utils") || true;
  const useVendors = config("project.vendors") || true;
  const prefix = config("project.prefix") || "";

  const includedItems = [];

  // Log start of plugin
  if (useLogs) {
    console.log(
      chalk.hex("#FF5200").bold(`
.............................................................................................................................
:########:::########:::########:::######::::#######:::##::: ##:::######:::########::########:::##:::::##:::######:::########:
:##.... ##: ##.... ##: ##.....:::##... ##::##.... ##: ###:: ##::##... ##:... ##..:: ##.... ##: ##:::: ##::##... ##:... ##..::
:##:::: ##: ##:::: ##: ##::::::: ##:::..:: ##:::: ##: ####: ##: ##:::..::::: ##:::: ##:::: ##: ##:::: ##: ##:::..::::: ##::::
:########:: ########:: ######::: ##::::::: ##:::: ##: ## ## ##:. ######::::: ##:::: ########:: ##:::: ##: ##:::::::::: ##::::
:##.....::: ##.. ##::: ##...:::: ##::::::: ##:::: ##: ##. ####::..... ##:::: ##:::: ##.. ##::: ##:::: ##: ##:::::::::: ##::::
:##:::::::: ##::. ##:: ##::::::: ##::: ##: ##:::: ##: ##:. ###::##::: ##:::: ##:::: ##::. ##:: ##:::: ##: ##::: ##:::: ##::::
:##:::::::: ##:::. ##: ########:. ######::. #######:: ##::. ##:. ######::::: ##:::: ##:::. ##:. #######::. ######::::: ##::::
:.:::::::::..:::::..::........:::......::::.......:::..::::..:::......::::::..:::::..:::::..:::.......::::......::::::..::::: v.${pkg.version}`)
    );
  }

  // Inject @base style
  if (useBase) {
    addBase(base);
    includedItems.push("base");
  }

  // Add prefix to class names if specified
  let postcssJsProcess;
  if (prefix) {
    try {
      postcssJsProcess = postcssJS.sync(postCSSPrefixer({ prefix, ignore: [] }));
    } catch (error) {
      if (useLogs) {
        console.error(`Error: the "prefix" option was not applied:`, error);
      }
    }
  }
  const canApplyPrefix = prefix && postcssJsProcess;

  // Inject @components style
  if (useComponents) {
    addComponents(canApplyPrefix ? postcssJsProcess(components) : components);
    includedItems.push("components");
  }

  // Inject @layouts style
  if (useLayouts) {
    addComponents(canApplyPrefix ? postcssJsProcess(layouts) : layouts);
    includedItems.push("layouts");
  }

  // Inject @utilities style
  if (useUtils) {
    addUtilities(utilities, { variants: ["responsive"] });
    includedItems.push("utilities");
  }

  // Inject @vendors style
  if (useVendors) {
    addComponents(canApplyPrefix ? postcssJsProcess(vendors) : vendors);
    includedItems.push("vendors");
  }

  if (useLogs) {
    const gradientColors = ["#ff726e", "#ff846f", "#ff936f", "#ffa370", "#ffc371"];

    console.log(chalk.hex("#ff5f6d").bold(`\nIncluding:`));
    includedItems.forEach((includedItem, index) =>
      console.log(chalk.hex(gradientColors[index])(`\n✔︎ ${includedItem}`))
    );
  }
};

module.exports = plugin(main, {
  darkMode: "class",
  theme: {
    extend: {
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
  }
});
