/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-04 13:09
 */
const MARGIN = 5

/**
 * draw Geometry
 * @param context
 * @param width
 * @param height
 * ## 路径绘制：
 * context.moveTo(x, y); context.lineTo(x, y);
 * context.beginPath(); context.closePath();
 * ## 描边或填充
 * context.[lineWidth, strokeStyle, fillStyle]
 * context.[stroke, fill]
 */
export function drawLine(context, width, height) {
  // 工作原理，根据状态绘图
  // 即：先设置状态，再绘制
  // 状态设置：
  context.beginPath()
  context.moveTo((100 - MARGIN) / 2, height - MARGIN)
  context.lineTo(100 - MARGIN, height - MARGIN)
  context.lineTo(MARGIN, height - 100)
  context.lineTo(MARGIN, height - MARGIN)
  context.lineTo((100 - MARGIN) / 2, height - MARGIN)
  context.lineWidth = 10
  context.strokeStyle = '#330000' // 不支持十六进制写法 0xffff00
  // 绘制：
  context.stroke()
  // 填充
  context.fillStyle = 'rgb(10, 200, 10)'
  context.fill()
  context.closePath()

  context.beginPath()
  context.moveTo((100 - MARGIN * 2) / 2, MARGIN)
  context.lineTo(100 - MARGIN * 2, MARGIN)
  context.lineTo(MARGIN, height - 430)
  context.lineTo(MARGIN, MARGIN)
  context.lineTo((100 - MARGIN * 2) / 2, MARGIN)
  context.lineWidth = 10
  context.strokeStyle = '#33ccff' // 不支持十六进制写法 0xffff00
  // 绘制：
  context.stroke()
  // 填充
  context.fillStyle = 'rgb(255, 200, 10)'
  context.fill()
  context.closePath()
}

export function drawTangram(context, width, height) {
  const TANGRAM_DATA = [
    { p: [[0, 0], [8, 0], [4, 4]], color: '#caff67' },
    { p: [[0, 0], [4, 4], [0, 8]], color: '#67becf' },
    { p: [[8, 0], [8, 4], [6, 6], [6, 2]], color: '#ef3d61' },
    { p: [[6, 2], [6, 6], [4, 4]], color: '#f9f51a' },
    { p: [[4, 4], [6, 6], [4, 8], [2, 6]], color: '#a594c0' },
    { p: [[2, 6], [4, 8], [0, 8]], color: '#fa8ecc' },
    { p: [[8, 4], [8, 8], [4, 8]], color: '#f6ca29' }
  ]

  const coefficient = 40
  // 右上角显示
  const offsetX = width - 8 * coefficient
  const offsetY = 0

  TANGRAM_DATA.forEach(item => {
    _drawTangram(item, context, coefficient, offsetX, offsetY)
  })
}

function _drawTangram(item, context, coefficient, offsetX = 0, offsetY = 0) {
  context.beginPath()

  item.p.forEach(([x, y], i) => {
    x = x * coefficient + offsetX
    y = y * coefficient + offsetY
    if (i === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  })
  context.closePath()

  context.fillStyle = item.color
  context.fill()
}
