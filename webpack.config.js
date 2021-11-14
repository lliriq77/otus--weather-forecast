const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  entry: resolve(__dirname, "./src/index.js"),
  output: {
    filename: "bundle.js",
    path: resolve(`${__dirname}/dist`),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
    }),
  ],
};
