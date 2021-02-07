import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import { resolve } from "path";

const config = {};

config.entry = { app: ["./src/js/assets.js", "./src/js/app.js"] };
config.output = {
  filename: "[name].js",
  path: resolve(__dirname, "./dist"),
};
config.module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    },
    {
      test: /\.(css|scss|sass)$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      loader: "file-loader",
      options: {
        outputPath: "assets",
        name: "[name].[ext]",
      },
    },
  ],
};

config.plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebPackPlugin({
    filename: "index.html",
    template: "./src/index.html",
    title: "Book Shelves",
    inject: "body",
    minify: false,
  }),
];

config.devServer = {
  contentBase: resolve(__dirname, "dist"),
  port: 3000,
};

export default config;
