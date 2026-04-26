import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
function loadTodos() {
  try {
    const data = localStorage.getItem('todos');
    if (data) return JSON.parse(data);
  } catch {}
  return [
    { id: '1', text: 'Learn Angular', completed: false },
    { id: '2', text: 'Build a To-Do App', completed: false },
  ];
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

let todos = loadTodos();

export const worker = setupWorker(
  http.get('/api/todos', () => {
    return HttpResponse.json(todos);
  }),
  http.post('/api/todos', async ({ request }) => {
    const { text } = (await request.json()) as any;
    const newTodo = { id: Date.now().toString(), text, completed: false };
    todos.push(newTodo);
    saveTodos();
    return HttpResponse.json(newTodo, { status: 201 });
  }),
  http.patch('/api/todos/:id', async ({ params }) => {
    const todo = todos.find((t: any) => t.id === params['id']);
    if (todo) todo.completed = !todo.completed;
    saveTodos();
    return HttpResponse.json(todo);
  }),
  http.delete('/api/todos/:id', ({ params }) => {
    todos = todos.filter((t: any) => t.id !== params['id']);
    saveTodos();
    return HttpResponse.json({});
  })
);
