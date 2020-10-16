/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-19 22:16
 */
import {
  AxesHelper,
  BoxGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry,
  Mesh,
  MeshLambertMaterial,
  OctahedronGeometry, PointLight,
  Scene,
  SphereGeometry
} from 'three'
import { createLight, createRender } from '~/assets/utils'
import { COLORS } from '~/assets/constants/colors'

let scene, renderer

export function init(el) {
  scene = new Scene()

  // 长方体
  const boxGeometry = new BoxGeometry(100, 100, 100)
  const boxMesh = new Mesh(boxGeometry, new MeshLambertMaterial({ color: COLORS.second }))
  scene.add(boxMesh)

  // 球体
  const sphereGeometry = new SphereGeometry(50, 40, 40)
  const sphereMesh = new Mesh(sphereGeometry, new MeshLambertMaterial({ color: COLORS.third }))
  sphereMesh.translateX(100)
  scene.add(sphereMesh)

  // 圆柱体
  const cylinderGeometry = new CylinderGeometry(0, 30, 100, 30)
  const cylinderMesh = new Mesh(cylinderGeometry, new MeshLambertMaterial({ color: COLORS.third }))
  cylinderMesh.translateY(100)
  scene.add(cylinderMesh)

  // 正八面体
  const octahedronGeometry = new OctahedronGeometry(50)
  const octahedronMesh = new Mesh(octahedronGeometry, new MeshLambertMaterial({ color: COLORS.third }))
  octahedronMesh.translateX(-100)
  scene.add(octahedronMesh)

  // 正十二面体
  const dodecahedronGeometry = new DodecahedronGeometry(50)
  const dodecahedronMesh = new Mesh(dodecahedronGeometry, new MeshLambertMaterial({ color: COLORS.third }))
  // dodecahedronMesh.translateZ(100)
  dodecahedronMesh.position.set(0, 0, 100)
  scene.add(dodecahedronMesh)

  // 正二十面体
  const icosahedronGeometry = new IcosahedronGeometry(50)
  const icosahedronMesh = new Mesh(icosahedronGeometry, new MeshLambertMaterial({ color: COLORS.third }))
  icosahedronMesh.translateY(93)
  icosahedronMesh.translateX(100)
  scene.add(icosahedronMesh)

  const axesHelper = new AxesHelper(2000)
  scene.add(axesHelper)

  createLight(scene)

  // 再增加一个点光源，消除背光面死黑
  const pointLight = new PointLight(0x333333)
  pointLight.position.set(-200, -200, -200)
  scene.add(pointLight)

  renderer = createRender(scene, el)
}

export function destroy() {
  scene.remove()
  renderer.dispose()
  scene = null
  renderer = null
}
