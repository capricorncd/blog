/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-02-11 19:05
 */
export function $(selector: string): HTMLElement | null {
  return document.querySelector(selector)
}

export function showEl(selector: string): void {
  const el = $(selector)
  if (!el) return
  el.style.display = 'flex'
  el.style.opacity = '1'
}

export function hideEl(selector: string, time = 500): void {
  const el = $(selector)
  if (!el) return
  el.style.opacity = '0'
  let timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
    el.style.display = 'none'
    timer && clearTimeout(timer)
    timer = null
  }, time)
}

export function createRabbit(parent: HTMLElement): HTMLElement {
  const el = document.createElement('section')
  el.className = 'rabbit'
  const section = document.createElement('section')
  section.appendChild(el)
  parent.appendChild(section)
  return el
}
