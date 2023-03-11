const TodosApp = {
  data() {
    return {
      todos: [],
      enteredTodoText: "",
    };
  },
  methods: {
    saveTodo(event) {
      event.preventDefault();
      const newTodo = {
        text: this.enteredTodoText,
        id: new Date().toISOString(),
      };
      this.todos.push(newTodo);

      this.enteredTodoText = "";
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
