<template>
  <div class="no-more-cards" v-show="isNoCards">卡片被你翻完啦</div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      isNoCards: this.value
    }
  },
  watch: {
    value(val) {
      if (this.isNoCards !== val) {
        this.isNoCards = val
      }
    },
    isNoCards(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.no-more-cards {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  margin: -18px 0 0 -72px;
  padding: 0 20px;
  background: rgba(0, 0, 0, .4);
  border-radius: 18px;
  width: 145px;
  height: 36px;
  line-height: 36px;
  font-size: 15px;
  color: #fff;
  transform: scale(1);
}
</style>
