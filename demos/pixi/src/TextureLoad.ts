/**
 * Author: Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-01-09 23:11:23
*/
import * as PIXI from 'pixi.js'
import { on } from 'process'
import * as Types from '../types/index'
import { IMG_BG_FILE, IMG_BG_FILE2 } from './constants'

export function textureLoadDemo(options: Types.IOptions) {
  const { canvas, width, height } = options
  const app = new PIXI.Application({
    view: canvas,
    width,
    height
  })

  console.log(PIXI.utils.TextureCache)

  const loader: PIXI.Loader = PIXI.Loader.shared
  //   loader.onComplete.add(handleLoadComplete)
  //   loader.onLoad.add(handleLoadAsset)
  //   loader.onError.add(handleLoadError)
  //   loader.onProgress.add(handleLoadProgress)

  // loader.add(file path)
  //   loader.add(IMG_BG_FILE)
  //   loader.add(IMG_BG_FILE2)
  //   loader.load()

  // loader.add(custom name, file path)
  loader.add('bg', IMG_BG_FILE)
  // .add('bg2', IMG_BG_FILE2)
    .on('progress', handleLoadProgress)
    .on('load', handleLoadAsset)
    .on('error', handleLoadError)
    .load(handleLoadComplete)

  let imgSprite: PIXI.Sprite

  function handleLoadAsset(_loader: any, resoures: any) {
    console.log('asset loaded ' + resoures?.name)
  }

  function handleLoadError() {
    console.log('handleLoadError')
  }

  function handleLoadProgress(_loader: any, resoures: any) {
    console.log(_loader, resoures)
    console.log(_loader?.progress + '% loaded.')
  }

  function handleLoadComplete() {
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

  function animate() {
    imgSprite.x = app.renderer.screen.width / 2
    imgSprite.y = app.renderer.screen.height / 2
    imgSprite.rotation += 0.1
  }
}
