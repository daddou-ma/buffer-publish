const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.config.common.js');

const merged = merge.strategy({ plugins: 'prepend' })(
  common, {
    mode: 'development',
    devtool: 'eval',
    output: {
      publicPath: 'https://local.buffer.com:8080/static/',
    },
    devServer: {
      allowedHosts: [
        '.buffer.com',
        '.local.buffer.com',
      ],
      hot: true,
      publicPath: 'https://local.buffer.com:8080/static/',
      contentBase: false,
      port: 8080,
      host: 'local.buffer.com',
      headers: { 'Access-Control-Allow-Origin': '*' },
      https: {
        key: fs.readFileSync('../reverseproxy/certs/local.buffer.com-wildcard.key'),
        cert: fs.readFileSync('../reverseproxy/certs/local.buffer.com-wildcard.crt'),
      },
      stats: {
        children: false,
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        '@bufferapp/publish-formatters': path.resolve(__dirname, './publish-formatters'),
        '@bufferapp/publish-parsers': path.resolve(__dirname, './publish-parsers'),
      },
    },
  },
);

module.exports = merged;
