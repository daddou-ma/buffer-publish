const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PostCSSImport = require('postcss-import');
const PostCSSCustomProperties = require('postcss-custom-properties');
const PostCSSCalc = require('postcss-calc');
const PostCSSColorFunction = require('postcss-color-function');

const PATH_HTML = path.resolve(__dirname, 'packages/server/index.ejs');
const PATH_FAVICON = path.resolve(
  __dirname,
  'packages/server/favicons/favicon-32x32.png'
);
const PATH_BUILD = path.resolve(__dirname, 'build');

const {
  // analyzePackagesWhitelist,
  analyzeLessLoader,
} = require('./analyze.config.js');

module.exports = {
  context: __dirname,
  entry: {
    bundle: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      './packages/web/index.jsx',
    ],
    // vendor,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/@bufferapp\/*)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: [
          /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
          /node_modules\/emoji-mart\/css\/emoji-mart\.css/,
        ],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
          /node_modules\/emoji-mart\/css\/emoji-mart\.css/,
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          `css-loader?modules&importLoaders=1&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`,
          'postcss-loader',
        ],
      },
      analyzeLessLoader,
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        // PostCSS plugins
        // Note: CSS preprocessing comes with limitations, and generally only applies to
        // what can be determined or calculated ahead of time (e.g. what isn't dependent
        // on the DOM or page's dimensions)
        postcss: [
          PostCSSImport, // Allows @import 'file.css' to be inlined
          PostCSSCustomProperties, // Convert W3C CSS Custom Props to more compatible CSS
          PostCSSCalc, // Convert W3C calc function to more compatible CSS
          PostCSSColorFunction, // Convert W3C color function to more compatible CSS
        ],
      },
    }),
    new HtmlWebpackPlugin({
      template: PATH_HTML,
      filename: 'index.html',
      inject: true,
      favicon: PATH_FAVICON,
    }),
  ],
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      name: false, // don't use dynamic names which could invalidate cache when they change
      cacheGroups: {
        vendors: false, // Disable the default vendors cache group for finer control
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  output: {
    path: PATH_BUILD,
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  stats: {
    children: false, // Disable logging from child plugins
  },
};
