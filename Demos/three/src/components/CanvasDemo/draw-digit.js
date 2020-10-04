/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-04 16:54
 */
import { MATRIX_DIGITS } from '~/src/components/CanvasDemo/matrix'

const RADIUS = 5
const COE = (RADIUS + 1) * 2
const END_ANGLE = Math.PI * 2

/**
 * draw digit
 * @param context
 */
export function drawDigit(context) {
  context.fillStyle = '#67becf'
  new Array(10).fill(1).forEach((v, i) => {
    renderDigit(RADIUS + i * COE * 8, 600, i, context)
  })
  renderDigit(RADIUS + 10 * COE * 8, 600, ':', context)
}

export function renderDigit(x, y, num, context) {
  MATRIX_DIGITS[num].forEach((line, rowIndex) => {
    line.forEach((v, i) => {
      if (v === 1) {
        context.beginPath()
        context.arc(x + i * COE, y + rowIndex * COE, RADIUS, 0, END_ANGLE)
        context.closePath()
        context.fill()
      }
    })
  })
}
