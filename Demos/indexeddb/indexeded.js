/**
 * Created by zx1984 2018/3/8
 * https://github.com/zx1984
 */
'use strict';

// https://www.w3.org/TR/2018/REC-IndexedDB-2-20180130/#introduction

var db
var openRequest
var lastCursor
// var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
var dbName = 'testDB'
var tableName = 'testTable'

function init () {
  openRequest = indexedDB.open(dbName, 2)
  // handle setup
  openRequest.onupgradeneeded = function (e) {
    db = this.result
    log('onupgradeneeded =========================')
    log('数据库版本号为=' + e.newVersion)
    if (!db.objectStoreNames.contains(tableName)) {
      // The database did not previously exist, so create object stores and indexes.
      var store = db.createObjectStore(tableName, {keyPath: 'id', autoIncrement: true})
      var nameIndex = store.createIndex('name', 'name', {unique: false})
      var phoneIndex = store.createIndex('phone', 'phone', {unique: false})
    }
  }
  // success
  openRequest.onsuccess = function (e) {
    log('open success =========================')
    db = this.result
    log('version: ' + db.version)

    db.onerror = function (e) {
      error('db error')
      dir(e.target)
    }

    if (!db.objectStoreNames.contains(tableName)) {
      error('not contains table ' + tableName)
      return
    }
    log('contains table ' + tableName)
    var transaction = db.transaction([tableName], 'readwrite')
    transaction.oncomplete = function (e) {
      log('transaction.oncomplete: All done!')
    }
    transaction.onerror = function (e) {
      error('transaction.onerror')
      dir(e)
    }

    var store = transaction.objectStore(tableName)
    // 使用游标遍历
    store.openCursor().onsuccess = function (e) {
      // var cursor = e.target.result
      var cursor = this.result
      if (cursor) {
        var key = cursor.key
        var val = cursor.value
        log(key)
        log(val)
        render({
          key: key,
          name: val.name,
          phone: val.phone,
          address: val.address
        })
        lastCursor = key
        cursor.continue()
      } else {
        log('Done with cursor')
      }
    }

    store.openCursor().onerror = function (e) {
      error('store.openCursor().onerror')
      dir(e)
    }
  }
  // error
  openRequest.onerror = function (e) {
    error('open error')
    dir(e)
  }

  eventHandle()
  return 0
}

// 点击事件处理
function eventHandle () {
  // 添加
  $('.btn-primary').click(function () {
    var data = {}
    data.name = $('[name="name"]').val()
    data.phone = $('[name="phone"]').val()
    data.address = $('[name="address"]').val()
    add(data, function () {
      resetAddInput()
    })
  })
  // 删除
  $('.table').on('click', '.btn-outline-secondary', function () {
    var $this = $(this)
    var id = $(this).data('id')
    if (id > 0) {
      del(id, function () {
        $this.closest('tr').remove()
      })
    }
  })

  // 查询
  $('.btn-danger').click(function () {
    var $this = $(this)
    var keyword = $('[name="keyword"]').val()
    if (keyword) {
      search(keyword, function (msg) {
        if (msg) {
          alert(msg)
          return
        }
        $this.val('')
      })
    }
  })

  // 删除数据库
  $('.del-db-hook').click(function () {
    // error('删除数据库操作！')
    delIndexedDB()
  })
}

// 重置添加输入框
function resetAddInput () {
  $('[name="name"]').val('')
  $('[name="phone"]').val('')
  $('[name="address"]').val('')
}

// 添加数据
function add (data, callback) {
  var tran = db.transaction([tableName], 'readwrite')
  tran.oncomplete = function () {
    log('add tran.oncomplete')
  }
  tran.onerror = function () {
    error('add tran.onerror')
  }
  var store = tran.objectStore(tableName)
  store.add(data)
  store.openCursor().onsuccess = function () {
    var cursor = this.result
    var key
    if (lastCursor === null) {
      key = cursor.key
      lastCursor = key
    } else {
      key = ++lastCursor
    }
    data.key = key
    render(data)
    callback()
  }
}

// 删除单条数据
function del (id, callback) {
  var tran = db.transaction([tableName], 'readwrite')
  tran.oncomplete = function () {
    log('del tran.oncomplete')
  }
  tran.onerror = function () {
    error('del tran.onerror')
  }
  var store = tran.objectStore(tableName)
  var rmKey = +id
  var getRequest = store.get(rmKey)
  getRequest.onsuccess = function () {
    log('del getRequest.onsuccess, delete object:')
    dir(this.result)
  }
  var request = store.delete(rmKey)
  request.onsuccess = function () {
    log('del request.onsuccess')
    callback()
  }
  request.onerror = function () {
    error('del request.onerror')
  }
}

// 查询
function search (keyword, callback) {
  var tran = db.transaction([tableName], 'readwrite')
  tran.oncomplete = function () {
    log('search tran.oncomplete')
  }
  tran.onerror = function () {
    error('search tran.onerror')
  }
  var store = tran.objectStore(tableName)
  // 生成一个表示范围的Range对象
  var range = IDBKeyRange.only(keyword)
  store.index('name').openCursor(range).onsuccess = function () {
    var cursor = this.result
    if (!cursor) {
      callback('无搜索结果')
      return
    }
    var data = cursor.value
    log(data)
    // 移除表格数据
    clearTableData()
    // 显示当前搜索结果
    render(data)
    callback()
  }
}

// 删除数据库
function delIndexedDB () {
  var deleteDB = indexedDB.deleteDatabase(dbName)
  // 移除表格数据
  clearTableData()
  // 以下状态无法监测
  deleteDB.onsuccess = function () {
    log('[SUCCESS] delete indexedDB ' + dbName)
  }
  deleteDB.onerror = function () {
    error('[ERROR] delete indexedDB ' + dbName)
  }
}

// 渲染表格数据
function render (data) {
  var btn = '<button type="button" class="btn btn-sm btn-outline-secondary" data-id="' + data.key + '">删除</button>'
  var html = '<tr class="list-hook"><td>' + data.name + '</td><td>' + data.phone + '</td><td>' + data.address + '</td><td>' + btn + '</td></tr>'
  $('.table').append(html)
}

// 移除表格数据
function clearTableData () {
  $('.table').find('.list-hook').remove()
}

// debug
function log (o) {
  console.log(o)
}

function error (o) {
  console.error(o)
}

function dir (o) {
  console.dir(o)
}
