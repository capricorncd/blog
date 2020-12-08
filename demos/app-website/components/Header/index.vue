<template>
  <header class="xm-header-wrapper">
    <div class="wp">
      <div class="logo"/>
      <NavLinks/>
    </div>
  </header>
</template>

<script>
import Vue from 'vue'
import NavLinks from './NavLinks'

export default Vue.extend({
  components: {
    NavLinks
  }
})
</script>

<style lang="scss">
  @import "assets/scss/constants";

  $height: 60px;

  .xm-header-wrapper {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    min-width: $minWrapperWidth;
    width: 100%;
    height: $height;
    background-color: rgba(39, 39, 37, .04);
    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(39, 39, 37, .14);
    }
    .logo {
      display: inline-block;
      margin: 12px 0 0 55px;
      width: 120px;
      height: 36px;
      @include bgImage('img/logo');
      -webkit-background-size: auto 100%;
      background-size: auto 100%;
      background-repeat: no-repeat;
    }
  }
  .ie9, .ie8, .ie7 {
    .xm-header-wrapper {
      background: url('img/ie-bg-line.png') repeat-x 0 0;
    }
  }
</style>
