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
        <div v-for="(part, index) in dateParts" :key="index">{{ part }}</div>
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
      <li @click="clear">CANCEL</li>
      <transition name="fade">
        <li @click="saveTodo" v-show="!!todo.title" class="save">SAVE</li>
      </transition>
      <li @click="destoryTodo">DELETE</li>
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
      categories: ['LIFE', 'STUDY', 'WORK', 'OTHER'],
    };
  },
  watch: {
    currentTodo(value) {
      this.todo = Object.assign({}, value);
    },
  },
  computed: {
    ...mapState(['currentTodo']),
    dateParts() { return this.todo.date ? this.todo.date.split('-') : ['', '', '']; },
  },
  methods: {
    ...mapMutations(['clear', 'save', 'destory']),
    saveTodo() {
      const todo = Object.assign({}, this.todo, {
        date: this.dateParts.join('-'),
        category: this.todo.category || 'OTHER',
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
      &[name=title] {
        font-size: 1.2rem;
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
    padding-right: 20%;

    label {
      width: auto;
    }
    .operate {
      color: @secondary;
      font-size: 20px;
    }
    .date-part {
      padding: 0 10px;
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
