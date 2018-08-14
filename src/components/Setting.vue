<template>
  <div class="container">
    <div class="setting-btn" @click="toggleSetting('isActive')">
      <font-awesome-icon icon="times" v-if="settings.isActive" />
      <font-awesome-icon icon="bars" v-else />
    </div>

    <transition name="fade">
      <div class="create-btn" @click="create" v-if="!settings.isActive">
        <font-awesome-icon icon="plus" />
      </div>
    </transition>

    <transition name="fade">
      <div class="settings" v-if="settings.isActive">
        <div>Choose What/How To Display.</div>
        <ul class="setting-options">
          <li v-for="(option, index) in options" :key="index">
            <div :class="['option-switch', settings[option] ? 'on' : 'off']"
              @click="toggleSetting(option)"></div>
            <div>{{ infos[index] }}</div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Setting',
  props: { settings: Object },
  data() {
    return {
      options: ['done', 'stared', 'remarks', 'lightTheme', 'dateMode'],
      infos: ['Show Dones', 'Show Stareds', 'Show Remarks', 'Night Mode', 'Group By Date'],
    };
  },
  methods: { ...mapMutations(['create', 'toggleSetting']) },
};
</script>

<style scoped lang="less">
@import url('../assets/theme.less');

.container {
  .create-btn,
  .setting-btn {
    position: fixed;
    right: 5%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @base;
    border-radius: 50%;
    background-color: @primary;
    z-index: 99;
    box-shadow: 0 0 15px 5px rgba(0,0,0,0.15);
  }
  .setting-btn {
    bottom: 100px;
  }
  .create-btn {
    bottom: 160px;
  }
  .settings {
    position: absolute;
  }
  .setting-options {
    margin-top: 40px;

    li {
      display: flex;
      align-items: center;
      margin: 0 0 30px;
      font-size: 18px;

      .option-switch {
        position: relative;
        width: 40px;
        height: 20px;
        margin-right: 20px;
        border: solid 1px @primary;
        border-radius: 10px;
        transition: background-color 0.4s ease;

        &:before {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          top: 2px;
          left: 2px;
          background-color: @primary;
          border-radius: 50%;
          transition: left 0.3s ease;
        }
        &.on {
          background-color: @primary;
        }
        &.on:before {
          left: 22px;
          background-color: @base;
        }
      }
    }
  }
}
</style>
