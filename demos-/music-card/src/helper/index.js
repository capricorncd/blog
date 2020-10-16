/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 10:54
 */
import { requestAnimeFrame, cancelAnimeFrame } from './animation-frame'
import { initSwiper } from './swiper'
import { initAudio } from './init-audio'
import { initOuterWrapper } from './init-outer-wrapper'

export {
  requestAnimeFrame,
  cancelAnimeFrame,
  initSwiper,
  initAudio,
  initOuterWrapper
}
/**
 * 获取音频封面
 * @param item
 * @returns {*}
 */
export function getCurrentUrl (item) {
  try {
    return item.url.url
  } catch (e) {
    /* eslint-disable no-void */
    return void 0
  }
}

/**
 * 判断是否为数字
 * 否：则返回0
 * @param n
 * @returns {number}
 */
export function checkNumber(n) {
  return isNaN(n) ? 0 : n
}

// 地区半径
const EARTH_RADIUS = 6378.137

/**
 * 计算距离
 * https://blog.csdn.net/zzjiadw/article/details/7031610
 * @param currentCoords
 * @param targetCoords
 * @return {number}
 */
function computeDistance (currentCoords, targetCoords) {
  const radLat1 = rad(currentCoords.lat)
  const radLat2 = rad(targetCoords.lat)
  const a = radLat1 - radLat2
  const b = rad(currentCoords.lng) - rad(targetCoords.lng)
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s *= EARTH_RADIUS
  // 输出为米
  return s * 1000
}

/**
 * 经纬度转换成三角函数中度分表形式
 * @param d
 * @return {number}
 */
function rad (d) {
  return d * Math.PI / 180
}

/**
 * 根据经纬度，获取距离
 * @param item
 * @param data
 */
export function getDistance (item, data) {
  if (!item) return 0
  // console.log(item, data)
  if (item && item.lng > 0 && item.lat > 0 && data.lng > 0 && data.lat > 0) {
    return App.int(computeDistance(item, data))
  } else {
    return 0
  }
}
