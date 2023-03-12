const TodosApp = {
  data() {
    return {
      isLoading: false,
      todos: [],
      enteredTodoText: "",
      editedTodoId: null,
    };
  },
  methods: {
    async saveTodo(event) {
      event.preventDefault();

      if (this.editedTodoId) {
        // 업데이트
        const todoId = this.editedTodoId;
        const todoIndex = this.todos.findIndex(function (todoItem) {
          return todoItem.id === todoId;
        });

        const updatedTodoItem = {
          id: this.todos[todoIndex].id,
          text: this.enteredTodoText,
        };

        this.todos[todoIndex] = updatedTodoItem;
        this.editedTodoId = null;

        let response;

        try {
          response = await fetch("http://localhost:3000/todos/" + todoId, {
            method: "PATCH",
            body: JSON.stringify({
              newText: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("문제가 발생했습니다!");
          return;
        }

        if (!response.ok) {
          alert("문제가 발생했습니다!");
          return;
        }
      } else {
        // 생성
        let response;

        try {
          response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
              text: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("문제가 발생했습니다!");
          return;
        }

        if (!response.ok) {
          alert("문제가 발생했습니다!");
          return;
        }

        const responseData = await response.json();
        const newTodo = {
          text: this.enteredTodoText,
          id: responseData.createdTodo.id,
        };

        this.todos.push(newTodo);
      }

      this.enteredTodoText = "";
    },
    startEditTodo(todoId) {
      this.editedTodoId = todoId;
      const todo = this.todos.find(function (todoItem) {
        return todoItem.id === todoId;
      });
      this.enteredTodoText = todo.text;
    },
    async deleteTodo(todoId) {
      this.todos = this.todos.filter(function (todoItem) {
        return todoItem.id !== todoId;
      });

      let response;

      try {
        response = await fetch("http://localhost:3000/todos/" + todoId, {
          method: "DELETE",
        });
      } catch (error) {
        alert("문제가 발생했습니다!");
        return;
      }

      if (!response.ok) {
        alert("문제가 발생했습니다!");
        return;
      }
    },
  },
  async created() {
    let response;
    this.isLoading = true;
    try {
      response = await fetch("http://localhost:3000/todos");
    } catch (error) {
      alert("문제가 발생했습니다!");
      this.isLoading = false;
      return;
    }

    this.isLoading = false;

    if (!response.ok) {
      alert("문제가 발생했습니다!");
      return;
    }

    const responseData = await response.json();
    this.todos = responseData.todos;
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
