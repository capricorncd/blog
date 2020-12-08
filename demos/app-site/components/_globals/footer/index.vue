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
export default {}
</script>

<style lang="scss">
@import "../../../assets/style/config";

$height: auto;

.xm-footer-wrapper {
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  width: 100%;
  height: $height;
  padding-bottom: 20px;
  background-color: rgba(39, 39, 37, .14);
  color: #050000;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(39, 39, 37, .14);
  }
  dl {
    float: left;
    margin-top: 18px;
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
