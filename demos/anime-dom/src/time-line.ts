/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-02-11 20:19
 */
import { STATE_INITIAL, STATE_START, STATE_STOP, DEFAULT_INTERVAL } from './constants'
import { StateType } from '~/types'

export class TimeLine {
  public animationHandler: number
  private state: StateType
  public interval: number
  public startTime: number
  public dur: number

  constructor() {
    this.animationHandler = 0
    this.state = STATE_INITIAL
    this.interval = 0
    this.startTime = 0
    this.dur = 0
  }

  onEnterFrame(time: number) {

  }

  start(interval: number) {
    if (this.state === STATE_START) return
    this.state = STATE_START

    this.interval = interval || DEFAULT_INTERVAL
    startTimeline(this, +new Date())
  }

  stop() {
    if (this.state !== STATE_START) return
    this.state = STATE_STOP

    // 如果动画开始过，则记录动画从开始到当前所经历的时间
    if (this.startTime) {
      this.dur = +new Date() - this.startTime
    }
    cancelAnimationFrame(this.animationHandler)
  }
}

function startTimeline(timeLine: TimeLine, startTime: number) {
// 记录上一次回调的时间戳
  let lastTick = +new Date()

  timeLine.startTime = startTime
  nextTick.interval = timeLine.interval
  nextTick()

  /**
   * 每一帧执行的函数
   */
  function nextTick() {
    const now = +new Date()

    timeLine.animationHandler = requestAnimationFrame(nextTick)

    // 如果当前时间与上一次回调的时间戳相差大于我们设置的间隔时间，表示可以执行一次回调函数。
    if (now - lastTick >= timeLine.interval) {
      timeLine.onEnterFrame(now - startTime)
      lastTick = now
    }
  }
}
