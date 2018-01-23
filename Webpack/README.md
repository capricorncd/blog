# webpack

英文官网：http://webpack.github.io/

## # js代码编译

hello.js

```javascript
var world = require('./world')

function Hello (str) {
  console.log(str + world('World!'))
}

Hello('Hello ')
```

world.js

```javascript
function World(str) {
  return str
}

module.exports = World
```

命令行中执行：`webpack hello.js hello.bundle.js`

```javascript
// 请打开hello.bundle.js文件查看效果
```

## # 引入样式

style.css

```css
html, body {
  margin: 0;
  padding: 0;
}

body {
  background-color: coral;
}
```

需安装相应loader

```bash
npm install css-loader style-loader --save-dev
```

hello.js

```javascript
require('style-loader!css-loader!./style.css')
function Hello (str) {
  console.log(str)
}

Hello('Hello World!')
```

命令行中执行：`webpack hello.js hello.bundle.js`

```javascript
// 请打开hello.bundle.js文件查看效果
```

或者：

hello.js

```javascript
require('./style.css')
function Hello (str) {
  console.log(str)
}

Hello('Hello World!')
```

命令行中执行：

`webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader`

新建index.html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Webpack Test</title>
</head>
<body>

<script src="./hello.bundle.js"></script>
</body>
</html>
```

```javascript
// 请在浏览器中打开index.html文件查看效果
```

## 监控修改，实时编译

```bash
webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader --watch
```

#### # entry

webpack.config.js

```javascript
// String
module.exports = {
  entry: './src/js/main.js'
}

// or Array
module.exports = {
  entry: ['./src/js/main.js', './src/js/page1.js']
}

// or Object
module.exports = {
  entry: {
    'main': './src/js/main.js',
    'page1': './src/js/page1.js'
  }
}
```

#### # output

```javascript
module.exports = {
  entry: {
    'main': './src/js/main.js',
    'page1': './src/js/page1.js'
  },
  output: {
    path: __dirname + '/dist/js',
    // [name] 对应entry对象key值
    // [hash] 每次打包的版本号
    // [chunkhash] 文件的MD5值，当文件内容改变时chunkhash才会改变
    filename: '[name].[chunkhash].js'
  }
}
```

## html-webpack-plugin

https://www.npmjs.com/package/html-webpack-plugin

webpack.config.js

```javascript
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'main': './src/js/main.js'
  },
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.[chunkhash].js'
  },
  plugins: [
    new htmlWebpackPlugin()
  ]
}
```

#### # bug

` Cannot find module 'webpack/lib/node/NodeTemplatePlugin'`

项目中为安装webpack，只在全局中安装了。解决方法，项目根目录中执行

```bash
  npm install webpack --save-dev
```

再执行webpack，编辑结果：

dist/js/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script type="text/javascript" src="bundle.2781f2de29a504c79e7f.js"></script>
  </body>
</html>
```

#### # html-webpack-plugin修改参数后

```javascript
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html' // 项目根目录下路径，context决定
    })
  ]
```

dist/js/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Webpack Test</title>
</head>
<body>
  <script src="bundle.js"></script>
  <script type="text/javascript" src="bundle.2781f2de29a504c79e7f.js"></script>
</body>
</html>
```

## 在html文档不同位置引入js

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title><%= htmlWebpackPlugin.options.title %></title>
  <script src="<%= htmlWebpackPlugin.files.chunks.main.entry %>"></script>
</head>
<body>
  <script src="<%= htmlWebpackPlugin.files.chunks.page1.entry %>"></script>
</body>
</html>
```

webpack.config.js

```javascript
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'main': './src/js/main.js',
    'page1': './src/js/page1.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].[chunkhash].js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      // 生成的script标签，插入文档位置
      inject: false,
      // 自定义模板参数
      title: 'webpack 指定js插入位置'
    })
  ]
}
```

运行webpack结果

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>webpack 指定js插入位置</title>
  <script src="js/main.d0f6ae5b02025dc3baeb.js"></script>
</head>
<body>
  <script src="js/page1.9e95b500e60a34d7f3b6.js"></script>
</body>
</html>
```

#### # html代码压缩

```javascript
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      inject: false,
      title: 'webpack test',
      // html代码压缩
      minify: {
        // 删除注释
        removeComments: true,
        // 删除空格
        collapseWhitespace: true
      }
    })
  ]
```

## 生成多页面的html

webpack.config.js

#### # chunks: 需要加装的chunk，指定需要加载的chunk

```javascript
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
    publicPath: 'http://zx1984.cn/'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'main.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack main.html',
      chunks: ['main', 'page1']
    }),
    new htmlWebpackPlugin({
      filename: 'page1.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack page1.html',
      chunks: ['page1']
    }),
    new htmlWebpackPlugin({
      filename: 'page2.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack page2.html',
      chunks: ['page2']
    })
  ]
}
```

#### # excludeChunks: 排除指定chunk，加载其他chunk

```javascript
  plugins: [
    new htmlWebpackPlugin({
      filename: 'main.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack main.html',
      excludeChunks: ['page2']
    }),
    new htmlWebpackPlugin({
      filename: 'page1.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack page1.html',
      excludeChunks: ['main', 'page2']
    }),
    new htmlWebpackPlugin({
      filename: 'page2.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack page2.html',
      excludeChunks: ['main', 'page1']
    })
  ]
```

## 把部分脚本直接写入html文件，减少http请求

https://github.com/jantimon/html-webpack-plugin

// 官方解决方案

https://github.com/jantimon/html-webpack-plugin/blob/master/examples/inline/template.jade

index.html(template)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title><%= htmlWebpackPlugin.options.title %></title>
  <script>
    <%=
      compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source()
    %>
  </script>
</head>
<body>
  <% for (var key in htmlWebpackPlugin.files.chunks) {%>
    <% if (key !== 'main') { %>
      <script src="<%= htmlWebpackPlugin.files.chunks[key].entry %>"></script>
    <% } %>
  <% } %>
</body>
</html>
```

## loader

https://webpack.js.org/concepts/loaders/

* require() 中使用

  Inline: Specify them explicitly in each import statement.

* CLI (命令行)中使用

  CLI: Specify them within a shell command.

* 配置文件中使用

  Configuration (recommended): Specify them in your webpack.config.js file.

## babel-loader

* Babel is a JavaScript compiler.

  http://babeljs.io/

* webpack

  http://babeljs.io/docs/setup/#installation

  ```bash
  npm install --save-dev babel-loader babel-core
  ```

* 三种配置方式

  http://babeljs.io/docs/plugins/preset-env/

  ```bash
  npm install babel-preset-env --save-dev
  ```

  package.json

  ```json
  {
    "bable": {
      "presets": ["env"]
    },
  }
  ```

* webpack.config.js

  ```javascript
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
  ```

## css-loader


