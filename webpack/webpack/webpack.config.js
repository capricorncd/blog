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
        //   path.resolve(__dirname, 'app/styles'),
        //   path.resolve(__dirname, 'vendor/styles')
        // ],
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader!less-loader'
        use: [
          'style-loader',
          // 'css-loader',
          // 解决@import '*.css'
          {
            loader: 'css-loader',
            options: {
              // modules: true, // 将修改.class名称为模块名称
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: function (loader) {
                return [
                  // require('postcss-import')({ root: loader.resourcePath }),
                  // require('postcss-cssnext')(),
                  require('autoprefixer')()
                  // require('cssnano')()
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          'postcss-loader',
          'less-loader'
        ]
        // error
        // loader: 'style-loader!css-loader?importLoaders=1!postcss-loader!less-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   query: {
      //     name: 'img/[name]-[hash:8].[ext]'
      //   }
      // },
      // {
      //   test: /\.(png|jpg|gif|svg)$/i,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 20480,
      //     name: 'img/[name]-[hash:8].[ext]'
      //   }
      // },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          'url-loader?limit=20480&name=img/[name]-[hash:8].[ext]',
          // 压缩图片
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      title: 'Webpack Test HomePage'
    })
  ]
}
