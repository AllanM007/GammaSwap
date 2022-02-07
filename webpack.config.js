const path = require("path");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // target: "node",
  // devtool: "cheap-module-eval-source-map",
  entry: {
    main: path.resolve(process.cwd(), "src", "main.js")
  },
  output: {
    path: path.resolve(process.cwd(), "docs"),
    publicPath: ""
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
  },
	// node: {
  //  fs: "empty",
	//  net: "empty"
	// },
  watchOptions: {
    // ignored: /node_modules/,
    aggregateTimeout: 300, // After seeing an edit, wait .3 seconds to recompile
    poll: 500 // Check for edits every 5 seconds
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "public", "index.html")
    })
  ]
}
