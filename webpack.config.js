const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const TerserWebpackPlugin = require("terser-webpack-plugin");

const Dotenv = require("dotenv-webpack");

module.exports = {
  context: path.join(__dirname, "src"),
  mode: "development",
  entry: {
    index: ["@babel/polyfill", "./index.tsx"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    static: "./dist",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      api: path.resolve(__dirname, "src/api/"),
      constants: path.resolve(__dirname, "src/constants/"),
      helpers: path.resolve(__dirname, "src/helpers/"),
      store: path.resolve(__dirname, "src/store/"),
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: `[name].[hash].css`,
    }),
    new Dotenv(),
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
