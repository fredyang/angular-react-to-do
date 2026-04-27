import { Component, input, output } from '@angular/core';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
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
            (click)="toggle.emit(todo.id)"
            (keyup.enter)="toggle.emit(todo.id)"
          >
            {{ todo.text }}
          </span>
          <button
            class="ml-4 text-red-500 hover:text-red-700"
            (click)="delete.emit(todo.id)"
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
  // eslint-disable-next-line @angular-eslint/no-output-native
  toggle = output<string>();
  delete = output<string>();
}
