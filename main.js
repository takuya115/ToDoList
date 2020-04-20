class ToDoList {
    constructor() {
        this.toDoList = []
        this.loadList();
        if(this.toDoList.length >= 1){
            this.renderToDo();
        }
    };

    // todoの追加
    addToDo(todo) {
        const date = new Date();
        const record = [todo, date.toLocaleString()];
        this.toDoList.push(record);
    }
    // ロカールストレージへの保存
    saveList() {
        const jsonList = JSON.stringify(this.toDoList);
        localStorage.setItem("todolist", jsonList);
    }
    // ローカルストレージからの取り出し
    loadList(){
        const jsonList = localStorage.getItem("todolist");
        if(!jsonList) {
            this.toDoList = [];
            return;
        }
        this.toDoList = JSON.parse(jsonList);
    }
    // リストレンダリング
    renderToDo(){
        const parent = document.querySelector("#todo-list");
        if(this.toDoList.length === 0){
            return;
        }
        parent.innerHTML = "";
        this.toDoList.forEach((todo, idx) => {
            // todoの箱を作成
            const todoMain = document.createElement("div")
            todoMain.className = "todo";
            todoMain.id = idx;
            todoMain.innerHTML = `<input type="checkbox">
                            <div class="todo-text">${todo[0]}</div>
                            <div class="create-at">${todo[1]}</div>`
            
            parent.appendChild(todoMain);            
        })
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
})

