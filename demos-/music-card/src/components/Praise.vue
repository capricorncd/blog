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
      isPraised: false,
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
      this.isPraised = true
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
    item () {
      this.state = ''
      this.isPraised = false
    },
    isPraised (val) {
      this.$emit('change', 'isPraised', val)
    }
  }
}
</script>

<style lang="scss">

</style>
