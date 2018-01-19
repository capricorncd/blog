/**
 * Created by Capricorncd 2018/1/19
 * https://github.com/capricorncd
 */
'use strict'

var imageLoader = require('./image-loader')
var TimeLine = require('./time-line')

// 初始状态
var STATE_INITIAL = 0
// 运行状态
var STATE_START = 1
// 停止状态
var STATE_STOP = 2

// 同步任务
var TASK_SYNC = 0
// 异步任务
var TASK_ASYNC = 1

/**
 * 简单的函数封装，执行callback
 * @param callback 执行函数
 */
function next (callback) {
  callback && callback()
}

/**
 * 帧动画库类
 * @constructor
 */
function Animation () {
  this.taskQueue = []
  this.index = 0
  this.timeline = new TimeLine()
  this.state = STATE_INITIAL
}

var fn = Animation.prototype

/**
 * 同步任务，图片预加载
 * @param imgs
 */
fn.loadImage = function (imgs) {
  var taskFn = function (next) {
    // imgs.slice()拷贝一个imgs数组副本，不修改原imgs数组
    imageLoader(imgs.slice(), next)
  }
  var type = TASK_SYNC
  return this._add(taskFn, type)
}

/**
 * 异步定时任务，改变图片背景图位置，实现帧动画
 * @param el
 * @param postions
 * @param imgUrl
 */
fn.changePosition = function (el, postions, imgUrl) {
  var len = postions.length
  var taskFn
  var type
  if (len) {
    var me = this
    taskFn = function (next, time) {
      if (imgUrl) {
        el.style.backgroundImage = 'url(' + imgUrl + ')'
      }
      var index = Math.min(time / me.interval | 0, len - 1)
      var position = postions[index].split(' ')
      // 改变dom对象的背景图片位置
      el.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px'
      if (index === len - 1) {
        next()
      }
      type = TASK_ASYNC
    }
  } else {
    taskFn = next
    type = TASK_SYNC
  }
  return this._add(taskFn, type)
}

/**
 * 异步任务，定时改变img的src属性，实现动画图片切换
 * @param el
 * @param imgs
 */
fn.changeSrc = function (el, imgs) {
  var len = imgs.length
  var taskFn
  var type
  if (len) {
    var me = this
    taskFn = function (next, time) {
      // 获取当前图片索引
      var index = Math.min(time / me.interval | 0, len - 1)
      // 改变image对象的图片地址
      el.src = imgs[index]
      if (index === len - 1) {
        next()
      }
    }
    type = TASK_ASYNC
  } else {
    taskFn = next
    type = TASK_SYNC
  }
  return this._add(taskFn, type)
}

/**
 * 高级用法，添加一个异步定时执行任务
 * 该任务自定义动画每帧执行的任务函数
 * @param taskFn 自定义每帧执行的任务函数
 */
fn.enterFrame = function (taskFn) {
  return this._add(taskFn, TASK_ASYNC)
}

/**
 * 同步任务，可以在上一个任务完成后执行回调
 * @param callback
 */
fn.then = function (callback) {
  var taskFn = function (next) {
    callback()
    next()
  }
  var type = TASK_SYNC
  return this._add(taskFn, type)
}

/**
 * 开始执行任务
 * @param interval 异步执行任务的间隔
 */
fn.start = function (interval) {
  if (this.state === STATE_START) {
    return this
  }
  // 如果任务链中没有任务，则返回
  if (!this.taskQueue.length) {
    return this
  }
  this.state = STATE_START
  this.interval = interval
  this._runTask()
  return this
}

/**
 * 同步任务，回退到上一次任务
 * 实现重复上一个任务的效果，可以定义重复次数
 * @param times 重复次数
 */
fn.repeat = function (times) {
  var me = this
  var taskFn = function () {
    if (typeof times === 'undefined') {
      // 无限回退到上一个任务
      me.index--
      me._runTask()
      return
    }
    if (times) {
      times--
      // 回退
      me.index--
      me._runTask()
    }
    // 达到了重复次数，跳转到下一个任务
    else {
      var task = me.taskQueue[me.index]
      me._next(task)
    }
  }
  var type = TASK_SYNC
  return this._add(taskFn, type)
}

/**
 * 同步任务，相当于repeat()更友好的接口，无限循环上一次任务
 */
fn.repeatForever = function () {
  return this.repeat()
}

/**
 * 每个动画执行完后的等待时间
 * @param msec
 */
fn.wait = function (msec) {
  if (this.taskQueue && this.taskQueue.length > 0) {
    this.taskQueue[this.taskQueue.length - 1].wait = msec
  }
  return this
}

/**
 * 暂停任务
 */
fn.pause = function () {
  if (this.state === STATE_START) {
    this.state = STATE_STOP
    this.timeline.stop()
    return this
  }
  return this
}

/**
 * 重新执行上一次暂停的异步任务
 */
fn.restart = function () {
  if (this.state === STATE_STOP) {
    this.state = STATE_START
    this.timeline.restart()
    return this
  }
  return this
}

/**
 * 释放资源
 */
fn.dispose = function () {
  if (this.state !== STATE_INITIAL) {
    this.state = STATE_INITIAL
    this.taskQueue = null
    this.timeline.stop()
    this.timeline = null
    return this
  }
  return this
}

/**
 * 添加一个任务到任务队列
 * @param taskFn 任务方法
 * @param type 任务类型：同步、异步
 * @private
 */
fn._add = function (taskFn, type) {
  this.taskQueue.push({
    taskFn: taskFn,
    type: type
  })
  return this
}

/**
 * 执行任务
 * @private
 */
fn._runTask = function () {
  if (!this.taskQueue || this.state !== STATE_START) {
    return
  }
  if (this.index === this.taskQueue.length) {
    this.dispose()
  }
  var task = this.taskQueue[this.index]
  if (task.type === TASK_SYNC) {
    this._syncTask(task)
  } else {
    this._asyncTask(task)
  }
}

/**
 * 同步任务
 * @param task 执行的任务对象
 * @private
 */
fn._syncTask = function (task) {
  var me = this
  var next = function () {
    // 切换到下一个任务
    me._next(task)
  }
  var taskFn = task.taskFn
  taskFn(next)
}

/**
 * 异步任务
 * @param task 执行的任务对象
 * @private
 */
fn._asyncTask = function (task) {
  var me = this
  // 定义每一帧执行的回调函数
  var enterFrame = function (time) {
    var taskFn = task.taskFn
    var next = function () {
      // 停止当前任务
      me.timeline.stop()
      // 执行下一个任务
      me._next(task)
    }
    taskFn(next, time)
  }

  this.timeline.onenterframe = enterFrame
  this.timeline.start(this.interval)
}

/**
 * 切换到下一个任务，支持如果当前任务需要等待，则延时执行
 * @param task 当前任务
 * @private
 */
fn._next = function (task) {
  this.index++
  var me = this
  task.wait ? setTimeout(function () {
      me._runTask()
    }, task.wait) : this._runTask()
}

module.exports = function () {
  return new Animation()
}
