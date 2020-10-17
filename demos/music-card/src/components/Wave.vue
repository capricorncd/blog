<template>
  <div class="wave-wrapper" ref="wave">
    <canvas></canvas>
  </div>
</template>

<script>
import { onLoadAudio } from '../helper/web-audio'

export default {
  created() {
    App.on('first-play', audio => {
      try {
        onLoadAudio(audio, this.$refs.wave)
      } catch (e) {
        alert(e.message)
      }
    })
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
