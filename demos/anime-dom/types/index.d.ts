/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-02-11 17:26:56
*/
import { STATE_INITIAL, STATE_START, STATE_STOP } from '~/src/constants'

export interface IImageLoaderItem {
  url: string
  error?: ErrorEvent
}

export type StateType = typeof STATE_INITIAL | typeof STATE_START | typeof STATE_STOP

export interface IOptions {
  el: HTMLElement,
  positions: string[]
}
