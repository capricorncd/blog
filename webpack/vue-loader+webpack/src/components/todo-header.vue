<template>
  <div class="todo-input-wrapper">
    <input
      type="text"
      v-model="content"
      placeholder="接下去做什么？"
      @keyup.enter="addTodo"
    >
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: ''
      }
    },
    methods: {
      addTodo () {
        console.log(this.content)
        this.content = ''
      }
    }
  }
</script>

<style lang="stylus">
  .todo-input-wrapper
    display: flex
    align-items center
    margin-top 20px
    height 50px
    input
      flex 1
      margin 0 20px
      border 0
      font-size 28px
      font-weight 500
      &:focus
        outline none
</style>
