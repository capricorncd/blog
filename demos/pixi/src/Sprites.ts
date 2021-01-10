/**
 * Author: Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-01-09 23:11:23
*/
import * as PIXI from 'pixi.js'
import * as Types from '../types/index'
import { IMG_BG_FILE, IMG_RABBIT_01, IMG_RABBIT_02 } from './constants'

export function spritesDemo(options: Types.IOptions): void {
  const { canvas, width, height } = options

  const app = new PIXI.Application({
    view: canvas,
    width,
    height
  })

  const texture: PIXI.Texture = PIXI.Texture.from(IMG_BG_FILE)
  const rabbitTexture1: PIXI.Texture = PIXI.Texture.from(IMG_RABBIT_01)
  const rabbitTexture2: PIXI.Texture = PIXI.Texture.from(IMG_RABBIT_02)

  const imgSprite: PIXI.Sprite = new PIXI.Sprite(texture)

  imgSprite.x = app.renderer.width / 2
  imgSprite.y = app.renderer.height / 2
  imgSprite.anchor.x = 0.5
  imgSprite.anchor.y = 0.5

  app.stage.addChild(imgSprite)
  app.ticker.add(animate)

  /**
   * 单独使用
   */
  const sprite1 = new PIXI.Sprite(rabbitTexture1)
  const sprite2 = new PIXI.Sprite(rabbitTexture2)
  const sprite3 = new PIXI.Sprite(rabbitTexture2)

  sprite1.x = 0
  sprite2.x = 120
  sprite3.x = 240

  /**
   * 单独使用
   */
  app.stage.addChild(sprite1)
  app.stage.addChild(sprite2)
  app.stage.addChild(sprite3)

  /**
   * 组合使用：放入一个容器中
   */
  const container = new PIXI.Container()
  app.stage.addChild(container)

  container.addChild(sprite1)
  container.addChild(sprite2)

  let delta = 0

  function animate(): void {
    delta += 0.1

    sprite1.y = 100 + Math.sin(delta) * 10

    imgSprite.x = app.renderer.screen.width / 2
    imgSprite.y = app.renderer.screen.height / 2
    imgSprite.rotation += 0.1
  }
}
