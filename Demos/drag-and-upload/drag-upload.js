/**
 * Created by zx1984 2018/3/30
 * https://github.com/zx1984
 */
'use strict';

function query (selector) {
  return document.querySelector(selector)
}

function log () {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
  }
}

// constructor
function DragUplad (opts) {
  this.dragContainer = query(opts.container)
  this.uploadBtn = query(opts.uploadBtn)
  this.uploadData = []
  this.progressBar = query(opts.progressBar)
  this.elList = query(opts.elList)
  this.init()
}

var fn = DragUplad.prototype

fn.init = function () {
  this.eventHandle()
}

// 事件处理
fn.eventHandle = function () {
  var dc = this.dragContainer
  var me = this
  function dragHandle (e) {
    e.preventDefault()
    switch (e.type) {
      case 'dragenter':
        me.dragContainer.innerHTML = '释放图片文件'
        break;
      case 'dragover':
        break;
      case 'dragleave':
        me.dragContainer.innerHTML = '请将图片拖拽到此区域'
        break;
      case 'drop':
        me.dragContainer.innerHTML = '请将图片拖拽到此区域'
        var files = e.dataTransfer.files;
        // Array.prototype.forEach.call(files, function (file) {
        //   me.fileHandle(file)
        // })
        [].forEach.call(files, function (file) {
          me.fileHandle(file)
        })
        // var arr = Array.prototype.slice.call(files);
        // arr.forEach(function (file) {
        //   me.fileHandle(file)
        // })
        break;
    }
  }
  this.addEvent(dc, 'dragenter', dragHandle)
  this.addEvent(dc, 'dragover', dragHandle)
  this.addEvent(dc, 'dragleave', dragHandle)
  this.addEvent(dc, 'drop', dragHandle)

  // 点击上传按钮事件
  this.addEvent(this.uploadBtn, 'click', function () {
    // 重置进度条
    me.progressBar.style.width = 0 + '%'
    var len = me.uploadData.length;
    var count = 0;
    var errTotal = 0;
    me.uploadData.forEach(function (file) {
      me.send(file, function (res) {
        log(res)
        if (res.code === 0) {
          count++;
        } else {
          errTotal++;
        }
        _uploadHandle(count, errTotal, len)
      })
    })
  })

  function _uploadHandle (count, errTotal, len) {
    if (count + errTotal === len) {
      alert(count + '个上传成功, ' + errTotal + '个失败！')
      // 清除已上传的文件
      me.uploadData = []
    }
  }
}

fn.addEvent = function (el, type, handler) {
  el.addEventListener(type, handler)
}

fn.offEvent = function (el, type, handler) {
  el.removeEventListener(type, handler)
}

// 文件处理
fn.fileHandle = function (file) {
  var me = this
  me.uploadData.push(file)
  // 新建一个文件对象
  var fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = function () {
    var li = document.createElement('li');
    li.className = 'card'
    li.innerHTML = '<img src="' + this.result + '">'
    me.elList.appendChild(li)
  }
}

// 上传数据
fn.send = function (file, callback) {
  // 重置进度条
  // this.progressBar.style.width = 0 + '%'
  var me = this
  var xhr = new XMLHttpRequest()
  // xhr.upload.onprogress 监控上传的进度
  xhr.upload.onprogress = function (e) {
    var loaded = e.loaded
    var total = e.total
    var progress = Math.floor((loaded / total) * 100)
    me.progressBar.style.width = progress + '%'
  }

  // 监听请求、响应状态变化
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        callback({code: 0})
      } else {
        log(this)
        callback({code: 1})
      }
    }
  };

  xhr.open('post', './upload.php', true)
  var formData = new FormData()
  formData.append('file', file)
  xhr.send(formData)
}
