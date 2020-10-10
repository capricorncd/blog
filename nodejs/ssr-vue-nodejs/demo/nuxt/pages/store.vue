<template>
<div>
  <h1>Vuex</h1>
  <ul>
    <li v-for="parent in $store.state.region.list">{{parent}}</li>
  </ul>
</div>
</template>

<script>
  export default {
    name: 'vuex',
    layout: 'test-layout',
    data() {
      return {
        list: []
      }
    }
  }
</script>

<style>

</style>
