/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-02-11 20:08
 */
import { DEFAULT_INTERVAL, STATE_INITIAL, STATE_START, STATE_STOP } from './constants'
import { StateType, IOptions } from '~/types'

export class AnimeDom {
  private state: StateType
  private interval: number
  public el: HTMLElement
  private positions: string[]
  private runTime: number;
  private startTime: number;
  public animeId: number | null
  private changeLoop: number;

  constructor(options: IOptions) {
    this.state = STATE_INITIAL
    this.interval = DEFAULT_INTERVAL
    this.el = options.el
    this.positions = options.positions || []
    this.runTime = 0
    this.startTime = 0
    this.animeId = null
    this.changeLoop = 0
  }

  changePosition(): void {
    const el = this.el
    const positions = this.positions
    const len = positions.length
    const lastIndex = len - 1
    if (len) {
      const index = Math.min(Math.abs((this.runTime - this.changeLoop * lastIndex * this.interval) / this.interval) % lastIndex | 0, lastIndex)
      // console.log(len, index)
      const [x, y] = positions[index].split(' ')
      if (index === lastIndex) this.changeLoop++
      el.style.backgroundPosition = `${x}px ${y}px`
    }
  }

  setPositions(positions: string[], imgUrl?: string) {
    if (imgUrl) {
      this.el.style.backgroundImage = `url(${imgUrl})`
      // this.runTime = 0
      // this.changeLoop = 0
      // this.startTime = +new Date()
    }
    if (this.positions === positions) return
    this.positions = positions
  }

  start(interval: number, callback: (ad: AnimeDom) => void): void {
    if (this.state === STATE_START) return
    this.state = STATE_START

    if (interval) this.interval = interval

    let lastTick = +new Date()
    this.startTime = +new Date() - this.runTime
    // this.changeLoop = 0

    const anime = () => {
      const now = +new Date()
      this.changePosition()
      this.animeId = requestAnimationFrame(anime)
      if (now - lastTick >= this.interval) {
        this.runTime = now - this.startTime
        lastTick = now
        callback(this)
      }
    }

    anime()
  }

  pause(): this {
    if (this.state === STATE_START) {
      this.state = STATE_STOP
    }
    if (this.animeId) {
      cancelAnimationFrame(this.animeId)
    }
    return this
  }

  isStart(): boolean {
    return this.state === STATE_START
  }

  dispose(): this {
    if (this.state !== STATE_INITIAL) {
      this.state = STATE_INITIAL
    }
    return this
  }
}
