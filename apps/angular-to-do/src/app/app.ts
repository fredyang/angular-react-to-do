import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <main
      class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center"
    >
      <div class="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-blue-700">To-Do List</h2>
      </div>
    </main>
  `,
})
export class App {
  protected title = 'angular-to-do';
}
