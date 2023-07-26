import { TodoItem } from './todos.js';

// Function to save todos to local storage
const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to retrieve todos from local storage
const getTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem("todos");
  return JSON.parse(storedTodos) || [];
}

let todos = getTodosFromLocalStorage();

// Create the todo list container and its elements
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

const displayTodos = () => {
  todoList.innerHTML = "";
  todos.forEach(addTodoToDOM);
}

const addTodo = () => {
  const title = todoInput.value.trim();
  const description = todoDescription.value.trim();
  const dueDate = todoDueDate.value.trim();
  const priority = todoPriority.value;

  const showError = (message) => {
    errorContainer.textContent = message;
  }

  const clearErrors = () => {
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

const addNewTodo = (title, description, priority, dueDate) => {
  const newTodo = new TodoItem(title, description, priority, dueDate);
  todos.push(newTodo);
  addTodoToDOM(newTodo);
  todoInput.value = "";
  todoDescription.value = "";
  todoDueDate.value = "";
  saveTodosToLocalStorage();
}

const handleTodoCompletion = (event) => {
  const checkbox = event.target;
  if (checkbox.tagName === "INPUT" && checkbox.type === "checkbox") {
    const li = checkbox.parentElement;
    const todoTitle = li.querySelector("span").textContent.trim();
    const todo = todos.find((todo) => todo.title === todoTitle);

    if (todo) {
      todo.completed = checkbox.checked;
      saveTodosToLocalStorage();
    }
  }
}

const addTodoToDOM = (todo) => {
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

const clearTodoItem = (todo) => {
  const index = todos.indexOf(todo);
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodosToLocalStorage();
  }
  todoList.removeChild(event.target.parentElement);
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

todoList.addEventListener("change", handleTodoCompletion);
addTodoBtn.addEventListener("click", addTodo);
displayTodos();

const contentDiv = document.getElementById("content");
contentDiv.appendChild(todoListContainer);
