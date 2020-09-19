/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-19 22:46
 */
import { AmbientLight, PointLight } from 'three'

export function createLight(scene, pointLightColor = 0xffffff, ambientLightColor = 0x444444) {
  // 创建点光源
  const pointLight = new PointLight(pointLightColor)
  // 设置点光源位置
  pointLight.position.set(400, 200, 300)
  // 添加点光源到场景中
  scene.add(pointLight)
  // 创建环境光
  const ambientLight = new AmbientLight(ambientLightColor)
  scene.add(ambientLight)
}
