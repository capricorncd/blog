/**
 * Created by zx1984 2018/4/5
 * https://github.com/zx1984
 */
import util, {$, log} from './util'
import '../style/index.less'

// 禁止图片被选中
document.onselectstart = new Function('event.returnValue=false')

const $container = $('.clip-wrapper')
const CLIP_MAX_SIZE = {
  width: $container.offsetWidth,
  height: $container.offsetHeight,
  top: util.getPostion($container).top,
  left: util.getPostion($container).left
}
// 裁剪框最小尺寸
const CLIP_MIN_SIZE = {
  width: 20,
  height: 20
}

// log(CLIP_MAX_SIZE, CLIP_MIN_SIZE)

// clip各点简写
const POINT_NORTH_WEST = 'nw'
const POINT_NORTH = 'n'
const POINT_NORTH_EAST = 'ne'
const POINT_EAST = 'e'
const POINT_SOUTH_EAST = 'se'
const POINT_SOUTH = 's'
const POINT_SOUTH_WEST = 'sw'
const POINT_WEST = 'w'
// 当前点击的点
let currentPoint;

// 裁剪框
const $clip = $('.clip-point-wrapper')
// 裁剪框触点
const $clipPoints = $clip.querySelectorAll('.point-item')
// const $picMask = $('.pic-mask')
const $picClip = $('.pic-clip')
// 预览容器
const $clipView = $('.clip-preview-wrapper')
const $picView = $('.pic-view')

// 鼠标是否按下
let isMouseDown = false

// 鼠标移动距离
let mouseDownX = 0
let mouseDownY = 0

let mouseMoveX = 0
let mouseMoveY = 0

// 裁剪框初始尺寸
let clipBeforeWidth = $clip.offsetWidth
let clipBeforeHeight = $clip.offsetHeight
let clipBeforeTop = $clip.offsetTop
let clipBeforeLeft = $clip.offsetLeft

// 移动裁剪框
const TYPE_MOVE_CLIP = 1
// 调整裁剪框尺寸
const TYPE_RESIZE_CLIP = 2
// 裁剪框状态
let ctrlType = null

// 松开鼠标
window.onmouseup = function (e) {
  isMouseDown = false
  mouseMoveX = 0
  mouseMoveY = 0
}

// 边界判断
// 校验宽高
function checkSize (size, type) {
  if (size >= CLIP_MAX_SIZE[type]) {
    size = CLIP_MAX_SIZE[type]
  } else if (size <= CLIP_MIN_SIZE[type]) {
    size = CLIP_MIN_SIZE[type]
  }
  return size
}
// 校验位置
function checkPosition (size, type) {
  let prop = type === 'top' ? 'height' : 'width'
  if (size <= 0) {
    size = 0
  } else if (size + CLIP_MIN_SIZE[prop] >= CLIP_MAX_SIZE[prop]) {
    size = CLIP_MAX_SIZE[prop] - CLIP_MIN_SIZE[prop]
  }
  return size
}

// 新的宽高, 新的左上偏移
let width, height, top, left
function moveNorth () {
  height = checkSize(clipBeforeHeight - mouseMoveY, 'height')
  top = checkPosition(clipBeforeTop + mouseMoveY, 'top')
  if (top > 0 && height > CLIP_MIN_SIZE.height) {
    $clip.style.top = top + 'px'
    $clip.style.height = height + 'px'
  }
}

function moveEast () {
  width = checkSize(clipBeforeWidth + mouseMoveX, 'width')
  $clip.style.width = width + 'px'
}

function moveSouth () {
  height = checkSize(clipBeforeHeight + mouseMoveY, 'height')
  $clip.style.height = height + 'px'
}

function moveWest () {
  width = checkSize(clipBeforeWidth - mouseMoveX, 'width')
  left = checkPosition(clipBeforeLeft + mouseMoveX, 'left')
  if (left > 0 && width > CLIP_MIN_SIZE.width) {
    $clip.style.width = width + 'px'
    $clip.style.left = left + 'px'
  }
}

// 鼠标位置边界判断
function checkMouseInOuter (e) {
  let w = CLIP_MAX_SIZE.width
  let h = CLIP_MAX_SIZE.height
  let t = CLIP_MAX_SIZE.top
  let l = CLIP_MAX_SIZE.left
  let r = l + w
  let b = t + h
  let x = e.pageX
  let y = e.pageY
  return x < l || x > r || y < t || y > b
}

// 鼠标移动
window.onmousemove = function (e) {
  if (!isMouseDown) return

  // 鼠标移动的位置
  mouseMoveX = e.clientX - mouseDownX
  mouseMoveY = e.clientY - mouseDownY

  // 移动node是否为整个裁剪框
  if (ctrlType === TYPE_MOVE_CLIP) {
    handleMoveClip()
    return
  }
  // 移动裁剪框触点
  // 鼠标位置边界判断
  if (checkMouseInOuter(e)) {
    return
  }

  // 设置样式
  switch (currentPoint) {
    // 西北
    case POINT_NORTH_WEST:
      moveNorth()
      moveWest()
      break
    // 北
    case POINT_NORTH:
      moveNorth()
      break
    // 东北
    case POINT_NORTH_EAST:
      moveNorth()
      moveEast()
      break
    // 东
    case POINT_EAST:
      moveEast()
      break
    // 东南
    case POINT_SOUTH_EAST:
      moveEast()
      moveSouth()
      break
    // 南
    case POINT_SOUTH:
      moveSouth()
      break
    // 西南
    case POINT_SOUTH_WEST:
      moveSouth()
      moveWest()
      break
    // 西
    case POINT_WEST:
      moveWest()
      break
  }
  resieClipMaskSize()
  handlePreview()
}

