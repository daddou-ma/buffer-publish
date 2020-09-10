// const webpack = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

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
  /**
   * Outputs a JSON file that maps names like 'bundle.js' to the full URL
   * in production (e.g., https://static.buffer.com/publish/bundle._hash_.js)
   *
   * Used in server/index.js to inject bundled files
   */
  new ManifestPlugin({
    fileName: 'webpackAssets.json',
  }),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production',
    BUGSNAG_APP_VERSION: 'placeholder', // replaced in CI
    STRIPE_PUBLISHABLE_KEY: 'pk_qOmHaWApLCX5OoeWKQ3NrArhoyWEi',
    SEGMENT_KEY: '9Plsiyvw9NEgXEN7eSBwiAGlHD3DHp0A',
  }),
];

let devtool = 'source-map';

// `yarn run build:analyze` to visually inspect the bundle
// when building locally, also disable some optimizations
// to increase speed of bundling
if (process.env.ANALYZE_BUNDLE) {
  plugins.push(new BundleAnalyzerPlugin());
  devtool = false;
}

const merged = merge(common, {
  mode: 'production',
  devtool,
  plugins,
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  performance: { hints: false }, // don't warn that the bundles are big, we know ;)
});

module.exports = merged;
