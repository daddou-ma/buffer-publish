const webpack = require('webpack');
const merge = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.config.common.js');

const merged = merge(common, {
  mode: 'production',
  devtool: undefined,
  optimization: {
    nodeEnv: 'production',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[hash].js.map',
      exclude: ['bundle.css'],
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[hash].css.map',
      test: ['bundle.css'],
    }),
  ],
});

module.exports = merged;
