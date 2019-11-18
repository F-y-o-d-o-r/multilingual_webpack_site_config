const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/js/index.js',
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/index_bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src/js'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pug/index.pug',
      title: 'Index page',
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: 'src/pug/test.pug',
      title: 'Test page',
    })
  ]
};