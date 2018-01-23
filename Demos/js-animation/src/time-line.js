/**
 * Created by Capricorncd 2018/1/19
 * https://github.com/capricorncd
 */
'use strict'

var DEFAULT_INTERVAL = 1000 / 60

var STATE_INITIAL = 0
var STATE_START = 1
var STATE_STOP = 2

// setTimeout(Fn, sec)执行有延迟，即代码Fn执行时间，加上设置的sec间隔时间

var requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL)
    }
})()

var cancelAnimationFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
      return window.clearTimeout(id)
    }
})()

/**
 * TimeLine 时间轴类
 * @constructor
 */
function TimeLine() {
  this.state = STATE_INITIAL
  this.animationHandler = 0
}

var fn = TimeLine.prototype

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
fn.onenterframe = function (time) {
}

/**
 * 动画开始
 * @param interval 每次回调的间隔时间
 */
fn.start = function (interval) {
  if (this.state === STATE_INITIAL) return
  this.state = STATE_START
  this.interval = interval || DEFAULT_INTERVAL
  startTimeline(this, +new Date())
}

/**
 * 动画停止
 */
fn.stop = function () {
  if (this.state !== STATE_START) {
    return
  }
  this.state = STATE_STOP

  // 如果动画开始过，则记录动画从开始到现在所经历的时间
  if (this.startTime) {
    this.dur = +new Date() - this.startTime
  }
  cancelAnimationFrame(this.animationHandler)
}

/**
 * 重新开始动画
 */
fn.restart = function () {
  if (this.state === STATE_START) {
    return
  }
  if (!this.dur || !this.interval) {
    return
  }
  this.state = STATE_START
  // 无缝连接动画
  startTimeline(this, +new Date() - this.dur)
}

/**
 * 时间轴动画启动函数
 * @param timeline 时间轴的实例
 * @param startTime 动画开始时间
 */
function startTimeline (timeline, startTime) {
  // 记录上一次回调的时间轴
  var lastTick = +new Date()

  timeline.startTime = startTime
  nextTick.interval = timeline.interval

  nextTick()

  // 每一帧执行的函数
  function nextTick () {
    var now = +new Date()
    timeline.animationHandler = requestAnimationFrame(nextTick)
    // 如果当前时间与上一次回调的时间戳，大于设置的时间间隔
    // 表示这一次可以执行回调函数
    if (now - lastTick >= timeline.interval) {
      timeline.onenterframe(now - startTime)
      lastTick = now
    }
  }
}

module.exports = TimeLine
