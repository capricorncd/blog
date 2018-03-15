/**
 * Created by zx1984 2018/1/20
 * https://github.com/zx1984
 */
module.exports = {
  entry: {
    animation: './src/animation.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'animation',
    libraryTarget: 'umd'
  }
}
