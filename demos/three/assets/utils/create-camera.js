/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-19 22:43
 */
import { OrthographicCamera } from 'three'

export function createOrthographicCamera(scene, width, height, rcf = 200) {
  // Aspect ratio
  // 宽高比
  const ar = width / height
  // 3D range control factor
  // 3D场景显示范围系数，系数值越大，显示范围越大
  // const rcf = 200
  // create camera
  // 创建相机
  const camera = new OrthographicCamera(-rcf * ar, rcf * ar, rcf, -rcf, 1, 1000)
  // 设置相机位置
  camera.position.set(200, 300, 200)
  // 设置相机方向
  camera.lookAt(scene.position)

  return camera
}
