const path = require('path');
const PATHS = {
  src: path.resolve(process.cwd(), "src"),
  dist: path.resolve(process.cwd(), "dist")
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  return {
    entry: {
      index: `${PATHS.src}/js/index.js`,
      test: `${PATHS.src}/js/test.js`
    },
    output: {
      path: `${PATHS.dist}`,
      filename: 'js/[name].js'
    },
    devtool: devMode ? "source-map" : "",
    module: {
      rules: [{
        test: /\.js$/,
        include: `${PATHS.src}/js`,
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
            pretty: devMode
          }
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          `${PATHS.dist}`,
        ]
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/pug/en/index.pug',
        lang: "en",
        title: "Index page - en",
        description: "Index page - en",
        canonical: "https://websitename/",
        chunks: ['index', 'test'],
        // css: [ "main.css" ],
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
  }
};