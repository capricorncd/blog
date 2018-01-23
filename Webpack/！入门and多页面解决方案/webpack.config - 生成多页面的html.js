/**
 * Created by Capricorncd 2018/1/23
 * https://github.com/capricorncd
 */

const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // context: , // 运行上下文
  entry: {
    'main': './src/js/main.js',
    'page1': './src/js/page1.js',
    'page2': './src/js/page2.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].[chunkhash].js',
    // 上线配置，生成的js文件路径前缀
    publicPath: 'http://zx1984.cn/'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'main.html',
      template: 'index.html',
      inject: false,
      title: 'webpack main.html',
      // chunks: ['main', 'page1']
      excludeChunks: ['page1', 'page2']
    }),
    new htmlWebpackPlugin({
      filename: 'page1.html',
      template: 'index.html',
      inject: false,
      title: 'webpack page1.html',
      chunks: ['main', 'page1']
      // excludeChunks: ['main', 'page2']
    }),
    new htmlWebpackPlugin({
      filename: 'page2.html',
      template: 'index.html',
      inject: false,
      title: 'webpack page2.html',
      chunks: ['main', 'page2']
      // excludeChunks: ['main', 'page1']
    })
  ]
}
