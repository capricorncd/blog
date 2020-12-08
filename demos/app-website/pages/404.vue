<template>
  <div class="xm-404-page">
    <XmHeader/>
    <NullPage
      code="Code: 404"
      message="The page you visited does not exist, "/>
  </div>
</template>

<script>
  import XmHeader from '../components/Header/index'
  import NullPage from '../components/NullPage/index.vue'
  export default {
    components: {
      XmHeader,
      NullPage
    },
    head: {
      title: '404 - SCHOOL CIRCLE'
    }
  }
</script>

<style lang="scss">

</style>
