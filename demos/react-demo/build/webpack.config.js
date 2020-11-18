/**
 * Created by Capricorncd.
 * Date: 2019/02/13 14:56
 * https://github.com/capricorncd
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const isDev = process.NODE_ENV === 'development'
// console.log(NODE_ENV)
const webpackConfig = {
  mode: NODE_ENV,
  entry: path.resolve(__dirname, '../src/index.js'),
  // https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'window',
    publicPath: './'
  },
  // https://webpack.js.org/configuration/devtool/#development
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    host: '0.0.0.0',
    port: 9009,
    overlay: {
      errors: true
    },
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"'+ NODE_ENV +'"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      filename: `index.html`,
      inject: true
    })
  ],
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins () {
                return [
                  // remove: false
                  // 阻止-webkit-box-orient: vertical;被移除
                  require('autoprefixer')({remove: false})
                ]
              }
            }
          },
          {
            loader: 'less-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        // loader: 'babel-loader!eslint-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.(pne?g|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'dist/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'dist/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'dist/fonts/[name].[ext]'
        }
      }
    ]
  }
}

if (!isDev) {
  webpackConfig.plugins.push(new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../favicon.ico'),
      to: path.resolve(__dirname, '../dist')
      // ignore: ['.*']
    }
  ]))
}

module.exports = webpackConfig
