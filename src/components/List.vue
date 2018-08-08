<template>
  <div class="container">
    <ul class="todo-list" v-if="todos.length">
      <li class="todo-group" v-for="group in todos" :key="group.tag">
        <div class="group-tag">{{ group.tag }}</div>
        <div class="todo-item" v-for="todo in group.items" :key="todo.id">
          <div class="todo-check" @click="toggle(todo)">
            <div class="done" v-if="todo.done"></div>
            <div class="todo" v-else></div>
          </div>
          <div class="todo-content" @click="edit(todo)">
            <div>{{ todo.title }}</div>
            <div class="todo-remark" v-if="settings.remarks">{{ todo.remark }}</div>
          </div>
        </div>
        <div class="add-todo" @click="create(group.tag)">ADD</div>
      </li>
    </ul>
    <div v-else>Nothing To Do Yet.</div>
    <Todo></Todo>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import Todo from './Todo.vue';

export default {
  name: 'List',
  props: { settings: Object },
  components: { Todo },
  computed: {
    ...mapGetters(['todos']),
  },
  methods: {
    ...mapMutations(['create', 'edit', 'toggle']),
  },
};
</script>

<style scoped lang="less">
@import url('../assets/theme.less');

.container {
  .todo-list {
    .todo-group {
      position: relative;
      min-height: 50px;
      padding: 36px 20px 0;
      box-shadow: 0 6px 24px 6px rgba(0, 0, 0, 0.05);
      border-radius: 6px;
      margin-top: 30px;

      .group-tag {
        position: absolute;
        top: 0;
        left: 20px;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: @primary;
        color: @base;
        transform: translateY(-50%);
        font-size: .8rem;
      }
      .add-todo {
        color: @secondary;
        line-height: 36px;
      }
      .todo-item {
        display: flex;
        align-items: top;

        .todo-check {
          flex: 0 0 36px;

          .todo,
          .done {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: solid 1px @primary;
          }
          .done {
            background-color: @primary;
          }
        }
        .todo-content {
          flex: 1 1 0;
          margin-bottom: 16px;
          line-height: 24px;

          .todo-remark {
            color: @secondary;
          }
        }
      }
    }
  }
}
</style>
