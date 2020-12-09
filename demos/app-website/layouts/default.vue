<template>
  <div class="xm-default-layout-container">
    <StripeBackground/>
    <nuxt/>
  </div>
</template>

<script>
  import StripeBackground from '../components/StripeBackground'
  import { getBrowserType, browserVersion, isMacOS, isMobile } from '../assets/libs'
  export default {
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
    },
    mounted() {
      const path = location.hash.substr(2)
      // console.log(location.hash, path, isMobile())
      if (isMobile()) {
        if (path === '' || path === 'contact-us') {
          // location.href = '#mobile'
          this.$router.push('/mobile')
        }
      } else if (path === 'mobile') {
        this.$router.push('/')
      }
      this.$nextTick(() => {
        if (isMacOS()) {
          const body = document.querySelector('body')
          const classNames = body.className.split(/\s/).filter(s => !!s)
          classNames.push('is-mac')
          body.className = classNames.join(' ')
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/constants";
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
