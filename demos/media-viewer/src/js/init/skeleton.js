/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-18 20:27
 */
import dom from '../dom'
import util from '../util'
import broadcast from '../broadcast'
import { initSketonEvnent } from './skeleton-event'

// 缩略图样式名
// 根据显示位置定
// const THUMB_CLASSNAME = {
//   top: 'horizontal',
//   bottom: 'horizontal',
//   left: 'vertical',
//   right: 'vertical'
// }
/**
 * 初始化DOM骨架
 * @param opts
 * @param list
 */
export function initSkeleton (opts) {
  // max z-index in document
  let MaxZindex = util.getMaxZindex() + 1
  // thumb position
  let thumbPosition = opts.thumbPosition === 'top' ? 'top' : 'bottom'
  // pagination position，与thumb position 相反
  let paginationPosition = opts.showThumb ? (thumbPosition === 'top' ? 'bottom' : 'top') : 'bottom'
  const vnode = {
    tag: 'div',
    attrs: {
      class: 'zx-media-viewer-container',
      style: `display:none;z-index:${MaxZindex}`
    },
    child: [
      // 图片列表容器
      {
        tag: 'div',
        attrs: {
          class: 'zx-media-viewer-wrapper'
        }
      },
      {
        tag: 'div',
        attrs: {
          class: `zx-mv-thumb-wrapper __${thumbPosition}`,
          style: `display:${opts.showThumb ? '' : 'none'};${thumbPosition}:5px;`
        },
        child: [
          {
            tag: 'div',
            attrs: {
              class: `__inner`
            }
          }
        ]
      },
      // pagination
      {
        tag: 'div',
        attrs: {
          class: 'zx-mv-pagination-wrapper',
          style: `display:${opts.showPagination ? '' : 'none'};${paginationPosition}:20px;`
        }
      },
      // 关闭按钮
      {
        tag: 'div',
        attrs: {
          class: 'zx-mv-close'
        }
      },
      // prew 按钮
      {
        tag: 'div',
        attrs: {
          class: 'zx-mv-arrow __prev'
        }
      },
      // next 按钮
      {
        tag: 'div',
        attrs: {
          class: 'zx-mv-arrow __next'
        }
      }
    ]
  }
  // container
  const $container = dom.create(vnode)
  // append $container to body
  if (!dom.appendToBody($container)) {
    broadcast.emit('error', {
      code: 1,
      message: 'Append element $container to body failed'
    })
  }
  this.$container = $container
  // media-list-wrapper
  this.$wrapper = dom.query('.zx-media-viewer-wrapper', $container)
  // thumb-list-wrapper
  this.$thumb = dom.query('.zx-mv-thumb-wrapper', $container)
  // pagination-wrapper
  this.$pagination = dom.query('.zx-mv-pagination-wrapper', $container)
  // 初始化事件
  initSketonEvnent.call(this, $container)
}
