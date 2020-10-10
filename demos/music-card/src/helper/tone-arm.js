/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 11:02
 */
import { touchEvents } from './touch-events'
// ↑ 谷歌PC浏览器从设备模式切换(PC->Mobile)时，touchEvents将失效

export function handleToneArm () {
  const _this = this
  const $toneArm = this.$toneArm
  let toneBox = getBoundingClientRect($toneArm, this.$wrapper)
  // window.onResize 时，需要重新计算。check winResizeToneArmHandler
  // tone arm 旋转轴
  const CENTER = {
    x: toneBox.x + toneBox.width * 0.53,
    y: toneBox.y + toneBox.height * 0.13
  }
  // console.log(CENTER)
  // isTouchEvent
  let isTouchEvent = false
  // 鼠标按下位置图片左上角位置
  let moveBeforePosition = {}
  // 拖到角度
  let angle = 0
  let timer = null
  let startAngle
  $toneArm.addEventListener(touchEvents.start, e => {
    // 音频文件错误时，不执行
    if (this.isError) return
    this.isTouchOnArm = true
    isTouchEvent = e.type === 'touchstart'
    // console.log('e.which ' + e.which)
    // prevent user enter with right and the swiper move (needs isTouchEvent)
    if (!isTouchEvent && 'which' in e && e.which === 3) {
      this.isTouchOnArm = false
      return
    }

    // 获取旋转角度
    startAngle = getStyleValue($toneArm)
    // console.log('startAngle: ' + startAngle)

    if (!isTouchEvent || e.targetTouches.length === 1) {
      if (!isTouchEvent && !isAndroid()) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }

      const x = isTouchEvent ? e.targetTouches[0].pageX : (e.pageX || e.clientX)
      const y = isTouchEvent ? e.targetTouches[0].pageY : (e.pageY || e.clientY)
      moveBeforePosition = {
        x,
        y
      }
      // console.log(moveBeforePosition)
    }
  })
  $toneArm.addEventListener(touchEvents.move, e => {
    if (!this.isTouchOnArm) return
    // e.preventDefault()
    // log(e)
    if (!isTouchEvent && !isAndroid()) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    }
    angle = getEndAngle(CENTER, moveBeforePosition, e, isTouchEvent, this)
    $toneArm.style.transform = `rotate(${angle}deg)`
    if (timer) return
    timer = setTimeout(_ => {
      // console.log(angle, this.isPlay)
      if (angle <= 20 && this.isPlay) {
        this.pause()
      } else if (angle > 21 && !this.isPlay) {
        this.play()
      }
      clearTimeout(timer)
      // console.log(timer)
      timer = null
    }, 300)
  })
  window.addEventListener(touchEvents.end, e => {
    // console.error(e.type)
    touchEnd()
  })

  if (!this.winResizeToneArmHandler) {
    this.winResizeToneArmHandler = (e) => {
      toneBox = getBoundingClientRect($toneArm, this.$wrapper)
      // tone arm 旋转轴
      CENTER.x = toneBox.x + toneBox.width * 0.53
      CENTER.y = toneBox.y + toneBox.height * 0.13
    }
  }

  // resize
  window.addEventListener('resize', this.winResizeToneArmHandler)

  function getEndAngle (CENTER, moveBeforePosition, e, isTouchEvent) {
    const x = isTouchEvent ? e.targetTouches[0].pageX : (e.pageX || e.clientX)
    const y = isTouchEvent ? e.targetTouches[0].pageY : (e.pageY || e.clientY)
    // 获取改变的角度
    const agl = computeAngle(CENTER, moveBeforePosition, { x, y }) * (x - moveBeforePosition.x > 0 ? -1 : 1) + startAngle
    return agl > 75 ? 75 : (agl < 0 ? 0 : agl)
  }

  function touchEnd() {
    _this.isTouchOnArm = false
    _this.$nextTick(_ => {
      $toneArm.style.transform = `rotate(${_this.isPlay ? 42 : 0}deg)`
    })
  }
}

function computeAngle(pa, pb, pc) {
  // console.log(pa, pb, pc)
  const a = Math.sqrt(square(pa.x - pb.x) + square(pb.y - pa.y))
  const b = Math.sqrt(square(pc.x - pa.x) + square(pc.y - pa.y))
  const c = Math.sqrt(square(pb.x - pc.x) + square(pc.y - pb.y))
  // console.log(a, b, c)
  const d = (square(a) + square(b) - square(c)) / (2 * a * b)
  // console.log(d)
  return Math.acos(d) * (180 / Math.PI)
}

function square(a) {
  return Math.abs(a * a)
}

function getStyleValue($el) {
  const st = window.getComputedStyle($el, null)
  const tr = st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform') ||
    'FAIL'
  // With rotate(30deg)...
  // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
  // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
  const values = tr.split('(')[1].split(')')[0].split(',')
  const a = values[0]
  const b = values[1]
  // let c = values[2];
  // let d = values[3];
  // let scale = Math.sqrt(a * a + b * b)
  // console.log('Scale: ' + scale)
  return Math.round(Math.atan2(b, a) * (180 / Math.PI))
}

function isAndroid() {
  return /android/ig.test(navigator.userAgent)
}

function getBoundingClientRect($toneArm, $mc) {
  let toneBox
  try {
    toneBox = $toneArm.getBoundingClientRect()
  } catch (e) {
    // 不支持getBoundingClientRect的浏览器
    // const $mc = this.$wrapper
    const top = (window.innerHeight - $mc.clientHeight) / 2
    const left = (window.innerWidth - $mc.clientWidth) / 2
    toneBox = {
      // toneArm right: 18
      x: left + App.query('.card-inner').clientWidth - $toneArm.clientWidth - 18,
      // card marginTop: 19, toneArm top: 18
      y: top + App.query('.tags-wrapper').clientHeight + 19 + 18,
      width: $toneArm.clientWidth,
      height: $toneArm.clientHeight
    }
  }
  return toneBox
}
