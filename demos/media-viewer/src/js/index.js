/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-17 22:08
 */
import dom from './dom'
import util from './util'
import broadcast from './broadcast'
import { loadMedia } from './load-media'
import { initSkeleton } from './init/skeleton'
import { initItemsHtml} from './init/items'
import '../style/index.styl'

// window size
let winWidth = window.innerWidth
let winHeight = window.innerHeight

const DEFAULT_OPTS = {
  // 错误通知
  error () {},
  // 分页mouseover切换图片
  paginationEvent: 'mouseover',
  // 显示分页导航栏
  showPagination: true,
  // 缩略图显示位置
  thumbPosition: 'bottom',
  // 显示缩略图
  showThumb: true,
  // 点击mask空白处，关闭窗口
  closeOnClickMask: true
}

class MediaViewer {
  constructor (opts, list) {
    // options
    this.options = Object.assign({}, DEFAULT_OPTS, opts)
    // listen in error notification
    broadcast.on('error', err => {
      this.options.error(err)
    })
    // broadcast
    this.broadcast = broadcast.broadcast
    // visible
    this.visible = false
    // index
    this.index = 0
    // 初始化骨架
    initSkeleton.call(this, this.options)
    // 初始化元素
    this.resetItems(list)
  }

  /**
   * 初始化数据列表元素
   * @param mediaListArray
   * @private
   */
  resetItems (mediaListArray) {
    // reset options
    // if (util.isObject(opts)) {
    //   let key, val
    //   for (key in DEFAULT_OPTS) {
    //     val = opts[key]
    //     if (val) {
    //       this.options[key] = val
    //     }
    //   }
    // }
    loadMedia(mediaListArray).then(res => {
      this.list = res
      initItemsHtml.call(this, this.list, winWidth, winHeight)
    }).catch(err => {
      this.list = []
      broadcast.emit('error', err)
    })
  }

  /**
   * 重置元素尺寸、位置
   * @private
   */
  _resetItemsPostion () {
    // window size
    winWidth = window.innerWidth
    winHeight = window.innerHeight
    // media list
    const $list = dom.queryAll('.__item', this.$wrapper)
    let i, $item
    for (i = 0; i < $list.length; i++) {
      $item = $list[i]
      $item.style.width = winWidth + 'px'
      $item.style.height = winHeight + 'px'
    }
    // 重新设置$wrapper尺寸、位置
    this.$wrapper.style.width = `${this.list.length * winWidth}px`
    this.$wrapper.style.height = `${winHeight}px`
    this.$wrapper.style.transform = `translateX(-${this.index * winWidth}px)`
  }

  /**
   * prev
   */
  prev () {
    let index = this.index - 1
    this.index = index  < 0 ? this.list.length - 1 : index
    this._setTranslate()
  }

  /**
   * next
   */
  next () {
    let index = this.index + 1
    this.index = index === this.list.length ? 0 : index
    this._setTranslate()
  }

  /**
   * set $wrapper translate
   * @private
   */
  _setTranslate () {
    let opts = this.options
    // handle pagination
    if (opts.showPagination) {
      this._handlePaginationPos()
    }
    // handle thumb
    if (opts.showThumb) {
      this._handleThumbPos()
    }
    // change $wrapper position
    this.$wrapper.style.transform = `translateX(-${winWidth * this.index}px)`
  }

  /**
   * 处理pagination位置
   * @private
   */
  _handlePaginationPos () {
    const $childs = dom.queryAll('i', this.$pagination)
    let i, $item, index
    for (i = 0; i < $childs.length; i++) {
      $item = $childs[i]
      index = util.int(dom.data($item, 'index'))
      if (index === this.index) {
        $item.className = '__current'
      } else {
        $item.className = ''
      }
    }
  }

  /**
   * 处理缩略图位置
   * @private
   */
  _handleThumbPos () {
    const $childs = dom.queryAll('.__item', this.$thumb)
    let i, $item, index
    for (i = 0; i < $childs.length; i++) {
      $item = $childs[i]
      index = util.int(dom.data($item, 'index'))
      if (index === this.index) {
        $item.className = '__item __current'
      } else {
        $item.className = '__item'
      }
    }
  }

  /**
   * show container
   * @param index
   */
  show (index) {
    if (typeof index === 'number' && index >= 0 && index < this.list.length) {
      this.index = index
      this._setTranslate()
    }
    if (!this.visible) {
      broadcast.emit('show')
      this.$container.style.display = ''
      this.visible = true
      dom.lock()
    }
  }

  /**
   * hide container
   */
  hide () {
    if (this.visible) {
      broadcast.emit('close')
      this.$container.style.display = 'none'
      this.visible = false
      dom.unlock()
    }
  }

  /**
   * 查看media文件
   * @param index 查看内容的索引值
   * @param arr 新的媒体url数组
   */
  view (index, arr) {
    this.index = util.int(index)
    if (arr && Array.isArray(arr)) {
      this.resetItems(arr)
    }
    this.show(index)
  }
}

MediaViewer.prototype.on = broadcast.on
MediaViewer.prototype.off = broadcast.off
MediaViewer.prototype.emit = broadcast.emit

export { MediaViewer }
