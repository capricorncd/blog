/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-18 09:24
 */
import {
  // BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  Scene,
  SphereGeometry, WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createLight, createOrthographicCamera } from '../../utils'

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
  // const boxGeometry = new BoxGeometry(100, 100, 100)

  // create material
  // 创建材质
  const material = new MeshLambertMaterial({
    color: 0xff9999
  })

  // create mesh
  // 创建网格
  const meshSphere = new Mesh(sphereGeometry, material)
  // const meshBox = new Mesh(boxGeometry, material)

  // append to scene
  // 将网格对象添加到场景中
  scene.add(meshSphere)
  // scene.add(meshBox)

  /**
   * light
   * 光源
   */
  createLight(scene, 0xdd9999, 0xdd6666)

  /**
   * camera
   * 相机设置
   */
  const width = el.offsetWidth
  const height = el.offsetHeight

  const camera = createOrthographicCamera(scene, width, height)
  /**
   * create render
   * 创建渲染器
   */
  const renderer = new WebGLRenderer()
  // 设置渲染区域尺寸
  renderer.setSize(width, height)
  // 设置背景颜色
  renderer.setClearColor(0xff9999, 0.7)

  el.appendChild(renderer.domElement)

  const orbitControls = new OrbitControls(camera, el)
  orbitControls.addEventListener('change', render)

  // 执行渲染，指定场景和相机作为参数
  function render() {
    renderer.render(scene, camera)
  }

  render()
}

export {
  init
}
