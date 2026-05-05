import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { useTodosApi } from './useTodosApi';

export function TodoApp() {
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo } = useTodosApi();

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">React To-Do List</h2>
      <TodoForm added={addTodo} />
      {isLoading ? (
        <div className="text-gray-500 mt-6">Loading...</div>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}
    </div>
  );
}
