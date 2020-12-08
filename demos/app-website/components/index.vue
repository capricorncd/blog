<template>
  <div class="home-animation-wrapper">
    <div class="bg"/>
    <img
      :src="sources.verticalLine"
      class="vertical-line">
    <img
      :src="sources.jukeboxEnd"
      class="jukebox-end">
    <img
      :src="sources.jukeboxStart"
      class="jukebox-start">
    <img
      :src="sources.people"
      class="people">
    <img
      :src="sources.btnLeft"
      class="btn-left">
    <img
      :src="sources.btnRight"
      class="btn-right">
    <img
      :src="sources.listen"
      class="listen">
    <img
      :src="sources.enDecorate"
      class="en-decorate">
    <img
      :src="sources.pictureFrame"
      class="picture-frame __bottom">
    <img
      :src="sources.pictureFrameMiddle"
      class="picture-frame __middle">
    <img
      :src="sources.pictureFrameTop"
      class="picture-frame __top">
    <div class="slogan">
      <h1><span>Listen, </span>it's like falling in love</h1>
      <p>Start the journey of love on campus with sound as a starting point.</p>
      <p>Love on campus is the best thing in life, so we made this product.</p>
      <p>I hope that everyone I meet has a beautiful love, </p>
      <p>dedicated to the same beautiful you.</p>
    </div>
    <img
      :src="sources.btnIos"
      :class="['btn-ios', isMouseEnter ? 'is-mouse-enter' : '', isMouseLeave ? 'is-mouse-leave' : '']"
      @click="btnClick('ios')">
    <img
      :src="sources.btnAndroid"
      :class="['btn-android', isMouseEnter ? 'is-mouse-enter' : '', isMouseLeave ? 'is-mouse-leave' : '']"
      @click="btnClick('android')">
    <img
      :src="sources.qr"
      :class="['qr-pic', isMouseEnter ? 'is-mouse-enter' : '', isMouseLeave ? 'is-mouse-leave' : '']"
      @mouseenter="qrMouseEnter"
      @mouseleave="qrMouseLeave">
  </div>
</template>

<script>
import Vue from 'vue'

const SOURCE_PREFIX = './home-anime/'
const IMG_SOURCES = {
  verticalLine: SOURCE_PREFIX + 'vertical-line.png',
  jukeboxStart: SOURCE_PREFIX + 'jukebox-start.png',
  jukeboxEnd: SOURCE_PREFIX + 'jukebox-end.png',
  btnLeft: SOURCE_PREFIX + 'btn-left.png',
  btnRight: SOURCE_PREFIX + 'btn-right.png',
  enDecorate: SOURCE_PREFIX + 'en-decorate.png',
  listen: SOURCE_PREFIX + 'listen.png',
  people: SOURCE_PREFIX + 'people.png',
  pictureFrame: SOURCE_PREFIX + 'picture-frame.png',
  pictureFrameMiddle: SOURCE_PREFIX + 'picture-frame-middle.png',
  pictureFrameTop: SOURCE_PREFIX + 'picture-frame-top.png',
  btnIos: SOURCE_PREFIX + 'btn-ios.png',
  btnAndroid: SOURCE_PREFIX + 'btn-android.png',
  qr: SOURCE_PREFIX + 'qr.png',
}

export default Vue.extend({
  data () {
    return {
      sources: IMG_SOURCES,
      isMouseEnter: false,
      isMouseLeave: false
    }
  },
  created () {
    if (process.browser) {
      loadImgSource(IMG_SOURCES).then(_ => {
        this.$emit('load')
      })
    }
  },
  methods: {
    qrMouseEnter () {
      this.isMouseEnter = true
      this.isMouseLeave = false
    },
    qrMouseLeave () {
      this.isMouseEnter = false
      this.isMouseLeave = true
    },
    btnClick (type) {
      alert(`${type} Download.`)
    }
  }
})

function loadImgSource (data) {
  return new Promise(resolve => {
    let count = 0
    let len = Object.keys(data).length
    // for
    for (let key in data) {
      _load(data[key])
    }
    // load
    function _load (url) {
      let $img = new Image()
      $img.src = url
      $img.onload = _count
      $img.onerror = _count
    }
    // count
    function _count () {
      count++
      if (count === len) {
        resolve()
      }
    }
  })
}
</script>

