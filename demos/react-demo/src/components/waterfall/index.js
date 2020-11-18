/**
 * Created by Capricorncd.
 * Date: 2019/02/14 15:08
 * https://github.com/capricorncd
 */
const DEFAULT_OPTS = {
  // 外容器
  wrapper: null,
  // 子元素选择器
  itemSelector: '',
  // 元素间距
  gutter: 20,
  itemWidth: 300
}

class Waterfall {
  constructor (opts) {
    this.opts = Object.assign({}, DEFAULT_OPTS, opts)
    // 数据列表
    this.list = []
    this.init()
    addEvent(window, 'resize', this.resetPosition.bind(this))
  }

  init () {
    let opts = this.opts
    if (!isElement(opts.wrapper)) {
      throw new Error(`瀑布流外容器非DOM元素`)
    }
    opts.wrapper.style.position = 'relative'
    // 获取容器Rect信息
    let wrapperBox = opts.wrapper.getBoundingClientRect()
    // App.log(wrapperBox.width)
    // 可列数
    let columnNum = Math.floor(wrapperBox.width / (opts.itemWidth + opts.gutter))
    // 元素实际宽度
    this.itemWidth = (wrapperBox.width - (columnNum + 1) * opts.gutter) / columnNum
    // 列数组
    this.columns = Array(columnNum)
    this.columns.fill(0, 0)
    // App.log(this.columns, this.itemWidth)
  }

  setData (arr) {
    // 元素添加完成后，重新计算位置
    if (Array.isArray(arr) && arr.length) {
      let oldLen = this.list.length
      this.list = this.list.concat(arr)
      this._setPosition(oldLen)
    }
  }

  resetPosition () {
    this.init()
    this._setPosition(0)
  }

  _setPosition (start) {
    let opts = this.opts
    // 间距
    let gutter = opts.gutter
    // 获取当前容器内子元素
    let childs = opts.wrapper.querySelectorAll(opts.itemSelector)
    for (let i = start; i < this.list.length; i++) {
      let $item = childs[i]
      if (!$item) continue
      $item.style.width = this.itemWidth + 'px'
      $item.style.position = 'absolute'
      $item.style.display = 'inline-block'
      let itemHeight = $item.offsetHeight
      // 获取列高度的最小值
      let min = Math.min.apply(null, this.columns)
      let index = this.columns.findIndex(i => i === min)
      // 设置$item位置
      $item.style.top = `${min + gutter}px`
      $item.style.left = `${(this.itemWidth + gutter) * index + gutter}px`
      // 重置瀑布流当前列高度值
      this.columns[index] = min + itemHeight + gutter
      // 设置/更新容器最新高度
      opts.wrapper.style.minHeight = Math.max.apply(null, this.columns) + gutter + 'px'
    }
  }

  clearList () {
    this.list = []
    this.init()
  }

  /**
   * 预加载媒体元素
   * @param arr
   */
  loadMedia (arr) {
    return new Promise(resolve => {
      if (Array.isArray(arr) && arr.length) {
        let len = arr.length
        let count = 0
        arr.forEach(url => {
          loadImage(url, _ => {
            count++
            if (len === count) resolve()
          })
        })
      } else {
        resolve()
      }
    })
  }
}

function loadImage (url, count) {
  let $el = createElm('img', {src: url})
  $el.onload = count
  $el.onerror = count
}

function addEvent ($el, eventType, fn) {
  $el.addEventListener(eventType, fn)
}

function createElm (tag, props) {
  const $el = document.createElement(tag)
  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      $el.setAttribute(key, props[key])
    }
  }
  return $el
}

function isElement ($el) {
  return $el && $el.nodeType === 1
}

export default Waterfall
