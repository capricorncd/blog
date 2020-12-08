<template>
  <section
    ref="home"
    class="xm-home-page">
    <XmHeader/>
    <HomePage @load="handleAnimationSourceLoaded"/>
    <XmFooter/>
  </section>
</template>

<script>
import Vue from 'vue'
import XmHeader from '../components/Header/index'
import HomePage from '../components/index.vue'
import XmFooter from '../components/Footer/index.vue'

export default Vue.extend({
  components: {
    XmHeader,
    HomePage,
    XmFooter
  },
  data () {
    return {
      scrollTop: 0
    }
  },
  beforeDestroy () {
    process.browser && window.removeEventListener('scroll', this._scroll)
  },
  mounted () {
    process.browser && window.addEventListener('scroll', this._scroll)
  },
  methods: {
    handleAnimationSourceLoaded () {
      const el = this.$refs.home
      el.classList.add('start')
    },
    _scroll () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    }
  }
})
</script>

<style lang="scss">
  .xm-home-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .xm-header-wrapper {
      top: 200px;
      opacity: 0;
      transition: all .48s;
    }
  }
  .xm-home-page.start {
    .xm-header-wrapper {
      top: 0;
      opacity: 1;
    }
  }

  .ie9, .ie8, .ie7 {
    .xm-header-wrapper {
      top: 0 !important;
      opacity: 1;
    }
  }
</style>
