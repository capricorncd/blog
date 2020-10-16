/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 09:21
 */
export const requestAnimeFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 6000 / 60)
  }

export const cancelAnimeFrame = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  function (timer) {
    window.clearTimeout(timer)
  }
