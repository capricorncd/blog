<template>
  <div class="nav-links-wrapper">
    <nuxt-link
      :class="{current: current === 'index'}"
      to="/">HOME</nuxt-link>
    <nuxt-link
      :class="{current: current === 'contact-us'}"
      to="/contact-us">CONTACT US</nuxt-link>
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
    right: 150px;
    height: 58px;
    font-size: 0;
    a {
      display: inline-block;
      margin: 0 24px;
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

