<template>
  <div class="xm-company-concact-us-page">
    <XmHeader/>
    <ContactUs/>
    <XmFooter/>
  </div>
</template>

<script>
import XmHeader from '../components/_globals/header/index'
import ContactUs from '../components/company/contact-us/index.vue'
import XmFooter from '../components/_globals/footer/index.vue'
export default {
  components: {
    XmHeader,
    ContactUs,
    XmFooter
  },
  head: {
    title: 'CONTACT US'
  }
}
</script>

<style lang="scss">
.xm-company-concact-us-page {
  overflow: hidden;
  .amap-geolocation-con {
    display: none;
  }
}
</style>
