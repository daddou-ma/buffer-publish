const path = require('path');
const PostCSSImport = require('postcss-import');
const PostCSSCustomProperties = require('postcss-custom-properties');
const PostCSShexrgba = require('postcss-hexrgba');
const webpack = require('webpack');

const classNameFormat = '[name]_[local]_[hash:base64:5]';

module.exports = {
  entry: './packages/web/index.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  // TODO: put this in a dev config
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          `css-loader?modules&importLoaders=1&localIdentName=${classNameFormat}`,
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                PostCSSImport,
                PostCSSCustomProperties,
                PostCSShexrgba,
              ],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: __dirname,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
    ],
  },
};
