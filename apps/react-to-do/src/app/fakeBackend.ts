import { setupWorker } from 'msw/browser';

import { http, HttpResponse } from 'msw';

function loadTodos() {
  try {
    const data = localStorage.getItem('todos');
    if (data) return JSON.parse(data);
  } catch {}
  return [
    { id: '1', text: 'Learn React', completed: false },
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
    const todo = todos.find((t) => t.id === params.id);
    if (todo) todo.completed = !todo.completed;
    saveTodos();
    return HttpResponse.json(todo);
  }),
  http.delete('/api/todos/:id', ({ params }) => {
    todos = todos.filter((t) => t.id !== params.id);
    saveTodos();
    return HttpResponse.json({});
  }),
);
