<template>
  <div id="app">
    <Header></Header>
    <todo></todo>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/header.vue'
  import todo from './components/todo.vue'
  import Footer from './components/footer.jsx'
  export default {
    components: {
      Header,
      todo,
      Footer
    }
  }
</script>

<style lang="stylus">
  #app
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: rosybrown;
</style>
