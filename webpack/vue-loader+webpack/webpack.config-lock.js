/**
 * Created by capricorncd 2018/1/23
 * https://github.com/capricorncd
 */
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

let config = {
  target: "web",
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   include: path.resolve(__dirname, 'src'),
      //   loader: 'babel-loader',
      //   query: {
      //     presets: ['env']
      //   }
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: function (loader) {
          //       return [
          //         require('autoprefixer')()
          //       ]
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader'
            // options: {}
          }
        ]
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader'
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // 小于limit的图片，将转换为base64数据
              limit: 2048,
              // 大于limit的文件，将按文件形式保存到项目指定目录
              name: 'img/[name]-[hash:8].[ext]'
            }
          }
          // 压缩图片
          // 'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    // 项目中任何js都可以调用DefinePlugin配置参数
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new htmlWebpackPlugin()
    // new htmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: 'body',
    //   title: 'Webpack Test HomePage'
    // })
  ]
}

if (isDev) {
  // source map
  config.devtool = '#cheap-module-eval-source-map'
  // devServer
  config.devServer = {
    port: 9001,
    host: '0.0.0.0',
    // 网页上显示错误信息
    overlay: {
      errors: true
    },
    // 可以映射单页应用未指定的路由，跳转至指定页面
    // historyFallback: {},
    // open: true,
    hot: true
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
