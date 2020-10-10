# Nuxt.js

创建及配置：创建文件，自动会生产相应配置项。

https://zh.nuxtjs.org

v2.3.x

* 概述

支持：

```
Vue 2
Vue Router
Vuex
Vue server Renderer
vue-meta
```

* 工作流

https://zh.nuxtjs.org/guide

![Nuxt.js](https://zh.nuxtjs.org/nuxt-schema.png)


### # 安装

https://github.com/nuxt-community/koa-template

This is a project template for vue-cli.

```
vue init nuxt-community/koa-template <project-name>
cd <project-name> # move to your project
npm install # or yarn install*[see note below]
```

package.json

```
{
  "name": "nuxt",
  "version": "1.1.0",
  "description": "Nuxt.js project",
  "author": "capricorncd <1355952333@qq.com>",
  "private": true,
  "scripts": {
    "dev": "backpack dev",
    "build": "nuxt build && backpack build",
    "start": "cross-env NODE_ENV=production node build/main.js",
    "precommit": "npm run lint",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
  },
  "dependencies": {
    "cross-env": "^5.0.1",
    "koa": "^2.4.1",
    "nuxt": "^2.3.4",
    "source-map-support": "^0.4.15"
  },
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "backpack-core": "^0.7.0",
    "eslint": "^5.10.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-loader": "^2.1.1",
    "eslint-plugin-html": "^3.2.2",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-node": "^4.2.2",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^3.0.1",
    "nodemon": "^1.11.0",
    "scmp": "^2.0.0"
  }
}
```

### # 路由&示例

见`./demo/nuxt/server/interface/region.js`

[DEMO](./demo/nuxt/server/interface/region.js)

### # 页面模板&示例

见`./demo/nuxt/layouts` & `./demo/nuxt/pages`

### # 异步数据&示例

见`./demo/nuxt/pages/test.vue`

asyncData & fetch

* asyncData 主要用于获取/处理组件数据

* fetch 主要配合store使用

### # Vuex应用&示例

https://zh.nuxtjs.org/guide/vuex-store

见`./demo/nuxt/store`


### # Vue SSR工作原理

* SSR概述

* SSR实现的原理

* Vue SSR的渲染流程

### # npx create-nuxt-app

```
npx create-nuxt-app project-name
```

