import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <h1 class="text-3xl font-bold underline">{{ title }}</h1>
    `,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'angular-to-do';
}
