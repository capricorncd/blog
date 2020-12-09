<template>
  <div class="nav-links-wrapper">
    <nuxt-link
      :class="{current: current === 'index'}"
      to="/">HOME</nuxt-link>
    <nuxt-link
      :class="{current: current === 'contact-us'}"
      to="/contact-us">CONTACT US</nuxt-link>
    <nuxt-link
      :class="{current: current === '404'}"
      to="/404">404 Page</nuxt-link>
    <a
      :class="{current: current === 'source'}"
      href="https://github.com/capricorncd/blog/tree/master/demos/app-website" target="_blank">Source</a>
    <a
      :class="{current: current === 'github'}"
      href="https://github.com/capricorncd" target="_blank">Github</a>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    data () {
      return {
        current: this.$route.name || 'index'
      }
    },
    watch: {
      $route (val) {
        this.current = val.name
      }
    }
  })
</script>

<style lang="scss">
  @import "assets/scss/constants";
  .nav-links-wrapper {
    position: absolute;
    top: 0;
    right: 65px;
    height: 58px;
    font-size: 0;
    a {
      display: inline-block;
      margin: 0 12px;
      color: #212121;
      font-size: 14px;
      line-height: 58px;
      &.current {
        color: $mainGreen;
        font-weight: 600;
      }
    }
  }
</style>

