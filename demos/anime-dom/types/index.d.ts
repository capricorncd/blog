/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-02-11 17:26:56
*/
import { STATE_INITIAL, STATE_START, STATE_STOP, TASK_ASYNC, TASK_SYNC } from '~/src/constants'

export interface IImageLoaderItem {
  url: string
  error?: ErrorEvent
}

export type TaskType = typeof TASK_SYNC | typeof TASK_ASYNC

export type StateType = typeof STATE_INITIAL | typeof STATE_START | typeof STATE_STOP

export type TaskFn = (...args: any[]) => void

export interface ITaskQueueItem {
  taskFn: TaskFn
  type: TaskType
  wait?: number
}
