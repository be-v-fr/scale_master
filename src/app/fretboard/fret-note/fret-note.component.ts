import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Note } from '../../../models/note';
import { DisplayService } from '../../../services/display.service';
import { CustomizeService } from '../../../services/customize.service';
import { Router } from '@angular/router';

/**
 * Displays a note on the fretboard, if a note is transferred via input.
 * Displays an empty element otherwise.
 */
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

  
  /**
   * Constructor for injection of services.
   */
  constructor(
    public display: DisplayService
  ) { }
}
