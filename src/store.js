import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [
      {
        id: 1243213,
        tag: '09/07 MON',
        items: [
          {
            id: 1,
            title: 'Mobile Exam Development',
            remark: 'Ask Shuya for UI.',
            done: true,
          },
        ],
      },
      {
        id: 5433,
        tag: '09/08 TUE',
        items: [
          {
            id: 2,
            title: 'Mobile Exam Development',
            remark: 'Ask Shuya for UI.',
            done: true,
          },
          {
            id: 3,
            title: 'Mobile Exam Development',
            remark: 'Ask Shuya for UI.',
            done: true,
          },
        ],
      },
      {
        id: 23123,
        tag: '09/09 WEB',
        items: [],
      },
    ],
    settings: {
      showDone: true,
      showStared: true,
      showRemarks: true,
      theme: 'light', // light, dark
      mode: 'timeline', // timeline, category
    },
  },
  getters: {
    todos: state => state.data.map(item => item),
  },
  mutations: {

  },
  actions: {
    createTodo() {
      console.log('bye');
    },
  },
});
