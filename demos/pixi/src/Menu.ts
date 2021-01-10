/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-01-10 19:17
 */
import * as Types from '../types/index'

export function menuView(list: string[], query: Types.IAnyObject): void {
  const innerHtml: string[] = list.map((item, i: number) => {
    return `<a href="?type=${i}" class="${query.type === i ? 'is-active' : ''}">${item}</a>`
  })
  const el: HTMLDivElement = document.createElement('div')
  el.className = 'menu-wrapper'

  // github
  innerHtml.push('<a href="https://github.com/capricorncd/blog/tree/master/demos/pixi" target="_blank">Github</a>')

  el.innerHTML = innerHtml.join('')
  document.body.appendChild(el)
}
