function TodoItem(title, description, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = false; // Set initial value to false
  }
  
  
  export { TodoItem, markTodoAsComplete };
  