const merge = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.config.common.js');

const merged = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    nodeEnv: 'production',
  },
  // plugins: [new BundleAnalyzerPlugin()],
});

module.exports = merged;
