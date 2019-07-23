const CopyPlugin = require("copy-webpack-plugin");

module.exports = async ({ config, mode }) => {
  config.plugins.push(
    new CopyPlugin([
      {
        from: "./node_modules/@webcomponents/webcomponentsjs/bundles",
        to: "webcomponentsjs/bundles"
      }
    ])
  );
  return config;
};
