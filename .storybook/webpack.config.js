// const Dotenv = require("dotenv-webpack");

module.exports = async ({ config, mode }) => {
  // Make whatever fine-grained changes you need

  // config.module.rules.unshift({
  //   test: /\.svg$/,
  //   loader: "./node_modules/raw-loader/dist/cjs.js"
  // });
  // console.log(config.module.rules);
  // Return the altered config
  // config.node = { fs: "empty" };
  console.log(config.plugins);
  return config;
};
