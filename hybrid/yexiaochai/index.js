/**
 * 01 **********************************************************************************
 */
// 处理参数
let _getHybridUrl = function (params) {
  let k
  let paramStr = ''
  let url = 'hybrid://'
  let flag = '?'
  // 时间戳，防止url不起效
  url += params.tagname
  if (params.callback) {
    flag = '&'
    url += '?callback=' + params.callback
    // delete params.callback
  }
  let param = params.param
  if (param) {
    paramStr = typeof param === 'object' ? JSON.stringify(param) : ''
    url = url + flag + 'param=' + encodeURIComponent(paramStr)
  }
  return url
}

let bridgePostMsg = function (params) {
  let url = _getHybridUrl(params)
  // 兼容ios6
  let ifr = $(`<iframe style="display: none" src="${url}"></iframe>`)
  console.log(`${params.tagname}-hybrid请求发出-${+new Date()}+url:`)
  if ($.os.android) {
    // Android情况协议发的太快会有问题
    setTimeout(_ => {
      $('body').append(ifr)
    })
  } else {
    $('body').append(ifr)
  }

  // 这样会阻断第二次请求
  // window.location = url

  setTimeout(_ => {
    ifr.remove()
    ifr = null
  })
}

// h5与Native基本交互
let requestHybrid = function (params) {
  if (!params.tagname) alert('必须包含tagname')
  // 生成唯一执行函数，执行后销毁
  let tt = +new Date() + '_' + _.uniqueId() + '_'
  // 生成一个唯一的字符串
  let t = 'hybrid_' + params.tagname + '_' + tt
  let tmpFn
  // 处理有回调的情况
  if (params.callback) {
    tmpFn = params.callback
    params.callback = t
    window.Hybrid[t] = function (data) {
      tmpFn(data)
      // delete window.Hybrid[t]
    }
  }
  // 解析callback，生成唯一的callbackid
  // 将一个函数和一个字符串映射起来
  // callbackid: function () {}
  bridgePostMsg(params)
}

// hybrid://getAddressList?callback=id
requestHybrid({
  tagname: 'getAddressList',
  param: {},
  callback: function (data) {
    // ...
  }
})


/**
 * 02 **********************************************************************************
 */
$.get(url, params, function (data) {
  // ...
})

/**
 1 公共参数；设备号、手机
 2 统计需求，ajax接口响应速度
 3 统一回调处理，Server错误码code处理
 4 ......
 */

// url => domain.com?flag=xxxxxx
// => 业务架构层做处理
// 请求参数
let commonData = {
  flag: 'xxxxxx',
  id: 'ddddd'
}
// =>commonData
// 创建订单
