module.exports = async ({ config, mode }) => {
  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.svg$/,
    loader: "svg-inline-loader"
  });

  // Return the altered config
  return config;
};
