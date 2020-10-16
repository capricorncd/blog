<template>
  <div class="todo-container-wrapper">
    <todoheader></todoheader>
    <div class="todo-list-wrapper">

    </div>
    <todofooter></todofooter>
  </div>
</template>

<script>
  import todoheader from './todo-header.vue'
  import todofooter from './todo-footer.vue'
  export default {
    components: {
      todoheader,
      todofooter
    }
  }
</script>

<style lang="stylus">
  .todo-container-wrapper
    margin 0 auto
    width 80%
    max-width 800px
    min-width 320px
    background-color: #fff
    overflow: hidden
    border-radius 4px
    box-shadow 0 4px 10px rgba(0, 0, 0, .2)
</style>
