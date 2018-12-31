/**
 * Created by Capricorncd 2018/4/5
 * https://github.com/capricorncd
 */
const path = require('path')

module.exports = {
  entry: {
    'clip-image': [path.resolve(__dirname, 'src/js/clip-image.js')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
