/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-06 09:13
 */
/**
 * 初始化swiper
 * @param isFirst 第一次初始化
 */
export function initSwiper (isFirst) {
  const vm = this
  // 处理swiper位置
  const gramophoneWidth = App.query('.gramophone-wrapper').offsetWidth
  const left = (window.innerWidth - gramophoneWidth) / 2
  // App.error(this.$refs.gramophone.offsetWidth, left)
  // swiper position
  const $swiper = this.$refs.swiper
  $swiper.style.left = -left + 'px'
  $swiper.style.right = -left + 'px'
  $swiper.style.top = 0
  $swiper.style.bottom = 0
  // $swiper.style.padding = `0 ${left}px`

  if (isFirst) {
    // head中添加覆盖style样式
    const $style = App.createElm('style', { type: 'text/css' })
    $style.innerText = `.swiper-container .swiper-slide .record-wrapper{width:${gramophoneWidth - 30}px;height:${gramophoneWidth - 30}px;}`
    // App.log('================================')
    // App.log($style)
    App.query('head').appendChild($style)
  }
  // touch事件滑动距离
  // 目的：提示“卡片被你翻完啦”
  // 往左滑提示, 向右不提示。
  let touchEvt, touchStartPixed, touchEndPixed
  // App.error('init swiper')
  // init swiper
  this.swiper = new Swiper(this.$refs.swiper, {
    speed: 500,
    // https://www.swiper.com.cn/api/swiping/64.html
    allowSlidePrev: false,
    // https://www.swiper.com.cn/api/swiping/416.html
    // Swiper在过渡时将无法滑动
    // 防止飞快切换，新增数据请求不能及时，
    // 导致提示"卡片已翻完"问题
    preventInteractionOnTransition: true,
    on: {
      slideChange: function () {
        if (vm.isPlay) vm.$emit('pause')
        // console.error('slideChange: ' + this.activeIndex)
        vm.index = this.activeIndex
      },
      slideChangeTransitionStart: function () {
        // console.error('slideChangeTransitionStart: ' + this.activeIndex)
        if (vm.isPlay) vm.$emit('pause')
      },
      slideChangeTransitionEnd: function () {
        if (vm.index !== this.activeIndex) {
          vm.index = this.activeIndex
        }
        // console.error('slideChangeTransitionEnd: ' + this.activeIndex)
        vm.$nextTick(_ => {
          vm.$emit('play')
        })
      },
      touchStart: function (e) {
        touchEvt = e.targetTouches ? e.targetTouches[0] : e
        touchStartPixed = touchEvt ? touchEvt.pageX : 0
      },
      touchMove: function (e) {
        touchEvt = e.targetTouches ? e.targetTouches[0] : e
        touchEndPixed = touchEvt ? touchEvt.pageX : 0
      },
      touchEnd: function () {
        // 向左滑动距离大于50px
        // App.log(touchStartPixed, touchEndPixed)
        if (touchStartPixed - touchEndPixed > 50 && vm.index === vm.list.length - 1) {
          vm.$emit('no-cards')
        }
      }
    }
  })
}
