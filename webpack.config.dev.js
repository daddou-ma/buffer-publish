const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.config.common.js');

const merged = merge.strategy({
  plugins: 'prepend',
  'entry.bundle': 'prepend',
})(common, {
  mode: 'development',
  entry: {
    bundle: ['react-hot-loader/patch'],
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    port: 8080,
    host: 'publish.local.buffer.com',
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/rpc': {
        target: 'https://publish.local.buffer.com/',
        changeOrigin: true,
        secure: false,
      },
      '/pusher/auth': {
        target: 'https://publish.local.buffer.com/',
        changeOrigin: true,
        secure: false,
      },
    },
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      STRIPE_PUBLISHABLE_KEY: 'pk_dGKqAIFsUQonSYGPBM9Rek71IHOcL',
      SEGMENT_KEY: 'qsP2UfgODyoJB3px9SDkGX5I6wDtdQ6a',
      GRAPHQL_API: 'https://graph.local.buffer.com',
    }),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'styled-components': path.resolve('./node_modules/styled-components'),
      react: path.resolve('./node_modules/react'),
    },
  },
});

module.exports = merged;
