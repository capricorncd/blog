/**
 * Created by Capricorncd.
 * Date: 2018/09/25 21:18
 * Copyright © 2017-present, capricorncd
 */
export function geocoder (map, callback) {
  // 经纬度-地址
  const geocoder = new AMap.Geocoder({
    // 城市设为北京，默认：“全国”
    city: '全国',
    // 范围，默认：500
    radius: 1000
  })

  map.on('moveend', logMapinfo)
  map.on('zoomend', logMapinfo)

  // 显示地图层级与中心点信息
  function logMapinfo (e) {
    // let zoom = map.getZoom()
    let center = map.getCenter()
    if (geocoder) {
      geocoder.getAddress(center, (status, res) => {
        if (status === 'complete' && res.regeocode) {
          let regeocode = res.regeocode
          let data = regeocode.addressComponent
          data.address = regeocode.formattedAddress
          data.location = {
            lng: center.lng,
            lat: center.lat
          }
          callback(null, data)
        } else {
          callback(res)
        }
      })
    }
  }
}
