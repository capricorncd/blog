<template>
  <div
    :class="isReady ? 'is-ready' : ''"
    class="xm-mobile-page">
    <div class="loading">Loading<br>waiting...</div>
    <div
      v-swiper:mySwiper="swiperOption"
      ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div
            ref="logo"
            class="logo"/>
          <div
            ref="btnContactUs"
            class="contact-us-btn cur"
            @click="handleClick('contact')">CONTACT US</div>
          <img
            ref="persons"
            :src="pic.persons"
            class="persons"
            alt="">
          <div
            ref="btnDownload"
            class="btn-download cur"
            @click="handleClick('download')"/>
        </div>
        <div class="swiper-slide">
          <div
            class="back-arrow"
            @click="handleClick('back')"/>
          <div class="map-outer">
            <img
              :src="pic.contact"
              class="contact"
              alt="">
            <div class="map">
              <div ref="map"/>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="swiper-pagination swiper-pagination-bullets"/>-->
    </div>
  </div>
</template>

<script>
  import AmapClass from '../../assets/libs/amap/index'
  import MarkerIcon from '../ContactUs/img/map-marker.png'
  import { supportWebp } from '../../assets/libs/index'

  const PREFIX = './mobile/'
  export default {
    data () {
      const vm = this
      let suffix = supportWebp() ? 'webp' : 'png'
      return {
        swiperOption: {
          loop: false,
          slidesPerView: 'auto',
          centeredSlides: true,
          // spaceBetween: 0,
          // pagination: {
          //   el: '.swiper-pagination'
          // }
          on: {
            init: function () {
              vm.isReady = true
              vm.resetPosition()
            }
          }
        },
        pic: {
          persons: PREFIX + 'persons.' + suffix,
          contact: PREFIX + 'contact.' + suffix,
        },
        isReady: false,
        guideMaskVisible: false,
        shareInstall: null
      }
    },
    mounted () {
      if (process.browser) {
        let center = [104.063678, 30.578537]
        this.map = new AmapClass({
          zoom: 15,
          selector: this.$refs.map,
          clickable: false,
          dragResponse: false,
          center: [
            center[0],
            center[1]
          ],
          zoomEnable: true
        })
        this.map.addMarker({
          position: center,
          icon: MarkerIcon
        }, true)
      }
    },
    created () {
      // this.initShareInstall()
    },
    methods: {
      handleClick (type) {
        // console.log(type)
        switch (type) {
          case 'back':
            this.mySwiper.slideTo(0)
            break
          case 'download':
            alert('Download.')
            break
          case 'contact':
            this.mySwiper.slideTo(1)
            break
        }
      },
      resetPosition () {
        const $person = this.$refs.persons
        let winHeight = window.innerHeight
        let personsHeight = $person.clientHeight
        // 可显示区域高度
        const MARGIN_TOP = 30
        const LOGO_HEIGHT = 30
        const BOTTOM_BTN_HEIGHT = 42
        const BOTTOM_POSITION = 40
        let visibleHeight = winHeight - MARGIN_TOP - LOGO_HEIGHT - BOTTOM_BTN_HEIGHT - BOTTOM_POSITION
        let diff = visibleHeight - personsHeight
        // console.log(winHeight, personsHeight, visibleHeight)
        // alert(winHeight + ', ' + personsHeight + ', ' + visibleHeight)
        if (diff < 20) {
          const TOP = 15
          const BOTTOM = 20
          const $logo = this.$refs.logo
          const $btnContactUs = this.$refs.btnContactUs
          const $btnDownload = this.$refs.btnDownload
          // 调整按钮边距
          $logo.style.top = TOP + 'px'
          $btnContactUs.style.top = TOP + 'px'
          $btnDownload.style.bottom = BOTTOM + 'px'
          // 缩放中间视图
          // 调整高度后，间距还小于20px
          let newDiff = diff + TOP + BOTTOM - 20
          if (newDiff < 0) {
            // 缩小
            $person.style.transform = `scale(${Math.min(.9, 1- Math.abs(newDiff) / personsHeight)})`
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/constants";
  $spBlue: #263770;
  $spGreen: #4cb193;

  $mapSize: 65.6%;

  .xm-mobile-page {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $spBlue;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background-color: $spGreen;
    }
    .loading {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      color: #fff;
      opacity: .8;
      text-align: center;
    }
    .swiper-container {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .swiper-slide {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /**
     * ****************************************
     * page none
     * ****************************************
     */
    .logo {
      position: absolute;
      z-index: 2;
      top: 30px;
      left: 40px;
      width: 95px;
      height: 30px;
      @include mbgImage(img/logo);
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      transition: all .3s;
      transform: scale(0);
    }
    .contact-us-btn {
      position: absolute;
      z-index: 2;
      top: 30px;
      right: 40px;
      padding: 0 14px;
      height: 30px;
      /*line-height: 28px;*/
      border-radius: 7px;
      border: 1px solid rgba(255, 255, 255, .5);
      color: #fff;
      font-weight: 300;
      transition: all .3s;
      opacity: 0;
      transform: scale(1);
      display: flex;
      align-items: center;
      font-size: 0.6rem;
    }
    img.persons {
      width: 74%;
      height: auto;
      transition: all .3s;
      transform: scale(0);
    }
    .btn-download {
      position: absolute;
      z-index: 2;
      left: 50%;
      bottom: 40px;
      margin-left: -80px;
      width: 160px;
      height: 42px;
      background: url(img/btn-down@2x.png) no-repeat 0 0;
      -webkit-background-size: cover;
      background-size: cover;
      transition: all .3s;
      transform: scale(0);
    }
    /**
     * ****************************************
     * page two
     * ****************************************
     */
    .back-arrow {
      position: absolute;
      z-index: 2;
      top: 30px;
      left: 40px;
      width: 32px;
      height: 32px;
      @include mbgImage(img/back);
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
    }
    .map-outer {
      position: relative;
      margin-top: 30px;
      img.contact {
        width: 100%;
        height: auto;
      }
      .map {
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 16.2%;
        width: $mapSize;
        overflow: hidden;
        border-radius: 50%;
        @media screen and (max-width: 320px) {
          top: 8px;
        }
        &:after {
          display: block;
          content: '';
          padding-top: 100%;
        }
        > div {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          &:after {
            content: '';
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: inset 0 5px 9px rgba(0, 0, 0, .52);
          }
        }
        canvas {
          border-radius: 50%;
          // box-shadow: inset 0 5px 9px rgba(0, 0, 0, .52);
        }
      }
    }
  }
  .xm-mobile-page.is-ready {
    // page 2不需要动画，swiper初始化完成前都不会显示
    .logo, .contact-us-btn, img.persons, .btn-download {
      opacity: 1;
      transform: scale(1);
    }
    .loading {
      display: none;
    }
  }
</style>
