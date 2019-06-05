const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostCSSCustomProperties = require('postcss-custom-properties');
const PostCSSCalc = require('postcss-calc');
const PostCSSColorFunction = require('postcss-color-function');
const Autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        loaders: [
          'style-loader', 'css-loader',
        ],
      },
      {
        // Load CSS through style-loader, css-loader and postcss-loader, and enable
        // CSS Modules + the use of PostCSS plugins (and auto-prefix too!)
        test: /\.css$/,
        exclude: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          }, {
            loader: 'postcss-loader',
            options: {
              postcss: () => [
                PostCSSCustomProperties,
                PostCSSCalc,
                PostCSSColorFunction,
                Autoprefixer({
                  browsers: ['last 2 versions', '> 1%', 'ie 9', 'firefox >= 21', 'safari >= 5'],
                  cascade: false,
                }),
              ],
            },
          }],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/@bufferapp\/*)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
};

/*

With ExtractTextPlugin:

loader: ExtractTextPlugin.extract('style-loader', [
  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader',
  `autoprefixer-loader?${JSON.stringify({
    browsers: ['last 2 versions', '> 1%', 'ie 9', 'firefox >= 21', 'safari >= 5'],
    cascade: false
  })}`,
].join('!'))

*/
