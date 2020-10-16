/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 11:01
 */
import { handleToneArm } from './tone-arm'

export function initOuterWrapper (vm, nativeAppData) {
  const $outerWrapper = vm.$wrapper
  // console.log('vm.$refs.wp', vm.$refs.wp)
  // console.log(vm.$refs)
  // 隐藏loading
  // App.query('#loading').style.display = 'none'
  // 显示card
  $outerWrapper.style.display = 'block'
  // 重置内容高度
  const data = nativeAppData || {}
  const cardHeight = $outerWrapper.offsetHeight
  const heightDifference = window.innerHeight - App.int(data.headerHeight) - App.int(data.footerHeight) - cardHeight - 100
  // App.log(window.innerHeight, cardHeight, heightDifference, 1 - Math.abs(heightDifference) / window.innerHeight)
  if (heightDifference < 0) {
    $outerWrapper.style.transform = `scale(${1 - Math.abs(heightDifference) / window.innerHeight}) translate(-50%, -50%)`
    $outerWrapper.style.transformOrigin = '0 0'
  }

  App.emit('wrapper-showed')

  // 处理唱臂
  handleToneArm.call(vm)
}
