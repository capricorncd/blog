/**
 * Created by Capricorncd 2018/1/23
 * https://github.com/capricorncd
 */
'use strict';
import './css/common.css'
import Layer from './components/layer/layer'

const App = function () {
  const dom = document.getElementById('app')
  const layer = new Layer()
  dom.innerHTML = layer.tpl({
    name: 'Hello',
    arr: ['aaaa', 'bbbbbb', 'ccccccccccccccccccc']
  })
}

new App()
