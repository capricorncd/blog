(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animation"] = factory();
	else
		root["animation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Capricorncd 2018/1/19
	 * https://github.com/capricorncd
	 */
	'use strict'

	var imageLoader = __webpack_require__(1)
	var TimeLine = __webpack_require__(2)

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
	      var index = Math.min(time / me.interval | 0, len)
	      var position = postions[index - 1].split(' ')
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
      return
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/**
	 * Created by Capricorncd 2018/1/19
	 * https://github.com/capricorncd
	 */
	'use strict'

	/**
	 * 预加载图片
	 * @param imgs
	 * @param callback
	 * @param timeout
	 * @constructor
	 */
	function ImageLoader (imgs, callback, timeout) {
	  var count = 0
	  var success = true
	  var timer = 0
	  var isTimeout = false

	  for (var key in imgs) {
	    // 过滤prototype上的属性
	    if (!imgs.hasOwnProperty(key)) {
	      continue
	    }
	    // 获取每个图片元素
	    // 期望格式是个object: {src: xxx}
	    var item = imgs[key]
	    if (typeof item === 'string') {
	      item = imgs[key] = {
	        src: item
	      }
	    }
	    // 格式不满足，丢弃此条数据
	    if (!item || !item.src) {
	      continue
	    }

	    count++
	    // 设置图片元素id
	    item.id = '__img__' + key + getId()
	    // 设置图片元素的img，它是一个Image对象
	    item.img = window[item.id] = new Image()

	    doLoad(item)
	  }

	  // 遍历完成如果计数为0，则直接调用callback
	  if (!count) {
	    callback(success)
	  } else if (timeout) {
	    timer = setTimeout(onTimeout, timeout)
	  }

	  /**
	   * 真正进行图片加载的函数
	   * @param item 图片元素对象
	   */
	  function doLoad (item) {
	    item.status = 'loading'
	    var img = item.img

	    img.onload = function () {
	      success = success & true
	      item.status = 'loaded'
	      done()
	    }

	    img.onerror = function () {
	      success = false
	      item.status = 'error'
	      done()
	    }

	    // 发起了一个http(s)请求
	    img.src = item.src

	    /**
	     * 每张图片加载完成的回调函数
	     */
	    function done () {
	      img.onload = img.onerror = null
	      try {
	        delete window[item.id]
	      } catch (e) {}

	      // 每张图片加载完成，计数器减一，当所有图片加载完成且没有超时的情况
	      // 清除超时计时器，其执行回调函数
	      if (!--count && !isTimeout) {
	        clearTimeout(timer)
	        callback(success)
	      }
	    }
	  }

	  /**
	   * 超时函数
	   */
	  function setTimeout () {
	    isTimeout = true
	    callback(false)
	  }
	}


	var __id = 0
	function getId () {
	  return ++__id
	}

	module.exports = ImageLoader


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
	  timeline.startTime = startTime
	  nextTick.interval = timeline.interval

	  // 记录上一次回调的时间轴
	  var lastTick = +new Date()
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


/***/ })
/******/ ])
});
;
