<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    append-to-body
    top="100px"
    width="1000px">
    <div
      class="content"
      v-html="content"/>
  </el-dialog>
</template>

<script>
export default {
  model: {
    prop: 'value'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    classData: {
      type: Object,
      default () {
        return {
          id: 0,
          title: '协议'
        }
      }
    }
  },
  data () {
    return {
      visible: false,
      content: '',
      data: {
        1: '',
        2: '',
        3: '',
        4: ''
      }
    }
  },
  computed: {
    title () {
      return this.classData.title
    }
  },
  watch: {
    value (val) {
      if (this.visible !== val) {
        this.visible = val
      }
    },
    visible (val) {
      this.$emit('input', val)
    },
    classData (val) {
      this.getDetail(val.id)
    }
  },
  created () {
    this.getDetail(this.classData.id)
  },
  methods: {
    async getDetail (id) {
      if (!id) return
      let data = this.data[id]
      if (data) {
        this.setData(data)
        return
      }
      let params = {
        class: 'Other',
        method: 'intro',
        data: {
          class_id: id
        }
      }
      try {
        let { status, data: res } = await this.$axios.post('/api', params)
        if (status === 200 && res.code === 0) {
          this.data[id] = res.data.content
          this.setData(res.data.content)
        } else {
          this.$message.error(res.message || '获取内容失败')
        }
      } catch (err) {
        console.error(err)
        this.$message.error(err.message)
      }
    },
    setData (content) {
      this.content = content
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    margin-top: -20px;
  }
</style>
