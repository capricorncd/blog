/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-03 17:40
 */
function $(selector, el = document) {
  return Array.prototype.slice.call(el.querySelectorAll(selector), 0)
}

function addEventListener(el) {
  $('span', el).forEach(span => {
    span.addEventListener('mouseover', () => {
      if (!span.classList.contains('active')) {
        span.classList.add('active')
        // remove active after 10s
        setTimeout(() => {
          span.classList.remove('active')
        }, 10000)
      }
    }, false)
  })
}

export function initAnimation(app) {
  const $app = $(app)[0]
  rain($app)
  const pTags = $app?.querySelectorAll('p')
  pTags.forEach(el => {
    el.innerHTML = el.innerText.replace(/\S/g, '<span>$&</span>')
    addEventListener(el)
  })
}

function getStyleTopValue(el) {
  const top = parseInt(el.style.top)
  return isNaN(top) ? 0 : top
}

function rain($app) {
  setInterval(() => {
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    const $rain = document.createElement('div')
    $rain.classList.add('rain')
    $rain.style.left = winWidth * Math.random() + 'px'
    $rain.style.opacity = Math.random() + ''
    $rain.style.top = '-150px'
    $app.appendChild($rain)

    let acceleration = 1

    // 雨滴下降动画和边界检测，超出屏幕外的元素移除
    const timer = setInterval(() => {
      let top = getStyleTopValue($rain)
      acceleration += 0.1
      top += Math.pow(acceleration, 2)
      $rain.style.top = top + 'px'
      if (top > winHeight) {
        $app.removeChild($rain)
        clearInterval(timer)
      }
    }, 10)
  }, 50)
}
