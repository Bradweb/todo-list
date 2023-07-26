function TodoItem(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate; // Add the dueDate property to the TodoItem object
    this.completed = false;
  }
  
  export { TodoItem };
  