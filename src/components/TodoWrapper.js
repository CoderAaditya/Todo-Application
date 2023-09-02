import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterCompleted === "all") {
      return todo.task.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterCompleted === "completed") {
      return (
        todo.completed &&
        todo.task.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return (
        !todo.completed &&
        todo.task.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm onAddTodo={addTodo} />
      <h3>Search Tasks</h3>
      <input
        type="text"
        value={searchQuery}
        className="todo-input"
        placeholder="Search tasks..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="buttons">
        <button onClick={() => setFilterCompleted("all")}>All</button>
        <button onClick={() => setFilterCompleted("completed")}>
          Completed
        </button>
        <button onClick={() => setFilterCompleted("uncompleted")}>
          Uncompleted
        </button>
        {filterCompleted === "completed" && (
          <button className="clear-completed" onClick={clearCompleted}>
            Clear Completed
          </button>
        )}
      </div>
      {filteredTodos.length === 0 ? (
        <p class="w-clr">
          {todos.length === 0
            ? "---Task list is empty---"
            : "---No matching tasks found---"}
        </p>
      ) : (
        <p class="w-clr">~~~Tasks Of The Day - {currentDate}~~~</p>
      )}
      {filteredTodos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
