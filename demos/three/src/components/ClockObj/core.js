/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 16:29
 */

import {
  AmbientLight,
  DirectionalLight, PerspectiveCamera,
  // PerspectiveCamera,
  Scene, WebGLRenderer
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { COLORS } from '~/assets/constants/colors'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let scene, renderer

function loadResource() {
  return new Promise((resolve, reject) => {
    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()

    mtlLoader.load('static/clock.mtl', mtl => {
      objLoader.setMaterials(mtl)
      objLoader.load('static/clock.obj', res => {
        // objLoader.setMaterials(mtl)
        resolve(res)
      }, undefined, reject)
    }, undefined, reject)
  })
}

function _init(el, obj) {
  const width = el.offsetWidth
  const height = el.offsetHeight

  scene = new Scene()
  scene.add(obj)

  // 环境光
  const ambientLight = new AmbientLight(0x666666)
  ambientLight.position.set(100, -100, -200)
  scene.add(ambientLight)

  // 平行光
  // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
  const light = new DirectionalLight(0xcccccc, 1)
  light.position.set(2000, 1000, 1000)
  scene.add(light)

  const camera = new PerspectiveCamera(45, width / height, 1, 80000)
  camera.position.set(-150, -50, 300)

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
    console.log(res)
    _init(el, res)
  }).catch(errs => {
    console.error.apply(null, errs)
  })
}

export function destroy() {
  if (!scene || !renderer) return
  scene.remove()
  renderer.dispose()
  scene = null
  renderer = null
}
