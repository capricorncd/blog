/**
 * Author: Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-01-09 22:30:23
*/
import * as PIXI from 'pixi.js'
import * as Types from '../types/index'
import { IMG_BG_FILE } from './constants'

/**
 * Getting Started
 * PIXI.Application
 */
export function gettingStarted(options: Types.IOptions) {
  const { canvas, width, height, resolution } = options
  const app = new PIXI.Application({
    view: canvas,
    width,
    height
  })

  const texture: PIXI.Texture = PIXI.Texture.from(IMG_BG_FILE)
  const imgSprite: PIXI.Sprite = new PIXI.Sprite(texture)

  imgSprite.x = app.renderer.width / 2
  imgSprite.y = app.renderer.height / 2
  imgSprite.anchor.x = 0.5
  imgSprite.anchor.y = 0.5

  app.stage.addChild(imgSprite)

  app.ticker.add(animete)

  function animete() {
    imgSprite.rotation += 0.1
  }
}
