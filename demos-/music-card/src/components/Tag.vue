<template>
  <div class="tags-wrapper" :class="{show: tagsVisible}">
    <span class="first" @click.stop="clickTag(null)">{{ currentTag }}</span>
    <transition name="fade-left">
      <div v-show="tagsVisible">
        <span v-for="(item, i) in tags" @click.stop="clickTag(item)" :key="i">{{ item }}</span>
      </div>
    </transition>
    <i class="question-mark" @click="questionClick"/>
  </div>
</template>

<script>
const TAGS = ['Everyone', 'Only boys', 'Only girls']
export default {
  beforeDestroy () {
    window.removeEventListener('click', this._docClick)
  },
  data () {
    return {
      // 为了异步修改，不使用computed属性
      tags: TAGS.slice(1),
      currentTag: 'Everyone',
      tagsVisible: false
    }
  },
  methods: {
    clickTag (tag) {
      if (!tag) {
        this.tagsVisible = !this.tagsVisible
      } else if (this.currentTag !== tag) {
        this.currentTag = tag
        this.tagsVisible = false
        // async update，prevent view changed before tags element hidden
        let t = setTimeout(_ => {
          this.tags = TAGS.filter(item => item !== tag)
          clearTimeout(t)
          t = null
        }, 300)
        // query
        const gender = TAGS.findIndex(item => item === tag)
        this.$emit('change', gender)
      }
    },
    _docClick () {
      if (this.tagsVisible) {
        this.tagsVisible = false
      }
    },
    questionClick () {
      console.log('showHelpDialog')
      alert('Interact with native app')
    }
  },
  mounted () {
    window.addEventListener('click', this._docClick)
  }
}
</script>

<style lang="scss">
  .tags-wrapper {
    position: relative;
    display: flex;
    span {
      display: inline-block;
      padding: 0 10px;
      background-color: rgba(0, 0, 0, .16);
      margin-right: 10px;
      height: 26px;
      line-height: 26px;
      border-radius: 13px;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
    }
    span.first {
      padding-right: 20px;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 11px;
        right: 10px;
        width: 5px;
        height: 4px;
        @include bgImage('~/assets/img/arrow-down-small');
        -webkit-background-size: cover;
        background-size: cover;
        transition: transform .2s ease-in-out;
      }
    }
    .question-mark {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 6px;
      width: 26px;
      height: 26px;
      @include bgImage('~/assets/img/question-mark');
      -webkit-background-size: 15px 15px;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .tags-wrapper.show {
    .first {
      &:after {
        transform: rotate(-90deg);
      }
    }
  }
</style>
