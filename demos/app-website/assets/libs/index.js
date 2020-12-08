/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-08 19:26
 */
export function isIos () {
  return /(iphone|ipod|ios|ipad)/ig.test(navigator.userAgent) && /iPhone|ipod|ipad/i.test(navigator.platform)
}

export function isWeiXin () {
  return /MicroMessenger/i.test(navigator.userAgent)
}

export function getBrowserType () {
  const userAgent = navigator.userAgent
  if (/(Trident|Edge)/.test(userAgent)) return 'ie'
  if (userAgent.indexOf('Opera') > -1) return 'opera'
  if (userAgent.indexOf('Firefox') > -1) return 'firefox'
  if (userAgent.indexOf('Chrome') > -1) return 'chrome'
  if (userAgent.indexOf('Safari') > -1) return 'safari'
  if (isWeiXin()) return 'weixin'
  if (userAgent.match(/QQ|MQQBrowser/)) return 'qq'
  return null
}

export function browserVersion (browserType) {
  const userAgent = navigator.userAgent
  browserType = browserType || getBrowserType()
  let version
  switch (browserType) {
    case 'ie':
      if (/MSIE (\d+)|rv:(\d+)/.test(userAgent)) {
        version = +(RegExp.$1 || RegExp.$2)
      }
      break
    // case 'opera':
    //   if (/Opera[/ ](\d+)/.test(userAgent)) {
    //     version = +RegExp.$1
    //   }
    //   break
    // firefox, chrome, safari
    default:
      let reg = new RegExp(browserType + '[/ ](\\d+)', 'i')
      if (reg.test(userAgent)) {
        version = +RegExp.$1
      }
  }
  return version
}

export function supportWebp () {
  try {
    return !![].map
      && 0 === document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')
      && !isVivoBrowser()
  } catch (e) {
    return false
  }
}

function isVivoBrowser() {
  return /VivoBrowser/ig.test(navigator.userAgent)
}

export function isMacOS() {
  const platform = navigator.platform
  return ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].includes(platform)
}

export function isMobile () {
  const userAgent = navigator.userAgent
  return /(android|iphone|symbianos|ipod|ipad|windows phone)/i.test(userAgent)
}
