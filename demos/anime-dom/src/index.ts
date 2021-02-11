/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-02-11 17:26:56
*/
import { imageLoader } from './source-loader'
import { $, createRabbit, hideEl, showEl } from './helper'
import { IImageLoaderItem } from '~/types'
import { IMAGE_SOURCES, RIGHT_RUNNING_POSITIONS } from './constants'
import { AnimeDom } from './anime-dom'
import './style.scss'

function run() {
  showEl('.loading')
  const el = $('#app')
  const anime = new AnimeDom()

  // loading
  const loadInnerEl = $('.loading .text')

  // show loading process
  function per(per: number): void {
    if (loadInnerEl) {
      loadInnerEl.innerHTML = `${per.toFixed(0)}%`
    }
  }

  const rabbitA = createRabbit(el as HTMLElement)

  // load images
  imageLoader(IMAGE_SOURCES, per).then((res: IImageLoaderItem[]) => {
    console.log(res)
    hideEl('.loading')
    console.log(rabbitA)
    rabbitA.style.backgroundImage = `url(${res[0].url})`
    anime.changePosition(rabbitA, RIGHT_RUNNING_POSITIONS).repeatForever()
    anime.start(80)
  }).catch(err => {
    console.error(err)
    hideEl('.loading')
  })
}

run()
