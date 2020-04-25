class ToDoList {
  constructor() {
    this.toDoList = [];
    this.loadList();
    if (this.toDoList.length >= 1) {
      this.renderToDo();
    }
  }

  // todoの追加
  addToDo(todo) {
    const date = new Date();
    const idx = this.toDoList.length + 1;
    const record = [idx, todo, date.toLocaleString()];
    this.toDoList.push(record);
  }
  // todoの削除
  removeToDo(chekedList) {
    if (!confirm("削除します。よろしいですか？")) return;
    const newTodoList = this.toDoList.filter((todo) => {
      if (chekedList.includes(todo[0])) return false;
      return true;
    });
    this.toDoList = newTodoList;
  }

  // ロカールストレージへの保存
  saveList() {
    const jsonList = JSON.stringify(this.toDoList);
    localStorage.setItem("todolist", jsonList);
  }
  // ローカルストレージからの取り出し
  loadList() {
    const jsonList = localStorage.getItem("todolist");
    if (!jsonList) {
      this.toDoList = [];
      return;
    }
    const todoList = JSON.parse(jsonList);
    todoList.forEach((v, i) => {
      v.unshift(i);
    });
    this.toDoList = todoList;
  }
  // リストレンダリング
  renderToDo() {
    const parent = document.querySelector("#todo-list");
    if (this.toDoList.length === 0) {
      return;
    }
    parent.innerHTML = "";
    this.toDoList.reverse().forEach((todo, idx) => {
      // todoの箱を作成
      const todoMain = document.createElement("div");
      todoMain.className = "todo";
      todoMain.id = idx;
      todoMain.innerHTML = `<input type="checkbox" id=${todo[0]}>
                            <div class="todo-text">${todo[1]}</div>
                            <div class="create-at">${todo[2]}</div>`;

      parent.appendChild(todoMain);
    });
  }
}

// ページの入力受け取り・レンダリング
const todolist = new ToDoList();

// 作成
document.querySelector("#create-todo").addEventListener("click", () => {
  const todo = document.querySelector("#i-todo").value;
  todolist.addToDo(todo);
  todolist.saveList();
  todolist.renderToDo();
});

// 削除
document.querySelector("#remove-todo").addEventListener("click", () => {
  const allTodo = document.querySelectorAll(
    '#todo-list input[type="checkbox"]'
  );
  const chekedList = [];
  allTodo.forEach((item) => {
    if (item.checked) {
      chekedList.push(Number(item.parentElement.id));
    }
  });
  todolist.removeToDo(chekedList);
  todolist.renderToDo();
});
