/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const cloneDeep = require('lodash.clonedeep');
const webpackDevConfigs = require('./webpack.config.js');

// Use standalone version of uglifyjs-webpack-plugin (not the one included in webpack)
// to be able to use its v1 that's compatible with es6 thanks to uglify-js v3. Webpack v4
// will map webpack.optimize.UglifyJsPlugin to uglifyjs-webpack-plugin@1 so we'll be
// able to drop this standalone version when we use webpack v4.
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackProdConfigs = cloneDeep(webpackDevConfigs);

webpackProdConfigs.mode = 'production';

webpackProdConfigs.forEach((config) => {
  config.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJsPlugin()
  );
});

module.exports = webpackProdConfigs;
