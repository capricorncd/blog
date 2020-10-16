Static Resource Server

## 项目初始化

### # Git

https://git-scm.com

### # .gitignore

https://git-scm.com/docs/gitignore

* 匹配模式前`/`代表项目根目录

* 匹配模式最后加`/`代表目录

* 匹配模式前加`!`代表取反

* `*` 代表任意个字符

* `?` 匹配任意一个字符

* `**` 匹配多级目录

### # .npmigonre

https://docs.npmjs.com/misc/developers

```
.npmignore files follow the same pattern rules as .gitignore files:

Blank lines or lines starting with # are ignored.
Standard glob patterns work.
You can end patterns with a forward slash / to specify a directory.
You can negate a pattern by starting it with an exclamation point !.
By default, the following paths and files are ignored, so there’s no need to add them to .npmignore explicitly:

.*.swp
._*
.DS_Store
.git
.hg
.npmrc
.lock-wscript
.svn
.wafpickle-*
config.gypi
CVS
npm-debug.log
```

```
The following paths and files are never ignored, so adding them to .npmignore is pointless:

package.json
README (and its variants)
CHANGELOG (and its variants)
LICENSE / LICENCE
```

### # IDE .editorconfig

https://editorconfig.org

### # 语法检测 ESlint

https://cn.eslint.org

https://eslint.org

* .eslintrc.js

* .eslintignore

### # package.json

https://docs.npmjs.com/files/package.json

## 静态资源服务器

https://nodejs.org/dist/latest-v11.x/docs/api/http.html

```
// https://nodejs.org/en/about/
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### # handlebars

http://handlebarsjs.com

```
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
```



