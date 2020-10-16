/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 16:29
 */
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene, WebGLRenderer
} from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { COLORS } from '~/assets/constants/colors'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let scene, renderer

function loadResource() {
  return new Promise((resolve, reject) => {
    const stlLoader = new STLLoader()
    stlLoader.load('static/clock.stl', resolve, undefined, reject)
  })
}

function _init(el, clockStl) {
  scene = new Scene()

  const meshEarth = new Mesh(clockStl, new MeshPhongMaterial({ color: 0x999999 }))
  scene.add(meshEarth)

  const width = el.offsetWidth
  const height = el.offsetHeight

  const camera = new PerspectiveCamera(45, width / height, 1, 80000)
  camera.position.set(0, -300, 100)

  // 环境光
  const ambientLight = new AmbientLight(0x666666)
  ambientLight.position.set(100, 1000, 200)
  scene.add(ambientLight)

  // 平行光
  // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
  const light = new DirectionalLight(COLORS.white, 0.9)
  light.position.set(-100, -800, 500)
  scene.add(light)

  renderer = new WebGLRenderer({
    // 消除锯齿
    antialias: true
  })
  // 设置渲染区域尺寸
  renderer.setSize(width, height)
  // 设置背景颜色
  renderer.setClearColor(COLORS.black, 1)

  el.appendChild(renderer.domElement)

  const orbitControls = new OrbitControls(camera, el)
  orbitControls.addEventListener('change', render)

  // 执行渲染，指定场景和相机作为参数
  function render() {
    renderer.render(scene, camera)
  }

  render()
}

export function init(el) {
  loadResource().then(res => {
    _init(el, res)
  }).catch(console.error)
}

export function destroy() {
  if (scene) scene.remove()
  if (renderer) renderer.dispose()
  scene = null
  renderer = null
}
