/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 21:32
 */
import {
  PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh, WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let camera, scene, mesh, renderer

function createObject(el) {
  const width = el.offsetWidth
  const height = el.offsetHeight
  camera = new PerspectiveCamera(70, width / height, 0.01, 10)
  camera.position.z = 0.5

  scene = new Scene()

  const geometry = new BoxGeometry(0.2, 0.2, 0.2)
  const material = new MeshNormalMaterial()

  mesh = new Mesh(geometry, material)
  scene.add(mesh)

  renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  // set background color
  renderer.setClearColor(0x333333)

  el.appendChild(renderer.domElement)

  // create orbit controls, rotate, scale etc.
  /* eslint-disable no-new */
  new OrbitControls(camera, el)
}

function animate() {
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02

  renderer.render(scene, camera)
}

export function init(el) {
  createObject(el)
  animate()
}
