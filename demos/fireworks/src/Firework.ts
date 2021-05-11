/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-10 20:21
 */
import { calcDistance, random } from '@/helpers'
import { Particle } from '@/Particle'
import { FireworkOptions } from '../types'

export class Firework {
  private x: number;
  private y: number;
  private readonly startX: number;
  private readonly startY: number;
  private readonly targetX: number;
  private readonly targetY: number;
  private readonly distanceTarget: number;
  private distanceTraveled: number;
  private readonly angle: number;
  private speed: number;
  private readonly brightness: number;
  private readonly acceleration: number;
  private targetRadius: number;
  private readonly coordinateCount: number;
  private readonly coordinates: number[][];
  private readonly ctx: CanvasRenderingContext2D;
  private readonly options: FireworkOptions;
  private hue: number;

  constructor(options: FireworkOptions) {
    this.options = options
    const { x, y, targetX, targetY, ctx } = options
    this.ctx = ctx
    this.x = x
    this.y = y

    this.startX = x
    this.startY = y

    this.targetX = targetX
    this.targetY = targetY

    this.distanceTarget = calcDistance(x, y, targetX, targetY)
    // 烟花已走路程
    this.distanceTraveled = 0
    // 反三角函数计算烟花倾斜角
    this.angle = Math.atan2(targetY - y, targetX - x)

    this.speed = 2
    this.acceleration = 1.05
    // 烟花亮度
    this.brightness = random(70, 50)
    // 烟花到达指定位置小圆半径
    this.targetRadius = 1
    // 烟花的3个阶段
    this.coordinateCount = 3
    this.coordinates = []

    while (this.coordinateCount--) {
      this.coordinates.push([x, y])
    }

    this.hue = random(120, 50)
  }

  draw(): void {
    const { ctx } = this.options
    const [moveToX = 0, moveToY = 0] = this.coordinates[this.coordinates.length - 1]
    ctx.beginPath()
    ctx.moveTo(moveToX, moveToY)
    ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.targetX, this.targetY, this.targetRadius, 0, Math.PI * 2)
    ctx.stroke()
  }

  update(index: number, fireworks: Firework[]): void {
    this.coordinates.pop()
    this.coordinates.unshift([this.x, this.y])

    if (this.targetRadius < 8) {
      this.targetRadius += 0.3
    } else {
      this.targetRadius = 1
    }

    this.speed *= this.acceleration
    // 坐标偏移量
    const vx = Math.cos(this.angle) * this.speed
    const vy = Math.sin(this.angle) * this.speed

    this.distanceTraveled = calcDistance(this.startX, this.startY, this.x + vx, this.y + vy)
    if (this.distanceTraveled >= this.distanceTarget) {
      fireworks.splice(index, 1)
      this.createParticles()
    } else {
      this.x += vx
      this.y += vy
    }
  }

  createParticles(): void {
    const { targetX, targetY, ctx, particles } = this.options
    let count = 50
    while (count--) {
      particles.push(new Particle({
        x: targetX,
        y: targetY,
        hue: this.hue,
        ctx
      }))
    }
  }
}
