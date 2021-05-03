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
