/**
 * Created by Capricorncd
 * https://github.com/capricorncd
 * 2018-10-18 21:42
 */
import util from '../util'
import dom from '../dom'
const TYPES = {
  1: 'img',
  2: 'video',
  3: 'audio'
}

function createMediaHtml (item) {
  let str
  switch (item.type) {
    case 2:
      str = `<video src="${item.url}" controls></video>`
      break
    case 3:
      str = `<audio src="${item.url}" controls></audio>`
      break
    default:
      str = `<img src="${item.url}">`
  }
  return str
}

/**
 * 初始化元素html
 * @param list
 * @param winWidth
 * @param winHeight
 */
export function initItemsHtml (list, winWidth, winHeight) {
  let opts = this.options
  // media 列表
  let itemsHtml = ''
  // thumb 图列表
  let thumbsHtml = ''
  // pagination
  let pageHtml = ''
  let pageWidth = util.int(100 / list.length)
  // 数据列表
  let tag, currentClass, errorClass
  list.forEach((item, index) => {
    // tag
    tag = TYPES[item.type]
    // currentClass
    currentClass = index === this.index ? '__current' : ''
    // errorClass
    errorClass = item.error ? 'is-error' : ''
    // itemsHtml
    itemsHtml += `<div class="__item is-${tag} ${errorClass}" style="width:${winWidth}px;height:${winHeight}px;">${createMediaHtml(item)}</div>`
    // thumbsHtml
    thumbsHtml += `<div class="__item ${currentClass}" data-index="${index}"><img data-index="${index}" src="${item.thumb}"></div>`
    // pageHtml
    pageHtml += `<i class="cur ${currentClass}" data-index="${index}" style="width:${pageWidth}%"></i>`
  })

  this.$wrapper.innerHTML = itemsHtml
  // thumb
  if (opts.showThumb) {
    const $thumbInnerWrapper = dom.query('.__inner', this.$thumb)
    $thumbInnerWrapper.innerHTML = thumbsHtml
  }
  // pagination
  if (opts.showPagination) {
    this.$pagination.innerHTML = pageHtml
  }
  // 重新设置$wrapper尺寸、位置
  this.$wrapper.style.width = `${list.length * winWidth}px`
  this.$wrapper.style.height = `${winHeight}px`
  this.$wrapper.style.transform = `translateX(-${this.index * winWidth}px)`
}
