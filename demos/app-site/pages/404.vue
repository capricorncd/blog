<template>
  <div class="xm-404-page">
    <NullPage
      code="Code: 404"
      message="您访问的页面不存在，"/>
  </div>
</template>

<script>
import NullPage from '../components/null-page/index.vue'
export default {
  components: {
    NullPage
  },
  head: {
    title: '404 - SCHOOL CIRCLE'
  }
}
</script>
