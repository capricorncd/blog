/**
 * Author: Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-01-09 23:11:23
*/
import * as PIXI from 'pixi.js'
import * as Types from '../types/index'
import { IMG_BG_FILE, IMG_BG_FILE2 } from './constants'

export function textureLoadDemo(options: Types.IOptions): void {
  const { canvas, width, height } = options
  const app = new PIXI.Application({
    view: canvas,
    width,
    height
  })

  console.log('PIXI.utils.TextureCache:', PIXI.utils.TextureCache)

  const loader: PIXI.Loader = PIXI.Loader.shared
  loader.onComplete.add(handleLoadComplete)
  loader.onLoad.add(handleLoadAsset)
  loader.onError.add(handleLoadError)
  loader.onProgress.add(handleLoadProgress)

  // loader.add(file path)
  loader.add(IMG_BG_FILE)
  loader.add(IMG_BG_FILE2)
  loader.load()

  function handleLoadAsset(_loader: PIXI.Loader, resoure: PIXI.IResourceDictionary): void {
    console.log('asset loaded ' + resoure?.name)
  }

  function handleLoadError(): void {
    console.log('handleLoadError')
  }

  function handleLoadProgress(_loader: PIXI.Loader, resoure: any): void {
    console.log(_loader, resoure)
    console.log(_loader?.progress + '% loaded.')
  }

  let imgSprite: PIXI.Sprite

  function handleLoadComplete(): void {
    const texture: PIXI.Texture = loader.resources[IMG_BG_FILE].texture
    imgSprite = new PIXI.Sprite(texture)
    imgSprite.anchor.x = 0.5
    imgSprite.anchor.y = 0.5

    app.stage.addChild(imgSprite)
    app.ticker.add(animate)

    // change texture after 2 second
    setTimeout(() => {
      imgSprite.texture = loader.resources[IMG_BG_FILE2].texture
    }, 2000)
  }

  function animate(): void {
    imgSprite.x = app.renderer.screen.width / 2
    imgSprite.y = app.renderer.screen.height / 2
    imgSprite.rotation += 0.1
  }
}
