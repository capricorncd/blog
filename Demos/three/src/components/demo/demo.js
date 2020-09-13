/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 21:32
 */
import * as THREE from 'three'
let camera, scene, renderer
let geometry, material, mesh

function init(el, width, height) {
  camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
  camera.position.z = 0.5

  scene = new THREE.Scene()

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  material = new THREE.MeshNormalMaterial()
  // material = new THREE.MeshBasicMaterial({ color: '#999' })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  el.appendChild(renderer.domElement)
}

function animate() {
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02

  renderer.render(scene, camera)
}

export function demo(el, width, height) {
  init(el, width, height)
  animate()
}
