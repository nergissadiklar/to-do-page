const todoList = document.getElementById('task-list');
const todoInput = document.getElementById('input-task');
const todoButton = document.getElementById('add-task-button');

const getTodosFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem('todos'));
    return(storage) ? storage : [];
}


const todos =getTodosFromStorage();


 const getToDosToPage = ( ) => {
     todos.forEach((todo) => {
         createTodoItem(todo);
     });
 }
 const saveTodosToStorage = (todo) => {
     todos.push(todo);
     localStorage.setItem('todos',JSON.stringify(todos));
     createTodoItem(todo);
    }



todoButton.addEventListener('click',() => { //butona basıldığında inputun içindeki veriyi alması için
    const input = todoInput.value;
    if(input) saveTodosToStorage(input);
    todoInput.value ="";   //input değerini aldıktan sonra içeriği temizlemesi için
})

window.addEventListener('load',() => {
    getToDosToPage();
})


const removeTodo = (target) => {
     const todo = target.parentNode.childNodes[0].innerHTML;
     removeTodoFromStorage(todo);
     target.parentNode.remove();
}

const removeTodoFromStorage = (todo) => {
     const index =todos.indexOf(todo);
     if (index > -1){
         todos.splice(index,1);
         localStorage.setItem('todos',JSON.stringify(todos));
     }
}


const createTodoItem = (text) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('list-group-item');
    const todoCheck = document.createElement('input');
    todoCheck.type='checkbox';
    todoCheck.classList.add('checkbox');
    todoCheck.setAttribute('onclick','checkTodo(this)');
    const todoName = document.createElement('span');
    todoName.classList.add('task');
    todoName.innerHTML =text;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn','fa','fa-xmark');
    deleteBtn.setAttribute('onclick','removeTodo(this)');

    todoItem.appendChild(todoCheck);
    todoItem.appendChild(todoName);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
}

