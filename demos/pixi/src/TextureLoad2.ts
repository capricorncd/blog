/**
 * Author: Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-01-09 23:11:23
*/
import * as PIXI from 'pixi.js'
import * as Types from '../types/index'
import { IMG_BG_FILE, IMG_BG_FILE2 } from './constants'

export function textureLoadDemo2(options: Types.IOptions): void {
  const { canvas, width, height } = options
  const app = new PIXI.Application({
    view: canvas,
    width,
    height
  })

  console.log(PIXI.utils.TextureCache)

  // https://pixijs.download/release/docs/PIXI.Loader.html
  const loader: PIXI.Loader = PIXI.Loader.shared

  // loader.add(custom texture name, file path)
  loader.add('bg', IMG_BG_FILE).add('bg2', IMG_BG_FILE2)

  const sprites: { [key: string]: PIXI.Sprite} = {}

  loader.load((loader: PIXI.Loader, resources) => {
    // resources is an object where the key is the name of the resource loaded and the value is the resource object.
    // They have a couple default properties:
    // - `url`: The URL that the resource was loaded from
    // - `error`: The error that happened when trying to load (if any)
    // - `data`: The raw data that was loaded
    // also may contain other properties based on the middleware that runs.
    // @ts-ignore
    sprites.bg = new PIXI.TilingSprite(resources.bg.texture)
    // @ts-ignore
    sprites.bg2 = new PIXI.TilingSprite(resources.bg2.texture)
  })

  loader.onProgress.add(handleLoadProgress)
  loader.onLoad.add(handleLoadAsset)
  loader.onError.add(handleLoadError)
  loader.onComplete.add(handleLoadComplete)

  let imgSprite: PIXI.Sprite

  function handleLoadAsset(_loader: PIXI.Loader, resoures: any): void {
    console.log('asset loaded ' + resoures?.name)
  }

  function handleLoadError(): void {
    console.log('handleLoadError')
  }

  function handleLoadProgress(_loader: PIXI.Loader, resoures: any): void {
    console.log(_loader, resoures)
    console.log(_loader?.progress + '% loaded.')
  }

  function handleLoadComplete(): void {
    // const texture: PIXI.Texture = loader.resources[IMG_BG_FILE].texture
    const texture: PIXI.Texture = loader.resources.bg.texture
    imgSprite = new PIXI.Sprite(texture)
    imgSprite.anchor.x = 0.5
    imgSprite.anchor.y = 0.5

    app.stage.addChild(imgSprite)

    app.ticker.add(animate)

    // texture change
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
