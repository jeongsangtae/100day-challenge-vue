// const TodosApp = {
//   data() {
//     return {
//       newTodo: "Vue.js 배우기!",
//     };
//   },
// };

// Vue.createApp(TodosApp).mount("#todos-app");

const TodosApp = Vue.createApp({
  data() {
    return {
      newTodo: "Vue.js 배우기!",
    };
  },
});

TodosApp.mount("#todos-app");
