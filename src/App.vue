<template>
  <div :class="[settings.lightTheme ? 'light' : 'dark']">
    <Header :settings="settings"></Header>
    <Setting :settings="settings"></Setting>
    <transition name="fade">
      <List :settings="settings" v-show="!settings.isActive"></List>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
  created() {
    this.init();
  },
  computed: { ...mapState(['settings']) },
  methods: { ...mapMutations(['init']) },
};
</script>

<style lang="less">
@import url('./assets/reset.less');
@import url('./assets/common.less');
</style>
