const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.config.common.js');

const publicPath = 'https://publish.local.buffer.com:8080/static/';

const merged = merge.strategy({
  plugins: 'prepend',
  'entry.bundle': 'prepend',
})(common, {
  mode: 'development',
  entry: {
    bundle: ['react-hot-loader/patch'],
  },
  devtool: false,
  output: {
    publicPath,
  },
  devServer: {
    allowedHosts: ['.buffer.com', '.local.buffer.com'],
    hot: true,
    publicPath,
    contentBase: false,
    port: 8080,
    host: 'local.buffer.com',
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: {
      key: fs.readFileSync(
        '../reverseproxy/certs/local.buffer.com-wildcard.key'
      ),
      cert: fs.readFileSync(
        '../reverseproxy/certs/local.buffer.com-wildcard.crt'
      ),
    },
    stats: {
      children: false,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});

module.exports = merged;
