import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoApp } from './todo/ TodoApp';

@Component({
  imports: [TodoApp],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center"
    >
      <app-todo-app></app-todo-app>
    </main>
  `,
})
export class App {}
