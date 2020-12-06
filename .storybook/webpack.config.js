const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      __PACKAGES__: JSON.stringify(`../packages/${process.env.PACKAGE || ''}`),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /node_modules\/emoji-mart\/css\/emoji-mart\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules\/emoji-mart\/css\/emoji-mart\.css/,

        use: [
          'style-loader',
          `css-loader?modules&importLoaders=1&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`,
        ],
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
};
