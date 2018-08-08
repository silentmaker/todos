/* eslint no-param-reassign: 0 */
/* eslint array-callback-return: 0 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storage = (store) => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('todos', JSON.stringify(state.data));
    localStorage.setItem('settings', JSON.stringify(state.settings));
  });
};

export default new Vuex.Store({
  plugins: [storage],
  state: {
    data: [],
    settings: {
      isActive: false,
      done: true,
      stared: true,
      remarks: true,
      theme: true, // true: light, false: dark
      mode: true, // true: timeline, false: category
    },
    currentTodo: {},
  },
  getters: {
    todos: (state) => {
      const todos = {};
      state.data.map((item) => {
        const tag = state.settings.mode ? item.date : item.category;

        if (state.settings.done || !item.done) {
          if (!todos[tag]) {
            todos[tag] = { tag, items: [] };
          }
          todos[tag].items.push(item);
        }
      });
      return Object.values(todos);
    },
  },
  mutations: {
    init(state) {
      state.data = JSON.parse(localStorage.getItem('todos')) || [];
      state.settings = Object.assign({}, state.settings, (JSON.parse(localStorage.getItem('settings')) || {}));
    },
    create(state, tag) {
      state.currentTodo = {
        id: new Date().getTime(),
        title: '',
        remark: '',
        date: tag && state.settings.mode === 'timeline' ? tag : new Date().toISOString().substr(0, 10),
        category: tag && state.settings.mode === 'category' ? tag : '',
        done: false,
      };
    },
    edit(state, todo) {
      state.currentTodo = todo;
    },
    clear(state) {
      state.currentTodo = {};
    },
    destory(state, todo) {
      const index = state.data.findIndex(item => item.id === todo.id);
      if (index !== -1) { state.data.splice(index, 1); }
    },
    toggle(state, todo) {
      const index = state.data.findIndex(item => item.id === todo.id);
      state.data.splice(index, 1, Object.assign({}, todo, { done: !todo.done }));
    },
    save(state, todo) {
      const index = state.data.findIndex(item => item.id === todo.id);

      if (index !== -1) {
        state.data.splice(index, 1, todo);
      } else {
        state.data.push(todo);
      }
    },
    toggleSetting(state, option) {
      state.settings[option] = !state.settings[option];
    },
  },
  actions: {},
});
