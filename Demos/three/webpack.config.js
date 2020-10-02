/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 18:12
 */
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argsArr = process.argv.slice(2)

console.log(argsArr)

const isProd = argsArr.includes('production')

const baseConfig = {
  entry: {
    main: resolve(__dirname, './src/index.jsx'),
  },
  output: {
    path: resolve(__dirname, '../../docs'),
    filename: '[name].js'
  },
  externals: {
    react: 'React',
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
          chunks: "initial",
          name: "vendor",
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
      },
      {
        test: /\.jpe?g|pne?g|svg$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    // https://github.com/danethurber/webpack-manifest-plugin
  ]
}

let webpackConfig
if (isProd) {
 webpackConfig = merge(baseConfig, {})
} else {
  webpackConfig = merge(baseConfig, {
    // https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
    devServer: {
      // 解决react-router刷新页面后 cannot GET *url*问题
      historyApiFallback: true,
    },
  })
}

module.exports = webpackConfig
