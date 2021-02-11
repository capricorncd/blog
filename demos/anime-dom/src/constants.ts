/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-02-11 19:07
 */

export const STATE_INITIAL = 0
export const STATE_START = 1
export const STATE_STOP = 2

export const TASK_SYNC = 0
export const TASK_ASYNC = 1

// The interval between each callback
export const DEFAULT_INTERVAL = 1000 / 60

export const IMAGE_SOURCES = ['static/rabbit-big.png', 'static/rabbit-lose.png', 'static/rabbit-win.png']

export const RIGHT_RUNNING_POSITIONS = ['0 -854', '-174 -852', '-349 -852', '-524 -852', '-698 -851', '-873 -848']
export const LEFT_RUNNING_POSITIONS = ['0 -373', '-175 -376', '-350 -377', '-524 -377', '-699 -377', '-873 -379']
export const WIN_POSITIONS = ['0 0', '-198 0', '-401 0', '-609 0', '-816 0', '0 -96', '-208 -97', '-415 -97', '-623 -97', '-831 -97', '0 -203', '-207 -203', '-415 -203', '-623 -203', '-831 -203', '0 -307', '-206 -307', '-414 -307', '-623 -307']
export const LOST_POSITION = ['0 0', '-163 0', '-327 0', '-491 0', '-655 0', '-819 0', '0 -135', '-166 -135', '-333 -135', '-500 -135', '-668 -135', '-835 -135', '0 -262']
