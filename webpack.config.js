const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const PATHS = {
  src: path.resolve(process.cwd(), "src"),
  dist: path.resolve(process.cwd(), "dist")
};

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  return {
    entry: {
      index: `${PATHS.src}/js/index.js`,
      test: `${PATHS.src}/js/test.js`
    },
    output: {
      path: `${PATHS.dist}`,
      filename: devMode ? "js/[name].js" : "js/[name].min.js?[contenthash]",
    },
    devtool: devMode ? "source-map" : "",
    module: {
      rules: [
        {
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
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /node_modules/,
          include: `${PATHS.src}/fonts/`,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: `/fonts/`,
                publicPath: '../',
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          include: `${PATHS.src}/img/`,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: `img/`,
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: `${PATHS.src}/js/postcss.config.js`
                }
              }
            }
          ]
        },
        {
          test: /\.sass$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: `${PATHS.src}/js/postcss.config.js`
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  includePaths: [''],
                },
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? "css/[name].css" : "css/[name].min.css?[contenthash]"
      }),
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
        body: 'index'
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