/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 11:03
 */
const na = window.navigator
/**
 * ************************************
 * browser
 * ************************************
 */
export const browser = {
  ie10: na.msPointerEnabled,
  ie11: na.pointerEnabled
}

/**
 * ************************************
 * support touch
 * ************************************
 */
/* eslint-disable no-undef */
const supportTouch = ('ontouchstart' in window) || !!(window.DocumentTouch && document instanceof DocumentTouch)

/**
 * ************************************
 * Define Touch Events
 * ************************************
 */
let desktopEvents = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']
if (browser.ie10) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerOut']
if (browser.ie11) desktopEvents = ['pointerdown', 'pointermove', 'pointerup', 'pointerout']

export const touchEvents = {
  start: supportTouch ? 'touchstart' : desktopEvents[0],
  move: supportTouch ? 'touchmove' : desktopEvents[1],
  end: supportTouch ? 'touchend' : desktopEvents[2],
  leave: supportTouch ? 'touch' : desktopEvents[3]
}
