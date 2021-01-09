/**
 * Author: Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-01-09 23:03:10
*/
import * as PIXI from 'pixi.js'
import * as Types from '../types/index'
import { IMG_BG_FILE } from './constants'

/**
 * Renderer, Ticker & Stage
 * PIXI.Application
 */
export function rendererDemo(options: Types.IOptions) {
  let { canvas, width, height, resolution } = options

  const renderer: PIXI.Renderer = new PIXI.Renderer({
    view: canvas,
    width,
    height,
    resolution,
    autoDensity: true
  })

  // resize
  window.addEventListener('resize', handleResize)

  function handleResize() {
    width = window.innerWidth
    height = window.innerHeight
    renderer.resize(width, height)
  }

  const stage: PIXI.Container = new PIXI.Container()

  const texture: PIXI.Texture = PIXI.Texture.from(IMG_BG_FILE)
  const imgSprite: PIXI.Sprite = new PIXI.Sprite(texture)

  imgSprite.anchor.x = 0.5
  imgSprite.anchor.y = 0.5
  stage.addChild(imgSprite)

  const ticker: PIXI.Ticker = new PIXI.Ticker()
  ticker.add(animete)
  ticker.start()

  function animete() {
    imgSprite.x = renderer.screen.width / 2
    imgSprite.y = renderer.screen.height / 2
    imgSprite.rotation += 0.1
    renderer.render(stage)
  }
}
