/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 18:12
 */
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const argsArr = process.argv.slice(2)

console.log(argsArr)

const isProd = argsArr.includes('production')

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: resolve(__dirname, './src/index.js')
  },
  output: {
    path: resolve(__dirname, '../../dist/web-audio'),
    filename: '[name].js'
  },
  externals: {
    // react: 'React',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
        // commons: {
        //   chunks: "initial",
        //   minChunks: 2,
        //   maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //   minSize: 0 // This is example is too small to create commons chunks
        // },
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
    extensions: ['.js', '.vue', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '~': resolve('./')
    }
  },
  module: {
    rules: [
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
      },
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
      },
      {
        test: /\.(obj|stl|mtl)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/file/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
    // https://github.com/danethurber/webpack-manifest-plugin
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
    // https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
    devServer: {
      // BrowserRouter时，解决react-router刷新页面后 cannot GET *url*问题
      // historyApiFallback: true,
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
