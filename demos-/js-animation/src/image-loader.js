/**
 * Create by Capricorncd
 * https://github.com/capricorncd
 */
'use strict'

/**
 * 预加载图片
 * @param imgs
 * @param callback
 * @param timeout
 * @constructor
 */
function ImageLoader (imgs, callback, timeout) {
  var count = 0
  var success = true
  var timer = 0
  var isTimeout = false

  for (var key in imgs) {
    // 过滤prototype上的属性
    if (!imgs.hasOwnProperty(key)) {
      continue
    }
    // 获取每个图片元素
    // 期望格式是个object: {src: xxx}
    var item = imgs[key]
    if (typeof item === 'string') {
      item = imgs[key] = {
        src: item
      }
    }
    // 格式不满足，丢弃此条数据
    if (!item || !item.src) {
      continue
    }

    count++
    // 设置图片元素id
    item.id = '__img__' + key + getId()
    // 设置图片元素的img，它是一个Image对象
    item.img = window[item.id] = new Image()

    doLoad(item)
  }

  // 遍历完成如果计数为0，则直接调用callback
  if (!count) {
    callback(success)
  } else if (timeout) {
    timer = setTimeout(onTimeout, timeout)
  }

  /**
   * 真正进行图片加载的函数
   * @param item 图片元素对象
   */
  function doLoad (item) {
    item.status = 'loading'
    var img = item.img

    img.onload = function () {
      success = success & true
      item.status = 'loaded'
      done()
    }

    img.onerror = function () {
      success = false
      item.status = 'error'
      done()
    }

    // 发起了一个http(s)请求
    img.src = item.src

    /**
     * 每张图片加载完成的回调函数
     */
    function done () {
      img.onload = img.onerror = null
      try {
        delete window[item.id]
      } catch (e) {}

      // 每张图片加载完成，计数器减一，当所有图片加载完成且没有超时的情况
      // 清除超时计时器，其执行回调函数
      if (!--count && !isTimeout) {
        clearTimeout(timer)
        callback(success)
      }
    }
  }

  /**
   * 超时函数
   */
  function setTimeout () {
    isTimeout = true
    callback(false)
  }
}


var __id = 0
function getId () {
  return ++__id
}

module.exports = ImageLoader
