/**
 * Created by zx1984 2018/1/23
 * https://github.com/zx1984
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
