/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-01-09 20:51:23
*/
import './style.scss'
import { gettingStarted } from './Application'
import { rendererDemo } from './Renderer'
import { textureLoadDemo } from './TextureLoad'
import { textureLoadDemo2 } from './TextureLoad2'
import { spritesDemo } from './Sprites'
import { menuView } from './Menu'
import { getQuery } from './helper'
import * as Types from '../types/index'

const canvas: HTMLCanvasElement = document.createElement('canvas')

document.querySelector('#app')?.appendChild(canvas)

const winWidth = window.innerWidth
const winHeight = window.innerHeight
const resolution = window.devicePixelRatio

const options: Types.IOptions = {
  canvas, width: winWidth, height: winHeight, resolution
}

const query = getQuery()
if (typeof query.type === 'undefined') {
  query.type = 0
}

console.log('query:', query)

switch (query.type) {
  case 1:
    gettingStarted(options)
    break
  case 2:
    textureLoadDemo(options)
    break
  case 3:
    textureLoadDemo2(options)
    break
  case 4:
    spritesDemo(options)
    break
  default:
    rendererDemo(options)
}

menuView([
  'Renderer',
  'Getting Started',
  'Texture Load1',
  'Texture Load2',
  'Sprites'
], query)
