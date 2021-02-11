/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-02-11 20:08
 */
import { TimeLine } from './time-line'
import { DEFAULT_INTERVAL, STATE_INITIAL, STATE_START, TASK_ASYNC, TASK_SYNC } from './constants'
import { ITaskQueueItem, StateType, TaskFn, TaskType } from '~/types'

function next(callback: TaskFn) {
  callback && callback()
}

export class AnimeDom {
  private taskQueue: ITaskQueueItem[]
  private state: StateType
  private index: number
  private timeLine: TimeLine
  private interval: number

  constructor() {
    this.taskQueue = []
    this.state = STATE_INITIAL
    this.index = 0
    this.timeLine = new TimeLine()
    this.interval = DEFAULT_INTERVAL
  }

  changePosition(el: HTMLElement, positions: string[]) {
    const len = positions.length
    let taskFn: TaskFn
    let type: TaskType
    if (len) {
      taskFn = (next: TaskFn, time: number) => {
        const index = Math.min(time / this.interval | 0, len)
        const [x, y] = positions[index - 1].split(' ')
        el.style.backgroundPosition = `${x}px ${y}px`
        if (index === len) {
          next()
        }
      }
      type = TASK_ASYNC
    } else {
      taskFn = next
      type = TASK_SYNC
    }
    return this._add(taskFn, type)
  }

  repeatForever() {
    return this.repeat()
  }

  repeat(times?: number) {
    const taskFn = () => {
      if (typeof times === 'undefined') {
        // 无限回退到上一个任务
        this.index--
        this._runTask()
        return
      }
      if (times) {
        times--
        // 回退到上一个任务
        this.index--
        this._runTask()
      } else {
        // 达到重复执行次数，则跳转到下一个任务
        const task = this.taskQueue[this.index]
        this._next(task)
      }
    }

    return this._add(taskFn, TASK_SYNC)
  }

  start(interval: number): AnimeDom {
    if (this.state === STATE_START || this.emptyTask()) {
      return this
    }
    this.state = STATE_START
    this.interval = interval
    this._runTask()
    return this
  }

  dispose() {
    if (this.state !== STATE_INITIAL) {
      this.state = STATE_INITIAL
      // this.taskQueue = null
      this.timeLine.stop()
      // this.timeLine = null
      this.taskQueue.length = 0
    }
    return this
  }

  emptyTask() {
    return !this.taskQueue.length
  }

  _runTask(): void {
    if (this.state !== STATE_START || this.emptyTask()) return
    // 如果任务链任务执行完则释放资源
    if (this.index === this.taskQueue.length) {
      this.dispose()
      return
    }
    // 获得任务链上的一个任务
    const task = this.taskQueue[this.index]
    if (task.type === TASK_SYNC) {
      this._runSyncTask(task)
    } else {
      this._runAsyncTask(task)
    }
  }

  _runSyncTask(task: ITaskQueueItem): void {
    task.taskFn(() => {
      this._next(task)
    })
  }

  _runAsyncTask(task: ITaskQueueItem) {
    // 定义每一帧执行的回调函数
    const enterFrame = (time: number) => {
      const next = () => {
        // 停止执行当前任务
        this.timeLine.stop()
        // 执行下一个任务
        this._next(task)
      }
      task.taskFn(next, time)
    }

    this.timeLine.onEnterFrame = enterFrame
    this.timeLine.start(this.interval)
  }

  _next(task: ITaskQueueItem) {
    this.index++
    task.wait
      ? setTimeout(() => {
        this._runTask()
      }, task.wait)
      : this._runTask()
  }

  _add(taskFn: TaskFn, type: TaskType): AnimeDom {
    this.taskQueue.push({ taskFn, type })
    return this
  }
}
