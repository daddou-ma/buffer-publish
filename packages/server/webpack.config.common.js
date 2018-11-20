const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const vendor = ['react', 'react-dom', '@bufferapp/components'];
const { analyzePackagesWhitelist, analyzeLessLoader } = require('./analyze.config.js');


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
        exclude: new RegExp(`/node_modules(?!/@bufferapp/performance-tracking)(?!/@bufferapp/async-data-fetch)(?!/@bufferapp/components)(?!/@bufferapp/web-components)(?!/@bufferapp/composer)(?!/@bufferapp/unauthorized-redirect)${analyzePackagesWhitelist}/`),
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
        test: /\.css$/,
        exclude: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
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
