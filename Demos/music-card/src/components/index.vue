<template>
  <div ref="wp" class="music-card-page">
    <zx-tag ref="tag" @change="tagChange"/>
    <div
      :class="['card-wrapper', isPlay ? 'play' : '']">
      <div class="card-inner">
        <div class="tone-arm" :class="{'touch-out': !isTouchOnArm }" ref="toneArm"></div>
        <div class="gramophone-wrapper">
          <zx-play-schedule :progress="progress"/>
          <zx-card
            ref="card"
            :gender="gender"
            :progress="progress"
            :is-play="isPlay"
            @no-cards="isNoCards = true"
            @change="cardChange"
            @pause="pause"
            @play="play"
            @list-change="len => total = len"/>
          <transition name="fade-center">
            <NoMoreCards v-model="isNoCards"/>
          </transition>
        </div>
        <!--播放按钮-->
        <div class="play-btn" @click="clickPlay"/>
        <!-- message -->
        <div class="message ell" :class="isPrivate ? 'is-private' : ''" v-show="cardLabel">{{ cardLabel }}</div>
      </div>
    </div>
    <div class="ft-wrapper">
      <transition name="send-private">
        <dl
          :class="['send-private', privateBtnVisible ? '__show' : '__hide']"
          v-show="privateBtnVisible"
          @click="sendPrivate">
          <dd>点击发送私密卡片，对方会第一时间收到</dd>
        </dl>
      </transition>
      <zx-praise :is-error="isError" :item="currentCard || {}" @change="praiseStateChange"/>
      <div class="next" @click="next"/>
    </div>
  </div>
</template>

<script>
import { beforeDestroy } from '../mixins/before-destroy'
import {
  getDistance, getCurrentUrl, checkNumber,
  requestAnimeFrame, cancelAnimeFrame,
  initAudio, initOuterWrapper
} from '../helper/index'
import ZxTag from './Tag'
import ZxCard from './Card'
import ZxPlaySchedule from './PlaySchedule'
import ZxPraise from './Praise'
import NoMoreCards from './NoMoreCards'

// 无卡片了timer
let noCardTimer = null
// 从原生App获取的数据
const nativeAppData = {
  lat: 30.57808,
  lng: 104.063343
}