<style lang="scss">
  @import "assets/scss/constants";
  @import "assets/scss/animations";

  $animationSecond: 8s;

  .home-animation-wrapper {
    position: relative;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    // background: url(/image/home-anime/index.png) no-repeat center 0;
    .bg {
      position: absolute;
      top: 0;
      left: 50%;
      width: 0;
      height: 100%;
      background-color: $mainGreen;
    }
    .vertical-line {
      position: absolute;
      top: 0;
      right: 50%;
      /*opacity: 0;*/
      margin-right: -55px;
      // transition: all 15s/$framesPerSecond;
    }
    .jukebox-start {
      position: absolute;
      left: 50%;
      top: 331px;
      margin-left: -756px;
      // transform-style: preserve-3d;
      // backface-visibility: hidden;
      transform-origin: 20px 441px;
      transform: rotateX(0) rotateY(0) rotateZ(0) scaleX(0) scaleY(0) translate(-56px, -203px);
    }
    .jukebox-end {
      /* ie only */
      display: none;
    }
    /*
    .jukebox-end {
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 654px;
      margin-left: -802px;
      opacity: 0;
      transform-origin: 303px 303px;
      // transform: rotateX(-41deg) rotateY(38deg) rotateZ(61deg) scaleX(1.8) scaleY(1.8);
      // animation: jukeboxEnd 70s/$framesPerSecond forwards;
    }
    */
    .people {
      position: absolute;
      left: 50%;
      top: 253px;
      margin-left: -756px;
      opacity: 0;
      transform-origin: 226px 567px;
      // animation: people 70s/$framesPerSecond forwards;
    }
    .picture-frame {
      position: absolute;
      left: 50%;
      top: 149px;
      margin-left: -543px;
      opacity: 0;
      // animation: pictureFrame 70s/$framesPerSecond forwards;
    }
    .btn-left {
      position: absolute;
      left: 50%;
      top: 847px;
      margin-left: -376px;
      opacity: 0;
      transform: scale(0);
      // animation: btnLeft 70s/$framesPerSecond forwards;
    }
    .btn-right {
      position: absolute;
      left: 50%;
      top: 823px;
      margin-left: -321px;
      opacity: 0;
      transform: scale(0);
      // animation: btnRight 70s/$framesPerSecond forwards;
    }
    .listen {
      position: absolute;
      z-index: 9;
      left: 50%;
      top: 322px;
      margin-left: -809px;
      opacity: 0;
      transform-origin: 319px 164px;
      // animation: listen 70s/$framesPerSecond forwards;
    }
    .en-decorate {
      position: absolute;
      z-index: 10;
      left: 50%;
      top: 212px;
      margin-left: -521px;
      opacity: 0;
      // animation: enDecorate 70s/$framesPerSecond forwards;
    }
    .slogan {
      position: absolute;
      top: 388px;
      left: 50%;
      margin-left: -60px;
      transform-origin: 0 100%;
      transform: scale(0) translateX(0);
      /*white-space: nowrap;*/
      h1 {
        font-size: 42px;
        line-height: 1;
        font-weight: 600;
        letter-spacing: -1px;
        margin-bottom: 13px;
        color: #212121;
        span {
          display: inline-block;
          margin-right: 10px;
          font-size: 55px;
        }
      }
      p {
        padding-left: 5px;
        font-size: 18px;
        line-height: 30px;
      }
    }
    .btn-ios, .btn-android {
      position: absolute;
      top: 583px;
      left: 50%;
      transform: scale(0);
      cursor: pointer;
      box-sizing: border-box;
      border: 1px solid #fff;
      border-radius: 12px;
    }
    .btn-ios {
      margin-left: 143px;
      &.is-mouse-enter, &.is-mouse-leave {
        transition: all .3s ease-in-out;
      }
      &.is-mouse-enter {
        opacity: 0;
      }
      &.is-mouse-leave {
        opacity: 1;
      }
    }
    .btn-android {
      margin-left: 313px;
      &.is-mouse-enter, &.is-mouse-leave {
        transition: all .3s ease-in-out;
      }
      &.is-mouse-enter {
        opacity: 0;
      }
      &.is-mouse-leave {
        opacity: 1;
      }
    }
    .qr-pic {
      position: absolute;
      top: 583px;
      left: 50%;
      transform: scale(0);
      margin-left: 485px;
      width: 44px;
      height: 44px;
      border: 1px solid rgba(255, 255, 255, .8);
      box-sizing: border-box;
      border-radius: 12px;
      &.is-mouse-enter, &.is-mouse-leave {
        transition: all .3s ease-in-out;
      }
      &.is-mouse-enter {
        width: 198px;
        height: 198px;
        margin-left: 331px;
      }
      &.is-mouse-leave {
        margin-left: 485px;
        width: 44px;
        height: 44px;
      }
    }
  }
  .xm-home-page.start .home-animation-wrapper {
    .bg {
      animation: bgColor $animationSecond forwards ease-in-out;
    }
    /*.vertical-line {*/
    /*animation: verticalLine .6s forwards;*/
    /*}*/
    .jukebox-start {
      animation: jukeboxStart $animationSecond forwards ease-in-out;
    }
    .people {
      animation: people $animationSecond forwards;
    }
    .picture-frame {
      &.__bottom {
        animation: pictureFrame $animationSecond forwards;
      }
      &.__middle {
        animation: pictureFrameMiddle $animationSecond forwards;
      }
      &.__top {
        animation: pictureFrameTop $animationSecond forwards;
      }
    }
    .btn-left {
      animation: btnLeft $animationSecond forwards;
    }
    .btn-right {
      animation: btnRight $animationSecond forwards;
    }
    .en-decorate {
      animation: enDecorate $animationSecond forwards;
    }
    .listen {
      animation: listen $animationSecond forwards;
    }
    .slogan {
      animation: slogan $animationSecond forwards;
    }
    .btn-ios {
      animation: btnIos $animationSecond forwards;
    }
    .btn-android {
      animation: btnAndroid $animationSecond forwards;
    }
    .qr-pic {
      animation: qrPic $animationSecond forwards;
    }
  }

  .ie9 {
    .home-animation-wrapper {
      .vertical-line, .people, .picture-frame, .btn-right, .en-decorate, .listen {
        opacity: 1;
      }
      .jukebox-start {
        display: none;
      }
      .jukebox-end {
        /* ie only */
        display: block;
        position: absolute;
        left: 50%;
        top: 590px;
        margin-left: -802px;
      }
      .slogan {
        transform: scale(1) translateX(199px);
      }
      .btn-left {
        transform: scale(1) translate(0, 0);
      }
      .btn-ios, .btn-android {
        transform: scale(1);
      }
      .qr-pic {
        transform: scale(1);
      }
    }
  }
  .ie8, .ie7 {
    .home-animation-wrapper {
      margin: 0 auto;
      .jukebox-start {
        display: none;
      }
      .jukebox-end {
        /* ie only */
        display: block;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 590px;
        margin-left: -802px;
      }
      .slogan {
        margin-left: 199px;
      }
    }
  }
</style>
