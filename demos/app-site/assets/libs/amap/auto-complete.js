/**
 * Created by Capricorncd.
 * Date: 2018/09/25 21:13
 * Copyright © 2017-present, capricorncd
 */
/**
 * autoComplete
 * // https://lbs.amap.com/api/javascript-api/guide/services/autocomplete#autocomplete
 * @returns {Promise}
 */
export function autoComplete (city = '全国') {
  return new Promise(resolve => {
    // 搜索
    AMap.plugin('AMap.Autocomplete', _ => {
      // 实例化Autocomplete
      let autoOptions = {
        // city 限定城市，默认全国
        city
      }
      const autoComplete = new AMap.Autocomplete(autoOptions)
      resolve(autoComplete)
    })
  })
}
