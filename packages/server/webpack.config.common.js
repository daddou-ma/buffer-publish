const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCSSImport = require('postcss-import');
const PostCSSCustomProperties = require('postcss-custom-properties');
const PostCSSCalc = require('postcss-calc');
const PostCSSColorFunction = require('postcss-color-function');

const vendor = ['react', 'react-dom', '@bufferapp/components'];
const { analyzePackagesWhitelist, analyzeLessLoader } = require('../../analyze.config.js');


module.exports = {
  context: __dirname,
  entry: {
    bundle: ['babel-polyfill', '../web/index.jsx'],
    vendor,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: new RegExp(`/node_modules(?!/@bufferapp/performance-tracking)(?!/@bufferapp/async-data-fetch)(?!/@bufferapp/components)(?!/@bufferapp/web-components)(?!/@bufferapp/publish-composer)(?!/@bufferapp/unauthorized-redirect)${analyzePackagesWhitelist}/`),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /node_modules\/tui-image-editor\/dist\/tui-image-editor\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
          /node_modules\/tui-image-editor\/dist\/tui-image-editor\.css/,
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          `css-loader?modules&importLoaders=1&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`,
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
      analyzeLessLoader,
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        // PostCSS plugins
        // Note: CSS preprocessing comes with limitations, and generally only applies to
        // what can be determined or calculated ahead of time (e.g. what isn't dependent
        // on the DOM or page's dimensions)
        postcss: [
          PostCSSImport, // Allows @import 'file.css' to be inlined
          PostCSSCustomProperties, // Convert W3C CSS Custom Props to more compatible CSS
          PostCSSCalc, // Convert W3C calc function to more compatible CSS
          PostCSSColorFunction, // Convert W3C color function to more compatible CSS
        ],
      },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: 'vendor',
        },
      },
    },
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  stats: {
    children: false, // Disable logging from child plugins
  },
};
