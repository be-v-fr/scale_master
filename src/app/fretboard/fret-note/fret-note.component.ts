import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Note } from '../../../models/note';
import { DisplayService } from '../../../services/display.service';

@Component({
  selector: 'app-fret-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fret-note.component.html',
  styleUrl: './fret-note.component.scss'
})
export class FretNoteComponent {
  @Input() note?: Note;
  @Input('root') isRoot: boolean = false;

  constructor(
    public display: DisplayService
  ) { }
}
