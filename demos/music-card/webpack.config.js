/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 18:12
 */
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const argsArr = process.argv.slice(2)

console.log(argsArr)

const isProd = argsArr.includes('production')

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: resolve(__dirname, './src/index.js')
  },
  output: {
    path: resolve(__dirname, '../../dist/music-card'),
    filename: '[name].js'
  },
  externals: {
    // vue: 'Vue',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '~': resolve('./')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.sc|ass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                resolve(__dirname, './assets/scss/mixin.scss')
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // https://www.npmjs.com/package/webp-loader
      {
        test: /\.(pne?g|jpe?g|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
  ]
}

let webpackConfig
if (isProd) {
  webpackConfig = merge(baseConfig, {
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{
          // 后期增加过滤，不同的项目可能static中需要的内容不一样
          from: resolve(__dirname, './static'),
          to: 'static'
          // ignore: ['.*']
        }],
        options: {
          concurrency: 100
        }
      })
    ]
  })
} else {
  webpackConfig = merge(baseConfig, {
    devServer: {
    },
    plugins: [
      // https://www.npmjs.com/package/eslint-webpack-plugin
      new EslintWebpackPlugin({
        extensions: ['js', 'vue'],
        fix: true
      })
    ]
  })
}

module.exports = webpackConfig
