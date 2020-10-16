<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, i) in _list" :key="i">
        <div
          :class="['record-wrapper', index === i ? 'current' : '', index > i ? 'done' : '']">
          <div :class="['record', i === index && isPlay && !!progress ? 'running' : 'paused']">
            <img :src="item.url.thumb" alt="" @load="recordLoad">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initSwiper } from '../helper/index'
import { MUSIC_LIST } from '~/assets/data'

export default {
  created () {
    App.on('wrapper-showed', _ => {
      initSwiper.call(this, true)
    })
    this.getList()
  },
  computed: {
    _list() {
      return this.list.filter(item => !!item)
    }
  },
  data () {
    return {
      index: -1,
      swiper: null,
      list: [],
      isFirstRequest: true
    }
  },
  methods: {
    getList () {
      let list = MUSIC_LIST
      // 第一次成功请求到数据
      if (this.isFirstRequest) {
        if (list.length > 0) {
          this.isFirstRequest = false
        } else if (this.list.length === 0) {
          this.$emit('no-cards')
        }
      }
      // 拼接已有的列表数据
      if (this.list.length) {
        list = this.list.concat(list.filter(item => item.url))
      }
      this.list = this.gender > 0 ? list.filter(item => item.gender === this.gender) : list
      // 重置index
      if (this.index < 0) this.index = 0
      this.$nextTick(_ => {
        if (this.swiper) this.swiper.updateSlides()
      })
    },
    // 重置封面尺寸
    recordLoad (e) {
      App.resetFixedVesselPicStyle(e.target, 200, 200)
    }
  },
  props: {
    gender: Number,
    progress: Number,
    isPlay: Boolean
  },
  watch: {
    index (val) {
      // App.error('index change', val)
      // 提前请求数据
      if (val >= this.list.length - 2) {
        this.getList()
      }
      this.$emit('change', this.list[val], val)
      if (val === -1 && this.swiper) {
        this.swiper.emit('slideChangeTransitionStart')
      }
      if (val === 0 && this.swiper) {
        this.swiper.emit('slideChangeTransitionEnd')
      }
    },
    gender () {
      // 重置第一次请求状态
      this.isFirstRequest = true
      // 重置索引
      this.index = -1
      // 重置列表数据
      this.list = []
      // 销毁swiper
      this.swiper.destroy()
      // 重新初始化swiper
      initSwiper.call(this)
    },
    list (val) {
      this.$emit('list-change', val.length)
    }
  }
}
</script>

<style lang="scss">
  .music-card-page {
    display: none;
    position: fixed;
    z-index: 5;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 295px;
    .tags-wrapper {
      position: relative;
      display: flex;
      span {
        display: inline-block;
        padding: 0 10px;
        background-color: rgba(0, 0, 0, .16);
        margin-right: 10px;
        height: 26px;
        line-height: 26px;
        border-radius: 13px;
        font-size: 12px;
        color: #fff;
      }
      span.first {
        padding-right: 20px;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          top: 11px;
          right: 10px;
          width: 5px;
          height: 4px;
          @include bgImage('~/assets/img/arrow-down-small');
          -webkit-background-size: cover;
          background-size: cover;
          transition: transform .2s;
        }
      }
      .question-mark {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 6px;
        width: 26px;
        height: 26px;
        @include bgImage('~/assets/img/question-mark');
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .tags-wrapper.show {
      .first {
        &:after {
          transform: rotate(-90deg);
        }
      }
    }
    .card-wrapper {
      margin-top: 19px;
      padding-bottom: 15px;
      height: 356px;
      box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.1);
      border-radius: 25px;
      @include bgImage('~/assets/img/music-box');
      -webkit-background-size: 100% auto;
      background-size: 100% auto;
      .card-inner {
        position: relative;
        padding: 49px 36px 75px;
      }
      .tone-arm {
        position: absolute;
        z-index: 5;
        top: 18px;
        right: 18px;
        width: 41px;
        height: 114px;
        @include bgImage('~/assets/img/tone-arm');
        -webkit-background-size: cover;
        background-size: cover;
        transform: rotate(0);
        transform-origin: 53% 13%;
        cursor: move;
        &.touch-out {
          transition: all .5s ease;
        }
      }
      .gramophone-wrapper {
        position: relative;
        width: 100%;
        &:after {
          content: '';
          display: block;
          padding-bottom: 100%;
        }
        //.loading {
        //  position: absolute;
        //  z-index: 5;
        //  top: 50%;
        //  left: 50%;
        //  transform: translate(-50%, -50%);
        //  color: #fff;
        //}
        .swiper-container {
          position: absolute;
          top: 0;
          bottom: 0;
          .swiper-slide {
            position: relative;
            box-sizing: border-box;
            padding: 15px;
            overflow: hidden;
            text-align: center;
          }
        }
        .record-wrapper {
          display: inline-block;
          padding: 38px;
          overflow: hidden;
          border-radius: 50%;
          @include bgImage('~/assets/img/record');
          -webkit-background-size: cover;
          background-size: auto 100%;
          .record {
            width: 100%;
            height: 100%;
            overflow: hidden;
            animation: spin 10s infinite linear;
            animation-play-state: paused;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            &.running {
              animation-play-state: running;
            }
            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
      .play-btn {
        position: absolute;
        left: 15px;
        bottom: 15px;
        width: 53px;
        height: 53px;
        @include bgImage('~/assets/img/play');
        -webkit-background-size: cover;
        background-size: cover;
        cursor: pointer;
        &:active {
          @include bgImage('~/assets/img/play');
        }
      }
      .message {
        position: absolute;
        right: 15px;
        bottom: 15px;
        padding: 0 13px;
        height: 26px;
        line-height: 24px;
        border-radius: 13px;
        background-color: #fff;
        color: #7671DB;
        font-size: 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        max-width: 200px;
        transition: all .3s;
        &.is-private {
          color: #fff;
          border-color: #8A7DDD;
          background-color: #8A7DDD;
        }
      }
    }
    .play {
      .tone-arm {
        transform: rotate(42deg);
      }
      .play-btn {
        @include bgImage('~/assets/img/pause');
        &:active {
          @include bgImage('~/assets/img/pause-press');
        }
      }
    }
  }
</style>
