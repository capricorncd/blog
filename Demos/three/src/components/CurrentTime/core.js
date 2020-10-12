/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-04 17:47
 */
import { renderDigit } from '../CanvasDemo/draw-digit'
import { randomColor, formatDate } from './helper'
import { MATRIX_DIGITS } from '../CanvasDemo/matrix'

const COLOR = '#24292e'
const RADIUS = 5
const COE = (RADIUS + 1) * 2
const END_ANGLE = Math.PI * 2
// 摩擦系数
const frictionCoefficient = 0.6

let balls = []

let timeArray, marginTop

export function render(context, width, height) {
  marginTop = height / 4
  // Calculate the horizontal center position
  const offsetLeft = (width - 58 * (RADIUS + 1) * 2) / 2
  context.fillStyle = COLOR
  let str = ''
  context.clearRect(0, 0, width, height)
  let coe = 0
  str = formatDate(new Date())
  if (!timeArray) {
    timeArray = str.split('')
  }
  str.split('').forEach((v, i) => {
    renderDigit(offsetLeft + coe * (RADIUS + 1) * 2, marginTop, v, context)
    // 当前位置数字有变化时
    if (timeArray[i] !== v) {
      addBall(offsetLeft + coe * (RADIUS + 1) * 2, marginTop, v)
    }
    // 0-9 矩阵列数为7，+ 1个间隔 = 8
    // : 矩阵列数为4，+ 1个间隔 = 5
    coe += v === ':' ? 5 : 8
  })

  // 保存当前时间，第二次render时对比变化
  timeArray = str.split('')

  // balls
  balls.forEach(item => {
    createBall(item, context, width, height)
  })

  // 移除滚出画面的小球
  balls = balls.filter(item => {
    return item.x + RADIUS > 0 && item.x - RADIUS < width
  })
  // console.log(balls.length)
}

/**
 * add ball
 * @param x
 * @param y
 * @param num
 */
function addBall(x, y, num) {
  MATRIX_DIGITS[num].forEach((line, rowIndex) => {
    line.forEach((v, i) => {
      if (v === 0) {
        balls.push({
          x: x + i * COE,
          y: y + rowIndex * COE,
          g: 0.2 + Math.random(),
          vx: Math.pow(-1, Math.ceil(1000 * Math.random())) * 4 * Math.random(),
          vy: -5,
          color: randomColor()
        })
      }
    })
  })
}

/**
 * create ball
 * @param ball
 * @param context
 * @param width
 * @param height
 */
function createBall(ball, context, width, height) {
  ball.x += ball.vx
  ball.y += ball.vy
  ball.vy += ball.g

  if (ball.y >= height - RADIUS) {
    ball.y = height - RADIUS
    ball.vy = -ball.vy * frictionCoefficient
  }

  context.fillStyle = ball.color
  context.beginPath()
  context.arc(ball.x, ball.y, RADIUS, 0, END_ANGLE)
  context.closePath()

  context.fill()
}
