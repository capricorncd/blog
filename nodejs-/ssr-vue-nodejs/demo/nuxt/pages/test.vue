<template>
  <div>
    <h1>Test</h1>
    <ul v-if="list.length">
      <li v-for="parent in list" :key="parent.id">
        <h4>{{parent.name}}</h4>
        <ol v-if="parent.child">
          <li v-for="item in parent.child" :key="item.id">{{item.name}}</li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'test',
  // 指定模板
  layout: 'test-layout',
  data() {
    return {
      list: []
    }
  },
  async asyncData() {
    let {status, data: {list}} = await axios.get('http://localhost:3000/region/list')
    if (status === 200) {
      return {
        list
      }
    }
  }
}
</script>

<style>

</style>
