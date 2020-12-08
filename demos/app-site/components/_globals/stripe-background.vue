<template>
  <div class="xm-stripe-background-wrapper"/>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "../../assets/style/config";
.xm-stripe-background-wrapper {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: $minWrapperWidth;
  &:before, &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
  }
  &:before {
    left: 0;
    background-color: $mainGreen;
  }
  &:after {
    right: 0;
    background-color: $mainYellow;
  }
}
</style>
