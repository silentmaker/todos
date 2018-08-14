<template>
<div>
  <div :class="['mask', todo.id ? 'active' : '']" @click="clear"></div>
  <div :class="['todo-editor', todo.id ? 'active' : '']">
    <div class="form-group">
      <label>Todo</label>
      <input name="title" autocomplete="off" v-model="todo.title" />
    </div>
    <div class="form-group">
      <label>Remark</label>
      <input name="remark" autocomplete="off" v-model="todo.remark" />
    </div>
    <div class="form-group">
      <div class="date-chooser">
        <label>Date</label>
        <div class="date-part" v-for="(part, index) in dateParts" :key="index">
          <font-awesome-icon class="up" icon="chevron-up"
            v-show="part < upLimit[index]"
            @click="changeDate(index, 1)" />
          {{ part }}
          <font-awesome-icon class="down" icon="chevron-down"
            v-show="part > downLimit[index]"
            @click="changeDate(index, -1)" />
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>Category</label>
      <ul class="category-chooser">
        <li :class="[item === todo.category ? 'active' : '']"
          v-for="(item, index) in categories" :key="index"
          @click="todo.category = item">{{ item }}</li>
      </ul>
    </div>
    <ul class="operates">
      <li @click="clear">
        <font-awesome-icon icon="times" />
      </li>
      <transition name="fade">
        <li @click="saveTodo" v-show="!!todo.title" class="save">SAVE</li>
      </transition>
      <li @click="destoryTodo">
        <font-awesome-icon :icon="['far', 'trash-alt']" />
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Todo',
  data() {
    return {
      todo: {},
      dateParts: [],
      upLimit: ['2099', '12', '31'],
      downLimit: ['2017', '01', '01'],
      categories: ['LIFE', 'STUDY', 'WORK', 'DEV'],
    };
  },
  watch: {
    currentTodo(value) {
      this.todo = Object.assign({}, value);
      this.dateParts = this.todo.date ? this.todo.date.split('-') : [];
    },
  },
  computed: {
    ...mapState(['currentTodo']),
  },
  methods: {
    ...mapMutations(['clear', 'save', 'destory']),
    changeDate(idx, value) {
      this.dateParts = this.dateParts.map((part, index) => {
        let num = part;
        if (index === idx) {
          num = parseInt(num, 10) + value;
          if (idx > 0) {
            num = `0${num}`;
            num = num.slice(-2);
          }
        }
        return num;
      });
    },
    saveTodo() {
      const todo = Object.assign({}, this.todo, {
        date: this.dateParts.join('-'),
        category: this.todo.category || 'LIFE',
      });

      this.save(todo);
      this.clear();
    },
    destoryTodo() {
      this.destory(this.todo);
      this.clear();
    },
  },
};
</script>

<style scoped lang="less">
@import url('../assets/theme.less');

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-in;
  z-index: 998;

  &.active {
    visibility: visible;
    opacity: 1;
  }
}
.todo-editor {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  transition: all 0.3s ease-in;
  background-color: @base;
  z-index: 999;
  padding: 20px 20px 60px;
  box-sizing: border-box;

  &.active {
    transform: translateY(0);
  }
  .form-group {
    margin-bottom: 40px;

    label, input {
      display: block;
      width: 100%;
    }
    label {
      color: @secondary;
      font-size: 1.2rem;
    }
    input {
      color: @primary;
      border: none;
      border-bottom: solid 1px @secondary;
      line-height: 2.6rem;
      font-size: 1.2rem;
      &[name=remark] {
        color: @secondary;
      }
      &:focus {
        border-bottom: solid 1px @primary;
      }
    }
  }
  .date-chooser {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.8rem;
    padding-right: 10%;

    label {
      width: auto;
    }
    .operate {
      color: @secondary;
      font-size: 20px;
    }
    .date-part {
      position: relative;

      .up, .down {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: @secondary;
        &:active { color: @primary; }
      }
      .up { top: -1.4rem; }
      .down { bottom: -1.4rem; }
    }
  }
  .category-chooser {
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;

    li {
      padding: 4px 8px;

      &.active {
        background-color: @primary;
        color: @base;
        border-radius: 4px;
      }
    }
  }
  .operates {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;

    li {
      padding: 8px 16px;
      color: @secondary;

      &.save {
        background-color: @primary;
        color: @base;
        border-radius: 6px;
      }
    }
  }
}
</style>
