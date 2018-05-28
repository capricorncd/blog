let iframe = document.createElement('iframe')

iframe.style.display = 'none'
iframe.src = 'weixin://dl/scan'

let body = document.body || document.getElementsByName('body')[0]
body.appendChild(iframe)
setTimeout(_ => {
  body.removeChild(iframe)
  iframe = null
})

/**
 * *************************************
 */

// 分享
function invokeShare (data, callback) {
  _invoke('share', data, callback)
}

// 登录
function invokeLogin (data, callback) {
  _invoke('login', data, callback)
}

// 打开扫一扫
function invokeScan (data, callback) {
  _invoke('scan', data, callback)
}

window.invoke = {
  share: invokeShare,
  login: invokeLogin,
  scan: invokeScan
}

// 实现
(function () {

  // 调用schema的封装
  function _invoke (action, data, callback) {
    // 拼装schema协议
    let schema = 'myapp://utils/' + action
    // 拼接参数
    schema += '?'
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        schema += `&${key}=${data[key]}`
      }
    }
    // 处理callback
    let callbackName = ''
    if (typeof callback === 'string') {
      callbackName = callback
    } else {
      callbackName = action + Date.now()
      window[callbackName] = callback
    }

    schema += `callback=${callbackName}`

    // 触发
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = schema
    let body = document.body || document.getElementsByName('body')[0]
    body.appendChild(iframe)
    setTimeout(_ => {
      body.removeChild(iframe)
      iframe = null
    })
  }

  // 暴露到全局
  window.invoke = {
    share (data, callback) {
      _invoke('share', data, callback)
    },
    login (data, callback) {
      _invoke('login', data, callback)
    },
    scan (data, callback) {
      _invoke('scan', data, callback)
    }
  }
}(window))
