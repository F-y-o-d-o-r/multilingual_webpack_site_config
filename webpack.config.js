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
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {

        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pug/en/index.pug',
      lang: "en",
      title: "Index page - en",
      description: "Index page - en",
      canonical: "https://websitename/",
    }),
    new HtmlWebpackPlugin({
      filename: 'ru/index.html',
      template: 'src/pug/ru/index.pug',
      lang: "ru",
      title: "Index page - ru",
      description: "Index page - ru",
      canonical: "https://websitename/ru",
    }),
    new HtmlWebpackPlugin({
      filename: 'ua/index.html',
      template: 'src/pug/ua/index.pug',
      lang: "ua",
      title: "Index page - ua",
      description: "Index page - ua",
      canonical: "https://websitename/ua",
    })
  ]
};