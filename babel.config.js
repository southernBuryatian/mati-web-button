const presets = [
  [
    "@babel/env",
    {
      // targets: {
      //   edge: 12
      // },
      modules: false,
      useBuiltIns: "usage",
      corejs: 3,
      exclude: ["@babel/plugin-transform-classes"]
    }
  ]
];

const plugins = [
  // "@babel/plugin-proposal-optional-catch-binding"
  // "@babel/plugin-transform-regenerator"
  // "@babel/plugin-transform-runtime"
];

module.exports = { presets, plugins };
