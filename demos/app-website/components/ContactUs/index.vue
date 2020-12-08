<template>
  <div class="company-contact-us-wrapper">
    <div
      ref="wp"
      class="wp">
      <i class="decorate t"/>
      <i class="decorate r"/>
      <i class="decorate b"/>
      <i class="decorate l"/>
      <div class="inner">
        <div
          ref="map"
          class="map-wrapper"/>
        <div class="map-address-info">
          <h1>SCHOOL CIRCLE</h1>
          <div class="info">
            <p>Address：Tokyo, Japan</p>
            <p>E-mail：kaneoki2020@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import AmapClass from 'assets/libs/amap/index'
  import MarkerIcon from './img/map-marker.png'

  export default Vue.extend({
    data () {
      return {
        map: null
      }
    },
    mounted () {
      if (process.browser) {
        let center = [139.86, 35.72]
        this.map = new AmapClass({
          selector: this.$refs.map,
          clickable: false,
          dragResponse: false,
          center: [
            center[0] - 0.01,
            center[1]
          ],
          zoomEnable: true,
          zoom: 9
        })
        this.map.addMarker({
          position: center,
          icon: MarkerIcon
        }, true)
      }
    },
  })
</script>

<style lang="scss">
  @import "assets/scss/constants";
  .company-contact-us-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // padding: 106px 0;
    .wp {
      overflow: hidden;
      padding: 2px;
      transition: all .3s ease-in-out;
      box-sizing: border-box;

      .decorate {
        position: absolute;
        z-index: 0;
        width: 64px;
        height: 64px;
        border-width: 2px;
        border-color: #fff;

        &.t {
          border-top-style: solid;
          border-left-style: solid;
          top: 0;
          left: 0;
        }

        &.r {
          border-top-style: solid;
          border-right-style: solid;
          top: 0;
          right: 0;
        }

        &.b {
          border-bottom-style: solid;
          border-right-style: solid;
          bottom: 0;
          right: 0;
        }

        &.l {
          border-left-style: solid;
          border-bottom-style: solid;
          bottom: 0;
          left: 0;
        }
      }

      .inner {
        position: relative;
        z-index: 2;
        border: 1px solid #fff;
        background: rgba(249, 253, 252, .32);
        overflow: hidden;
      }
    }

    .map-address-info {
      position: absolute;
      z-index: 5;
      top: 50%;
      left: 136px;
      margin-top: -182px;
      padding: 50px;
      height: 363px;
      background-color: rgba(21, 146, 127, .88);
      white-space: nowrap;
      box-sizing: border-box;
      &:after {
        content: '';
        position: absolute;
        top: -151px;
        left: 0;
        width: 38px;
        height: 666px;
        background: url(img/man-over-shadow.png) no-repeat 0 center;
      }
      h1 {
        padding: 40px 0 10px;
        color: #fff;
        font-size: 30px;
        font-weight: 500;
        line-height: 1;
      }
      .info {
        padding-top: 10px;
        p {
          color: #fff;
          font-size: 18px;
          line-height: 36px;
        }
      }
    }

    .map-wrapper {
      margin: 22px;
      min-height: 704px;
      background: #eee;
    }
  }
  .ie8, .ie7 {
    .map-address-info {
      background: url('img/ie-text-bg.png');
    }
  }
</style>