export default {
  components: {
    ZxTag,
    ZxCard,
    ZxPlaySchedule,
    ZxPraise,
    NoMoreCards
  },
  mixins: [beforeDestroy],
  computed: {
    $toneArm () {
      return this.$refs.toneArm
    },
    swiper () {
      return this.$refs.card.swiper
    },
    // 是否为私密关系
    isPrivate () {
      const item = this.currentCard || {}
      return item.uid === 1
    },
    // card 标签
    cardLabel () {
      const distance = getDistance(this.currentCard, nativeAppData)
      // console.log('distance', distance)
      if (this.isPrivate) {
        // 只有你能看见的私密卡片
        return 'Private card that only you can see'
      } else if (distance === 0) {
        // return null
      }
      return distance < 100
        // 您们曾经相遇过
        ? 'You have met'
        : (distance <= 1000 ? `${distance}m away` : `${parseInt(distance / 1000)}km away`)
    },
    // 发送私密卡片显示状态
    privateBtnVisible () {
      return this.playTimes >= 1 && this.isPraised && !this.isSentPrivateCard
    }
  },
  data () {
    return {
      isError: true,
      isPlay: false,
      progress: 0,
      animeTimer: null,
      // 播放次数
      playTimes: 0,
      // 唱臂被触摸状态
      isTouchOnArm: false,
      gender: 0,
      // 私密卡片和点赞
      isSentPrivateCard: false,
      isPraised: false,
      // cards length
      total: 0,
      currentCard: null,
      currentIndex: -1,
      // 卡片被你翻完啦
      isNoCards: false,
      $wrapper: null,
      $audio: null
    }
  },
  methods: {
    tagChange (gender) {
      this.gender = gender
    },
    cardChange (item, index) {
      // App.error('cardChange:')
      // App.logStr(item)
      this.currentCard = item
      this.currentIndex = index
      this.progress = 0
      try {
        this.$audio.currentTime = 0
      } catch (e) {
        console.error(e)
      }
      this.playTimes = 0
      this.isPlay = false
      this.isError = false
      this.isSentPrivateCard = false
      this.$audio.src = getCurrentUrl(item)
      App.emit('audio-change')
    },
    // 播放
    play () {
      // if (this.isError) return
      try {
        // this.total > 0: fixed #8481
        // #8481音乐卡片主页，卡片播放完毕后，此时退出app，再进入，暂停的状态会变为播放状态(IOS V2.6.0-[D]04221030）
        if (!this.isPlay && this.total > 0) this.$audio.play()
      } catch (e) {
        console.error(e)
      }
    },
    // 暂停
    pause () {
      // if (this.isError) return
      if (this.isPlay) this.$audio.pause()
    },
    // 点击播放
    clickPlay (e) {
      this.isPlay ? this.pause() : this.play()
    },
    /**
     * audio event handler
     * @param e
     * @private
     */
    _audioHandler (e) {
      const type = e.type
      console.log(type)
      switch (type) {
        case 'error':
          this.isError = true
          break
        case 'pause':
          // this.isPlay = false
          break
        case 'play':
          // if (this.progress >= 1) this.progress = 0
          break
        case 'ended':
          this.playTimes += 1
          this.$nextTick(_ => {
            // 卡片播放完成后触发自动暂停，进度条消失
            this.progress = 1
            let timer = setTimeout(_ => {
              this.progress = 0
              clearTimeout(timer)
              timer = null
            }, 300)
          })
          break
      }
      this.isPlay = type === 'play'
    },
    /**
     * canplay handler
     * @private
     */
    _canplayHandler (e) {
      // App.error(e.type)
      this.isError = false
      switch (e.type) {
        case 'canplay':
          this.play()
          break
        case 'canplaythrough':
          break
      }
    },
    /**
     * progress
     * @private
     */
    _anime () {
      if (this.progress <= 1) {
        this.progress = checkNumber(this.$audio.currentTime / this.$audio.duration)
        this.animeTimer = requestAnimeFrame(this._anime)
      }
    },
    /**
     * next music card
     */
    next () {
      // 没有卡片，或者已是最后一张，再切换下一个时，提示：is last card
      if (!this.currentCard || this.total === this.currentIndex + 1) {
        this.isNoCards = true
        return
      }
      if (this.swiper) this.swiper.slideNext()
    },
    /**
     * 点击发送私密卡片按钮
     */
    sendPrivate () {
      console.log('sendPrivate')
      if (!this.currentCard) return
      // 暂停音乐播放
      if (this.isPlay) this.pause()
      alert('Interact with native app')
    },
    praiseStateChange (type, value) {
      App.log(type, value)
      this[type] = value
      // this.isPraised = isPraised
    }
  },
  mounted () {
    const $audio = document.createElement('audio')
    $audio.style.display = 'none'

    this.$audio = $audio
    App.emit('init-audio-end', $audio)

    const $body = App.query('body')

    $body.appendChild(this.$audio)

    initAudio.call(this)

    // 处理body背景图片
    const winRadio = window.innerWidth / window.innerHeight
    const bgRadio = 750 / 1624
    if (winRadio < bgRadio) {
      $body.style.backgroundSize = 'auto 100%'
    }

    // get wp
    this.$wrapper = this.$refs.wp

    this.$nextTick(_ => {
      // ZTE C880A, HUAWEI P7-L07
      if (/Android\s?5\./.test(App.userAgent)) {
        console.error(App.userAgent)
        // 待处理...
        initOuterWrapper(this, nativeAppData)
      } else {
        initOuterWrapper(this, nativeAppData)
      }
    })
  },
  watch: {
    isPlay (val) {
      if (val) {
        this._anime()
        this.$toneArm.style.transform = 'rotate(42deg)'
      } else {
        cancelAnimeFrame(this.animeTimer)
        this.$toneArm.style.transform = 'rotate(0)'
      }
    },
    playTimes (val) {
      console.log('play times: ' + val)
    },
    isNoCards (val) {
      if (val && !noCardTimer) {
        noCardTimer = setTimeout(_ => {
          this.isNoCards = false
          clearTimeout(noCardTimer)
          noCardTimer = null
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss">
.music-card-container {
  // display: none;
  position: fixed;
  z-index: 5;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 295px;
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

/**
 * ft-wrapper
 */
.music-card-page .ft-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  > div {
    margin: 30px 20px 0;
    box-shadow: 0 8px 20px 0 rgba(0,0,0,0.10);
    border-radius: 50%;
  }
  dl.send-private {
    display: inline-block;
    position: absolute;
    top: 45px;
    left: 0;
    width: 40px;
    height: 40px;
    @include bgImage('~/assets/img/send-private');
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    // overflow: hidden;
    box-shadow: 0 8px 20px 0 rgba(0,0,0,0.10);
    cursor: pointer;
    dd {
      position: absolute;
      top: 48px;
      left: 0;
      padding: 0 12px;
      height: 42px;
      line-height: 42px;
      background-color: #FF88D6;
      border-radius: 12px;
      color: #fff;
      white-space: nowrap;
      font-size: 12px;
      margin: 0;
      &:before {
        content: '';
        position: absolute;
        top: -4px;
        left: 15px;
        border-bottom: 5px solid #FF88D6;
        border-left: 5px transparent solid;
        border-right: 5px transparent solid;
      }
    }
    &.__show dd {
      animation: tow-seconed-hide 15s forwards;
    }
    &.__hide dd {
      display: none;
    }
  }
  .praise {
    width: 70px;
    height: 70px;
    @include bgImage('~/assets/img/btn-heart');
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    &.hide {
      animation: shakeHide .3s;
    }
    &.done {
      @include bgImage('~/assets/img/heart');
      background-size: 80% auto;
      border-radius: 0;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    &.shake-show {
      animation: shakeShow .3s;
    }
    &.shake {
      animation: shake .3s;
    }
  }
  .next {
    width: 70px;
    height: 70px;
    @include bgImage('~/assets/img/btn-next');
    -webkit-background-size: cover;
    background-size: cover;
    cursor: pointer;
  }
}

/**
* **************************************
* mini smart phone
* **************************************
*/
@media screen and (max-width: 320px) {
  .music-card-page {
    transform: translate(-50%, -50%) scale(0.8);
  }
}
</style>
