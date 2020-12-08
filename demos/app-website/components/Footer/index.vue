<template>
  <footer class="xm-footer-wrapper">
    <div class="wp">
      <dl class="l">
        <dd>
          <span class="key">CopyRight: </span><span class="value">© 2016-2020 Capricorncd.</span>
        </dd>
      </dl>
      <dl class="r">
        <dd>
          <span class="key">Email: </span><span class="value">kaneoki2020@gmail.com</span>
        </dd>
      </dl>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
  @import "assets/scss/constants";

  .xm-footer-wrapper {
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-bottom: 10px;
    background-color: rgba(39, 39, 37, .14);
    color: #050000;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(39, 39, 37, .1);
    }
    dl {
      float: left;
      margin-top: 10px;
      width: 50%;
      overflow: hidden;
      &.l {
        text-align: right;
      }
      dd {
        margin: 0 10px;
        span {
          line-height: 20px;
        }
        .key {
          font-size: 12px;
        }
        .value {
          font-size: 12px;
        }
      }
    }
  }
  .ie9, .ie8, .ie7 {
    .xm-footer-wrapper {
      background: url('../header/img/ie-bg-line.png') repeat-x 0 0;
    }
  }
</style>
