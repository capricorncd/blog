/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-11 20:09
 */
import { random } from '@/helpers'
import { ParticleOptions } from '../types'

export class Particle {
  private readonly options: ParticleOptions;
  private x: number;
  private y: number;
  private readonly angle: number;
  private speed: number;
  private readonly friction: number;
  private readonly gravity: number;
  private hue: number;
  private readonly brightness: number;
  private alpha: number;
  private readonly decay: number;
  private readonly coordinates: number[][];
  private readonly coordinateCount: number;
  constructor(options: ParticleOptions) {
    this.options = options
    const { x, y, hue } = options
    this.x = x
    this.y = y

    this.angle = random(Math.PI * 2)
    this.speed = random(10, 1)
    // 摩擦系数
    this.friction = 0.95
    // 重力加速度
    this.gravity = 1
    // hls灰度值
    this.hue = random(hue + 20, hue - 20)
    // 亮度
    this.brightness = random(80, 50)
    this.alpha = 1
    // 亮度衰变率
    this.decay = random(0.03, 0.015)

    this.coordinates = []
    // 颗粒路径分成5段
    this.coordinateCount = 5

    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y])
    }
  }

  draw(): void {
    const { ctx, hue } = this.options
    const [moveToX = 0, moveToY = 0] = this.coordinates[this.coordinates.length - 1]
    ctx.beginPath()
    ctx.moveTo(moveToX, moveToY)
    ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%, ${this.alpha})`
    ctx.stroke()
  }

  update(index: number, particles: Particle[]): void {
    this.coordinates.pop()
    this.coordinates.unshift([this.x, this.y])
    // 减速
    this.speed *= this.friction
    // 坐标偏移量
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed + this.gravity

    this.alpha -= this.decay

    if (this.alpha <= 0) {
      particles.splice(index, 1)
    }
  }
}
