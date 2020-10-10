/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-05 16:29
 */
import Vue from 'vue'
// import App from '~/assets/libs/app.min'
// import '~/assets/libs/swiper.min'
// import '~/assets/libs/swiper.min.css'
import '~/assets/scss/index.scss'
import AppComponent from './components/App'

// window.App = App

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(AppComponent)
})
