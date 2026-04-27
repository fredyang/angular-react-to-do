export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-white rounded shadow p-3"
        >
          <span
            className={
              'flex-1 text-lg cursor-pointer select-none ' +
              (todo.completed ? 'line-through text-gray-400' : 'text-gray-900')
            }
            onClick={() => onToggle(todo.id)}
          >
            {todo.text}
          </span>
          <button
            className="ml-4 text-red-500 hover:text-red-700"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}
