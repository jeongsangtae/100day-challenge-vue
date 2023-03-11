const TodosApp = {
  data() {
    return {
      newTodo: "Vue.js 배우기!",
    };
  },
  methods: {
    saveTodo(event) {
      event.preventDefault();
      this.newTodo = "업데이트 To do";
    },
  },
};

Vue.createApp(TodosApp).mount("#todos-app");

// const TodosApp = Vue.createApp({
//   data() {
//     return {
//       newTodo: "Vue.js 배우기!",
//     };
//   },
// });

// TodosApp.mount("#todos-app");
