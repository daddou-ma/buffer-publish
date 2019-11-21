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
    // Create source maps that have the [hash] in them.
    // Since there's no replacement string for the extension
    // (e.g., '[ext]') we have to have one for JS and another
    // for CSS.
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[hash].js.map',
      exclude: ['bundle.css'],
    }),
    // Create source maps for the CSS
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[hash].css.map',
      test: ['bundle.css'],
    }),
  ],
});

module.exports = merged;
