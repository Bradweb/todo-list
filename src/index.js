import { TodoItem } from './todos.js';

document.addEventListener("DOMContentLoaded", () => {
  // Array to store all the todos
  const todos = [];

  // Create the todo list container and its elements
  const todoListContainer = document.createElement("div");
  todoListContainer.innerHTML = `
    <h1>Todo List</h1>
    <input type="text" id="todoInput" placeholder="Enter your todo">
    <input type="text" id="todoDescription" placeholder="Enter todo description">
    <input type="date" id="todoDueDate"> <!-- Use type="date" for the due date -->
    <select id="todoPriority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button id="addTodoBtn">Add Todo</button>
    <ul id="todoList"></ul>
  `;

  // Get references to the input, button, and list elements
  const todoInput = todoListContainer.querySelector("#todoInput");
  const todoDescription = todoListContainer.querySelector("#todoDescription");
  const todoDueDate = todoListContainer.querySelector("#todoDueDate"); // Reference to the due date input field
  const todoPriority = todoListContainer.querySelector("#todoPriority");
  const addTodoBtn = todoListContainer.querySelector("#addTodoBtn");
  const todoList = todoListContainer.querySelector("#todoList");

  // Function to display all the todos in the list
  function displayTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span>${todo.title}</span>
        <span>${todo.description}</span>
        <span>Priority: ${todo.priority}</span>
        <span>Due Date: ${todo.dueDate}</span> <!-- Display the due date -->
      `;

      const clearButton = document.createElement("button");
      clearButton.textContent = "Clear";
      clearButton.addEventListener("click", () => clearTodoItem(todo));

      li.appendChild(clearButton);
      todoList.appendChild(li);
    });
  }

  // Function to add a new todo item
  function addTodo() {
    const title = todoInput.value.trim();
    const description = todoDescription.value.trim();
    const dueDate = todoDueDate.value.trim();
    const priority = todoPriority.value;
  
    if (title === "") {
      alert("Please enter a valid todo title.");
      return;
    }
  
    if (description === "") {
      alert("Please enter a valid todo description.");
      return;
    }
  
    if (dueDate === "") {
      alert("Please enter a valid due date.");
      return;
    }
  
    
    const newTodo = new TodoItem(title, description, priority, dueDate);
    todos.push(newTodo);
  
    // Add the new todo to the DOM
    addTodoToDOM(newTodo);
  
    todoInput.value = "";
    todoDescription.value = "";
    todoDueDate.value = "";
  }
  
  // Function to handle todo completion
  function handleTodoCompletion(event) {
    const checkbox = event.target;
    const li = checkbox.parentElement;
    const todoTitle = li.querySelector("span").textContent.trim();
  
    const todo = todos.find((todo) => todo.title === todoTitle);
  
    if (todo) {
      todo.completed = checkbox.checked; // Update the 'completed' property based on the checkbox state
      displayTodos(); // Update the DOM to reflect the completion status
    }
  }

  // Function to add a new todo item to the list
  function addTodoToDOM(todo) {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox">
      <span>${todo.title}</span>
      <span>${todo.description}</span>
      <span>Priority: ${todo.priority}</span>
      <span>Due Date: ${todo.dueDate}</span>
    `;

    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", () => clearTodoItem(todo));

    li.appendChild(clearButton);
    todoList.appendChild(li);
  }

  // Function to clear a todo item
  function clearTodoItem(todo) {
    const index = todos.indexOf(todo);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    displayTodos(); // Update the DOM after clearing the todo
  }

  // Add event listener for todo completion
  todoList.addEventListener("change", handleTodoCompletion);

  // Add event listener for the "Add Todo" button
  addTodoBtn.addEventListener("click", addTodo);

  // Initial display of todos
  displayTodos();

  // Append the todo list container to the "content" div
  const contentDiv = document.getElementById("content");
  contentDiv.appendChild(todoListContainer);
});
