/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 18:12
 */
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argsArr = process.argv.slice(2)

console.log(argsArr)

const isProd = argsArr.includes('production')

const baseConfig = {
  entry: {
    index: resolve(__dirname, './src/index.jsx')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          extensions: ['js', 'vue', 'jsx'],
          fix: true
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.sc|ass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
  ]
}

let webpackConfig
if (isProd) {
 webpackConfig = merge(baseConfig, {})
} else {
  webpackConfig = merge(baseConfig, {})
}

module.exports = webpackConfig
