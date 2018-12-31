/**
 * Create by Capricorncd
 * https://github.com/capricorncd
 */

$(document).ready(function () {
  var sub = $('#sub')
  // 左边栏-激活的菜单
  var activeMenu
  // 右边栏-子选项组
  var activeChild

  // 第一次优化 START *************************************
  var timer
  // 鼠标是否在子菜单里面
  var mouseInSub = false

  sub
    .on('mouseenter', function () {
      mouseInSub = true
    })
    .on('mouseleave', function () {
      mouseInSub = false
    })
  // 第一次优化 END *************************************

  // 第二次优化 START *************************************
  // 记录鼠标位置
  var mouseTrack = []
  // 独立出来，方便后期解绑
  var moveHandler = function (e) {
    mouseTrack.push({
      x: e.pageX,
      y: e.pageY
    })
    if (mouseTrack.length > 3) {
      mouseTrack.shift()
    }
  }
  // 第二次优化 END *************************************

  $('#menu')
    .on('mouseenter', function (e) {
      sub.removeClass('none')

      // 第二次优化 START *************************************
      // 绑定
      $(document).bind('mousemove', moveHandler)
      // 第二次优化 END *************************************
    })
    .on('mouseleave', function (e) {
      sub.addClass('none')

      if (activeMenu) {
        activeMenu.removeClass('active')
        activeMenu = null
      }

      if (activeChild) {
        activeChild.addClass('none')
        activeChild = null
      }

      // 第二次优化 START *************************************
      // 解绑
      $(document).unbind('mousemove', moveHandler)
      // 第二次优化 END *************************************
    })
    .on('mouseenter', 'li', function (e) {
      if (!activeMenu) {
        activeMenu = $(e.target)
        activeMenu.addClass('active')
        activeChild = $('#' + activeMenu.data('id'))
        activeChild.removeClass('none')
        return
      }

      // debounce基本原理
      // 事件触发时，计时器还未执行，则将其清除
      if (timer) {
        clearTimeout(timer)
      }

      // 第二次优化 START *************************************
      var currMousePos = mouseTrack[mouseTrack.length - 1]
      var leftCorner = mouseTrack[mouseTrack.length - 2]

      var isDelay = needDelay(sub, leftCorner, currMousePos)

      if (isDelay) {
        timer = setTimeout(function () {
          if (mouseInSub) return
          if (activeMenu) activeMenu.removeClass('active')
          if (activeChild) activeChild.addClass('none')

          activeMenu = $(e.target)
          activeMenu.addClass('active')
          activeChild = $('#' + activeMenu.data('id'))
          activeChild.removeClass('none')
          // debounce基本原理
          // 结束时，将timer设置为null
          timer = null
        }, 300)
      } else {
        var prevActiveMenu = activeMenu
        var prevActiveChild = activeChild

        activeMenu = $(e.target)
        activeChild = $('#' + activeMenu.data('id'))
        // 隐藏之前的
        prevActiveMenu.removeClass('active')
        prevActiveChild.addClass('none')
        // 显示当前的
        activeMenu.addClass('active')
        activeChild.removeClass('none')
      }
      // 第二次优化 END *************************************

      // 第一次优化 START *************************************
      // timer = setTimeout(function () {
      //   if (mouseInSub) return
      //   if (activeMenu) activeMenu.removeClass('active')
      //   if (activeChild) activeChild.addClass('none')
      //
      //   activeMenu = $(e.target)
      //   activeMenu.addClass('active')
      //   activeChild = $('#' + activeMenu.data('id'))
      //   activeChild.removeClass('none')
      //   // debounce基本原理
      //   // 结束时，将timer设置为null
      //   timer = null
      // }, 300)
      // 第一次优化 END *************************************

      // activeMenu.removeClass('active')
      // activeChild.addClass('none')
      //
      // activeMenu = $(e.target)
      // activeMenu.addClass('active')
      // activeChild = $('#' + activeMenu.data('id'))
      // activeChild.removeClass('none')
    })
})
