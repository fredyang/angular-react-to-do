import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoService } from './TodoService';
import { TodoListComponent } from './TodoList';
import { TodoFormComponent } from './TodoForm';

@Component({
  imports: [TodoListComponent, TodoFormComponent],
  selector: 'app-todo-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-blue-700">To-Do List</h2>
      <app-todo-form (add)="addTodo($event)"></app-todo-form>
      @if (todos.isLoading()) {
        <div className="text-gray-500 mt-6">Loading...</div>
      } @else {
        <app-todo-list
          [todos]="todos.data() ?? []"
          (toggleTodo)="toggleTodo($event)"
          (deleteTodo)="deleteTodo($event)"
        ></app-todo-list>
      }
    </div>
  `,
})
export class TodoApp {
  private todoService = inject(TodoService);
  todos = this.todoService.todos;
  addTodo = this.todoService.addTodo;
  toggleTodo = this.todoService.toggleTodo;
  deleteTodo = this.todoService.deleteTodo;
}
