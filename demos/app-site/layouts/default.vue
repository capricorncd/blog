<template>
  <div class="xm-default-layout-container">
    <StripeBackground/>
    <nuxt/>
  </div>
</template>

<script>
import StripeBackground from '../components/_globals/stripe-background'
import { getBrowserType, browserVersion } from '../assets/libs/utils/browser'
export default {
  middleware: 'check-mobile',
  components: {
    StripeBackground
  },
  beforeCreate () {
    if (process.browser) {
      const $body = document.querySelector('body')
      // class
      let classes = $body.className.split(' ')
      // ie
      if (getBrowserType() === 'ie') {
        const ver = browserVersion('ie')
        classes.push(`ie${ver}`)
      }
      $body.className = classes.join(' ')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/style/config";
.xm-default-layout-container {
  .wp {
    position: relative;
    margin: 0 auto;
    width: $minWrapperWidth;
  }
}
.xm-mobile {
  .xm-default-layout-container {
    .wp {
      width: 100%;
    }
  }
}
</style>
