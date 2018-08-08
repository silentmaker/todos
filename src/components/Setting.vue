<template>
  <div class="container">
    <button class="setting-btn"></button>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  props: {
    settings: Object,
  },
};
</script>

<style scoped lang="less">
@import url('../assets/theme.less');

.container {
  .setting-btn {
    position: fixed;
    right: 5%;
    bottom: 10%;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: @primary;
    z-index: 99;
  }
}
</style>
