<template>
  <div :class="`theme-${settings.theme}`">
    <Header :mode="settings.mode"></Header>
    <List :todos="todos" :mode="settings.mode"></List>
    <Setting :settings="settings"></Setting>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Header from './components/Header.vue';
import List from './components/List.vue';
import Setting from './components/Setting.vue';

export default {
  name: 'App',
  components: {
    Header,
    List,
    Setting,
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['todos']),
  },
};
</script>

<style lang="less">
@import url('./assets/common.less');
</style>
