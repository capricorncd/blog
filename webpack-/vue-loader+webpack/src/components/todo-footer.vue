<template>
  <div class="controls-wrapper">
    <div class="count-wrapper">0 items left</div>
    <div class="state-wrapper">
      <div class="item cur current">all</div>
      <div class="item cur">active</div>
      <div class="item cur">completed</div>
    </div>
    <div class="clear-wrapper cur">
      Clear completed
    </div>
  </div>
</template>

<style lang="stylus">
  .controls-wrapper
    display: flex
    justify-content space-between
    align-items center
    height 60px
    color #333
    border-top 1px solid #eee
    .count-wrapper
      margin-left: 20px
    .state-wrapper
      display: flex
      justify-content space-between
      .item
        margin: 0 5px
        padding: 5px 10px
        box-sizing border-box
        border 1px solid #fff
        border-radius 4px
        &.current, &:hover
          border-color #ccc
    .clear-wrapper
      margin-right: 20px
</style>
