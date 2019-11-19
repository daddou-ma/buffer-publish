// const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.common.js');

const merged = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    nodeEnv: 'production',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[name].[chunkhash:8].css',
    }),
    new BundleAnalyzerPlugin(),
  ],
  output: {
    publicPath: 'https://static.buffer.com/publish/',
    filename: '[name].[chunkhash:8].js',
  },
});

module.exports = merged;
