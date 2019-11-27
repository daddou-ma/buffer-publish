// const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.common.js');

const plugins = [
  new MiniCssExtractPlugin({
    /**
     * Using `contenthash` here instead of `chunkhash` to ensure the CSS hash doesn't change unnecessarily
     * See: https://survivejs.com/webpack/optimizing/adding-hashes-to-filenames/#setting-up-hashing
     */
    filename: '[name].[contenthash:8].css',
    chunkFilename: '[name].[contenthash:8].css',
  }),
];

let devtool = 'source-map';

// `yarn run build:analyze` to visually inspect the bundle
// when building locally
if (process.env.ANALYZE_BUNDLE) {
  plugins.push(new BundleAnalyzerPlugin());
  devtool = false;
}

const merged = merge(common, {
  mode: 'production',
  devtool,
  optimization: {
    nodeEnv: 'production',
  },
  plugins,
  output: {
    publicPath: 'https://static.buffer.com/publish/',
    filename: '[name].[chunkhash:8].js',
  },
});

module.exports = merged;
