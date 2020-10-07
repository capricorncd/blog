/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 09:22
 */
import { cancelAnimeFrame } from '../helper/animation-frame'

export const beforeDestroy = {
  beforeDestroy() {
    // console.log('beforeDestroy', this)
    if (this.animeTimer) cancelAnimeFrame(this.animeTimer)
    this.$audio.removeEventListener('error', this._audioHander)
    this.$audio.removeEventListener('ended', this._audioHander)
    this.$audio.removeEventListener('pause', this._audioHander)
    this.$audio.removeEventListener('play', this._audioHander)
    this.$audio.removeEventListener('canplay', this._canplayHandler)
    document.removeEventListener('keyup', this.keyupHandler)
    App.off('change')
  }
}
