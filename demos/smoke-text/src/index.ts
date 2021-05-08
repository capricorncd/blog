/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-05-03 14:52:50
*/
import './style.scss'
import { RainListItem } from '@/types'

/**
 * 获取DOM元素
 * @param selector
 * @param el
 */
function $(selector: string, el: HTMLElement | Document = document): HTMLElement[] {
  return Array.prototype.slice.call(el.querySelectorAll(selector), 0)
}

/**
 * 添加mouseover事件处理
 * @param el
 */
function addEventListener(el: HTMLElement): void {
  $('span', el).forEach(span => {
    span.addEventListener('mouseover', () => {
      if (!span.classList.contains('active')) {
        span.classList.add('active')
        // remove active after 10s
        let timer = setTimeout(() => {
          span.classList.remove('active')
          clearTimeout(timer)
          // @ts-ignore
          timer = null
        }, 9000)
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

function resetRainAttrs($rain: HTMLElement, winWidth: number): void {
  $rain.style.left = winWidth * Math.random() + 'px'
  $rain.style.opacity = Math.random() + ''
  $rain.style.top = '-150px'
}

/**
 * rain
 */
function rain(): void {
  const $body = $('body')[0]

  let winWidth = window.innerWidth
  let winHeight = window.innerHeight

  window.addEventListener('resize', () => {
    winWidth = window.innerWidth
    winHeight = window.innerHeight
  })

  const rainElList: RainListItem[] = []
  let time = +new Date()

  function makeRain(): void {
    requestAnimationFrame(makeRain)

    if (+new Date() < time) return
    time += 50

    let rain = rainElList.find(item => !item.active) as RainListItem
    if (rain) {
      rain.active = true
      resetRainAttrs(rain.el, winWidth)
    } else {
      const $rain: HTMLElement = document.createElement('div')
      $rain.classList.add('rain')
      resetRainAttrs($rain, winWidth)
      $body.appendChild($rain)
      rain = {
        el: $rain,
        active: true
      }
      rainElList.push(rain)
    }

    let acceleration = 1

    // 雨滴下降动画和边界检测，超出屏幕外的元素移除
    let rainAnimeId: number | null = null
    function rainAnime(): void {
      rainAnimeId = requestAnimationFrame(rainAnime)
      let top = getStyleTopValue(rain.el)
      acceleration += 0.1
      top += Math.pow(acceleration, 2)
      rain.el.style.top = top + 'px'
      if (top > winHeight) {
        rain.active = false
        cancelAnimationFrame(rainAnimeId)
        rainAnimeId = null
      }
    }
    rainAnime()
  }
  makeRain()
}

rain()
