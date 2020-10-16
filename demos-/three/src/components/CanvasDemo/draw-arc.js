/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-04 14:57
 */
// context.arc(
//   centerX, centerY, radius,
//   startingAngle, endingAngle,
//   // 顺时针 or 逆时针
//   anticlockwise = false
// )

const arr = new Array(9).fill(1)
const COEFFICIENT = 0.25

export function drawArc(context) {
  // context.beginPath()
  context.lineWidth = 3
  // context.strokeStyle = '#67becf'
  // context.arc(150, 150, 50, 0, 1.5 * Math.PI)
  // context.stroke()

  context.strokeStyle = '#ef3d61'
  arr.forEach((v, i) => {
    context.beginPath()
    context.arc(115 * i, 55, 50, 0, COEFFICIENT * i * Math.PI, true)
    context.stroke()
  })

  // closePath
  arr.forEach((v, i) => {
    context.beginPath()
    context.arc(115 * i, 160, 50, 0, COEFFICIENT * i * Math.PI, true)
    context.closePath()
    context.stroke()
  })

  arr.forEach((v, i) => {
    context.beginPath()
    context.arc(115 * i, 265, 50, 0, COEFFICIENT * i * Math.PI, false)
    context.stroke()
  })

  // closePath
  arr.forEach((v, i) => {
    context.beginPath()
    context.arc(115 * i, 370, 50, 0, COEFFICIENT * i * Math.PI, false)
    context.closePath()
    context.stroke()
  })

  context.fillStyle = '#ef3d61'
  arr.forEach((v, i) => {
    context.beginPath()
    context.arc(115 * i, 475, 50, 0, COEFFICIENT * i * Math.PI, false)
    context.fill()
  })
}
