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
  Scene
} from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { COLORS } from '~/assets/constants/colors'
import { createRender } from '~/assets/utils'

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

  const camera = new PerspectiveCamera(45, width / height, 1, 20000)
  camera.position.set(1500, 700, -100)

  // 环境光
  const ambientLight = new AmbientLight(0x999999)
  ambientLight.position.set(100, 100, 200)
  scene.add(ambientLight)

  // 平行光
  // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
  const light = new DirectionalLight(COLORS.white, 1)
  light.position.set(20, 1, 1)
  scene.add(light)

  renderer = createRender(scene, el)
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
  scene.remove()
  renderer.dispose()
  scene = null
  renderer = null
}
