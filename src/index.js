import { TodoItem } from './todos.js';

document.addEventListener("DOMContentLoaded", () => {
  const todos = [];
  const todoListContainer = document.createElement("div");
  todoListContainer.innerHTML = `
    <h1>Todo List</h1>
    <input type="text" id="todoInput" placeholder="Enter your todo">
    <input type="text" id="todoDescription" placeholder="Enter todo description">
    <input type="date" id="todoDueDate"> <!-- Use type="date" for the due date -->
    <select id="todoPriority">
      <option value="unset">Select Priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button id="addTodoBtn">Add Todo</button>
    <ul id="todoList"></ul>
    <div id="errorContainer" class="error-message"></div> <!-- Error container -->
  `;

  const todoInput = todoListContainer.querySelector("#todoInput");
  const todoDescription = todoListContainer.querySelector("#todoDescription");
  const todoDueDate = todoListContainer.querySelector("#todoDueDate");
  const todoPriority = todoListContainer.querySelector("#todoPriority");
  const addTodoBtn = todoListContainer.querySelector("#addTodoBtn");
  const todoList = todoListContainer.querySelector("#todoList");
  const errorContainer = todoListContainer.querySelector("#errorContainer"); // Reference to the error container

  function displayTodos() {
    todoList.innerHTML = "";
    todos.forEach(addTodoToDOM);
  }

  function addTodo() {
    const title = todoInput.value.trim();
    const description = todoDescription.value.trim();
    const dueDate = todoDueDate.value.trim();
    const priority = todoPriority.value;

    function showError(message) {
      errorContainer.textContent = message;
    }

    function clearErrors() {
      errorContainer.textContent = "";
    }

    if (title === "") {
      showError("Please enter a valid todo title.");
      return;
    }

    if (description === "") {
      showError("Please enter a valid todo description.");
      return;
    }

    if (dueDate === "") {
      showError("Please enter a valid due date.");
      return;
    }

    if (priority === "unset") {
      showError("Please select a priority level.");
      return;
    }

    clearErrors();
    addNewTodo(title, description, priority, dueDate);
  }

  function addNewTodo(title, description, priority, dueDate) {
    const newTodo = new TodoItem(title, description, priority, dueDate);
    todos.push(newTodo);
    addTodoToDOM(newTodo);
    todoInput.value = "";
    todoDescription.value = "";
    todoDueDate.value = "";
  }

  function handleTodoCompletion(event) {
    const checkbox = event.target;
    const li = checkbox.parentElement;
    const todoTitle = li.querySelector("span").textContent.trim();
    const todo = todos.find((todo) => todo.title === todoTitle);

    if (todo) {
      todo.completed = checkbox.checked;
      displayTodos();
    }
  }

  function addTodoToDOM(todo) {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""}>
      <span>${todo.title}</span>
      <span>${todo.description}</span>
      <span>Priority: ${todo.priority}</span>
      <span>Due Date: ${formatDate(todo.dueDate)}</span>
    `;

    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", () => clearTodoItem(todo));

    li.appendChild(clearButton);
    todoList.appendChild(li);
  }

  function clearTodoItem(todo) {
    const index = todos.indexOf(todo);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    displayTodos();
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  todoList.addEventListener("change", handleTodoCompletion);
  addTodoBtn.addEventListener("click", addTodo);
  displayTodos();

  const contentDiv = document.getElementById("content");
  contentDiv.appendChild(todoListContainer);
});
