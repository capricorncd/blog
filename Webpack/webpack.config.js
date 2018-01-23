/**
 * Created by Capricorncd 2018/1/23
 * https://github.com/capricorncd
 */

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 排除目录，减少编译时间
        exclude: /node_modules/,
        // exclude: path.resolve(__dirname, 'node_modules'),
        // 指定打包文件查找范围
        // include: './src/',
        include: path.resolve(__dirname, 'src'),
        // https://webpack.js.org/configuration/module/#condition
        // include: [
        //   path.resolve(__dirname, "app/styles"),
        //   path.resolve(__dirname, "vendor/styles")
        // ],
        loader: "babel-loader",
        query: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ]
}
