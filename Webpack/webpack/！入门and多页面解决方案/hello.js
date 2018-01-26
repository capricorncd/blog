/**
 * Created by Capricorncd 2018/1/23
 * https://github.com/capricorncd
 */
'use strict';

var world = require('./world')
// require('style-loader!css-loader!./style.css')
/**
 * bash
 * webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader'
 */
require('./style.css')

function Hello (str) {
  console.log(str + world('World!!!!!'))
}

Hello('Hello ')
