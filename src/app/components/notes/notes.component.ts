import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="panel-card">
      <h6>Notes</h6>
      <div class="input-group mb-2">
        <input class="form-control" placeholder="Add a note..." [(ngModel)]="text" (keyup.enter)="add()" />
        <button class="btn btn-primary" (click)="add()">Add</button>
      </div>
      <ul class="list-group">
        @for (n of notes; track $index) {
          <li class="list-group-item d-flex justify-content-between">
            {{ n }}
            <button class="btn btn-sm btn-outline-danger" (click)="remove($index)">x</button>
          </li>
        } @empty {
          <li class="list-group-item text-muted">No notes yet.</li>
        }
      </ul>
    </div>
  `,
})
export class NotesComponent {
  notes: string[] = [];
  text = '';

  add(): void {
    if (this.text.trim()) {
      this.notes.push(this.text.trim());
      this.text = '';
    }
  }

  remove(i: number): void {
    this.notes.splice(i, 1);
  }
}
