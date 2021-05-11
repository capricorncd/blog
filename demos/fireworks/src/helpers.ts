/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-10 20:18
 */
export function $(selector: string, el: HTMLElement | Document = document): HTMLElement[] {
  return Array.prototype.slice.apply(el.querySelectorAll(selector))
}

export function random(max: number, min = 0): number {
  return Math.random() * (max - min) + min
}

export function calcDistance(px1: number, py1: number, px2: number, py2: number): number {
  return Math.sqrt(Math.pow(px1 - px2, 2) + Math.pow(py1 - py2, 2))
}
