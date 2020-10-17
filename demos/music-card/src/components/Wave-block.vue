<template>
  <div class="wave-wrapper" ref="wave"></div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
export default {
  data() {
    return {
      audio: null,
      waveSurfer: null
    }
  },
  created() {
    App.on('init-audio-end', audio => {
      this.audio = audio
      // https://wavesurfer-js.org/docs/options.html
      this.waveSurfer = WaveSurfer.create({
        container: this.$refs.wave,
        // barWidth: 1,
        waveColor: 'rgba(255, 255, 255, 0.5)',
        cursorColor: 'rgba(255, 255, 255, 0.3)',
        progressColor: '#54549f',
        backend: 'MediaElement',
        responsive: true
      })
    })

    App.on('audio-change', () => {
      console.log('audio-change')
      this.$nextTick(() => {
        this.waveSurfer.load(this.audio)
      })
    })
  },
  beforeDestroy() {
    App.off('init-audio-end')
    App.off('audio-change')
  }
}
</script>

<style lang="scss">
.wave-wrapper {
  position: fixed;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 128px;
}
</style>
