/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 11:00
 */
export function initAudio () {
  this.$audio.addEventListener('error', this._audioHandler)
  this.$audio.addEventListener('ended', this._audioHandler)
  this.$audio.addEventListener('pause', this._audioHandler)
  this.$audio.addEventListener('play', this._audioHandler)
  this.$audio.addEventListener('canplay', this._canplayHandler)
  this.$audio.addEventListener('canplaythrough', this._canplayHandler)
}
