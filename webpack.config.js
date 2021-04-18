const path = require("path");
const WebextensionPlugin = require("webpack-webextension-plugin");

module.exports = {
  entry: {
    background: "./src/background.ts",
    timer: "./src/timer.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: "css-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new WebextensionPlugin({
      vendor: "chrome",
    }),
  ],
  mode: "production",
};
