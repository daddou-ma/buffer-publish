const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCSSImport = require('postcss-import');
const PostCSSCustomProperties = require('postcss-custom-properties');
const PostCSSCalc = require('postcss-calc');
const PostCSSColorFunction = require('postcss-color-function');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

const baseWebpackConfig = {
  name: undefined,
  entry: undefined,
  context: __dirname,
  mode: 'development',
  output: {
    path: __dirname,
    filename: undefined,
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      moment$: 'moment/moment.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/@bufferapp\/components)(?!\/@bufferapp\/web-components)(?!\/micro-rpc-client)(?!\/event-pubsub)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            'transform-object-assign',
            'add-module-exports',
          ],
        },
      },

      {
        test: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        loaders: [
          'style-loader', 'css-loader',
        ],
      },

      // Load CSS through style-loader, css-loader and postcss-loader, and enable
      // CSS Modules + the use of PostCSS plugins (and auto-prefix too!)
      {
        test: /\.css$/,
        exclude: /node_modules\/@bufferapp\/draft-js-emoji-plugin\/lib\/plugin\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          `autoprefixer-loader?${JSON.stringify({
            browsers: ['last 2 versions', '> 1%', 'ie 9', 'firefox >= 21', 'safari >= 5'],
            cascade: false,
          })}`
        ]
      },
      {
        test: /\.png$|\.jpg$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.DefinePlugin({
      __REACT_HOT_LOADER__: undefined,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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

    // Output CSS to a separate, CSS-only bundle
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "composer-web-iframe-bundle.css",
    }),

    // Further optimize CSS once it's been extracted and put in a single bundle
    // by ExtractTextPlugin – essentially deduplicate classes that are imported
    // from different files.
    new OptimizeCssAssets({
      canPrint: false,
      // this is needed cause of a bug with cssnano https://github.com/ben-eb/gulp-cssnano/issues/14
      cssProcessorOptions: { zindex: false },
    }),

    // Expose some polyfills as globals
    new webpack.ProvidePlugin({
      // window.setImmediate polyfill
      setImmediate: 'imports-loader?this=>global!exports-loader?global.setImmediate!setimmediate',
    }),
  ],
  bail: true,
  stats: {
    colors: true,
    version: true,
    modules: false,
    hash: false,
    timings: false,
    reasons: true,
    cached: true,
    chunks: true,
    chunkModules: false,
    chunkOrigins: true,
    children: false, // Disable logging from child plugins
  },
};

const iframeBundleConfig = {
  ...baseWebpackConfig,
  name: 'iframe-bundle',
  entry: [
    'babel-polyfill',
    'element-closest',
    './interfaces/buffer-web.jsx',
  ],
  output: {
    ...baseWebpackConfig.output,
    filename: 'composer-web-iframe-bundle.js',
  },
};

const iframeUtilsConfig = {
  ...baseWebpackConfig,
  name: 'iframe-utils',
  entry: './interfaces/utils/buffer-web.js',
  output: {
    ...baseWebpackConfig.output,
    library: '',
    libraryTarget: 'commonjs',
    filename: 'composer-web-iframe-utils.js',
  },
};

module.exports = [iframeBundleConfig, iframeUtilsConfig];
