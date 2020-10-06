<template>
  <div :class="['praise', state]" @click="handlePraise"></div>
</template>

<script>
export default {
  beforeDestroy () {
    if (this.timer) clearTimeout(this.timer)
  },
  data () {
    return {
      // default -> done
      state: '',
      // 已点赞
      isPraised: false,
      isMutualPraise: false,
      timer: null
    }
  },
  methods: {
    handlePraise () {
      if (this.isError) return
      if (!this.state) {
        this.state = 'hide'
        this.timer = setTimeout(_ => {
          this.state = 'done shake-show'
        }, 300)
      } else if (this.state.indexOf('done') >= 0) {
        this.state = 'done shake'
        this.timer = setTimeout(_ => {
          this.state = 'done'
        }, 300)
      }
    },
    _praisedSuccess (data, isMutualPraise) {
      this.isMutualPraise = !!isMutualPraise
      // 点赞成功
      const params = {
        method: 'musicCards',
        data: {
          action: 'praiseSuccess',
          avatar: this.item.url.thumb,
          ...this.item,
          ...data,
          is_mutual_praise: isMutualPraise === 2 ? 0 : isMutualPraise
        }
      }
      App.log('等待App关闭点赞成功窗口:')
      App.jsBridge.request(params, res => {
        App.log('App关闭点赞成功窗口')
        this.isPraised = true
      })
    }
  },
  props: {
    isError: Boolean,
    item: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  watch: {
    item (item) {
      // App.error('watch item:')
      // App.logStr(item)
      this.state = ''
      this.isPraised = false
      this.isMutualPraise = false
    },
    isPraised (val) {
      // 通知父组件，是否已点赞
      this.$emit('change', 'isPraised', val)
    },
    isMutualPraise (val) {
      this.$emit('change', 'isMutualPraise', val)
    }
  }
}
</script>

<style lang="scss">

</style>
