/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-03 17:40
 */
function $(selector, el = document) {
  return Array.prototype.slice.call(el.querySelectorAll(selector), 0)
}

function addActiveClassName($el) {
  if (!$el.classList.contains('active')) {
    $el.classList.add('active')
    // remove active after 10s
    let timer = setTimeout(() => {
      $el.classList.remove('active')
      clearTimeout(timer)
      timer = null
    }, 9000)
  }
}

function addEventListener(el) {
  $('span', el).forEach(span => {
    span.addEventListener('mouseover', () => {
      addActiveClassName(span)
    }, false)
  })
}

export function initAnimation(app) {
  const $app = $(app)[0]
  const pTags = $app?.querySelectorAll('p')
  pTags.forEach(el => {
    el.innerHTML = el.innerText.replace(/\S/g, '<span>$&</span>')
    addEventListener(el)
  })

  rain($app)
}

function getStyleTopValue(el) {
  const top = parseInt(el.style.top)
  return isNaN(top) ? 0 : top
}

/**
 * 获取span的位置信息
 * @param $app
 * @return {{}}
 */
function getSpansRect($app) {
  return $('span', $app).map(el => {
    const { x, y, width, height } = el.getBoundingClientRect()
    return {
      el,
      x1: x,
      y1: y,
      x2: x + width,
      y2: y + height
    }
  })
}

/**
 * 雨滴和span文字碰撞处理
 * @param $rain
 * @param spanPositions
 */
function handleCollisions($rain, spanPositions) {
  const { x, y } = $rain.getBoundingClientRect()
  let item
  for (let i = 0; i < spanPositions.length; i++) {
    item = spanPositions[i]
    if (x >= item.x1 && x <= item.x2 && y >= item.y1 && y <= item.y2) {
      addActiveClassName(item.el)
      break
    }
  }
}

/**
 * 雨滴下落处理
 * @param rain
 * @param spanPositions
 * @param winWidth
 * @param bannerHeight
 * @param $app
 */
function fallingAnimation(rain, spanPositions, winWidth, bannerHeight, $app) {
  let acceleration = 1
  const $rain = rain.el
  // 雨滴下降动画和边界检测，超出屏幕外的元素移除
  let animeId = null
  function anime() {
    animeId = requestAnimationFrame(anime)
    let top = getStyleTopValue($rain)
    acceleration += 0.2
    top += Math.pow(acceleration, 2)
    $rain.style.top = top + 'px'

    handleCollisions($rain, spanPositions)

    if (top > bannerHeight) {
      cancelAnimationFrame(animeId)
      animeId = null
      rain.active = false
    }
  }
  anime()
}

function createRain($app, winWidth) {
  const $rain = document.createElement('div')
  $rain.classList.add('rain')
  $rain.style.left = winWidth * Math.random() + 'px'
  $rain.style.opacity = Math.random() + ''
  $rain.style.top = '-150px'
  $app.appendChild($rain)
  return {
    el: $rain,
    active: true
  }
}

/**
 * 雨滴生成及动画
 * @param $app
 */
function rain($app) {
  let winWidth = window.innerWidth
  let bannerHeight = $app.offsetHeight

  let spanPositions = getSpansRect($app)
  // resize
  window.addEventListener('resize', () => {
    winWidth = window.innerWidth
    bannerHeight = $app.offsetHeight
    spanPositions = getSpansRect($app)
  })

  const rainList = []

  let time = 0
  const startTime = +new Date()
  // create rains
  function createRainAnime() {
    requestAnimationFrame(createRainAnime)

    if (+new Date() - startTime < time) return

    time += 50
    let rain = rainList.find(item => !item.active)
    if (rain) {
      rain.active = true
      rain.el.style.top = '-150px'
      rain.el.style.left = winWidth * Math.random() + 'px'
      rain.el.style.opacity = Math.random() + ''
    } else {
      rain = createRain($app, winWidth)
      rainList.push(rain)
    }

    fallingAnimation(rain, spanPositions, winWidth, bannerHeight, $app)
  }

  createRainAnime()
}
