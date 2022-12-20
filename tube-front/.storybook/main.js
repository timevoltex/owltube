module.exports = {
  stories: ["../src/components/*.stories.@(js|jsx|ts|tsx)"],
  // addons: [
  //   "@storybook/addon-links",
  //   "@storybook/addon-essentials",
  //   "@storybook/addon-interactions",
  //   "@storybook/preset-create-react-app",
  // ],
  // framework: "@storybook/react",
  // core: {
  //   builder: "webpack5",
  // },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
