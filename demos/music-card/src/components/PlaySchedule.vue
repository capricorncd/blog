<template>
  <div :class="['zx-play-schedule-component', progress ? '_progress' : '']" ref="wp">
    <i ref="dot" class="dot" v-show="progress !== 1"/>
    <div class="_mask"/>
    <canvas ref="canvas"/>
  </div>
</template>

<script>
import { cancelAnimeFrame, requestAnimeFrame } from '../helper/index'

export default {
  beforeDestroy () {
    cancelAnimeFrame(this.schedule)
  },
  computed: {
    $dot () {
      return this.$refs.dot
    },
    $canvas () {
      return this.$refs.canvas
    },
    // canvas.getContext
    ctx () {
      return this.$canvas.getContext('2d')
    }
  },
  created () {
    App.on('wrapper-showed', _ => {
      this.init()
    })
  },
  methods: {
    init () {
      this.width = this.$refs.wp.offsetWidth * 2
      this.height = this.$refs.wp.offsetHeight * 2
      this.$canvas.width = this.width
      this.$canvas.height = this.height
      this.ctx.strokeStyle = '#7671DB'
      this.ctx.lineWidth = 7.0
    },
    drawCircle (x, radius, angle) {
      this.ctx.beginPath()
      // this.ctx.strokeStyle = color
      // this.ctx.lineWidth = 1.0
      this.ctx.arc(x, x, radius, 0, angle * Math.PI, false)
      this.ctx.stroke()
      this.ctx.closePath()
    },
    schedule () {
      this.drawCircle(this.width / 2, this.width / 2 - 6, this.progress * 2)
      this.$dot.style.transform = `rotate(${90 + this.progress * 360}deg)`
    }
  },
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  watch: {
    progress (val) {
      // App.error('progress change: ' + val)
      if (val === 0) {
        this.ctx.clearRect(0, 0, this.width, this.height)
      }
      if (val <= 2) {
        requestAnimeFrame(this.schedule)
      }
    }
  }
}
</script>

<style lang="scss">
  /**
   * 播放进度组件
   */
  $playScheduleMargin: 2px;

  .zx-play-schedule-component {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(270deg);
    &:before {
      content: '';
      display: none;
      position: absolute;
      z-index: 0;
      right: 2px;
      bottom: 50%;
      margin-bottom: -1.5px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: #7671DB;
      transition: all .3s;
    }
    .dot {
      display: none;
      position: absolute;
      z-index: 3;
      top: 0;
      left: 111.5px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #A4A0F7;
      //animation: spin 10s infinite linear;
      transform-origin: 0 111px;
      transform: rotate(90deg);
    }
    canvas {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      transform: scale(.5);
    }
    &._progress {
      &:before {
        display: block;
      }
      .dot {
        display: inline-block;
      }
    }
    ._mask {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      border: 2px solid #fefefe;
      &:before {
        content: '';
        position: absolute;
        left: 3px;
        right: 3px;
        bottom: 3px;
        top: 3px;
        border: 2px solid #fefefe;
        border-radius: 50%;
        //background-image: linear-gradient(-180deg, #fefefe 0%, #f9f9f9 100%);
      }
    }
  }
</style>
