/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-18 20:59
 */
import dom from '../dom'
import util from "../util";
/**
 * 初始化不会随传入数据改变，而改变的事件
 * @param $container
 */
export function initSketonEvnent ($container) {
  const opts = this.options
  // 左右按钮
  const $btnPrev = dom.query('.__prev', $container)
  const $btnNext = dom.query('.__next', $container)
  $btnPrev.addEventListener('click', _ => {
    this.prev()
  })
  $btnNext.addEventListener('click', _ => {
    this.next()
  })

  // close btn
  const $btnClose = dom.query('.zx-mv-close', $container)
  $btnClose.addEventListener('click', _ => {
    this.hide()
  })

  // pagination
  if (opts.showPagination && typeof opts.paginationEvent === 'string') {
    this.$pagination.addEventListener(opts.paginationEvent, e => {
      let $el = e.target
      if ($el.nodeName === 'I') {
        e.stopPropagation()
        let index = util.int(dom.data($el, 'index'))
        if (this.index !== index) {
          this.index = index
          this._setTranslate()
        }
      }
    })
  }

  // thumb
  if (opts.showThumb) {
    this.$thumb.addEventListener('click', e => {
      let $el = e.target
      // console.log($el)
      if ($el.nodeName === 'IMG' || $el.className.indexOf('__item') >= 0) {
        e.stopPropagation()
        let index = util.int(dom.data($el, 'index'))
        if (this.index !== index) {
          this.index = index
          this._setTranslate()
        }
      }
    })
  }

  // close on click mask
  if (opts.closeOnClickMask) {
    this.$wrapper.addEventListener('click', e => {
      let $el = e.target
      // console.log($el)
      if ($el.className.indexOf('__item') >= 0) {
        this.hide()
      }
    })
  }

  // keyboard
  window.addEventListener('keyup', e => {
    if (!this.visible) return
    // key code
    let keyCode = e.keyCode
    // console.log(keyCode)
    // 阻止方向键移动元素或滚动条
    e.preventDefault()
    // prev
    if (keyCode === 37) {
      this.prev()
    }
    // next
    if (keyCode === 39) {
      this.next()
    }
    // colse
    if (keyCode === 27) {
      this.hide()
    }
  })

  // window resize
  window.addEventListener('resize', _ => {
    // 重置元素位置、尺寸
    this._resetItemsPostion()
  })
}
