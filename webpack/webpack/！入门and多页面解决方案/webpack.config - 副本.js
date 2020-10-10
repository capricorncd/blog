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
    publicPath: 'http://capricorncd.cn/'
  },
  plugins: [
    new htmlWebpackPlugin({
      // 指定文件名
      filename: 'main.html',
      // 模板：项目根目录下路径，context决定
      template: 'index.html',
      // 生成的script标签，插入文档位置
      inject: 'body',
      // 自定义模板参数
      title: 'webpack main.html',
      // html代码压缩
      // minify: {
      //   // 删除注释
      //   removeComments: true,
      //   // 删除空格
      //   collapseWhitespace: true
      // },
      // 指定需要加载的chunk
      chunks: ['main', 'page1']
      // 排除不需要加载的chunk
      // excludeChunks: ['page2']
    }),
    new htmlWebpackPlugin({
      filename: 'page1.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack page1.html',
      chunks: ['page1']
      // excludeChunks: ['main', 'page2']
    }),
    new htmlWebpackPlugin({
      filename: 'page2.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack page2.html',
      chunks: ['page2']
      // excludeChunks: ['main', 'page']
    })
  ]
}
