/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 16:29
 */

import {
  AmbientLight,
  DirectionalLight,
  // PerspectiveCamera,
  Scene
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { COLORS } from '~/assets/constants/colors'
import { createRender } from '~/assets/utils'

let scene, renderer

function loadResource() {
  return new Promise((resolve, reject) => {
    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()

    mtlLoader.load('static/clock.mtl', res => {
      objLoader.setMaterials(res)
      objLoader.load('static/clock.obj', res => {
        resolve(res)
      }, undefined, reject)
    }, undefined, reject)
  })
}

function _init(el, obj) {
  scene = new Scene()
  scene.add(obj)

  // 环境光
  const ambientLight = new AmbientLight(0x666666)
  ambientLight.position.set(100, 100, 200)
  scene.add(ambientLight)

  // 平行光
  // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
  const light = new DirectionalLight(0xcccccc, 1)
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
