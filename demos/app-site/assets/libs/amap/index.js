/**
 * Created by Capricorncd.
 * Date: 2018/09/18 16:13
 * Copyright © 2017-present, capricorncd
 */
import { autoComplete } from './auto-complete'
import { positionPicker } from './position-picker'

// DEFAULT_OPTIONS
const DEFAULT_OPTIONS = {
  zoom: 15,
  clickable: true,
  dragResponse: true,
  center: null,
  zoomEnable: true,
  // default city
  initCity: '東京',
  change () {},
  error () {}
}

/**
 * constructor
 */
class AmapClass {
  constructor (opts) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, opts)
    this.map = null
    this.autoComplete = null
    this.markers = []
    let mapOptions = {
      zoom: this.options.zoom,
      // resizeEnable: this.options.resizeEnable,
      zoomEnable: this.options.zoomEnable
    }
    if (this.options.center) {
      mapOptions.center = this.options.center
    }
    if (this.options.dragResponse) {
      // 拖动或改变地图中心点,获取详细位置信息
      positionPicker({
        selector: this.options.selector,
        ...mapOptions,
        ready: map => {
          this.init(map)
        },
        fail: err => {
          this.options.error(err)
        },
        success: res => {
          // console.log(res)
          let regeocode = res.regeocode
          this.options.change({
            ...regeocode.addressComponent,
            ...res
          })
        }
      })
    } else {
      const map = new AMap.Map(this.options.selector, mapOptions)
      this.init(map)
    }
  }

  /**
   * 初始化
   */
  init (map) {
    const options = this.options
    this.map = map
    // autoComplete
    autoComplete().then(target => {
      this.autoComplete = target
    })
    // 定位
    // this._geolocation(!options.center)
    // 经纬度-地址
    this.geocoder = new AMap.Geocoder({
      city: 'Tokyo',
      radius: 1000
    })

    if (options.clickable) {
      // 为地图注册click事件
      // 获取鼠标点击出的经纬度坐标
      map.on('click', e => {
        this.setCenter(e.lnglat)
      })
    }
  }

  /**
   * 通过浏览器获取经纬度
   */
  browserGeo (cbk) {
    let options = this.options
    if ('geolocation' in navigator) {
      try {
        navigator.geolocation.getCurrentPosition(success, failed)
      } catch (err) {
        options.error(err)
      }
    } else {
      options.error({
        code: 0,
        message: 'Geolocation is not supported by this browser'
      })
    }

    /**
     * 处理当前位置信息
     * @param pos
     */
    function success (pos) {
      let coords = pos.coords
      cbk && cbk({
        coords: {
          lng: coords.longitude,
          lat: coords.latitude
        }
      })
    }

    /**
     * 错误处理
     * @param e
     */
    function failed (e) {
      options.error(e)
    }
  }

  /**
   * 定位
   * https://lbs.amap.com/api/javascript-api/reference/location/
   * @param needSetCenter 是否需要设置中心点
   */
  _geolocation (needSetCenter) {
    let _this = this
    let options = this.options
    this.map.plugin('AMap.Geolocation', _ => {
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认:true
        enableHighAccuracy: true,
        // 超过1秒后停止定位，默认：无穷大
        timeout: 1000,
        // 定位结果缓存0毫秒，默认：0
        maximumAge: 0,
        // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        convert: true,
        // 显示定位按钮，默认：true
        showButton: true,
        // 定位按钮停靠位置，默认：'LB'，左下角
        buttonPosition: 'LB',
        // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        // 定位成功后在定位到的位置显示点标记，默认：true
        showMarker: true,
        // 定位成功后用圆圈表示定位精度范围，默认：true
        showCircle: true,
        // 定位成功后将定位到的位置作为地图中心点，默认：true
        panToLocation: true,
        // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true
      })
      this.map.addControl(geolocation)
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          onComplete(result)
        } else {
          onError(result)
        }
      })
    })

    /**
     * onComplete
     * @param data
     */
    function onComplete (data) {
      // console.log(data)
      if (needSetCenter) _this.setCenter(data.position)
    }

    /**
     * onError
     * @param err
     */
    function onError (err) {
      options.error(err)
      // alert('定位失败')
      if (needSetCenter) _this.setRegion(options.initCity)
    }
  }

  /**
   * 设置地图中心位置
   * @param coords
   */
  setCenter (coords) {
    // App.log(coords)
    this.map.setCenter(coords)
  }

  /**
   * 搜索
   * @param keyword
   */
  search (keyword, city, cbk) {
    if (!this.map || !this.autoComplete) {
      return
    }
    if (typeof city === 'function') {
      cbk = city
      city = null
    }
    if (city) {
      this.autoComplete.setCity(city)
    }
    this.autoComplete.search(keyword, (status, result) => {
      // 搜索成功时，result即是对应的匹配数据
      // console.log(status, result)
      cbk(result)
    })
  }

  /**
   * 根据城市/地址，设置地图中心位置
   * @param address
   */
  setRegion (address) {
    if (this.geocoder) {
      this.geocoder.getLocation(address, (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          let lnglat = result.geocodes[0].location
          this.setCenter(lnglat)
        } else {
          this.options.error(result)
        }
      })
    }
  }

  /**
   * 添加一个marker
   * @param opts
   * @param removeOld 移除旧marker
   */
  addMarker (opts, removeOld) {
    // 构造点标记
    const marker = new AMap.Marker({
      icon: opts.icon || 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      position: opts.position
    })
    this.map.add(marker)
    if (removeOld) {
      this.markers.forEach(mk => {
        this.map.remove(mk)
      })
      this.markers = []
    }
    this.markers.push(marker)
  }
}

export default AmapClass
