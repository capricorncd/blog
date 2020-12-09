<template>
  <div class="volume-control-wrapper">
    <svg @click="svgClick(-10)" class="icon-l" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3619"><path d="M576 256a47.52 47.52 0 0 0-30.256 11.024l-0.16-0.176-162.592 133.04h-159.136v0.128A48 48 0 0 0 176 448v160a48 48 0 0 0 48 48h160.384l163.36 118.816 0.096-0.112c7.936 5.792 17.6 9.296 28.16 9.296a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48z m190.432 46.816l-45.536 45.552C760.32 397.632 784 460 784 528s-23.68 130.368-63.088 179.632l45.536 45.568A350.512 350.512 0 0 0 848 528c0-85.68-30.672-164.16-81.568-225.184z" fill="" p-id="3620"></path></svg>
    <div class="control-bar-wrapper">
      <div class="control" @click="handleClick"></div>
      <div class="bar" :style="barStyle"></div>
    </div>
    <svg @click="svgClick(10)" class="icon-r" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3454"><path d="M400 240a47.52 47.52 0 0 0-30.256 11.024l-0.144-0.176-162.592 133.04H47.872v0.128A48 48 0 0 0 0 432v160a48 48 0 0 0 48 48h160.384l163.376 118.816 0.08-0.112c7.936 5.792 17.6 9.296 28.16 9.296a48 48 0 0 0 48-48V288a48 48 0 0 0-48-48z m190.432 46.816l-45.536 45.552C584.32 381.632 608 444 608 512s-23.68 130.368-63.088 179.632l45.536 45.568A350.512 350.512 0 0 0 672 512c0-85.68-30.672-164.16-81.568-225.184z m124.784-124.768l-45.568 45.568C740.672 289.12 784 395.392 784 512s-43.328 222.88-114.336 304.368l45.568 45.584C797.776 768.784 848 646.288 848 512s-50.224-256.784-132.784-349.952z m124.672-124.672l-45.296 45.296C897.376 196.208 960 346.784 960 512s-62.624 315.776-165.408 429.328l45.296 45.296C954.224 861.472 1024 694.912 1024 512c0-182.896-69.776-349.456-184.112-474.624z" fill="" p-id="3455"></path></svg>
  </div>
</template>

<script>
export default {
  name: 'VolumeControl',
  data() {
    return {
      barWidth: 5
    }
  },
  computed: {
    barStyle() {
      return {
        width: this.barWidth + '%'
      }
    }
  },
  methods: {
    setAudio(el) {
      this.$audio = el
      el.volume = 0.05
    },
    handleClick(e) {
      const el = e.target
      const box = el.getBoundingClientRect()
      const volume = Math.min((e.pageX - box.left) / box.width, 1)
      this.barWidth = volume * 100
      this.$audio.volume = volume
    },
    svgClick(num) {
      let newWidth = Math.min(this.barWidth + num, 100)
      if (newWidth < 0) newWidth = 0
      this.barWidth = newWidth
      this.$audio.volume = newWidth === 0 ? 0 : newWidth / 100
    }
  }
}
</script>

<style lang="scss">
$barBgColor: #7474d4;

.volume-control-wrapper {
  position: absolute;
  bottom: -40px;
  left: 10%;
  width: 80%;
  display: flex;
  align-items: center;
  height: 30px;
  .control-bar-wrapper {
    position: relative;
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 3px;
    cursor: pointer;
    .bar {
      position: absolute;
      height: 5px;
      left: 0;
      background: $barBgColor;
      border-radius: 3px;
      transition: width 0.2s ease-in-out;
    }
    .control {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: rgba(0, 0, 0, 0);
    }
  }
  svg {
    position: absolute;
    color: $barBgColor;
    cursor: pointer;
    &.icon-l {
      left: -10%;
    }
    &.icon-r {
      right: -10%;
    }
  }
}
</style>
