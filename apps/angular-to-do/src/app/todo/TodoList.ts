import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Todo } from './TodoService';

@Component({
  selector: 'app-todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="space-y-2">
      @for (todo of todos(); track todo.id) {
        <li class="flex items-center justify-between bg-white rounded shadow p-3">
          <span
            class="flex-1 text-lg cursor-pointer select-none"
            [class.line-through]="todo.completed"
            [class.text-gray-400]="todo.completed"
            [class.text-gray-900]="!todo.completed"
            tabindex="0"
            role="button"
            (click)="toggleTodo.emit(todo.id)"
            (keyup.enter)="toggleTodo.emit(todo.id)"
          >
            {{ todo.text }}
          </span>
          <button
            class="ml-4 text-red-500 hover:text-red-700"
            (click)="deleteTodo.emit(todo.id)"
            aria-label="Delete"
          >
            &times;
          </button>
        </li>
      }
    </ul>
  `,
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  toggleTodo = output<string>();
  deleteTodo = output<string>();
}
