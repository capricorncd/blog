/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-02-11 17:32
 */
import { IImageLoaderItem } from '~/types'

/**
 * image loader
 * @param list
 * @param processHandler
 */
export function imageLoader(list: string[], processHandler?: (percentage: number) => void): Promise<IImageLoaderItem[]> {
  return new Promise((resolve, reject) => {
    const len = list.length
    const arr: IImageLoaderItem[] = new Array(len)
    let count = 0
    list.forEach((url, index) => {
      let img: HTMLImageElement | null = new Image()
      img.addEventListener('load', () => {
        arr[index] = {
          url
        }
        _count()
        img = null
      })
      img.addEventListener('error', (e: ErrorEvent) => {
        arr[index] = {
          url,
          error: e
        }
        _count()
        img = null
      })
      img.src = url
    })

    function _count() {
      count++
      if (typeof processHandler === 'function') {
        processHandler(count / len * 100)
      }
      if (count === len) {
        arr.some(item => item.error) ? reject(arr) : resolve(arr)
      }
    }
  })
}
