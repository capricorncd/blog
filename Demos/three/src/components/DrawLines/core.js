/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-20 23:56
 */
import {
  Color,
  // DirectionalLight,
  Geometry, Line, LineSegments,
  MeshBasicMaterial, PerspectiveCamera,
  Scene, Vector3
} from 'three'

import { createRender } from '../../utils'

/**
 * 初始化
 * @param el 父DOM元素
 */
function init(el) {
  const scene = new Scene()

  // create geometry
  const geometry = new Geometry()

  // create material
  const material = new MeshBasicMaterial({
    vertexColors: true
  })

  geometry.colors.push(new Color(0x222222), new Color(0xffff00))

  const v1 = new Vector3(-100, 0, 100)
  const v2 = new Vector3(100, 0, -100)
  geometry.vertices.push(v1, v2)

  const line = new Line(geometry, material, LineSegments)

  scene.add(line)

  // light
  // const light = new DirectionalLight(0x0000ff, 1.0)
  // light.position.set(100, 100, 200)
  // scene.add(light)

  // camera
  const camera = new PerspectiveCamera(50, el.offsetWidth / el.offsetHeight, 0.1, 1000)
  camera.position.y = 500

  createRender(scene, el, camera)
}

export {
  init
}
