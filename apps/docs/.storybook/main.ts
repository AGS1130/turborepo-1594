export default {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-storysource"
  ],
  core: {
    builder: "@storybook/builder-webpack5"
  },
  // @ts-ignore
  webpackFinal: async config => {
    const rules = config.module?.rules ?? [];

    config.module.rules = [
      ...rules,
      {
        test: /.storybook\/preview.ts?(x)/,
        resolve: {
          fullySpecified: false
        }
      }
    ];

    return config;
  },
  framework: "@storybook/react",
  stories: ["../../../packages/react/**/*.stories.tsx"],
  typescript: {
    reactDocgen: false
  }
};
