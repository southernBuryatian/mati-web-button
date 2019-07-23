const path = require("path");
const { DefinePlugin } = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ASSETS_PATH = process.env.ASSETS_PATH || "/";

module.exports = {
  entry: {
    button: "./index.js"
  },
  mode: "production",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: ASSETS_PATH
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyPlugin([
      {
        from: "./node_modules/@webcomponents/webcomponentsjs/bundles",
        to: "webcomponentsjs/bundles"
      }
    ]),
    new DefinePlugin({
      "process.env.ASSETS_PATH": JSON.stringify(ASSETS_PATH)
    })
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
