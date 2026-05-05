import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="handleSubmit()" class="flex gap-2 mt-6">
      <input
        class="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        [value]="text()"
        (input)="text.set($any($event.target).value)"
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Add
      </button>
    </form>
  `,
})
export class TodoFormComponent {
  text = signal('');
  added = output<string>();

  handleSubmit() {
    const value = this.text().trim();
    if (value) {
      this.added.emit(value);
      this.text.set('');
    }
  }
}
