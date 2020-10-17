<template>
  <div class="wave-wrapper" ref="wave">
    <canvas></canvas>
  </div>
</template>

<script>
import { onLoadAudio } from '../helper/web-audio'
export default {
  data() {
    return {
      audio: null
    }
  },
  created() {
    App.on('init-audio-end', audio => {
      this.audio = audio
      // https://wavesurfer-js.org/docs/options.html
      onLoadAudio(audio, this.$refs.wave)
    })
  },
  beforeDestroy() {
    App.off('init-audio-end')
  }
}
</script>

<style lang="scss">
.wave-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
