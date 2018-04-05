/**
 * Created by zx1984 2018/4/5
 * https://github.com/zx1984
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base')

let webpackConfig = merge(base, {
  output: {
    filename: '[name].min.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: false
    })
  ]
})

module.exports = webpackConfig
