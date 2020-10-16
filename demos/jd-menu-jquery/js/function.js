/**
 * Create by Capricorncd
 * https://github.com/capricorncd
 */

// 位运算
function sameSign(a, b) {
  return (a ^ b) >= 0
}

// 向量
function vector(a, b) {
  // 终点坐标，减去起点坐标
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

// 向量叉乘公式
function vectorProduct(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y
}

function isPointInTrangle(p, a, b, c) {
  var pa = vector(p, a)
  var pb = vector(p, b)
  var pc = vector(p, c)

  var t1 = vectorProduct(pa, pb)
  var t2 = vectorProduct(pb, pc)
  var t3 = vectorProduct(pc, pa)

  return sameSign(t1, t2) && sameSign(t2, t3)
}

function needDelay(el, leftCorneer, currMousePos) {
  var offset = el.offset()
  var topLeft = {
    x: offset.left,
    y: offset.top
  }
  var bottomLeft = {
    x: offset.left,
    y: offset.top + el.height()
  }

  return isPointInTrangle(currMousePos, leftCorneer, topLeft, bottomLeft)
}
