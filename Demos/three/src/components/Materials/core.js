/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-20 00:01
 */
import {
  AxesHelper,
  Mesh,
  Scene,
  SphereGeometry,
  MeshNormalMaterial,
  // 基础材质，不受光照影响的材质
  MeshBasicMaterial,
  // lambert材质，受光照影响，漫反射
  MeshLambertMaterial,
  // 用于具有高光的有光泽表面的材质。
  // A material for shiny surfaces with specular highlights.
  // 受光照影响，高光材质
  MeshPhongMaterial
} from 'three'
import { createLight, createRender } from '../../utils'

// https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial
export function init(el) {
  const scene = new Scene()

  // MeshBasicMaterial
  let geometry = new SphereGeometry(50, 40, 40)
  let mesh = new Mesh(geometry, new MeshBasicMaterial({
    color: 0x003399
  }))
  mesh.translateX(0)
  scene.add(mesh)

  geometry = new SphereGeometry(50, 40, 40)
  mesh = new Mesh(geometry, new MeshBasicMaterial({
    color: 0x003399,
    // 线条模型
    wireframe: true
  }))
  mesh.translateX(105)
  scene.add(mesh)

  // MeshLambertMaterial
  geometry = new SphereGeometry(50, 40, 40)
  mesh = new Mesh(geometry, new MeshLambertMaterial({
    color: 0x999999,
    opacity: 0.8,
    transparent: true
  }))
  mesh.translateY(105)
  scene.add(mesh)

  geometry = new SphereGeometry(50, 40, 40)
  mesh = new Mesh(geometry, new MeshLambertMaterial({
    color: 0x999999,
    wireframe: true
  }))
  mesh.translateX(105)
  mesh.translateY(105)
  scene.add(mesh)

  // MeshPhongMaterial
  geometry = new SphereGeometry(50, 40, 40)
  mesh = new Mesh(geometry, new MeshPhongMaterial({
    color: 0xff0000,
    specular: 0x444444
    // shininess: 30
  }))
  mesh.translateY(-105)
  scene.add(mesh)

  geometry = new SphereGeometry(50, 40, 40)
  mesh = new Mesh(geometry, new MeshPhongMaterial({
    color: 0x999999,
    wireframe: true
  }))
  mesh.translateX(105)
  mesh.translateY(-105)
  scene.add(mesh)

  // MeshNormalMaterial
  geometry = new SphereGeometry(50, 40, 40)
  mesh = new Mesh(geometry, new MeshNormalMaterial({
    color: 0x999999,
    specular: 0x444444,
    shininess: 30
  }))
  mesh.translateX(-105)
  scene.add(mesh)

  geometry = new SphereGeometry(50, 40, 40)
  mesh = new Mesh(geometry, new MeshNormalMaterial({
    color: 0x999999,
    wireframe: true
  }))
  mesh.translateX(-210)
  // mesh.translateY(-105)
  scene.add(mesh)

  const axesHelper = new AxesHelper(2000)
  scene.add(axesHelper)

  createLight(scene)
  createRender(scene, el)
}