// 裁剪框各点绑定事件
$clipPoints.forEach(item => {
  item.onmousedown = function (e) {
    e.stopPropagation()
    resetParams(e, TYPE_RESIZE_CLIP)
  }
})

$clip.onmousedown = function (e) {
  e.stopPropagation()
  resetParams(e, TYPE_MOVE_CLIP)
}

// 重置参数
function resetParams (e, type) {
  ctrlType = type
  isMouseDown = true
  currentPoint = e.target.getAttribute('data-direction')
  mouseDownX = e.clientX
  mouseDownY = e.clientY
  clipBeforeWidth = $clip.offsetWidth
  clipBeforeHeight = $clip.offsetHeight
  clipBeforeTop = $clip.offsetTop
  clipBeforeLeft = $clip.offsetLeft
}

// 移动裁剪框
function handleMoveClip () {
  let mx = clipBeforeLeft + mouseMoveX
  let my = clipBeforeTop + mouseMoveY
  let max = getMoveMax()

  // log(mouseMoveX + ', ' + mouseMoveY, max)

  // 左边界
  if (mx < 0) mx = 0
  // 右边界
  if (mouseMoveX > 0 && mouseMoveX > max.x) mx = CLIP_MAX_SIZE.width - clipBeforeWidth

  // 上边界
  if (my < 0) my = 0
  // 下边界
  if (mouseMoveY >= 0 && mouseMoveY > max.y) my = CLIP_MAX_SIZE.height - clipBeforeHeight

  $clip.style.left = mx + 'px'
  $clip.style.top = my + 'px'

  resieClipMaskSize()
  handlePreview()
}
// 判断裁剪框是否在容器外
function getMoveMax () {
  return {
    x: CLIP_MAX_SIZE.width - clipBeforeWidth - clipBeforeLeft,
    y: CLIP_MAX_SIZE.height - clipBeforeHeight - clipBeforeTop
  }
}

// clip遮罩尺寸
function resieClipMaskSize () {
  let t = $clip.offsetTop
  let l = $clip.offsetLeft
  let r = l + $clip.offsetWidth
  let b = t + $clip.offsetHeight
  $picClip.style.clip = `rect(${t}px, ${r}px, ${b}px, ${l}px)`
}

// 预览效果处理
function handlePreview () {
  let t = $clip.offsetTop
  let l = $clip.offsetLeft
  let w = $clip.offsetWidth
  let h = $clip.offsetHeight
  let r = l + w
  let b = t + h
  $clipView.style.width = w + 'px'
  $clipView.style.height = h + 'px'
  $picView.style.clip = `rect(${t}px, ${r}px, ${b}px, ${l}px)`
  handlePicViewPosition()
}

// 预览图片位置处理
function handlePicViewPosition () {
  let x = $clip.offsetLeft
  let y = $clip.offsetTop
  log(x + ',' + y)
  $picView.style.left = -x + 'px'
  $picView.style.top = -y + 'px'
}

function init () {
  // 初始化预览图片尺寸
  $picView.style.width = $picClip.offsetWidth + 'px'
  $picView.style.height = $picClip.offsetHeight + 'px'
  handlePreview()
}

setTimeout(function () {
  init()
}, 300)


const $box = $('#Box')
const $span = $('#Span')

log($box.__proto__)

window.box = {
  clientWidth: $box.clientWidth,
  clientHeight: $box.clientHeight,
  clientTop: $box.clientTop,
  clientLeft: $box.clientLeft,
  offsetWidth: $box.offsetWidth,
  offsetHeight: $box.offsetHeight,
  offsetTop: $box.offsetTop,
  offsetLeft: $box.offsetLeft,
  offsetParent: $box.offsetParent,
  scrollWidth: $box.scrollWidth,
  scrollHeight: $box.scrollHeight,
  scrollTop: $box.scrollTop,
  scrollLeft: $box.scrollLeft,
  parent: $box.parentNode
}

window.span = {
  clientWidth: $span.clientWidth,
  clientHeight: $span.clientHeight,
  clientTop: $span.clientTop,
  clientLeft: $span.clientLeft,
  offsetWidth: $span.offsetWidth,
  offsetHeight: $span.offsetHeight,
  offsetTop: $span.offsetTop,
  offsetLeft: $span.offsetLeft,
  offsetParent: $span.offsetParent,
  scrollWidth: $span.scrollWidth,
  scrollHeight: $span.scrollHeight,
  scrollTop: $span.scrollTop,
  scrollLeft: $span.scrollLeft,
  parent: $span.parentNode
}
log(box, span)
