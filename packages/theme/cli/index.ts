/**
 * Theme Dependencies
 */
import chalk from "chalk";
import { execSync } from "node:child_process";

const chalkBuild = chalk.hex("#FF0000");
const chalkBuildCSS = chalk.hex("#435CC8");
const chalkBuildJSS = chalk.hex("#FF9F19");

console.log(chalkBuild.bold(`🏗️ Project`));

const writes = ["base", "utilities", "components", "layouts", "vendors"];

writes.forEach(write => {
  /**
   * PostCSS Builds
   */
  console.log(chalkBuildCSS(`Writing CSS: ${write}`));
  execSync(`postcss --config . styles/${write}/index.css -o dist/${write}.css`);
  /**
   * PreJSS Builds
   */
  console.log(chalkBuildJSS(`Writing JSS: ${write}`));
  execSync(`prejss-cli dist/${write}.css --format commonjs`);
});
