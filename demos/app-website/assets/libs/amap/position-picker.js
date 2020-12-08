/**
 * Created by Capricorncd.
 * Date: 2018/09/25 21:28
 * Copyright © 2017-present, capricorncd
 */
import IconCenter from './img/icon-location.png'

// default options
const DEF_OPTS = {
  selector: null,
  zoom: 13,
  scrollWheel: true,
  ready () {},
  fail () {},
  success () {}
}

/**
 * positionPicker
 * @param opts 参数
 */
export function positionPicker (opts) {
  let params = Object.assign(DEF_OPTS, opts)
  AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
    const map = new AMap.Map(params.selector, {
      zoom: params.zoom,
      resizeEnable: true,
      scrollWheel: params.scrollWheel
    })
    params.ready(map)

    const picker = new PositionPicker({
      mode: 'dragMap',
      map,
      // 自定义外观
      iconStyle: {
        url: IconCenter,
        // 要显示的点大小，将缩放图片
        size: [21, 40],
        // 锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
        ancher: [11, 38]
      }
    })
    // success
    picker.on('success', res => {
      params.success(res)
    })

    // fail
    picker.on('fail', err => {
      params.fail(err)
    })
    // start
    picker.start()
    map.panBy(0, 1)
  })
}
