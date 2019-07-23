const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    button: "./index.js"
  },
  mode: "production",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.ASSETS_PATH || "/"
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyPlugin([
      {
        from: "./node_modules/@webcomponents/webcomponentsjs/bundles",
        to: "webcomponentsjs/bundles"
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        loader: "file-loader",
        query: { name: "[name].[hash:8].[ext]" }
      }
    ]
  }
};
