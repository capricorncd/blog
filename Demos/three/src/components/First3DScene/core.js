/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-18 09:24
 */
import {
  Mesh,
  MeshLambertMaterial,
  Scene,
  SphereGeometry
} from 'three'

import { createLight, createRender } from '../../utils'

/**
 * 初始化
 * @param el 父DOM元素
 */
function init(el) {
  // create scene
  // 创建一个场景
  const scene = new Scene()

  /**
   * create mesh model
   * 创建网格模型
   * Geometry and Material
   * 几何体和材质
   */
  // create geometry
  // 创建几何体
  const sphereGeometry = new SphereGeometry(60, 100, 100)

  // create material
  // 创建材质
  const material = new MeshLambertMaterial({
    color: 0xff9999
  })

  // create mesh
  // 创建网格
  const meshSphere = new Mesh(sphereGeometry, material)

  // append to scene
  // 将网格对象添加到场景中
  scene.add(meshSphere)

  /**
   * light
   * 光源
   */
  createLight(scene, 0xdd9999, 0xdd6666)

  /**
   * create render
   * 创建渲染器
   */
  createRender(scene, el)
}

export {
  init
}
