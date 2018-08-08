<template>
  <div class="todo-editor">
    <div class="form-group">
      <label>Todo</label>
      <input name="title" v-model="title" />
    </div>
    <div class="form-group">
      <label>Remark</label>
      <input name="remark" v-model="remark" />
    </div>
    <div class="form-group">
      <label>Date</label>
      <div class="date-chooser">{{ date }}</div>
    </div>
    <div class="form-group">
      <label>Category</label>
      <ul class="category-chooser">
        <li class="active">LIFE</li>
        <li>STUDY</li>
        <li>WORK</li>
        <li>OTHER</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    item: String,
  },
  data() {
    return {
      title: this.item.title,
      remark: this.item.remark,
      date: this.item.date || '2018-08-02',
      category: this.item.category,
    };
  },
};
</script>

<style scoped lang="less">
@import url('../assets/theme.less');

.todo-editor {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @base;
  z-index: 999;
  padding: 60px 20px;

  .form-group {
    margin-bottom: 40px;

    label, input {
      display: block;
      width: 100%;
      margin: 0 auto;
      color: @primary;
    }
    label {
      font-size: 1.2rem;
    }
    input {
      font-size: 1.4rem;
      border: none;
      border-bottom: solid 1px @primary;
      line-height: 2.5rem;
    }
  }
  .date-chooser {
    display: flex;
    margin-top: 0.8rem;
  }
  .category-chooser {
    display: flex;
    margin-top: 0.8rem;

    li {
      flex: 1 1 0;
      &.active {
        text-decoration: underline;
      }
    }
  }
}
</style>
