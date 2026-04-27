import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoApp } from './todo/ TodoApp';

@Component({
  imports: [RouterModule, TodoApp],
  selector: 'app-root',
  template: `
    <main
      class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center"
    >
      <app-todo-app></app-todo-app>
    </main>
  `,
})
export class App {}
