/**
 * Created by zx1984 2018/1/26
 * https://github.com/zx1984
 */

import Vue from 'vue'
import App from './app.vue'

// import './assets/style/test.css'
import './assets/style/test.styl'
import './assets/img/pic.jpg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
