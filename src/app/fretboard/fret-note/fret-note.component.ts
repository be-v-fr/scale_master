import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fret-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fret-note.component.html',
  styleUrl: './fret-note.component.scss'
})
export class FretNoteComponent {
  @Input() name: string | undefined;
  @Input('root') isRoot: boolean = false;
}
