/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 16:29
 */

import {
  AmbientLight, Clock,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  // PointLight,
  Scene,
  SphereBufferGeometry,
  TextureLoader,
  WebGLRenderer
} from 'three'
import EARTH_IMG from '../SolarSystem/img/earth.jpg'
import MOON_IMG from '../SolarSystem/img/moon.jpg'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { COLORS } from '~/assets/constants/colors'

let scene, renderer, animeId, clock, elapsed

const EARTH_RADIUS = 100
const MOON_RADIUS = EARTH_RADIUS * 0.27

export function init(el) {
  const earthTexture = new TextureLoader().load(EARTH_IMG)
  const moonTexture = new TextureLoader().load(MOON_IMG)

  clock = new Clock()

  scene = new Scene()

  // earth
  const earthGeometry = new SphereBufferGeometry(EARTH_RADIUS, 50, 50)
  const meshEarth = new Mesh(earthGeometry, new MeshPhongMaterial({ map: earthTexture }))
  scene.add(meshEarth)

  // moon
  const moonGeometry = new SphereBufferGeometry(MOON_RADIUS, 50, 50)
  const meshMoon = new Mesh(moonGeometry, new MeshPhongMaterial({ map: moonTexture }))
  meshMoon.position.x = 200
  scene.add(meshMoon)

  const width = el.offsetWidth
  const height = el.offsetHeight

  const camera = new PerspectiveCamera(45, width / height, 1, 20000)
  camera.position.set(800, 900, -800)

  // // 创建点光源
  // const pointLight = new PointLight()
  // // 设置光源的位置
  // pointLight.position.set(400, 2, 400)
  // // 设置光强
  // pointLight.intensity = 1.2
  // scene.add(pointLight)

  // 环境光
  const ambientLight = new AmbientLight(0x999999)
  ambientLight.position.set(100, 100, 200)
  scene.add(ambientLight)

  // 平行光
  // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
  const light = new DirectionalLight(COLORS.white, 1)
  light.position.set(20, 1, 1)
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

  /* eslint-disable no-new */
  new OrbitControls(camera, el)

  const RADIO = 580

  function animate() {
    animeId = requestAnimationFrame(animate)

    // 地球自转
    meshEarth.rotation.y += 0.0025 * 10
    // 月球自转28为月球绕地球转的周期
    meshMoon.rotation.y += 0.0025 / 28 * 10
    elapsed = clock.getElapsedTime()
    meshMoon.position.set(Math.sin(elapsed) * RADIO, 0, Math.cos(elapsed) * RADIO)
    renderer.render(scene, camera)
  }

  animate()
}

export function destroy() {
  scene.remove()
  renderer.dispose()
  scene = null
  renderer = null
  cancelAnimationFrame(animeId)
}
