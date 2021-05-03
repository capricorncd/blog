/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-05-03 14:52:50
*/
import './style.scss'

function $(selector: string, el: HTMLElement | Document = document): HTMLElement[] {
  return Array.prototype.slice.call(el.querySelectorAll(selector), 0)
}

function addEventListener(el: HTMLElement): void {
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

function init(): void {
  const $app = $('#app')[0]
  const pTags = $app?.querySelectorAll('p')
  pTags.forEach(el => {
    el.innerHTML = el.innerText.replace(/\S/g, '<span>$&</span>')
    addEventListener(el)
  })
}

init()

function getStyleTopValue(el: HTMLElement): number {
  const top = parseInt(el.style.top)
  return isNaN(top) ? 0 : top
}

function rain(): void {
  const $body = $('body')[0]

  setInterval(() => {
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    const $rain = document.createElement('div')
    $rain.classList.add('rain')
    $rain.style.left = winWidth * Math.random() + 'px'
    $rain.style.opacity = Math.random() + ''
    $rain.style.top = '-150px'
    $body.appendChild($rain)

    // 雨滴下降动画和边界检测，超出屏幕外的元素移除
    const timer = setInterval(() => {
      let top = getStyleTopValue($rain)
      top += 5 + Math.pow(2, 2)
      $rain.style.top = top + 'px'
      if (top > winHeight) {
        $body.removeChild($rain)
        clearInterval(timer)
      }
    }, 10)
  }, 50)
}

rain()
