/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-19 23:48
 */
import { WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createOrthographicCamera } from './create-camera'

export function createRender(scene, el) {
  const width = el.offsetWidth
  const height = el.offsetHeight

  const camera = createOrthographicCamera(scene, width, height)

  const renderer = new WebGLRenderer()
  // 设置渲染区域尺寸
  renderer.setSize(width, height)
  // 设置背景颜色
  renderer.setClearColor(0xff9999, 0.7)

  el.appendChild(renderer.domElement)

  const orbitControls = new OrbitControls(camera, el)
  orbitControls.addEventListener('change', render)

  // 执行渲染，指定场景和相机作为参数
  function render() {
    renderer.render(scene, camera)
  }

  render()
}
