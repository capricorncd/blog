/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-17 22:08
 */
const util = {
  /**
   * 获取最大的z-index值
   * @returns {*}
   */
  getMaxZindex () {
    const els = document.getElementsByTagName('*')
    let el, css, zindex
    let arr = []
    for (let i = 0; i < els.length; i++) {
      el = els[i]
      if (el.nodeType !== 1) continue
      css = util.getStyleValue(el) || {}
      if (css.position !== 'static') {
        zindex = util.toNumber(css.zIndex)
        if (zindex > 0) arr.push(zindex)
      }
    }
    return Math.max.apply(null, arr) >>> 0
  },

  /**
   * 获取el样式属性值
   * @param el 必须
   * @param attr 可选参数，指定的某一个样式属性名
   * @returns {*} 返回样式attr值，或el的样式对象
   */
  getStyleValue (el, attr) {
    if (!util.isHTMLElement(el)) return null
    let css = getComputedStyle(el, null)
    let result = null
    if (attr) {
      try {
        result = css[util.toHumpStr(attr)]
      } catch (e) {}
    } else {
      result = css
    }
    return result
  },

  /**
   * 转为为整型
   * @param n
   * @returns {*}
   */
  int (n) {
    let m = parseInt(n)
    return isNaN(m) ? 0 : m
  },

  /**
   * Android device
   * @returns {boolean}
   */
  isAndroid () {
    return !!navigator.userAgent.match(/(Android)\s+([\d.]+)/)
  },

  /**
   * 是否为数组
   * @param arr
   * @returns {boolean}
   */
  isArray (arr) {
    return Array.isArray(arr)
  },

  /**
   * 是否为函数
   * @param fn
   * @returns {*|boolean}
   */
  isFunction (fn) {
    return fn && typeof fn === 'function'
  },

  /**
   * 判断是否为HTML元素对象
   * @param $el
   * @returns {*|boolean}
   */
  isHTMLElement ($el) {
    return $el && $el instanceof HTMLElement
  },

  /**
   * iphone device
   * @returns {boolean}
   */
  isIphone () {
    const ua = navigator.userAgent
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
    return !ipad && !!ua.match(/(iPhone\sOS)\s([\d_]+)/)
  },

  /**
   * 是否为ie9及以下版本ie浏览器
   * @returns {*|boolean}
   */
  isLeIE9 () {
    const ua = navigator.userAgent
    let version = null
    if (/MSIE (\d+)\./i.test(ua)) {
      version = RegExp.$1
    }
    return version && +version <= 9
  },


  /**
   * 是否为移动端设备
   * @returns {boolean}
   */
  isMobile () {
    return util.isIphone() || util.isAndroid()
  },

  /**
   * 是否为对象
   * @param o
   * @returns {*|boolean}
   */
  isObject (o) {
    return o && !util.isArray(o) && !util.isFunction(o) && !util.isHTMLElement(o) && o instanceof Object
  },

  /**
   * 转换为数组
   * @param arr
   * @returns {*}
   */
  slice (arr) {
    return Array.prototype.slice.call(arr)
  },

  /**
   * 将字符串转换为驼峰写法
   * 比如：z-index => zIndex
   * @param attr
   * @param spacer
   * @returns {*}
   */
  toHumpStr (attr, spacer = '-') {
    if (typeof attr !== 'string') {
      attr = attr.toString()
    }
    const arr = attr.split(spacer)
    const len = arr.length
    if (len <= 1) return attr
    // 不考虑有前缀的属性-webkit-flex
    let str = arr[0]
    for (let i = 1; i < len; i++) {
      str += arr[i].toUpperCase()[0] + arr[i].substr(1)
    }
    return str
  },

  /**
   * 转换为小写
   * @param s
   * @returns {string}
   */
  toLower (s) {
    return typeof s === 'string' ? s.toLowerCase() : s
  },

  /**
   * 转为数字
   * @param n
   * @returns {*}
   */
  toNumber (n) {
    let m = parseFloat(n)
    return isNaN(m) ? 0 : m
  },

  /**
   * 转换为大写
   * @param s
   * @returns {string}
   */
  toUpper (s) {
    return typeof s === 'string' ? s.toUpperCase() : s
  },

  /**
   * 去首尾空格
   * @param s
   * @returns {*}
   */
  trim (s) {
    return s ? s.replace(/^\s*|\s*$/g, '') : ''
  }

}

export default util
